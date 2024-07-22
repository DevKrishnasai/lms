const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function CategoriesGenerator() {
  const categories = [
    { title: "Web Development" },
    { title: "Mobile App Development" },
    { title: "Data Science" },
    { title: "Machine Learning" },
    { title: "Artificial Intelligence" },
    { title: "Cloud Computing" },
    { title: "Cybersecurity" },
    { title: "DevOps" },
    { title: "Blockchain" },
    { title: "Digital Marketing" },
    { title: "Graphic Design" },
    { title: "UX/UI Design" },
    { title: "Business Analytics" },
    { title: "Project Management" },
    { title: "Photography" },
    { title: "Music Production" },
    { title: "Language Learning" },
    { title: "Personal Development" },
    { title: "Fitness and Health" },
    { title: "Cooking and Nutrition" },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log("Categories seeded successfully");
}

async function GoalsGenerator() {
  const goals = [
    "Career Advancement",
    "Personal Interest",
    "Academic Requirements",
    "Skill Development",
    "Certification",
    "Starting a Business",
  ];

  for (const goal of goals) {
    await prisma.goal.create({
      data: {
        title: goal,
      },
    });
  }

  console.log("goals seeded successfully");
}

GoalsGenerator()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

CategoriesGenerator()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
