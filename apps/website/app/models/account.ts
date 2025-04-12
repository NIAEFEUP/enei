import { DateTime } from "luxon";
import { BaseModel, column } from "@adonisjs/lucid/orm";
import type { SocialProviders } from "@adonisjs/ally/types";
import { compose } from "@adonisjs/core/helpers";
import hash from "@adonisjs/core/services/hash";
import User from "./user.js";
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { belongsTo, type RequiredBelongsTo } from "#lib/lucid/decorators.js";
import { lazy } from "#lib/lazy.js";
import { relations } from "#lib/lucid/relations.js";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
  uids: ["id"],
  passwordColumnName: "password",
});

type AccountProvider = "credentials" | keyof SocialProviders;
type AccountId = `${AccountProvider}:${string}`;

const accountRelations = lazy(() => relations(Account, (r) => [r.requiredBelongsTo("user")]));

export default class Account extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: AccountId;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column({ serializeAs: null })
  declare password: string;

  @column()
  declare userId: number;

  @belongsTo(() => User, {
    meta: { required: true },
  })
  declare user: RequiredBelongsTo<typeof User>;

  get $relations() {
    return accountRelations.get().for(this);
  }

  static findByCredentials(email: string) {
    return this.findForAuth(["id"], `credentials:${email}`);
  }
}
