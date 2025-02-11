import type { UserService } from '#services/user_service';
import { inject } from '@adonisjs/core';
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import type { QueryClientContract } from '@adonisjs/lucid/types/database';

@inject()
export default class extends BaseSeeder {
  constructor(private userService: UserService, clientContract: QueryClientContract) {
    super(clientContract)
  }

  async run() {
    this.userService.createPromoter("ni@aefeup.pt", "password")
  }
}