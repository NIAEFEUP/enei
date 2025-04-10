import type User from "#models/user";
import { inject } from "@adonisjs/core";
import { StoreService } from "./store_service.js";
import type { UserActivityDescription } from "../../types/user_activity.js";

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
}
