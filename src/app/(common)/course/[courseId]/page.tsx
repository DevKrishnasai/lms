import React from "react";

const page = ({ params }: { params: { courseId: string } }) => {
  return <div>{params.courseId}</div>;
};

export default page;
