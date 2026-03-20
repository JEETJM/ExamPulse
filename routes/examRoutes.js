// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const { allowRoles } = require("../middleware/roleMiddleware");
// const {
//   createExam,
//   addQuestion,
//   publishExam,
//   deleteQuestion,
//   updateQuestion,
// } = require("../controllers/examController");

// router.post("/create", protect, allowRoles("teacher"), createExam);
// router.post("/question/add", protect, allowRoles("teacher"), addQuestion);
// router.post("/:id/publish", protect, allowRoles("teacher"), publishExam);
// router.post(
//   "/question/:id/delete",
//   protect,
//   allowRoles("teacher"),
//   deleteQuestion,
// );
// router.post(
//   "/question/:id/update",
//   protect,
//   allowRoles("teacher"),
//   updateQuestion,
// );

// module.exports = router;




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
  getEditExamPage,
  updateExam,
  deleteExam,
  getEditQuestionPage,
} = require("../controllers/examController");

router.post("/create", protect, allowRoles("teacher"), createExam);
router.post("/question/add", protect, allowRoles("teacher"), addQuestion);
router.post("/:id/publish", protect, allowRoles("teacher"), publishExam);

router.get("/:id/edit", protect, allowRoles("teacher"), getEditExamPage);
router.post("/:id/update", protect, allowRoles("teacher"), updateExam);
router.post("/:id/delete", protect, allowRoles("teacher"), deleteExam);

router.get("/question/:id/edit", protect, allowRoles("teacher"), getEditQuestionPage);
router.post("/question/:id/update", protect, allowRoles("teacher"), updateQuestion);
router.post("/question/:id/delete", protect, allowRoles("teacher"), deleteQuestion);

module.exports = router;
