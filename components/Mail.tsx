"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import { IoMailOutline } from "react-icons/io5";

import { toast } from "@/hooks/use-toast";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface MailProps {
  title?: string;
  ownerEmail?: string;
}

export function Mail({ ownerEmail, title }: MailProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const locale =useLocale()

  const pathname = usePathname();
  const t = useTranslations("inputs");
  const tE = useTranslations("erorr");

  console.log("emailll", ownerEmail);
  console.log("titele", title);

  // Schema for form validation
  const formSchema = z.object({
    name: z.string().min(2, {
      message: tE("First_Name_must_be_at_least_2_characters long"),
    }),
    email: z.string().email({
      message: tE("Please_enter_a_valid_email_address"),
    }),
    message: z.string().min(10, {
      message: tE("Message_must_be_at_least_10 _haracters_long"),
    }),
    phone: z.string().regex(/^\d{10,15}$/, {
      message: tE("Please_enter_a_valid_phone_number_(10-15_digits)"),
    }),
    ownerEmail: z.string().optional(),
    title: z.string().optional(),
  });

  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
      ownerEmail: "",
      title: title,
    },
  });



  useEffect(()=>{
    form.reset({
      title:title,
   
    });
  },[form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log("Form Values:", values);
    console.log(ownerEmail);
    values.ownerEmail = ownerEmail;
    values.title = title;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      toast({
        description: "Email sent succussfuly",
        className: "bg-green-500 text-white p-4 rounded shadow-lg",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        description: "faild to send email",
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
    } finally {
      form.reset()
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger the Dialog */}
      <DialogTrigger asChild>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(true);
          }}
          className={`${
            pathname.includes("Agency") || pathname.includes("userListing")
              ? " hover:bg-gray-100  flex w-full h-[48px] gap-2 bg-white items-center font-medium text-secondary rounded-[.8rem] border-[1px]   px-4"
              : "flex w-full bg-white  hover:bg-gray-100 gap-2 h-[45px] item font-semibold border-secondary border-[1px] bg-opacity-25 text-secondary rounded-[.8rem] justi px-3"
          }`}
        >
          <IoMailOutline className="w-4 h-4" />
          {t("Mail")}
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className={`${locale==="ar"&&"mx-4"}`}>
          <DialogTitle>{t("Send Mail")}</DialogTitle>
          <DialogDescription>
            {t("Enter_the_details_below_to_send_an_email")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("Enter name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("Enter email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder={t("Enter message")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("Enter phone number")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading} type="submit">
                {" "}
                {loading ? t("sending") : t("Send")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default Mail;
