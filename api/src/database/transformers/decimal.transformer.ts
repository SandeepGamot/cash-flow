import { ValueTransformer } from "typeorm";

export class DecimalTransformer implements ValueTransformer {
  /**
   * Used to marshal Decimal when writing to the database.
   */
  to(decimal?: Number | number): string | null {
    return decimal?.toFixed(2) ?? null;
  }
  /**
   * Used to unmarshal Decimal when reading from the database.
   */
  from(decimal?: string): Number | null {
    return decimal ? new Number(decimal) : null;
  }
}
