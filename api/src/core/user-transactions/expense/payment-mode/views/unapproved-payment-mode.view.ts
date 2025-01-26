import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  name: "unapproved_payment_mode",
  expression: `
    SELECT id, payment_mode
    FROM payment_mode
    WHERE "isApproved" = false
  `,
})
export class UnapprovedPaymentMode {
  @ViewColumn()
  id: string;

  @ViewColumn()
  paymentMode: string;
}
