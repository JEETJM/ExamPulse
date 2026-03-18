# <div align="center">🚀 ExamPulse</div>

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&size=28&pause=1000&color=4F8CFF&center=true&vCenter=true&width=900&lines=ExamPulse+-+Smart+Online+Examination+System;Role-Based+Exam+Management+Platform;Built+with+Node.js%2C+Express%2C+MongoDB%2C+EJS;Admin+%7C+Teacher+%7C+Student+Dashboard;Modern+UI+%2B+Authentication+%2B+Exam+Workflow" alt="Typing SVG" />

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/EJS-Template Engine-B4CA65?style=for-the-badge&logo=ejs&logoColor=black" />
  <img src="https://img.shields.io/badge/Bootstrap-UI-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/JEETJM/ExamPulse?style=flat-square" />
  <img src="https://img.shields.io/github/languages/top/JEETJM/ExamPulse?style=flat-square" />
  <img src="https://img.shields.io/github/last-commit/JEETJM/ExamPulse?style=flat-square" />
  <img src="https://img.shields.io/github/issues/JEETJM/ExamPulse?style=flat-square" />
  <img src="https://img.shields.io/github/stars/JEETJM/ExamPulse?style=flat-square" />
</p>

</div>

---

## 🌟 Overview

**ExamPulse** is a modern and feature-rich **Online Examination System** built to simplify exam creation, management, participation, and result tracking.

It supports multiple user roles such as **Admin**, **Teacher**, and **Student**, making it ideal for schools, colleges, institutes, and training platforms.

This project is designed with:
- secure authentication
- role-based authorization
- exam creation & management
- question handling
- student participation workflow
- result generation
- modern responsive UI

---

## ✨ Core Features

### 👨‍💼 Admin Features
- Manage system users
- Control access and permissions
- Monitor platform activities
- View exams and overall data
- Admin-specific routes and dashboard

### 👨‍🏫 Teacher Features
- Create exams
- Add questions to exams
- Manage and organize exam content
- View exam-related data
- Teacher-only protected actions

### 👨‍🎓 Student Features
- Register and login securely
- Browse available exams
- Attempt exams
- Submit answers
- View results and performance

---

## 🔐 Authentication & Security
- User registration and login
- Password hashing
- Session-based authentication
- Role-based middleware
- Protected routes for Admin / Teacher / Student
- Unauthorized access prevention

---

## 🧠 Functional Modules
- Exam creation and listing
- Question management
- Attempt tracking
- Result generation
- Admin seeding utility
- Error handling utility
- View routes and dynamic rendering

---

## 🎨 UI Highlights
- Responsive interface
- Clean navigation flow
- Modern dashboard layout
- Glassmorphism-inspired UI sections
- Dark / Light mode ready
- Resource cards and exam blocks
- User-friendly forms and tables

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **EJS** | Templating engine |
| **CSS / Bootstrap / JS** | Frontend UI styling |
| **Express Session / Auth** | Authentication flow |

---

## 📁 Project Structure

```bash
ExamPulse/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── adminController.js
│   ├── attemptController.js
│   ├── authController.js
│   └── examController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── Attempt.js
│   ├── Exam.js
│   ├── Question.js
│   ├── Result.js
│   └── User.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── exam.js
│       └── theme.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── attemptRoutes.js
│   ├── authRoutes.js
│   ├── examRoutes.js
│   └── viewRoutes.js
│
├── utils/
│   └── asyncHandler.js
│
├── views/
│   └── *.ejs
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── resetAdmin.js
├── seedAdmin.js
└── server.js
