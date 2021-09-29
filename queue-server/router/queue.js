const Router = require("express");
const router = new Router();
import controller from "../controllers/queue";

router.get("/", controller.main);
router.get("/active_queues", controller.getActiveQueues);
router.get("/assigned_queues", controller.getAssignedQueues);
router.get("/usergroups", controller.getUsergroups);
router.get("/assigned_queue", controller.getAssignedQueue);
router.get("/current_user", controller.getCurrentUser);

router.post("/start_serve", controller.startServe);
router.post("/generate_queue", controller.generateQueue);
router.post("/finish_queue", controller.finishQueue);

router.put("/update_state", controller.updateState);

export default router;
