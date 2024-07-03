import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateCourseForm from "./CreateCourseForm";

export function NewCourseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Course</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateCourseForm />
      </DialogContent>
    </Dialog>
  );
}
