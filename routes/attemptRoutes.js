// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const { allowRoles } = require("../middleware/roleMiddleware");
// const { startExam, submitExam } = require("../controllers/attemptController");

// router.get("/start/:examId", protect, allowRoles("student"), startExam);
// router.post("/submit/:examId", protect, allowRoles("student"), submitExam);
// router.post("/autosave", protect, allowRoles("student"), autoSaveAnswer);


// module.exports = router;

// const {
//   startExam,
//   submitExam,
//   autoSaveAnswer,
// } = require("../controllers/attemptController");

// // router.get("/start/:examId", protect, allowRoles("student"), startExam);
// // router.post("/submit/:examId", protect, allowRoles("student"), submitExam);




const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  startExam,
  submitExam,
  autoSaveAnswer,
} = require("../controllers/attemptController");

// Start exam
router.get("/start/:examId", protect, allowRoles("student"), startExam);

// Submit exam
router.post("/submit/:examId", protect, allowRoles("student"), submitExam);

// Autosave answer (NEW)
router.post("/autosave", protect, allowRoles("student"), autoSaveAnswer);

module.exports = router;