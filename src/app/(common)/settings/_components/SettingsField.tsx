"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Role, User } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Fileupload from "@/components/Fileupload";
import { useRouter } from "next/navigation";
import { onboarding } from "../actions";

interface SettingsFieldProps {
  user: User;
}

const SettingsField = ({ user }: SettingsFieldProps) => {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [role, setRole] = useState<Role>(user.role);
  const [signature, setSignature] = useState(user.signature || "");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      let roleChange = false;
      if (user.role === "STUDENT") {
        if (name === "") {
          toast.error("Name is required");
          return;
        }
        if (bio === "") {
          toast.error("Bio is required");
          return;
        }
        if (role === "TEACHER") {
          if (signature === "") {
            toast.error("Signature is required");
            return;
          }
          roleChange = true;
        }

        toast.loading("Updating settings", { id: "update-settings" });
        const res = await axios.put("/api/student/update/settings", {
          name,
          bio,
          roleChange,
          signature,
        });
        if (res.status === 200) {
          toast.success("Settings updated successfully", {
            id: "update-settings",
          });
          if (roleChange) {
            await onboarding();
            toast.success("You are now a teacher", {
              id: "update-settings",
            });
          }
          router.refresh();
        } else {
          throw new Error("Failed to update settings");
        }
      } else {
        if (name === "") {
          toast.error("Name is required");
          return;
        }
        if (bio === "") {
          toast.error("Bio is required");
          return;
        }
        if (signature === "") {
          toast.error("Signature is required");
          return;
        }
        toast.loading("Updating settings", { id: "update-settings" });
        const res = await axios.put("/api/student/update/settings", {
          name,
          bio,
          roleChange: true,
          signature,
        });
        if (res.status === 200) {
          toast.success("Settings updated successfully", {
            id: "update-settings",
          });
          router.refresh();
        } else {
          throw new Error("Failed to update settings");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update settings", { id: "update-settings" });
    }
  };

  const isChanged =
    name !== user.name ||
    bio !== user.bio ||
    role !== user.role ||
    (user.role === "TEACHER" && signature !== user.signature);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="space-y-5 w-full lg:w-1/2">
        <div className="flex flex-col gap-3">
          <h3 className="w-32">Username</h3>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="w-32">Email</h3>
          <Input value={user.email || ""} disabled />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="w-32">Role</h3>
          {/* <Input value={user.role || ""} disabled={user.role === "TEACHER"} /> */}
          <Select
            value={role}
            onValueChange={(v) => setRole(v as Role)}
            disabled={user.role === "TEACHER"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="ROLE" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STUDENT">STUDENT</SelectItem>
              <SelectItem value="TEACHER">TEACHER</SelectItem>
            </SelectContent>
          </Select>
          {user.role === "STUDENT" && role === "TEACHER" && (
            <div className="text-red-500 text-sm mt-2">
              Note: you cannot change your role to student once you are a
              teacher
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="w-32">Joined on</h3>
          <Input
            disabled
            value={user.createdAt.toLocaleDateString("en-US") || ""}
          />
        </div>
      </div>
      <div className="space-y-5 w-full lg:w-1/2">
        <div className="flex flex-col gap-3">
          <h3>Bio </h3>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder={
              role === "STUDENT"
                ? "Tell us about yourself"
                : "As a teacher, tell us about your teaching experience and qualifications "
            }
          />
          {role === "TEACHER" ? (
            <p className="text-sm text-gray-600">
              This bio will be displayed on your profile page and will be
              visible to students who enroll in your courses
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              This bio will be displayed on your profile page and will be
              visible to teachers and students
            </p>
          )}
        </div>
        {role === "TEACHER" && (
          <div className="flex flex-col gap-3">
            <h3>Signature </h3>
            <div className="w-full flex justify-center items-center">
              {signature ? (
                <div
                  className="border-1 p-1 hover:bg-slate-500"
                  onClick={() => {
                    setSignature("");
                  }}
                >
                  <img
                    src={signature}
                    alt="signature"
                    className="h-44 object-cover"
                  />
                </div>
              ) : (
                <div className="w-full border flex justify-center items-center flex-col-reverse">
                  {user.signature && (
                    <Button
                      className="mb-4"
                      variant={"outline"}
                      onClick={() => {
                        setSignature(user.signature || "");
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Fileupload
                    endpoint="uploadBasicStuff"
                    onChange={(url) => {
                      setSignature(url);
                    }}
                  />
                </div>
              )}
            </div>

            {
              <p className="text-sm text-gray-600">
                This signature will be used in the certificates issued to your
                students on course completion. <br /> Please upload a clear
                image of a signature (PNG, JPEG, JPG only) on a white background
                only
              </p>
            }
          </div>
        )}
        <div className="flex justify-end items-center mt-4">
          <Button onClick={onSubmit} disabled={!isChanged}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsField;
