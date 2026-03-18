const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const {
  createExam,
  addQuestion,
  publishExam,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/examController");

router.post("/create", protect, allowRoles("teacher"), createExam);
router.post("/question/add", protect, allowRoles("teacher"), addQuestion);
router.post("/:id/publish", protect, allowRoles("teacher"), publishExam);
router.post(
  "/question/:id/delete",
  protect,
  allowRoles("teacher"),
  deleteQuestion,
);
router.post(
  "/question/:id/update",
  protect,
  allowRoles("teacher"),
  updateQuestion,
);

module.exports = router;
