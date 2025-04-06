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
import UserChangeEmailRequest from "#events/user_change_email";
import SendChangeEmailEmail from "#listeners/send_change_email_email";
import ChangeEmailRequest from "#models/email_change";
import UserEmailChangedConfirmation from "#events/user_email_changed";
import SendEmailChangedConfirmationEmail from "#listeners/send_email_changed_email";

@inject()
export class UserService {
  constructor(private logger: Logger) {}

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

  async sendChangeEmailEmail(userId: number, oldEmail: string, newEmail: string) {
    const committedChangeEmail = await db.transaction(async (trx) => {
      await ChangeEmailRequest.query({ client: trx })
        .where("user_id", userId)
        .andWhere("performed", false)
        .update({ canceled: true });

      return await ChangeEmailRequest.create({ userId, oldEmail, newEmail }, { client: trx });
    });

    const listener = new SendChangeEmailEmail();
    // TODO: hide changeId using sqids
    listener.handle(new UserChangeEmailRequest(committedChangeEmail.id, oldEmail, newEmail));
  }

  async sendEmailChangedConfirmationEmail(oldEmail: string, newEmail: string) {
    const listener = new SendEmailChangedConfirmationEmail();
    listener.handle(new UserEmailChangedConfirmation(oldEmail, newEmail));
  }
}
