const Router = require("express");
const router = new Router();
import controller from "../controllers/queue";
import authMiddleware from "../middleware/auth";

router.get("/", controller.main);
router.get("/active_queues", controller.getActiveQueues);
router.get("/assigned_queues", controller.getAssignedQueues);

router.get("/assigned_queue", authMiddleware, controller.getAssignedQueue);

router.post("/start_serve", authMiddleware, controller.startServe);
router.post("/generate_queue", controller.generateQueue);
router.post("/finish_queue", authMiddleware, controller.finishQueue);

router.put("/update_state", authMiddleware, controller.updateState);

export default router;
