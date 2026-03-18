document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.getElementById("timer");
  const examForm = document.getElementById("examForm");

  if (timerElement && examForm) {
    let duration = Number(timerElement.dataset.duration) * 60;

    const updateTimer = () => {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      timerElement.textContent = `Time Left: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      if (duration <= 0) {
        clearInterval(timerInterval);
        examForm.submit();
      }

      duration--;
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
  }

  const paletteButtons = document.querySelectorAll(".palette-btn");
  paletteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const answers = document.querySelectorAll(".autosave-answer");
  answers.forEach((input) => {
    input.addEventListener("change", async () => {
      try {
        await fetch("/attempts/autosave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            examId: input.dataset.examId,
            questionId: input.dataset.questionId,
            selectedAnswer: input.value,
          }),
        });
      } catch (err) {
        console.log("Autosave failed:", err);
      }
    });
  });
});