"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,

  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";



   const formSchema = z.object({
      password: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
      }),
    });


const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations()

  const { data: session, status: sessionStatus } = useSession();

  const params = useParams<{ token: string }>();
  console.log(params);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await fetch(`${URL_SERVER}/api/users/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: params.token }),
        });

        if (!response.ok) {
          setVerified(true);
          const errorData = await response.json();
          if (errorData.message) {
            throw new Error(errorData.message);
          }
          throw new Error("Failed to send data to the server");
        }
        setError("");
        setVerified(true);
        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        console.error("Error during form submission:", error);

        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [params.token]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/User");
    }
  }, [sessionStatus, router]);



    // Submit handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log("Form Values:", values);
      setError("")
      try {
        const response = await fetch(`${URL_SERVER}/api/users/resetPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password:values.password,
            email:user?.email,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.message) {
            throw new Error(errorData.message);
          }
          throw new Error("Failed to send data to the server");
        }

        form.reset();
        setError("");
        router.push("/?login=true")
    
        toast({
          description: "your password reset Successfuly",
          className: "bg-green-500 text-white p-4 rounded shadow-lg",
        });
  

      } catch (error) {
        console.error("Error during form submission:", error);
  
        setError("something went wrong");
      }
    };
  

    
  if (sessionStatus === "loading") {
    return  <div className="flex items-center justify-center h-screen">
    <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
  </div>;
  }

  return (
<div className="my-52">
  {/* Header Section */}
  <div className="text-center mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-2">{t("sign.reset_password.title")}</h2>
    <p className="text-gray-600">{t("sign.reset_password.description")}</p>
  </div>

  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-md mx-auto"
    >
      {/* Password Field */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="password"
                placeholder={t("sign.reset_password.password_placeholder")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Submit Button */}
      <Button
        disabled={error.length > 0}
        className={`w-full py-3 mt-6 rounded-lg text-white ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-secondary hover:bg-secondary/90"
        }`}
        type="submit"
      >
        {loading ? "Sending..." : t("sign.reset_password.reset_button")}
      </Button>

      {/* Error/Success Messages */}
      {error && (
        <p className="text-center mt-4 text-red-500 text-sm">
          {t("sign.reset_password.error_message")}
        </p>
      )}
      {!error && !loading && (
        <p className="text-center mt-4 text-green-500 text-sm">
          {t("sign.reset_password.success_message")}
        </p>
      )}
    </form>
  </Form>
</div>


  );
};

export default Page;
