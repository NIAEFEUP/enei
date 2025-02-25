import { TypedCookie } from "#lib/adonisjs/cookies.js";

export const referralCodeCookie = new TypedCookie<string>('referrer')