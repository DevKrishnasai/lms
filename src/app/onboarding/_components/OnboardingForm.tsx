"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateOnboarding } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OnboardingFormProps {
  categories: string[];
  learningGoals: string[];
  roles: string[];
  id: string;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  categories,
  learningGoals,
  roles,
  id,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [role, setRole] = useState<string>("Student");
  const [bio, setBio] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    message: string;
    field: "category" | "goal" | "role" | "bio" | "";
  }>({
    message: "",
    field: "",
  });

  const router = useRouter();

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    if (selectedCategories.length > 1) {
      setError({
        message: "",
        field: "",
      });
    }
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
    if (selectedGoals.length > 1) {
      setError({
        message: "",
        field: "",
      });
    }
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      setError({
        message: "Please select at least one category",
        field: "category",
      });
      return;
    } else if (selectedGoals.length === 0) {
      setError({
        message: "Please select at least one goal",
        field: "goal",
      });
      return;
    } else if (role === "") {
      setError({
        message: "Please select a role",
        field: "role",
      });
      return;
    } else if (bio === "") {
      setError({
        message: "Please give a brief bio about yourself",
        field: "bio",
      });
      return;
    }
    setError({
      message: "",
      field: "",
    });

    setLoading(true);

    toast.loading("Updating your profile...", {
      id,
    });

    await updateOnboarding({
      selectedCategories,
      selectedGoals,
      bio,
      role: role === "Student" ? "STUDENT" : "TEACHER",
    });

    setLoading(false);

    router.replace("/dashboard");

    toast.success("redirecting to dashboard...", {
      id,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-4 ">Your Interests</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
      </div>
      {error.field === "category" && (
        <div className="text-red-500 text-sm mt-2">{error.message}</div>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-4 ">Learning Goals</h2>
        <div className="grid grid-cols-2 gap-4">
          {learningGoals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={selectedGoals.includes(goal)}
                onCheckedChange={() => toggleGoal(goal)}
              />
              <Label htmlFor={goal}>{goal}</Label>
            </div>
          ))}
        </div>
      </div>
      {error.field === "goal" && (
        <div className="text-red-500 text-sm mt-2">{error.message}</div>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-4 ">Role</h2>
        <RadioGroup onValueChange={setRole} className="flex space-x-4">
          {roles.map((r) => (
            <div key={r} className="flex items-center space-x-2">
              <RadioGroupItem value={r} id={r} checked={role === r} />
              <Label htmlFor={r}>{r}</Label>
            </div>
          ))}
        </RadioGroup>
        {role === "Student" ? (
          <div className="text-red-500 text-sm mt-2">
            Note: As a student, you will have access to courses and learning
            materials.
          </div>
        ) : (
          <div className="text-red-500 text-sm mt-2">
            Note: As a teacher, you will have access to create and manage
            courses and learning materials.
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Bio</h2>
        <Textarea
          placeholder="Tell us a bit about yourself and your learning aspirations..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full"
        />
      </div>
      {error.field === "bio" && (
        <div className="text-red-500 text-sm mt-2">{error.message}</div>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : "Start My Learning Journey"}
      </Button>
    </form>
  );
};

export default OnboardingForm;
