"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requestFormSchema } from "@/schema/zod-schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { set, z } from "zod";

const RequestForm = () => {
  const [ok, setOk] = useState(false);
  const form = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      email: "",
      request: "",
    },
  });

  const {
    formState: { errors },
  } = form;
  const sendRequest = async (data: z.infer<typeof requestFormSchema>) => {
    setOk(false);
    toast.loading("Sending request", {
      id: "requesting",
    });
    const response = await axios.post("/api/student/request", data);
    if (response.status === 200) {
      form.reset();
      toast.success("Request sent successfully", {
        id: "requesting",
      });
      setOk(true);
    } else {
      toast.error("Failed to send request", {
        id: "requesting",
      });
      setOk(false);
    }
  };
  return (
    <form
      className="space-y-4 max-w-xl"
      onSubmit={form.handleSubmit(sendRequest)}
    >
      <div className="flex gap-2 items-center">
        <p className="w-36">Your Ph.NO</p>
        <Input
          placeholder="Enter your phone number"
          {...form.register("phone")}
        />
      </div>
      {errors.phone && (
        <p className="text-red-500 text-sm text-right">
          {errors.phone.message}
        </p>
      )}
      <div className="flex gap-2 items-center">
        <p className="w-36">Your Email</p>
        <Input placeholder="Enter your email" {...form.register("email")} />
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm text-right">
          {" "}
          {errors.email.message}{" "}
        </p>
      )}
      <div className="flex gap-2 items-center">
        <p className="w-36"> Your Request</p>
        <Textarea
          placeholder="Enter your request briefly"
          {...form.register("request")}
        />
      </div>
      {errors.request && (
        <p className="text-red-500 text-sm text-right">
          {" "}
          {errors.request.message}{" "}
        </p>
      )}
      <div className="flex items-center justify-between">
        <p className="text-green-500 text-sm text-right">
          {ok ? "Our team will contact you soon" : ""}
        </p>

        <Button>Send Request</Button>
      </div>
    </form>
  );
};

export default RequestForm;
