"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

// Schema for form validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: "First Name must be at least 2 characters long.",
  }),

  phoneNumber: z.string().regex(/^\d{10,15}$/, {
    message: "Please enter a valid phone number (10-15 digits)",
  }),
});

function UpdateUser() {
  const { data: session, status } = useSession();
  const [errorr, setError] = React.useState("");

  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    form.reset({
      username: session?.user.name || "",
      phoneNumber: session?.user.phoneNumber || "",
    });
  }, [session]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingButton(true);
    console.log("Form Values:", values);

    console.log( values.username === session?.user.name)
    console.log( values.phoneNumber === session?.user.phoneNumber)

    if (
      values.username === session?.user.name &&
      values.phoneNumber === session?.user.phoneNumber
    ) {
      setError("you didn`t change something"); 
         setLoadingButton(false)
      return
  
    }

    try {
      const response = await fetch(
        `${URL_SERVER}/api/users/${session?.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

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

      setLoadingButton(false);

      toast({
        description: "Your request was added successfully.",
      });
      
    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        description: "Your request was not received.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="absolute right-3 top-3 text-xs py-1 bg-inherit border-primary hover:bg-primary/50 text-secondary px-3 "
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 py-4">
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
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />  
                        {errorr && <p  style={{ color: "red" }}>{errorr}</p>}
            </div>
            <DialogFooter>
  

              <Button type="submit" disabled={loadingButton}>
                {loadingButton ? "Submitting..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateUser;
