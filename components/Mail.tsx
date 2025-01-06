"use client"
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
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Textarea } from "./ui/textarea";
  import { Input } from "./ui/input";
  import { useState } from "react";
  import { IoMailOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Description } from "@radix-ui/react-toast";
import { toast } from "@/hooks/use-toast";

import { usePathname } from "next/navigation";

  
  // Schema for form validation
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters long.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
      message: "Message must be at least 10 characters long.",
    }),
    phone: z.string().regex(/^\d{10,15}$/, {
      message: "Please enter a valid phone number (10-15 digits)",
    }),
    ownerEmail: z.string().optional(),
    title: z.string(),
  });
  
  interface MailProps {
    title?: string;
    ownerEmail?:string;
  
  }
  
  export function Mail({ title,ownerEmail }: MailProps) {
    const [open, setOpen] = useState(false);

      const { data: session } = useSession();
      const pathname = usePathname();
    
  
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
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log("Form Values:", values);
console.log(ownerEmail)
   values.ownerEmail = ownerEmail ;
   values.title = title;

        

    try {
      const response = await fetch("http://localhost:5001/api/email", {
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
        className: 'bg-green-500 text-white p-4 rounded shadow-lg',
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        description: "faild to send email",
        className: 'bg-red-500 text-white p-4 rounded shadow-lg',
      });
    } finally {
      setOpen(false);
    }
  };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger the Dialog */}
        <DialogTrigger asChild>
          <Button
            type="button"
            className={`${pathname.includes('Agency')? " hover:bg-gray-100 flex w-auto h-[48px] gap-2 bg-white items-center font-medium text-secondary rounded-[.8rem] border-[1px]  justify-between px-4":"flex hover:bg-gray-100 gap-2 h-[45px] items-center font-semibold bg-[#1F4454] bg-opacity-25 text-secondary rounded-[.8rem] justify-between px-3"}`}
          >
            <IoMailOutline className="w-5 h-5" />
            Mail
          </Button>
        </DialogTrigger>
  
        {/* Dialog Content */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Mail</DialogTitle>
            <DialogDescription>
              Enter the details below to send an email.
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
                    <FormLabel>Name</FormLabel>
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
                      <Input placeholder="Enter email" {...field} />
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
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter message" {...field} />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Send</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default Mail;