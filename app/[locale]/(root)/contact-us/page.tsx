"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { isValidPhoneNumber } from "@/lib/utils";
import axios from "axios";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

function ContactUs() {
  const t = useTranslations("contact-us");
  const T = useTranslations("");
  const tE = useTranslations("erorr");
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const [data, setData] = useState({
    emails: {
      info: "",
    },
    contact: {
      phone: "",
      address: "",
    },
  });

  console.log(data.emails.info);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_SERVER}/api/contact`
        );

        const data = await response.json();

        setData(data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  // Schema for form validation
  const formSchema = z.object({
    username: z.string().min(2, {
      message: tE("First_Name_must_be_at_least_2_characters long"),
    }),

    phoneNumber: z.string().refine((value) => isValidPhoneNumber(value), {
      message: tE("Please_enter_a_valid_phone_number_(10-15_digits)"),
    }),

    email: z
      .string()
      .email({ message: tE("Please_enter_a_valid_email_address") })
      .min(2, { message: "Email must be at least 2 characters long." }),

    message: z.string().min(6, {
      message: tE("Message_must_be_at_least_6_characters_long"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      username: "",
      email: "",
      phoneNumber: "",
    },
  });

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Values:", values);
    setLoading(true);
    try {
      const response = await fetch(`${URL_SERVER}/api/requests/Send`, {
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
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 2xl:px-[120px]">
        <div className=" mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-secondary">
            {t("title")}
          </h2>
          <p className="mt-4 text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">
              {t("contactInfo.title")}
            </h3>

            <p className="text-gray-600 mb-4">{t("contactInfo.description")}</p>
            <div className="flex flex-col gap-2">
              <p className="text-gray-600">
                <strong>{t("contactInfo.emailLabel")}:</strong>{" "}
                {data.emails?.info}
              </p>
              <p className="text-gray-600">
                <strong>{t("contactInfo.phoneLabel")}:</strong>{" "}
                {data.contact?.phone}
              </p>
              <p className="text-gray-600">
                <strong>{t("contactInfo.addressLabel")}:</strong>{" "}
                {data.contact?.address}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">
              {t("form.title")}
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-full border-gray-400  focus:outline-none focus:ring-1 focus:ring-primary border-[1px] text-sm rounded-[0.6rem] text-gray-700 p-4 "
                          placeholder={t("form.nameLabel")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="" {...field}>
                      <FormControl>
                        <PhoneInput
                          dir={`${locale === "ar" ? "rtl" : "ltr"}`}
                          international
                          defaultCountry="US"
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
                        <Input
                          className="w-full border-gray-400 border-[1px] rounded-[0.6rem] text-gray-700 text-sm p-4 focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder={t("form.emailLabel")}
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
                        <Textarea
                          rows={2}
                          className="w-full min-h-[50px] resize-none border-gray-400  h-28 border-[1px] rounded-[0.6rem] text-gray-700 text-sm p-4 focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder={t("form.messageLabel")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  size="sm"
                  type="submit"
                  disabled={loading}
                  className="rounded-[0.6rem] p-4 text-sm bg-secondary hover:bg-secondary/80 text-white font-medium"
                >
                  {loading ? t("form.Submitting") : t("form.submitButton")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
