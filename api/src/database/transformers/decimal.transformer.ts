import { ValueTransformer } from "typeorm";

export class DecimalTransformer implements ValueTransformer {
  /**
   * Used to marshal Decimal when writing to the database.
   */
  to(decimal: number): number {
    return decimal;
  }
  /**
   * Used to unmarshal Decimal when reading from the database.
   */
  from(decimal?: string): Number | null {
    return decimal ? parseFloat(decimal) : null;
  }
}
