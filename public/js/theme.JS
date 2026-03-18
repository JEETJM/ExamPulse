// document.addEventListener("DOMContentLoaded", () => {
//   const toggleBtn = document.getElementById("themeToggle");
//   const savedTheme = localStorage.getItem("theme");

//   if (savedTheme === "light") {
//     document.body.classList.add("light-mode");
//   }

//   if (toggleBtn) {
//     toggleBtn.addEventListener("click", () => {
//       document.body.classList.toggle("light-mode");

//       if (document.body.classList.contains("light-mode")) {
//         localStorage.setItem("theme", "light");
//       } else {
//         localStorage.setItem("theme", "dark");
//       }
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const toggleButtons = document.querySelectorAll(".password-toggle");

//   toggleButtons.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const targetId = btn.dataset.target;
//       const input = document.getElementById(targetId);
//       const icon = btn.querySelector(".material-icons-outlined");

//       if (!input) return;

//       if (input.type === "password") {
//         input.type = "text";
//         if (icon) icon.textContent = "visibility_off";
//       } else {
//         input.type = "password";
//         if (icon) icon.textContent = "visibility";
//       }
//     });
//   });
// });







// console.log("theme.js loaded");
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("theme.js loaded");

//   const themeToggle = document.getElementById("themeToggle");

//   const savedTheme = localStorage.getItem("theme");
//   if (savedTheme === "light") {
//     document.body.classList.add("light-mode");
//   }

//   if (themeToggle) {
//     themeToggle.addEventListener("click", function () {
//       document.body.classList.toggle("light-mode");

//       if (document.body.classList.contains("light-mode")) {
//         localStorage.setItem("theme", "light");
//       } else {
//         localStorage.setItem("theme", "dark");
//       }
//     });
//   }

//   const toggleButtons = document.querySelectorAll(".password-toggle");

//   toggleButtons.forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const targetId = btn.dataset.target;
//       const input = document.getElementById(targetId);
//       const icon = btn.querySelector(".material-icons-outlined");

//       if (!input) return;

//       if (input.type === "password") {
//         input.type = "text";
//         if (icon) icon.textContent = "visibility_off";
//       } else {
//         input.type = "password";
//         if (icon) icon.textContent = "visibility";
//       }
//     });
//   });
// });