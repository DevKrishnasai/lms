"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Course } from "@prisma/client";

interface CourseSelectorProps {
  courses: Course[];
  id: string;
  setId: (value: string) => void;
}

export function CourseSelector({ courses, setId, id }: CourseSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const courseValues = courses.map((course) => ({
    value: course.title.toLowerCase(),
    label: course.title,
    id: course.id,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? courseValues.find((course) => course.value === value)?.label
            : "Select course..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search course..." className="h-9" />
          <CommandList>
            <CommandEmpty>No course found.</CommandEmpty>
            <CommandGroup>
              {courseValues.map((course) => (
                <CommandItem
                  key={course.value}
                  value={course.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setId(currentValue === value ? "" : course.id);
                    setOpen(false);
                  }}
                >
                  {course.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === course.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
