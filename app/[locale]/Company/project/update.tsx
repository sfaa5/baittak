"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
 

import { useLocale, useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"


// Schema for the form
const formSchema = z.object({

  status:z.string().min(1,"staus is required"),
  units:z.number().min(1,"units is required"),
  priceM:z.number().positive("Price must be a positive number"),
 
  
  
})
const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;



export function Update({project}) {
  const locale = useLocale();
  const t = useTranslations();

  const [open, setOpen] = React.useState(false)


  // Initialize the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        priceM: project?.price,
        units:project?.units,
        status:project?.status,
    },
  })






  

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

    const response = await fetch(`${URL_SERVER}/api/projects/${project._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

      const responseText = await response.text(); // Use `.text()` instead of `.json()`
      console.log("Response text:", responseText);

      if (response.ok) {
        toast({
            description: "Property added successfully",
          });
      
        console.log("Property added successfully")
        setOpen(false)
      } else {
        const errorData = await response.json()
        console.error("Error adding property:", errorData)
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger  asChild>
        <button onClick={(e) => e.stopPropagation()} className="relative  flex cursor-default  select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 w-full hover:bg-gray-100" >Update</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] bg-white">
        <DialogHeader>
          <DialogTitle>Add Property</DialogTitle>
          <DialogDescription>
            Enter the details of the new property here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-2 gap-5 items-end">
        

          <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.status")}</FormLabel>
                  <FormControl>
                  <Select
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      onValueChange={field.onChange}
                      value={field.value}
                      {...field}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("addUser.status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Completed">{t("addUser.Completed")}</SelectItem>
                        <SelectItem value="UnderDevelopment">{t("addUser.UnderDevelopment")}</SelectItem>

                      </SelectContent>
                      </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


<FormField
  control={form.control}
  name="priceM"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t("addUser.priceM")}</FormLabel>
      <FormControl>
        <Input
          type="number"
          {...field}
          
          onChange={(e) =>
            field.onChange(parseFloat(e.target.value))
          } 
          placeholder="Price"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="units"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t("addUser.units")}</FormLabel>
      <FormControl>
        <Input
          type="number"
          {...field}
          onChange={(e) =>
            field.onChange(parseFloat(e.target.value))
          } 
          placeholder="Units"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>





            {/* Submit Button */}
            <Button type="submit" className="">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
