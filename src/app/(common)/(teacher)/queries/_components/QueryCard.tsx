"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getQueries } from "../actions";

const QueryCard = ({ query, setStudentQueries, type }: any) => {
  const router = useRouter();
  const getQ = async () => {
    const data = await getQueries(type);
    setStudentQueries(data);
  };
  const onClick = async () => {
    toast.loading("Resolving query...", {
      id: query.id,
    });
    try {
      const res = await axios.put(`/api/teacher/queries/${query.id}`, {
        status: query.status,
      });
      if (res.status === 200) {
        toast.success("Query resolved successfully", {
          id: query.id,
        });
        await getQ();
      } else {
        toast.warning("Failed to resolve query", {
          id: query.id,
        });
      }
    } catch (error) {
      toast.error("Failed to resolve query", {
        id: query.id,
      });
    }

    router.refresh();
  };
  return (
    <div className="border shadow-md rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">{query.user.name}</h2>
          <p className="text-sm text-gray-600">{query.user.email}</p>
        </div>
        <span className="px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
          {query.status}
        </span>
      </div>
      <p className="text-gray-700 mb-4">{query.message}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Phone: {query.phone}</span>
        <span>Created: {new Date(query.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="mt-10">
        {query.status === "IN_PROGRESS" ? (
          <Button
            //   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={onClick}
          >
            Resolve
          </Button>
        ) : (
          <Button
            //   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={onClick}
          >
            Make It Unresolved
          </Button>
        )}
      </div>
    </div>
  );
};

export default QueryCard;
