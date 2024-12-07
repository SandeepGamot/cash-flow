import { TypeOf, string, object } from "zod";
import { AppConfig } from "../../../../config";

export const paymentModeSchema = object({
  id: string().uuid().optional(),
  paymentMode: string().max(AppConfig.constants.options.maxLength),
}).refine(
  (data) => data.id != null || data.paymentMode != null,
  "payment mode should either have id or a name"
);

export type PaymentModeInput = TypeOf<typeof paymentModeSchema>;
