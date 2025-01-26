import dataSource from "../../../../database/data-source";
import { UnapprovedPaymentMode } from "./views/unapproved-payment-mode.view";
import { PaymentMode } from "./payment-mode.entity";

const getUnapprovedPaymentModes = async () => {
  return dataSource.getRepository(UnapprovedPaymentMode).find();
};

const getPaymentModes = async () => {
  return dataSource.getRepository(PaymentMode).find({
    where: { isApproved: true },
  });
};

export const paymentModeService = {
  getUnapprovedPaymentModes,
  getPaymentModes,
};
