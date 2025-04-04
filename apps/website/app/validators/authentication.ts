import vine from "@vinejs/vine";
import User from "#models/user";

export const registerWithCredentialsValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique({ table: User.table, column: "email" }),
    password: vine.string().minLength(8).confirmed(),
  }),
);

export const passwordResetValidator = vine.compile(
  vine.object({
    email: vine.string().email().exists({ table: User.table, column: "email" }),
    password: vine.string().minLength(8).confirmed(),
  }),
);

export const passwordSendForgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  }),
);

export const emailVerificationCallbackValidator = vine.compile(
  vine.object({
    email: vine.string().email().exists({ table: User.table, column: "email" }),
  }),
);

export const emailChangeValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique({ table: User.table, column: "email" }),
  }),
);

export const emailChangeCallbackValidator = vine.compile(
  vine.object({
    id: vine.string(),
    email: vine.string().email(),
  }),
);

export const loginWithCredentialsValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  }),
);
