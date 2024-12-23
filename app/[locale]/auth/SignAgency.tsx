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
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";


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
  phone: z
    .string()
    .regex(/^\d{10,15}$/, {
      message: "Please enter a valid phone number (10-15 digits)",
    }),
});

export function SignAgency() {
  const [open, setOpen] = React.useState(false);
  const [errorr,setError] =React.useState("")

const [message,setMessage] =React.useState(false)
  const  t = useTranslations("header");
  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      city: "",
      jobTitle: "",
      username:"",
      email: "",
      phone: "",
    },
  });

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Values:", values);
  
    try {
      const response = await fetch("http://localhost:5001/api/users/register/agency", {
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
  
  
      // Parse the response if needed
      const result = await response.json();
      console.log("Response from API:", result);
  
    toast({
      description: "Your request was added successfully.",
    }); 

    setMessage(true)

    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        description: "Your request was not received.",
      });
      setError(error.message)
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <div className="flex items-center  gap-2" ><FaCircleUser /> <span>{t("agent login")}</span></div> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        {message===false&&(        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
          <DialogDescription>
            Enter the details of the new admin here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>)}



{message==true?(


<div className="mt-10">
    Your data has been submitted successfully. Someone will confirm the data and email you shortly.
</div>
) : (
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
                    <Input placeholder="Enter company name" {...field} />
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
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
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
                    <Input placeholder="Enter job title" {...field} />
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
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
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
                    <Input type="email" placeholder="Enter email" {...field} />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  {errorr && <p style={{ color: "red" }}>{errorr}</p>}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
)    }
    
      </DialogContent>
    </Dialog>
  );
}
