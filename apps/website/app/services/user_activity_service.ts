import User from "#models/user";
import { inject } from "@adonisjs/core";
import { StoreService } from "./store_service.js";
import type { UserActivityDescription } from "../../types/user_activity.js";
import UserActivity from "#models/user_activity";

@inject()
export class UserActivityService {
  private resourceMap = new Map();

  constructor(private storeService: StoreService) {
    this.resourceMap = new Map([["store", this.storeService.getReservedProducts]]);
  }

  async getActivityInformation(user: User) {
    const information: Record<string, UserActivityDescription> = {};

    this.resourceMap.forEach(async (resource, key) => {
      information[key] = await resource(user);
    });

    return information;
  }

  async isLiked(userId: number, likedById: number): Promise<boolean> {
    const like = await UserActivity.query()
      .where("user_id", userId)
      .where("type", "company_like")
      .andWhereRaw(`description->>'likedBy' = ?`, [likedById])
      .first();

    return !!like;
  }

  async toggleCompanyLike(userId: number, companyId: number, likedById: number) {
    const existingLike = await UserActivity.query()
      .where("user_id", userId)
      .where("type", "company_like")
      .andWhereRaw(`description->>'companyId' = ?`, [companyId])
      .andWhereRaw(`description->>'likedBy' = ?`, [likedById])
      .first();

    if (existingLike) {
      await existingLike.delete();
      return false;
    }

    await UserActivity.create({
      userId,
      type: "company_like",
      description: { companyId: companyId, likedBy: likedById },
    });
    return true;
  }

  async getCompanyLikes(userId: number, companyId: number): Promise<User[]> {
    const likes = await UserActivity.query()
      .where("user_id", userId)
      .where("type", "company_like")
      .andWhereRaw(`description->>'companyId' = ?`, [companyId]);

    const users = await Promise.all(
      likes.map((like) => {
        const likedById = like.description.likedBy;
        return User.findOrFail(likedById);
      }),
    );
    return users;
  }
}
