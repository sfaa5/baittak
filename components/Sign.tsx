"use client";
import { useLocale, useTranslations } from "next-intl";
import BaittaklogoArabic from "./ArabicLogo";
import EnglishLogo from "./EnglishLogo";
import { signIn } from "next-auth/react";
import { useEffect, useRef } from "react";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "./ui/checkbox";
import { FaGoogle } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

function Sign({ onClose }) {
  const locale = useLocale();
  const t = useTranslations();
  const [errorr, setError] = React.useState("");
  const [message, setMessage] = React.useState(false);
  const [Sign, setSign] = React.useState("sign");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(window.location.search);



  const modalRef = useRef(null);

  let formSchema = null;
  if (Sign == "sign") {
    formSchema = z.object({
      password: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
      }),
      email: z.string().email({ message: "please enter a valid email" }),
    });
  } else if (Sign === "register") {
    // Schema for form validation
    formSchema = z.object({
      firstName: z.string().min(2, {
        message: "First Name must be at least 2 characters long.",
      }),
      lastName: z.string().min(2, {
        message: "Last Name must be at least 2 characters long.",
      }),
      phoneNumber: z.string().regex(/^\d{10,15}$/, {
        message: "Please enter a valid phone number (10-15 digits)",
      }),
      address: z.string().min(10, {
        message: "Address must be at least 10 characters long.",
      }),
      password: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
      }),
      acceptPolicy: z.boolean().refine((val) => val === true, {
        message: "You must accept the policy to proceed.",
      }),
      email: z.string().email({ message: "please enter a valid email" }),
    });
  } else if (Sign === "forget") {
    formSchema = z.object({
      email: z.string().email({ message: "please enter a valid email" }),
    });
  }

  let form = null;

  if (Sign === "sign") {
    form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  } else if (Sign === "register") {
    // Define the register form
    form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        acceptPolicy: false,
      },
    });
  } else if (Sign === "forget") {
    form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
      },
    });
  }

  useEffect(() => {
    // Event listener to close modal when clicking outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    searchParams.delete('login')


    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Values:", values);
    setError("")
    try {
      const response = await fetch(`${URL_SERVER}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
      toast({
        description: "Welcome to Baittak",
        className: "bg-green-500 text-white p-4 rounded shadow-lg",
      });

      // Parse the response if needed
      const result = await response.json();
      console.log("Response from API:", result);
    } catch (error) {
      console.error("Error during form submission:", error);

      setError(error.message);
    }
  };

  const onSubmitSign = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      toast({
        description: "Welcome",
      });

      window.location.href = "/";
    }
  };

  const onSubmitReset = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${URL_SERVER}/api/users/forget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
          throw new Error(errorData.message);
        }
        throw new Error("Failed to send data to the server");
      }

      toast({
        description: "Reset password email is sent",
      });
      onClose();
    } catch (error) {
      console.error("Error during form submission:", error);

      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {Sign === "register" ? (
        <div
          ref={modalRef}
          className="bg-white px-6 pt-8 pb-4 rounded-lg shadow-lg max-w-md w-full relative"
        >
          {/* Close Icon */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Text Description */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {t("header.signTitle")}
            </h2>
            <p className="text-gray-600 text-sm">{t("header.signDesc")}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder=" first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder=" last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder=" phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Accept Policy Field */}
              <FormField
                control={form.control}
                name="acceptPolicy"
                render={({ field }) => (
                  <FormItem className="flex items-center ">
                    <FormControl>
                      <Checkbox
                        className="ml-1"
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(!field.value);
                        }}
                      />
                    </FormControl>
                    <label className="ml-2 pb-1 text-[12px]">
                      I accept the <a href="#">Policy</a>
                    </label>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorr && <p style={{ color: "red" }}>{errorr}</p>}
              <Button className="w-full py-3" type="submit">
                Create a new account
              </Button>
            </form>
          </Form>

          {/* Google Sign-In Button */}
          <div className="space-y-4">
            <button
              onClick={() => {
                signIn("google");
              }}
              type="button"
              className="flex items-center justify-center gap-3 mt-3 bg-secondary w-full text-sm text-white  py-2 px-4 rounded-lg shadow-lg hover:bg-secondary/80 transition duration-300"
            >
              <FaGoogle className="text-lg" />
              Sign in with Google
            </button>
          </div>

          <p className="text-gray-500 font-light text-[16px] w-full text-center mt-4">
            Already have an account?
            <span
              onClick={() => {setSign("sign"); setError('')}}
              className="cursor-pointer text-primary font-semibold mx-1"
            >
              Sign-in
            </span>
          </p>
        </div>
      ) : Sign === "sign" ? (
        <div
          ref={modalRef}
          className="bg-white px-6 pt-8 pb-4 rounded-lg shadow-lg max-w-md w-full relative"
        >
          {/* Close Icon */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Text Description */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Sign-in</h2>
            <p className="text-gray-600 text-sm">
              Welcome back! Baittak website{" "}
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitSign)}
              className="space-y-6"
            >
              {/* email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-[14px] font-light">
                <p>
                  Forget password{" "}
                  <span
                    onClick={() => {setSign("forget"); setError("")}}
                    className="text-secondary cursor-pointer hover:underline"
                  >
                    Reset Here
                  </span>
                </p>
              </div>

              {errorr && <p style={{ color: "red" }}>{errorr}</p>}
              <Button disabled={loading} className="w-full py-3" type="submit">
                {loading ? "Signing..." : "Sign-in"}
              </Button>
            </form>
          </Form>

          {/* Google Sign-In Button */}
          <div className="space-y-4">
            <button
              onClick={() => {
                signIn("google");
              }}
              type="button"
              className="flex items-center justify-center gap-3 mt-3 bg-secondary w-full text-sm text-white  py-2 px-4 rounded-lg shadow-lg hover:bg-secondary/80 transition duration-300"
            >
              <FaGoogle className="text-lg" />
              Sign in with Google
            </button>
          </div>

          <div>
            <p className="text-gray-500 font-light text-[16px] w-full text-center mt-4">
              Don't you have an account?
              <span
                onClick={() => {setSign("register"); setError("") }}
                className="cursor-pointer text-primary font-semibold mx-1"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      ) : Sign === "forget" ? (
        <div
          ref={modalRef}
          className="bg-white px-6 pt-8 pb-4 rounded-lg shadow-lg max-w-md w-full relative"
        >
          {/* Close Icon */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Text Description */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Forgot password
            </h2>
            <p className="text-gray-600 text-sm">
              To reset password, please enter your email
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitReset)}
              className="space-y-6"
            >
              {/* email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorr && <p style={{ color: "red" }}>{errorr}</p>}
              <Button disabled={loading} className="w-full py-3" type="submit">
                {loading ? "Sending..." : "Send"}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <p>Unknown section</p>
      )}
    </div>
  );
}

export default Sign;
