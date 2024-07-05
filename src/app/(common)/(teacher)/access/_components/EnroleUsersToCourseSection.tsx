"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { enrollUsersToACourseSchema } from "@/schema/zod-schemes";
import React, { useEffect } from "react";
import { CourseSelector } from "./CourseSelector";
import { Course } from "@prisma/client";
import { cn, enrollTheUsersAndSendMail } from "@/lib/utils";
import { toast } from "sonner";

interface EnroleUsersToCourseSectionProps {
  courses: Course[];
}

const EnroleUsersToCourseSection = ({
  courses,
}: EnroleUsersToCourseSectionProps) => {
  const [emails, setEmails] = React.useState<string[]>([]); // emails to be added
  const [rawEmails, setRawEmails] = React.useState<string>(""); // raw emails from textarea
  const [perfectEmails, setPerfectEmails] = React.useState<string[]>([]); // emails that are valid and can be added to db
  const [id, setId] = React.useState<string>("");

  const onSubmit = async () => {
    if (
      emails.length !== perfectEmails.length ||
      !id ||
      !perfectEmails.length
    ) {
      toast.error("check emails and select a course");
      return;
    }
    console.log(perfectEmails, id);
    await enrollTheUsersAndSendMail(
      { values: perfectEmails, courseId: id },
      "/api/teacher/add-to-course",
      "POST"
    );
  };

  useEffect(() => {
    const validEmails = emails.filter((email) => {
      const updatedEmail = email.trim();
      const isValid = enrollUsersToACourseSchema.safeParse({
        email: updatedEmail,
        courseId: "",
      });
      return isValid.success;
    });
    setPerfectEmails(validEmails);
  }, [emails]);

  return (
    <div className="space-y-3 border p-3 rounded-sm">
      <div>
        <h3 className="text-lg font-bold">Add Users to a course</h3>
        <span className="text-sm text-gray-400">
          Enrolling users to a new course (if users not exist, they will be
          created and enrolled to the course automatically)
        </span>
      </div>
      <CourseSelector courses={courses} id={id} setId={setId} />
      <Textarea
        onChange={(e) => setRawEmails(e.target.value)}
        value={rawEmails}
      />
      <div className="flex items-center justify-between">
        <Button
          variant={"destructive"}
          className="bg-red-500"
          onClick={() => {
            setRawEmails("");
            setEmails([]);
          }}
        >
          Reset
        </Button>
        <Button
          variant={"default"}
          onClick={() => {
            const upDatedemails = rawEmails
              .split(",")
              .filter((email) => email.trim() !== "");
            setEmails(upDatedemails);
          }}
        >
          See Formated Emails
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {emails.map((email) => {
          const updatedEmail = email.trim();
          const isValid = enrollUsersToACourseSchema.safeParse({
            email: updatedEmail,
            courseId: "",
          });
          if (!isValid.success) {
            return (
              <Badge key={email} className="bg-red-700 p-1">
                {email}
              </Badge>
            );
          } else {
            return (
              <Badge className="p-1" key={email}>
                {email}
              </Badge>
            );
          }
        })}
      </div>
      <div className="flex justify-end">
        <Button
          className={cn(
            (emails.length !== perfectEmails.length ||
              !id ||
              !perfectEmails.length) &&
              "bg-red-500 cursor-not-allowed hover:bg-red-500"
          )}
          onClick={onSubmit}
        >
          enroll users
        </Button>
      </div>
    </div>
  );
};

export default EnroleUsersToCourseSection;
