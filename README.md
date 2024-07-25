
# YourLMS - Advanced Learning Management System

Welcome to YourLMS! This repository contains the code for a comprehensive Learning Management System built with Next.js, Tailwind CSS, Shadcn UI, React Video, Prisma ORM, PostgreSQL, and Clerk.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Introduction

YourLMS is designed to provide a seamless learning experience for both teachers and students. The platform offers a range of features to facilitate course creation, enrollment, and completion.

## Features

### User Roles
- Choose between student and teacher roles during signup
- Teachers can create courses, publish content, issue certifications, and earn from course sales
- Students can enroll in courses (free or paid) and complete them and get certificates

### Course Management
- Teachers can access Course Studio to customize course structure
- Options to make courses free or paid
- Publish chapters with videos, attachments, and explanations in Markdown format

### Payment Integration
- Razorpay integration for secure course payments

### Search Functionality
- Search courses by teacher name, title, or category (e.g., web development, mobile development)

### Email Automation
- Welcome email upon signup
- Course enrollment confirmation email
- Course completion email with certificate download link
- Course update notifications for enrolled students

### User Profiles
- Shareable profiles showcasing enrolled courses, certifications, goals, and interests
- Customizable user settings

### Certifications
- Teachers can upload signatures for course certificates
- Certificates include teacher and portal owner signatures

### UI/UX
- Clean user interface with black and white theme
- Toast notifications for user feedback
- Skeleton states for improved loading experience

### Navigation
- Dashboard for quick overview
- Course Studio for teachers
- Certificates section
- Profile management
- Settings page

### Additional Features
- Beautiful landing page
- Onboarding form for user interests and goals

## Tech Stack
- **Next.js** ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
- **Tailwind CSS** ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
- **Shadcn UI** ![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-00a0e4?style=flat)
- **React Video** ![React Video](https://img.shields.io/badge/React_Video-61DAFB?style=flat&logo=react&logoColor=white)
- **Prisma ORM** ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
- **PostgreSQL** ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)
- **Clerk** ![Clerk](https://img.shields.io/badge/Clerk-3E70F7?style=flat)
- **Razorpay** ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat&logo=razorpay&logoColor=white)

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js
- PostgreSQL

### Clone the Repository
```sh
git clone https://github.com/DevKrishnasai/lms.git
cd lms
```

### Install Dependencies
```sh
pnpm install
```

### Setup Environment Variables
Create a `.env` file in the root directory and add the necessary environment variables.

### Run Database Schema Push
```sh
pnpm dlx prisma db push
```

### Run Schema Types Generation
```sh
pnpm dlx prisma generate
```

### Start the Application
```sh
pnpm dev
```

## Usage
To start using the application, navigate to `http://localhost:3000` in your browser.

## Project Structure
```
YourLMS/
├── prisma/              # Prisma schema and migrations
├── public/              # Public assets
├── src/
│   ├── components/      # Reusable components
│   ├── app/             # Pages and API routes
│   ├── utils/           # Utility functions
│   └── ...              # Other directories and files
└── README.md            # Project documentation
```
