/**
 * Represents a monetary value.
 * Correctly performs arithmetic operations with the value, as stored in the database.
 *
 * Used for payments and invoices.
 *
 * Monetary values are stored in cents, that is, 1.5€ is stored as 150.
 */
export class Money {
  readonly #amount: number;

  private constructor(amount: number) {
    this.#amount = amount;
  }

  static fromCents(cents: number): Money {
    return new Money(cents);
  }

  static fromEuros(euros: number): Money {
    return new Money(euros * 100);
  }

  add(other: Money): Money {
    return new Money(this.#amount + other.#amount);
  }

  subtract(other: Money): Money {
    return new Money(this.#amount - other.#amount);
  }

  multiply(other: number): Money {
    // We ceil because it is impossible to represent a fraction of a cent,
    // and we can't lose money by rounding down.
    return new Money(Math.ceil(this.#amount * other));
  }

  divide(other: number): Money {
    // We ceil because it is impossible to represent a fraction of a cent,
    // and we can't lose money by rounding down.
    return new Money(Math.ceil(this.#amount / other));
  }

  toCents(): number {
    return this.#amount;
  }

  toEuros(): number {
    return this.#amount / 100;
  }

  toString(): string {
    return `${this.toEuros()}€`;
  }
}
