import { prisma } from "@/lib/db";
import Categories from "./_components/Categories";
import Courses from "./_components/Courses";

const page = async ({ searchParams }: { searchParams: { search: string } }) => {
  const cats = await prisma.category.findMany();
  return (
    <div className="p-4  min-h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-semibold ">Courses</h1>
      <p className="mb-4 text-sm text-gray-600">
        (Choose your course and dive into career)
      </p>
      <div className="w-[calc(100vw-100px)] mb-4">
        <Categories categories={cats} search={searchParams.search} />
      </div>
      <Courses />
    </div>
  );
};

export default page;
