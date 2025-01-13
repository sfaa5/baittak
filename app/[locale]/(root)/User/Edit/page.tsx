"use client";
import { useSharedState } from "@/app/context/stateProvider";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { FiUpload } from "react-icons/fi";
import { useSession } from "next-auth/react";

// Schema for form validation
const formSchema = z.object({
  username: z.string().min(5, {
    message: "First Name must be at least 5 characters long.",
  }),

  phoneNumber: z.string().regex(/^\d{10,15}$/, {
    message: "Please enter a valid phone number (10-15 digits)",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters long.",
  }),
  email:z.string().email(),
  image: z.string().optional(),
  file: z.string().optional(),
});

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;
function page() {
  const { user, setUser } = useSharedState();

  const [loadingButton, setLoadingButton] = useState(false);
const { data: session,status } = useSession();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageBuffers, setImageBuffers] = useState<string | null>(null);
  const [loading,setLoading]=useState(false)

  console.log("uuuuuuuuuuuu", user);
  console.log("uuuuuuuuuuuu", user.phoneNumber);

  const [errorr, setError] = React.useState("");

  const t = useTranslations();
  const params = useParams();
  const locale = useLocale();



  const handelImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file); // Convert the file to Base64

      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result); // Resolve the Base64 string
        } else {
          reject(
            new Error("FileReader failed to produce a valid Base64 string.")
          );
        }
      };

      reader.onerror = (error) => {
        reject(error); // Reject on error
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      handelImage(file)
        .then((result) => {
          console.log("Base64 Image Data:", result); // Log the result for debugging
          setImageBuffers(result); // Store the single image buffer directly in state
        })
        .catch((error) => {
          console.error("Error processing image:", error); // Log errors if any
        });
    }
  };


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneNumber:"",
      address: "",
      email:"",
    },
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/users/${session?.user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        
        setLoading(false);
      // Update form values after fetching user data
      form.reset({
        username: data.username || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        email:data.email||'',
      });
        
      } catch (error) {
        console.error("Error fetching user data:", error);
  
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session?.user?.id, form.reset]);





  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingButton(true);
    console.log("Form Values:", values);

    if (imageBuffers) {
      values.file = imageBuffers;
    }

    try {
      const response = await fetch(`${URL_SERVER}/api/users/${session?.user?.id}`, {
        method: "PUT",
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
const data = response.json()


      toast({
        description: "Your request was added successfully.",
      });
    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        description: "Your request was not received.",
      });
      setError(error.message);
    } finally {
      setLoadingButton(false);
    }
  };

  if(status==="loading"){
    return <p>loading</p> 
  }


  return (
    <Form {...form}>
      {
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-gray-50 p-10  grid grid-cols-2 gap-x-6"
        >
          <div className="col-span-2 w-40">
            {" "}
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className=" space-y-4 ">
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      {imageBuffers ? (
                        <label
                          htmlFor="imageUpload"
                          className="w-full space-y-4 cursor-pointer"
                        >
                          <div className="relative">
                            <img
                              src={imageBuffers}
                              alt={`Uploaded image`}
                              className="rounded-md shadow-md w-full h-40 object-cover"
                            />
                          </div>
                        </label>
                      ) : user?.image?.url ? (
                        <label
                          htmlFor="imageUpload"
                          className="w-full space-y-4 cursor-pointer"
                        >
                          <div className="relative">
                            <img
                              src={user.image.url}
                              alt={`Uploaded image`}
                              className="rounded-md shadow-md w-full h-32 object-cover"
                            />
                          </div>
                        </label>
                      ) :user?.image? (
                        <label
                        htmlFor="imageUpload"
                        className="w-full space-y-4 cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={user.image}
                            alt={`Uploaded image`}
                            className="rounded-md shadow-md w-full h-32 object-cover"
                          />
                        </div>
                      </label>
                      ):                      <label
                      htmlFor="imageUpload"
                      className="flex items-center justify-start border-2 border-dashed border-gray-400 rounded-2xl p-5 w-full hover:shadow-md cursor-pointer text-center"
                    >
                      <div className="flex text-md flex-col items-center space-y-2">
                        <FiUpload className="text-gray-600 text-xl" />
                        <p className="text-gray-600 font-medium">
                          Upload Images
                        </p>
                      </div>
                    </label>}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*  Name Field */}
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

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Phone</FormLabel>

                <FormControl>
                  <Input type="text" placeholder=" phone number" {...field} />
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
                <FormLabel> Address</FormLabel>

                <FormControl>
                  <Input type="text" placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email</FormLabel>

                <FormControl>
                  <Input type="text"  onFocus={(e) => e.target.blur()} disabled  readOnly {...field} className="bg-gray-200 cursor-not-allowed focus:none"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorr && <p style={{ color: "red" }}>{errorr}</p>}
          <Button
            type="submit"
            disabled={loadingButton} // Disable the button while loading
          >
            {loadingButton ? "saving..." : "Save"}{" "}
            {/* Change text while loading */}
          </Button>
        </form>
      }
    </Form>
  );
}

export default page;
