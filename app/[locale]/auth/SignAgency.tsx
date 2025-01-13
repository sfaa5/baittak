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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Schema for form validation
const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company Name must be at least 2 characters long.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters long.",
  }),
  jobTitle: z.string().min(2, {
    message: "Job Title must be at least 2 characters long.",
  }),
  username: z.string().min(2, {
    message: "First Name must be at least 2 characters long.",
  }),
 
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z
    .string()
    .regex(/^\d{10,15}$/, {
      message: "Please enter a valid phone number (10-15 digits)",
    }),
     password: z.string().min(6, {
            message: "Password must be at least 6 characters long.",
          }),
});

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;


export function SignAgency() {
  const [open, setOpen] = React.useState(false);
  const [errorr,setError] =React.useState("")
  const [passwordVisible, setPasswordVisible] = React.useState(false);
const [message,setMessage] =React.useState(false)
  const [cities, setCities] = React.useState([]);
  const [loading,setLoading]=React.useState(false)
const router = useRouter()
const locale =useLocale()
  const  t = useTranslations();
  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      city: "",
      jobTitle: "",
      username:"",
      email: "",
      phoneNumber: "",
      password:"",
    },
  });


  React.useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(
          `${URL_SERVER}/api/cities`
        );
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
    setError("")
    setLoading(true)
  
    try {
      const response = await fetch(`${URL_SERVER}/api/users/register/agency`, {
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
  
  router.push("/?login=true")
form.reset()
setOpen(false)




    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        description: "Your request was not received.",
      });
      setError(error.message)
    }finally{
      setLoading(false)
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <div className="flex items-center  gap-2 cursor-pointer" ><FaCircleUser /> <span>{t("agent login")}</span></div> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        {message===false&&(        <DialogHeader>
          <DialogTitle>انضم إلى شبكة الوكلاء العقاريين المميزة</DialogTitle>
<DialogDescription>
  ابدأ رحلتك معنا اليوم! أدخل بياناتك للانضمام إلى مجتمع احترافي يفتح لك أبواب النجاح في سوق العقارات.  
</DialogDescription>
        </DialogHeader>)}




    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Name Field */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="company name" {...field} />
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
                      <FormLabel>{t("addUser.addCity")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          dir={locale === "ar" ? "rtl" : "ltr"}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={t("addUser.select")} />
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
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="job title" {...field} />
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                  <div className="relative">
          {/* Password Input */}
          <Input
            type={passwordVisible ? "text" : "password"} // Toggle between "text" and "password"
            placeholder="password"
            {...field}
          />
          {/* Toggle Button */}
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
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
                {loading ? "Sending..." : "Register"}
              </Button>
          </form>
        </Form>
  
    
      </DialogContent>
    </Dialog>
  );
}
