import { Router } from "express";
import UserRoutes from "../core/users/user.routes";
import AuthRoutes from "../core/auth/auth.routes";
import TransactionRoutes from "../core/user-transactions/transaction.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import { allowCredentials } from "../middlewares/allow-credentials.middleware";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/users", authMiddleware, allowCredentials, UserRoutes);
router.use("/transactions", authMiddleware, TransactionRoutes);
export default router;
