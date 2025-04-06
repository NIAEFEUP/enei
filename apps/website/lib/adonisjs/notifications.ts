import type { Session } from "@adonisjs/session";

type ToastNotification = {
  title?: string;
  description: string;
  variant: "default" | "destructive";
  duration?: number;
};

export class TypedFlash<T> {
  constructor(public key: string) {}

  get(session: Session, defaultValue: T[] = []): T[] {
    return session.flashMessages.get(this.key, defaultValue);
  }

  set(session: Session, messages: T[]) {
    session.flash(this.key, messages);
  }

  push(session: Session, message: T) {
    const messages = this.get(session);
    messages.push(message);
    this.set(session, messages);
  }

  clear(session: Session) {
    this.set(session, []);
  }
}

export const notifications = new TypedFlash<ToastNotification>("notifications");
