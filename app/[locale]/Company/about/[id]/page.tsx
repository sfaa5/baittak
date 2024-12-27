'use client'
import React, { useEffect, useState } from 'react'

import {  useParams } from 'next/navigation'
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
import { FiUpload } from 'react-icons/fi';
import SearchCity from '@/components/SearchProperty';
import SelectCity from '@/components/Company/selectCity';


// Schema for form validation
const formSchema = z.object({
    address: z.string().min(5, {
        message: "Address must be at least 5 characters long.",
    }),
    companyName: z.string().min(2, {
      message: "Company Name must be at least 2 characters long.",
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
  image: z.any().optional(),
  file:z.string().optional(),
  city:z.string().optional(),

  });
  



function page() {
  const [loadingButton, setLoadingButton] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [agency, setAgency] = useState(null); // State to store agency data
  const [loading, setLoading] = useState(true); // Loading state
const [city,setCity]=useState('')
const [open, setOpen] = React.useState(false);
const [errorr,setError] =React.useState("")
const [imageBuffers, setImageBuffers] = useState<string>();


const [message,setMessage] =React.useState(false)
const  t = useTranslations();
const params= useParams();
const locale = useLocale();
 
  const id = params.id



  const handelImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.readAsDataURL(file); // Convert the file to Base64
  
      reader.onloadend = () => {
        resolve(reader.result); // Resolve the Base64 string
      };
  
      reader.onerror = (error) => {
        reject(error); // Reject on error
      };
    });
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file
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



  useEffect(() => {
    const fetchAgency = async () => {
      setLoading(true); // Start loading
  
      try {
        const response = await fetch(`http://localhost:5001/api/agency/${id}`); // Fetch the data
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
        }
        const data = await response.json(); // Parse the JSON
        setAgency(data); // Update state with the fetched data
      } catch (error) {
        console.error('Failed to fetch agency:', error); // Log errors
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchAgency(); // Call the function
  }, [id]);

console.log("AGENCYYYYY",agency)

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files[0];
    if (files) {

      setSelectedImage(files);
   
    }
  };

    // Define the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          companyName: "",
           
          jobTitle: "",
          username: "",
          email: "",
          phone: "",
          image: "",
        },
      });


  // Reset form values once agency data is available
  useEffect(() => {
    if (agency) {
      form.reset({
        companyName: agency.companyName || "",

        jobTitle: agency.jobTitle || '',
        username: agency.username || '',
        email: agency.email || '',
        phone: agency.phoneNumber || '',
        image: agency.image || '',
        address:agency.address||'',
      });
if(locale==='ar'){
   setCity(agency.city.name.ar)  
}else{
  setCity(agency.city.name.en)
}
   

    }
  }, [agency, form]);


// Submit handler
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setLoadingButton(true)
  console.log("Form Values:", values);


if(imageBuffers){values.file = imageBuffers}




console.log("vvvvvvv",values.file)

values.city = city



console.log("lllllllllllllllllllllllllll",values)
  try {
    const response = await fetch(`http://localhost:5001/api/agency/update/${id}`, {
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
  }finally{
    setLoadingButton(false)
  }
};


console.log(agency?.image)

  return (


    <Form {...form}>

          {loading?( <span>loading</span> ):(     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-gray-50 p-10 mt-5 grid grid-cols-2 gap-x-6">


<div className='col-span-2 w-40'>   <FormField

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



            { imageBuffers?(
                <label htmlFor="imageUpload" className="w-full space-y-4 cursor-pointer">
                <div className="relative">
                  <img
                    src={imageBuffers}
                    alt={`Uploaded image`}
                    className="rounded-md shadow-md w-full h-40 object-cover"
                  />
                </div>
                </label>
            ):agency?.image ? (
                <label htmlFor="imageUpload" className="w-full space-y-4 cursor-pointer">
              <div className="relative">
                <img
                  src={agency.image.url}
                  alt={`Uploaded image`}
                  className="rounded-md shadow-md w-full h-40 object-cover"
                />
              </div>
              </label>
            ) : (
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-start border-2 border-dashed border-gray-400 rounded-2xl p-5 w-full hover:shadow-md cursor-pointer text-center"
              >
                <div className="flex text-md flex-col items-center space-y-2">
                  <FiUpload className="text-gray-600 text-xl" />
                  <p className="text-gray-600 font-medium">
                    Upload Images
                  </p>
                </div>
              </label>
            )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /></div>

 



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


                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                       <SelectCity city={city} setCity={setCity} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
          
            
           
  
     

            {/* address Field */}
                      <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
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
  <Button 
  type="submit" 
  disabled={loading} // Disable the button while loading
>
  {loading ? 'Submitting...' : 'Submit'} {/* Change text while loading */}
</Button>
          </form>)}
     
        </Form>
  )
}

export default page