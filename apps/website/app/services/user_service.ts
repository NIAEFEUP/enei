import UserCreated from "#events/user_created";
import UserEmailVerified from "#events/user_email_verified";
import UserForgotPassword from "#events/user_forgot_password";
import SendForgotPasswordEmail from "#listeners/send_forgot_password_email";
import SendVerificationEmail from "#listeners/send_verification_email";
import User from "#models/user";
import db from "@adonisjs/lucid/services/db";
import { DateTime } from "luxon";
import Account from "#models/account";
import { errors } from "@adonisjs/auth";
import app from "@adonisjs/core/services/app";
import { inject } from "@adonisjs/core";
import { Logger } from "@adonisjs/core/logger";
import PromoterProfile from "#models/promoter_profile";
import { attachmentManager } from '@jrmc/adonis-attachment'
import type { MultipartFile } from '@adonisjs/core/bodyparser'
import drive from "@adonisjs/drive/services/main"

@inject()
export class UserService {
  constructor(private logger: Logger) {}

  async storeCV(user: User, cv: MultipartFile) {
    try {
      user.resume = await attachmentManager.createFromFile(cv)
      await user.save()
      return user
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
  async deleteCV(user: User) {
    try {
      user.resume = null
      await user.save()
      return user
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async getCVName(user: User) {
    try {
      if (user.resume === null) {
        return null
      }
      return user.resume.originalName
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async getCV(user: User) {
    if (user.resume === null) {
      return null
    }
    const filePath = user.resume.path
    if(!filePath) {
      return null
    }
    const file = await drive.use().getStream(filePath)
    return {file, fileName: user.resume.originalName}
  }

  async storeAvatar(user: User, avatar: MultipartFile) {
    try {
      user.avatar = await attachmentManager.createFromFile(avatar)
      await user.save()
      return user
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async deleteAvatar(user: User) {
    try {
      user.avatar = null
      await user.save()
      return user
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async getAvatarName(user: User) {
    try {
      if (user.avatar === null) {
        return null
      }
      return user.avatar.originalName
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async getAvatar(user: User) {
    if (user.avatar === null) {
      return null
    }
    const filePath = user.avatar.path
    if(!filePath) {
      return null
    }
    const file = await drive.use().getStream(filePath)
    return {file, fileName: user.avatar.originalName}
  }


  async getUserWithCredentials(email: string, password: string) {
    try {
      const account = await Account.verifyCredentials(`credentials:${email}`, password);
      await account.load("user");

      return account.user;
    } catch (error) {
      if (error instanceof errors.E_INVALID_CREDENTIALS) {
        return null;
      }

      throw error;
    }
  }

  async createUserWithCredentials(email: string, password: string) {
    const committedUser = await db.transaction(async (trx) => {
      const user = await User.create({ email }, { client: trx });
      await user.related("accounts").create({ id: `credentials:${email}`, password });

      return user;
    });

    return [committedUser, UserCreated.tryDispatch(committedUser)] as const;
  }

  async sendVerificationEmail(user: User) {
    const listener = await app.container.make(SendVerificationEmail);
    listener.handle(new UserCreated(user)).catch((error) => this.logger.error(error));
  }

  async verifyEmail(email: string) {
    const verifiedUser = await db.transaction(async (trx) => {
      const user = await User.findByOrFail("email", email, { client: trx });
      if (user.isEmailVerified()) return null;

      user.emailVerifiedAt = DateTime.now();
      return await user.save();
    });

    if (!verifiedUser) return null;

    UserEmailVerified.tryDispatch(verifiedUser);

    return verifiedUser;
  }

  async createPromoter(email: string, password: string) {
    const committedUser = await db.transaction(async (trx) => {
      const user = await User.create({ email }, { client: trx });
      await user.related("accounts").create({ id: `credentials:${email}`, password });

      const promoterInfo = await PromoterProfile.create({}, { client: trx });
      await user.related("promoterProfile").associate(promoterInfo);

      return user;
    });

    return [committedUser, UserCreated.tryDispatch(committedUser)] as const;
  }

  async sendForgotPasswordEmail(email: string) {
    const listener = new SendForgotPasswordEmail();
    listener.handle(new UserForgotPassword(email));
  }
}
