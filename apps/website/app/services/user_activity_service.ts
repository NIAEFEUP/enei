import type User from "#models/user";
import { inject } from "@adonisjs/core";
import { StoreService } from "./store_service.js";
import type { UserActivityInformation } from "../../types/user_activity.js";
import UserActivity from "#models/user_activity";

@inject()
export class UserActivityService {
  private resourceMap = new Map();

  constructor(private storeService: StoreService) {
    this.resourceMap = new Map([["store", this.storeService.getReservedProducts]]);
  }

  async getActivityInformation(user: User) {
    const information: UserActivityInformation = {};

    this.resourceMap.forEach(async (resource, key) => {
      information[key] = await resource(user);
    });

    return information;
  }

  async logCompanyLike({
    userId,
    companyId,
    likedByName,
  }: {
    userId: number;
    companyId: number;
    likedByName: string;
  }) {
    return await UserActivity.create({
      userId,
      type: "company_like",
      description: { company_id: companyId, liked_by: likedByName },
    });
  }
}
