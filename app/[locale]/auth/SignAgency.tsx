"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCircleUser } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

export function SignAgency() {
  const [open, setOpen] = React.useState(false);
  const [errorr, setError] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [cities, setCities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const tE = useTranslations("erorr");


// Schema for form validation
const formSchema = z.object({
  companyName: z.string().min(2, {
    message: tE("Company_Name_must_be_at_least_2_characters_long"),

  }),
  city: z.string().min(2, {
    message: tE("City_is_rquired"),
  }),
  jobTitle: z.string().min(2, {
    message: tE("Job_Title_must_be_at_least_2_characters_long"),
  }),
  username: z.string().min(2, {
    message: tE("First_Name_must_be_at_least_2_characters long"),
  }),
  email: z.string().email({
    message: tE("Please_enter_a_valid_email_address"),
  }),
  phoneNumber: z.string().regex(/^\d{10,15}$/, {
    message: tE("Please_enter_a_valid_phone_number_(10-15_digits)"),
  }),
  password: z.string().min(6, {
    message: tE("Password_must_be_at_least_6_characters_long"),
  }),
});

  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      city: "",
      jobTitle: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  React.useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`${URL_SERVER}/api/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }
    fetchCities();
  }, []);

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Values:", values);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${URL_SERVER}/api/auth/register/agency`, {
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

      router.push("/?login=true");
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        description: "Your request was not received.",
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <div className="flex items-center gap-2 cursor-pointer">
      <FaCircleUser /> <span>{t("signAgency.header.agentLogin")}</span>
    </div>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px] bg-white">
    {message === false && (
      <DialogHeader>
        <DialogTitle>{t("signAgency.dialog.agent_network_title")}</DialogTitle>
        <DialogDescription>
          {t("signAgency.dialog.agent_network_description")}
        </DialogDescription>
      </DialogHeader>
    )}

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Name Field */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("signAgency.dialog.companyName_placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City Field */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("signAgency.addUser.select")} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city, index) => (
                      <SelectItem key={index} value={city._id}>
                        {locale === "ar" ? city.name.ar : city.name.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Title Field */}
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("signAgency.dialog.jobTitle_placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First Name Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("signAgency.dialog.name_placeholder")} {...field} />
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
                <Input type="email" placeholder={t("signAgency.dialog.email_placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder={t("signAgency.dialog.phone_placeholder")} {...field} />
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
                <div className="relative">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder={t("signAgency.dialog.password_placeholder")}
                    {...field}
                  />
                  <button
                    type="button"
                    className={`${locale==="ar"?"left-2":"right-2"} absolute inset-y-0  pr-3 flex items-center text-gray-500`}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorr && <p style={{ color: "red" }}>{errorr}</p>}
        <Button disabled={loading} className="w-full py-3" type="submit">
          {loading ? t("signAgency.register_buttonn") : t("signAgency.dialog.register_button")}
        </Button>
      </form>
    </Form>
  </DialogContent>
</Dialog>

  );
}
