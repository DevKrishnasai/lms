"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updatePaymentStatus } from "../actions";

const formSchema = z.object({
  name: z.string().min(1, "Full name is required").max(50, "Name is too long"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(100, "Address is too long"),
});

type FormInputs = z.infer<typeof formSchema>;

interface FormForCheckOutProps {
  price: number;
  courseId: string;
  isAuthor: boolean;
}

const FormForCheckOut: React.FC<FormForCheckOutProps> = ({
  price,
  courseId,
  isAuthor,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const checkout = async (details: FormInputs) => {
    toast.loading("loading payment gateway...", {
      id: "payment",
    });
    try {
      const res = await initializeRazorpay();

      if (!res) {
        throw new Error("Failed to load Razorpay");
      }

      const { data, status, statusText } = await axios.post("/api/razorpay", {
        ...details,
        courseId,
      });

      if (status === 201) {
        if (data.isFree) {
          toast.success("Course is now your's", {
            id: "payment",
          });
          toast.loading("Redirecting to course page...", {
            id: "loading-1",
          });
          router.push(`/course/${courseId}`);
          toast.success("Happy learing...", {
            id: "loading-1",
          });
          return;
        }
        toast.success("Payment gateway loaded", {
          id: "payment",
        });
        var options = {
          key: process.env.RAZORPAY_KEY,
          name: "YourLMS",
          currency: "INR",
          amount: data.price,
          order_id: data.orderId,
          description: `Payment for ${data.courseName} course`,
          image: "/next.svg",
          handler: async function (response: {
            razorpay_payment_id: any;
            razorpay_order_id: any;
            razorpay_signature: any;
          }) {
            toast.success("Payment successful ", {
              id: "payment",
            });

            toast.loading("making this course your's...", {
              id: "loading-1",
            });

            await updatePaymentStatus(
              data.id,
              response.razorpay_payment_id,
              data.emailDetails
            );

            toast.success("Now the course is your's", {
              id: "loading-1",
            });

            toast.loading("Redirecting to course page...", {
              id: "loading-2",
            });

            router.push(`/course/${courseId}`);

            toast.success("Happy learning...", {
              id: "loading-2",
            });
          },
          prefill: {
            name: data.name,
            email: data.email,
          },
        };
        // @ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function () {
          toast.error("Payment failed. Please try again.", {
            id: "payment",
          });
        });
      } else {
        toast.error(statusText, {
          id: "payment",
        });
      }
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error) && error.response && error.response.data) {
        toast.warning(error.response.data.message || "something went wrong", {
          id: "payment",
        });
      } else {
        toast.error("Payment failed (refresh)", {
          id: "payment",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(checkout)}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          placeholder="Full name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Address
        </label>
        <input
          {...register("address")}
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          placeholder="Full address"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-2">{errors.address.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full py-3 text-lg bg-indigo-600 hover:bg-indigo-700"
        disabled={isAuthor}
      >
        Complete Purchase
      </Button>
      <div className="text-center mt-3">
        {isAuthor && (
          <p className="text-red-700">
            You can&apos;t purchase your own course.
          </p>
        )}
      </div>
    </form>
  );
};

export default FormForCheckOut;
