import { Router } from "express";
import userRouter from "./user/user.routes.js";
import managerRouter from "./manager/manager.routes.js";
import adminRouter from "./admin/admin.routes.js";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/managerr", managerRouter)
rootRouter.use("/admin", adminRouter)

export default rootRouter;