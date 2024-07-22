import { Button } from "@/components/ui/button";
import { currencyFormater } from "@/lib/utils";
import React from "react";
import { FaLock } from "react-icons/fa";
import dynamic from "next/dynamic";
import FormForCheckOut from "./FormForCheckOut";

// const ClientSideForm = dynamic(() => import('./ClientSideForm'), { ssr: false });

interface Props {
  price: number;
  courseId: string;
  isAuthor: boolean;
}

const RightPart: React.FC<Props> = ({ price, courseId, isAuthor }) => {
  return (
    <div className="md:w-1/2 p-8 my-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Payment Details
      </h2>
      <FormForCheckOut price={price} courseId={courseId} isAuthor={isAuthor} />
      <div className="flex justify-between items-center mb-6 mt-4">
        <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {price === 0 ? "Free" : `₹${currencyFormater(price)}`}
        </span>
        <span className="text-green-600 dark:text-green-400 font-semibold flex items-center">
          <FaLock className="mr-2" />
          Secure Payment
        </span>
      </div>
    </div>
  );
};

export default RightPart;
