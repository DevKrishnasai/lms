"use client";
import React, { useEffect } from "react";
import QueryCard from "./QueryCard";
import Loading from "@/components/Loading";
import { Status } from "@prisma/client";
import { getQueries, QueryType } from "../actions";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QueriesSection = () => {
  const [type, setType] = React.useState<Status>("IN_PROGRESS");
  const [studentQueries, setStudentQueries] = React.useState<
    QueryType[] | null
  >(null);

  useEffect(() => {
    const getQ = async () => {
      const data = await getQueries(type);
      setStudentQueries(data);
    };
    getQ();
  }, [type]);

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Resolve</h1>
          <p className="mb-4 text-sm text-gray-600">
            (Resolve or reject student queries here)
          </p>
        </div>
        <div>
          <Select value={type} onValueChange={(t: Status) => setType(t)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a action filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Actions</SelectLabel>
                <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {studentQueries ? (
        studentQueries.length === 0 ? (
          <div className="h-[calc(100vh-200px)] w-full flex flex-col justify-center items-center font-bold">
            No queries found
            <p className="text-sm font-medium">(look after sometime)</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentQueries.map((query) => (
              <QueryCard
                key={query.id}
                query={query}
                type={type}
                setStudentQueries={setStudentQueries}
              />
            ))}
          </div>
        )
      ) : (
        <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default QueriesSection;
