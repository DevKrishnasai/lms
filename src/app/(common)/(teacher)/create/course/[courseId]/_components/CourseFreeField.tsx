"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import { useRouter } from "next/navigation";
import { currencyFormater, updateTheField } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface CourseFreeFieldProps {
  isFree: boolean;
  price: number;
  courseId: string;
}

const CourseFreeField = ({ courseId, isFree, price }: CourseFreeFieldProps) => {
  const router = useRouter();

  async function onSubmit() {
    if ((!selected && cost > 0) || selected) {
      await updateTheField(
        { isFree: selected, price: cost },
        `/api/teacher/update/${courseId}`,
        "PUT"
      );
      setEdit((prev) => !prev);
      router.refresh();
    } else {
      toast.error("Price should be greater than 0", {
        id: "course-update",
      });
    }
  }
  const [edit, setEdit] = React.useState(false);
  const [selected, setSelected] = React.useState(isFree);
  const [cost, setCost] = React.useState(price);
  return (
    <div className=" shadow-md border p-4 space-y-3">
      <div className="flex justify-between">
        <p className="font-bold text-xl">
          Course price <span className="text-red-600">*</span>
        </p>
        <button onClick={() => setEdit(!edit)} className="hover:underline">
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>

      {edit ? (
        <div className="space-y-3">
          <div
            className="group flex gap-2 items-center cursor-pointer"
            onClick={() => setSelected((d) => !d)}
          >
            <Checkbox
              checked={selected}
              onCheckedChange={() => setSelected((d) => !d)}
            />
            <span>free</span>
          </div>
          {!selected && (
            <Input
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              placeholder="Enter the price of the course"
            />
          )}
          <div className="flex justify-end items-center">
            <Button type="submit" onClick={onSubmit}>
              save
            </Button>
          </div>
          {/* <div>
            <p className="text-red-500">
              Note: You can&apos;t change this option once you make the course
              published
            </p>
          </div> */}
        </div>
      ) : (
        <p className="">
          {selected
            ? "Course is free for all"
            : cost <= 0
            ? "Please set the price for the course"
            : `This course costs  Rs. ${currencyFormater(cost)}`}
        </p>
      )}
    </div>
  );
};

export default CourseFreeField;
