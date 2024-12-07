import dataSource from "../../../../database/data-source";
import { normalise } from "../../../../utils/methods";
import { PaymentMode } from "./payment-mode.entity";
import { PaymentModeInput } from "./payment-mode.schema";

export const PaymentModeRepository = dataSource
  .getRepository(PaymentMode)
  .extend({
    async findOrCreate({
      id,
      paymentMode: paymentModeInput,
    }: PaymentModeInput) {
      let paymentMode: PaymentMode | null;

      paymentMode = await this.createQueryBuilder("paymentMode")
        .where("paymentMode.id = :id", { id })
        .orWhere("paymentMode.paymentMode = :paymentMode", {
          paymentMode: normalise(paymentModeInput),
        })
        .getOne();

      if (!paymentMode) {
        if (id) {
          throw new Error(`paymentMode with id: ${id} does not exist`);
        }
        paymentMode = this.create({ paymentMode: paymentModeInput });
        await this.insert(paymentMode);
      }
      return paymentMode;
    },
  });
