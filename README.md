# Learning Management System (LMS)

Welcome to the LMS project! This repository contains the code for a comprehensive Learning Management System built with Next.js, Tailwind CSS, Shadcn UI, Magic UI, React Video, Prisma ORM, PostgreSQL, and Clerk.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This LMS project is designed to facilitate a seamless learning experience for both teachers and students. The platform is divided into two main sections: Teachers Portal and Students Portal.

## Features

### Teachers Portal
- Access and manage courses created by the teacher
- Add, edit, and delete chapters, videos, attachments, PDFs, and video thumbnails
- Manage course content efficiently

### Students Portal
- Request access to courses
- Coordinators handle student requests and contact students
- Enrollment handled by coordinators, including sending welcome and enrollment emails
- Access to a free chapter for course outcomes/introduction before requesting enrollment

### User Dashboard
- View all enrolled courses and progress
- Click on a course to see detailed course content
- Course page includes video attachments, resources, and markdown format descriptions on the right side
- Chapters, chapter completion status, and progress shown on the left side

### Coordinator
- Full access to all course-related actions
- Modify and delete users
- Add users and send emails
- Contact users and manage their enrollment

## Tech Stack

- **Next.js** ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
- **Tailwind CSS** ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
- **Shadcn UI** ![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-00a0e4?style=flat)
- **Magic UI** ![Magic UI](https://img.shields.io/badge/Magic%20UI-FF6F61?style=flat)
- **React Video** ![React Video](https://img.shields.io/badge/React_Video-61DAFB?style=flat&logo=react&logoColor=white)
- **Prisma ORM** ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
- **PostgreSQL** ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)
- **Clerk** ![Clerk](https://img.shields.io/badge/Clerk-3E70F7?style=flat)

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

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/courses
PRIVATE_ID=

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lms?schema=public


UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

MAIL_USER=
MAIL_PASS=

BASE_URL=http://localhost:3000
```

### Run Database Migrations

```sh
pnpm prisma migrate dev
```

### Start the Application

```sh
pnpm run dev
```

## Usage

To start using the application, navigate to `http://localhost:3000` in your browser.

## Project Structure

```
lms/
├── prisma/              # Prisma schema and migrations
├── public/              # Public assets
├── src/
│   ├── components/      # Reusable components
│   ├── app/             # pages 
│   ├── utils/           # Utility functions
│   └── ...              # Other directories and files
└── README.md            # Project documentation
```
