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
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/hooks/use-toast";
import { CiFlag1 } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Report({ propertyId, open, setOpen }) {
  const tE = useTranslations("erorr");
  const t = useTranslations("inputs");
  const r = useTranslations("report");
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const locale =useLocale();
  const router =useRouter();
  const {status}=useSession()
  

  // Schema for form validation
  const formSchema = z.object({
    message: z.string().min(10, {
      message: tE("Message_must_be_at_least_10 _haracters_long"),
    }),
  });

  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const response = await axiosAuth.post(
        `${process.env.NEXT_PUBLIC_URL_SERVER}/api/reports`,
        { propertyId, message: values.message }
      );

      if (response.status !== 201) {
        throw new Error("Failed to fetch user data");
      }

      toast({
        description: "Report sent succussfuly",
        className: "bg-green-500 text-white p-4 rounded shadow-lg",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        description: "Faild to send report",
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
    } finally {
      setLoading(false);
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          onClick={(e) => {
         if( status==="unauthenticated"){router.push("/?login=true")}
            
            e.stopPropagation();
            e.preventDefault();
            setOpen(true);
          }}
          className={`${"flex w-full  hover:bg-gray-100 gap-2 h-[45px] item font-semibold bg-white border-secondary border-[0.5px] bg-opacity-25 text-secondary rounded-[.8rem] justi px-3"}`}
        >
        
          <CiFlag1 />
          
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className={`${locale==="ar"&&"mx-4"}`}>
          <DialogTitle>{r("title")}</DialogTitle>
          <DialogDescription>
          {r("description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <DialogFooter>
              <Button disabled={loading} type="submit">
                {loading ? t("sending") : t("Send")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default Report;
