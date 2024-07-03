import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormater(num: number) {
  return new Intl.NumberFormat("en-IN").format(num);
}

export async function updateTheField<T>(
  values: T,
  path: string,

  type: "PATCH" | "PUT" | "POST" | "DELETE" = "PATCH",
  isChapter = false
) {
  const id = isChapter ? "chapter" : "course";
  toast.loading(`Updating ${id}...`, {
    id: "update",
  });
  try {
    let res;
    if (type === "PATCH") {
      res = await axios.patch(path, values);
    } else if (type === "PUT") {
      res = await axios.put(path, values);
    } else if (type === "POST") {
      res = await axios.post(path, values);
    } else {
      res = await axios.delete(path);
    }
    if (res.status === 201 || res.status === 200) {
      toast.success(`${id} updated successfully`, {
        id: "update",
      });
    } else {
      toast.error(`Failed to update ${id} `, {
        id: "update",
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      toast.error(error.response.data.message || "something went wrong", {
        id: "update",
      });
    } else {
      toast.error("An unexpected error occurred", {
        id: "update",
      });
    }
  }
}

export async function generatePasswordsAndSendMails<T>(
  values: T,
  path: string,
  type: "PATCH" | "PUT" | "POST" | "DELETE"
) {
  const id = "passwords";
  toast.loading(`generating ${id} for given mails...`, {
    id: "update",
  });
  try {
    let res;
    if (type === "PATCH") {
      res = await axios.patch(path, values);
    } else if (type === "PUT") {
      res = await axios.put(path, values);
    } else if (type === "POST") {
      res = await axios.post(path, values);
    } else {
      res = await axios.delete(path);
    }
    if (res.status === 201 || res.status === 200) {
      toast.success(`mails with username and ${id} sent`, {
        id: "update",
      });
    } else {
      toast.error(`Failed to send emails and ${id} `, {
        id: "update",
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      toast.error(error.response.data.message || "something went wrong", {
        id: "update",
      });
    } else {
      toast.error("An unexpected error occurred", {
        id: "update",
      });
    }
  }
}
