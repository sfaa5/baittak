"use client";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

const FormReq = ({ agencyy, _id, phoneNumber, title, url }) => {
  const [loading, setLoading] = useState(false);

  const t = useTranslations();
  const tE = useTranslations("erorr");
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  // Schema for form validation
  const formSchema = z.object({
    name: z.string().min(2, {
      message: tE("First_Name_must_be_at_least_2_characters long"),
    }),

    phone: z.string().regex(/^\d{10,15}$/, {
      message: tE("Please_enter_a_valid_phone_number_(10-15_digits)"),
    }),

    email: z
      .string()
      .email({ message: tE("Please_enter_a_valid_email_address") })
      .min(2, { message: "Email must be at least 2 characters long." }),

    message: z.string().min(6, {
      message: tE("Message_must_be_at_least_6_characters_long"),
    }),
    project: z.string().optional(),
    agency: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Values:", values);
    setLoading(true);
    try {
      values.project = _id;
      values.agency = agencyy;
      const response = await fetch(`${URL_SERVER}/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the server");
      }

      toast({
        description: "Your request was added successfully.",
      });
    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        description: "Your request was not received.",
      });
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <div className="xl:flex flex-col gap-5 w-[35%] p-5 shadow-lg rounded-[0.6rem] hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full flex gap-3 items-center bg-gray-200 p-3 rounded-[0.6rem]">
            {url ? (
              <img
                src={url}
                alt="company"
                className="w-14 rounded-sm sm:w-10"
              />
            ) : (
              <img
                src="/company/unknown.png"
                alt="company"
                className="w-14 rounded-sm sm:w-10"
              />
            )}
            <p className="text-secondary font-medium text-sm">{title}</p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="w-full border-gray-400 border-[1px] text-sm rounded-[0.6rem] text-gray-700 p-4"
                    placeholder={t("Project.Name")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="w-full border-gray-400 border-[1px] rounded-[0.6rem] text-gray-700 text-sm p-4"
                    placeholder={t("Project.phone")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="w-full border-gray-400 border-[1px] rounded-[0.6rem] text-gray-700 text-sm p-4"
                    placeholder={t("Project.email")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    className="w-full resize-none border-gray-400 h-28 border-[1px] rounded-[0.6rem] text-gray-700 text-sm p-4"
                    placeholder={t("Project.hello i am")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full grid grid-cols-2 gap-4 ">
            <button
              type="submit"
              disabled={loading}
              className="rounded-[0.6rem] p-4 text-sm bg-secondary text-white font-semibold"
            >
              {loading ? "Submitting..." : t("Project.request details")}
            </button>

            <button
              type="button"
              onClick={() => setShowPhoneNumber(true)}
              className="rounded-[0.6rem] p-4 text-sm bg-primary text-white font-semibold"
            >
              {showPhoneNumber ? phoneNumber : t("Project.CALL NOW")}
            </button>
          </div>
        </form>
      </Form>{" "}
    </div>
  );
};

export default FormReq;
