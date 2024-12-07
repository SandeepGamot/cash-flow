import { RequestHandler } from "express";
import { paymentModeService } from "./payment-mode.service";

export const getPaymentModesHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  { unapprovedOnly?: string }
> = async (req, res) => {
  if (req.query.unapprovedOnly && req.query.unapprovedOnly === "true") {
    return res.send(await paymentModeService.getUnapprovedPaymentModes());
  }
  return res.send(await paymentModeService.getPaymentModes());
};
