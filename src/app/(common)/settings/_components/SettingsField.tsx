"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
interface SettingsFieldProps {
  user: User;
}
const SettingsField = ({ user }: SettingsFieldProps) => {
  const [name, setName] = React.useState(user.name || "");
  const onSubmit = async () => {
    toast.loading("Updating settings", {
      id: "update-settings",
    });
    const res = await axios.patch("/api/student/update/settings", {
      name,
    });
    if (res.status === 200) {
      toast.success("Settings updated successfully", {
        id: "update-settings",
      });
    } else {
      toast.error("Failed to update settings", {
        id: "update-settings",
      });
    }
  };
  return (
    <>
      <div className="space-y-5 w-full lg:w-[50%]">
        <div className="flex items-center gap-3">
          <h3 className="w-32">Username</h3>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <h3 className="w-32">Email</h3>
          <Input value={user.email || ""} disabled />
        </div>
        <div className="flex items-center gap-3">
          <h3 className="w-32">Role</h3>
          <Input value={user.role || ""} disabled />
        </div>
        <div className="flex items-center gap-3">
          <h3 className="w-32">Created At</h3>
          <Input
            disabled
            value={user.createdAt.toLocaleDateString("en-US") || ""}
          />
        </div>
      </div>
      <div className="flex w-[50%] justify-end items-center">
        <Button onClick={onSubmit} disabled={user.name === name}>
          Save
        </Button>
      </div>
    </>
  );
};

export default SettingsField;
