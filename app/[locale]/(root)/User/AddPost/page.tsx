"use client";
import { FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";

// Define Zod schema for form validation
const formSchema = z.object({
  address:z.string().min(1,"plese inser address"),
  amenities: z.array(z.string()),
  for: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  area: z.number().positive("Area must be a positive number"),
  propertyType: z.string().min(1, "Property type is required"),
  bedrooms: z.number().nonnegative("Bedrooms cannot be negative"),
  bathrooms: z.number().nonnegative("Bathrooms cannot be negative"),
  floors: z.number().nonnegative("Floors cannot be negative"),
  images: z.array(z.string()).optional(),
  numFloors: z.number().min(1, "floors is required"),
  plotWidth: z.number(),
  landNumber: z.number(),
  plotLength: z.number(),
  city:z.string().min(1,"city is required")
});

function Page() {
  const  t  = useTranslations();
  const locale = useLocale();
 
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  interface Amenity {
    _id: string;
    name: {
      ar: string;
      en: string;
    };
  }
  
  const [Amenities, setAmenities] = useState<Amenity[]>([]);
  interface City {
    name: {
      ar: string;
      en: string;
    };
    _id: string;
  }
  
  const [cities, setCities] = useState<City[]>([]);
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amenities: [] as string[],
      plotWidth: 0,
      plotLength: 0,
      landNumber: 0,
      numFloors: 0,
      title: "",
      description: "",
      for: "",
      address:"",
      price: 0,
      area: 0,
      propertyType: "",
      bedrooms: 0,
      bathrooms: 0,
      floors: 0,
      images: [],
      city:"",
    },
  });



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
   
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index)); //  delet image
  };

  useEffect(() => {
    async function fetchAmenities() {
      try {
        const response = await fetch(`https://baittak-server.vercel.app/api/amenity`);
        const data = await response.json();
        setAmenities(data);
      } catch (err) {
        console.error("Failed to fetch amenities:", err);
      }
    }
    fetchAmenities();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`https://baittak-server.vercel.app/api/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }
    fetchCities();
  }, []);



  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      if (session?.user?.id) {
        formData.append("user", session.user.id.toString());
      } else {
        console.error("User ID is undefined");
      }
      formData.append("propertyType", values.propertyType);
      formData.append("title", values.title);
      formData.append("price", values.price.toString());
      formData.append("address",values.address);
      formData.append("des", values.description);
      formData.append("for", values.for);
      formData.append("bedrooms", values.bedrooms.toString());
      formData.append("bathrooms", values.bathrooms.toString());
      formData.append("numFloors", values.numFloors.toString());
      formData.append("area", values.area.toString());
      formData.append("plotWidth", values.plotWidth.toString());
      formData.append("plotLength", values.plotLength.toString());
      formData.append("landNumber", values.landNumber.toString());
      formData.append("city", values.city);

      values.amenities?.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });

      if (selectedImages) {   
        // Append all files to FormData
        selectedImages.forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await fetch("https://baittak-server.vercel.app/api/properties/add", {
        method: "POST",
        body: formData,
      });

      if(response.ok){
        form.reset();
        setSelectedImages([]);
        toast({
          description: "the post add succussfuly",
        });
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast({
        description: "There was a proplem with your request",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-6 mb-20">
        {/* add a listing */}
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
          <div className="bg-white absolute -top-4 left-5">
            <h2 className="text-secondary  px-6 text-2xl font-medium">
              {t("addUser.addListing")}
            </h2>
          </div>

          <div className="grid gap-3 grid-cols-3">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.selectPropertyType")}</FormLabel>
                  <FormControl>
                    <Select
                    dir={locale === "ar" ? "rtl" : "ltr"}
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("addUser.select")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem  value="apartment">شقة</SelectItem>
                        <SelectItem value="villa">فيلا</SelectItem>
                        <SelectItem value="farm">مزرعة</SelectItem>
                        <SelectItem value="rest-house">استراحة</SelectItem>
                        <SelectItem value="residential-complex">
                          مجمع سكني
                        </SelectItem>
                        <SelectItem value="duplex">دوبلكس</SelectItem>
                        <SelectItem value="building">عمارة بالكامل</SelectItem>
                        <SelectItem value="hotel-apartments">
                          فندق/شقق فندقية
                        </SelectItem>
                        <SelectItem value="land">ارض</SelectItem>
                        <SelectItem value="full-floor">طابق كامل</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.title")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${t("addUser.title")}..`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.price")}</FormLabel>
                  <FormControl>
                    <Input
                    type="number" 
                     {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) )}
                    
                      placeholder={`${t("addUser.price")}..`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("addUser.description")} </FormLabel>
                <FormControl>
                  <Textarea {...field}></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="for"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange} // Connect onChange handler
          value={field.value} // Bind the current field value
          className="flex gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rent" id="r1" />
            <Label htmlFor="r1">{t("addUser.rental")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sell" id="r2" />
            <Label htmlFor="r2">{t("addUser.sell")}</Label>
          </div>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

        </div>

        {/* details */}
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
          <div className="bg-white absolute -top-4 left-5">
            <h2 className="text-secondary   px-6 text-2xl font-medium">
              {t("addUser.details")}
            </h2>
          </div>

          <div className="grid  sm:grid-cols-3   gap-5">
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.bedrooms")}</FormLabel>
                  {/* Counter */}
                  <FormControl>
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex w-full items-center justify-between border-[1px]">
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(Math.max(field.value - 1, 0))
                          }
                          className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-r"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="mx-10 text-lg">{field.value}</span>
                        <button
                          type="button"
                          onClick={() => field.onChange(field.value + 1)}
                          className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-l"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.bathrooms")}</FormLabel>
                  {/* Counter */}
                  <FormControl>
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex items-center justify-between border-[1px]">
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(Math.max(field.value - 1, 0))
                          }
                          className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-r"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="mx-10 text-lg">{field.value}</span>
                        <button
                          type="button"
                          onClick={() => field.onChange(field.value + 1)}
                          className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-l"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numFloors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.numFloors")}</FormLabel>
                  {/* Counter */}
                  <FormControl>
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex items-center justify-between border-[1px]">
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(Math.max(field.value - 1, 0))
                          }
                          className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-r"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="mx-10 text-lg">{field.value}</span>
                        <button
                          type="button"
                          onClick={() => field.onChange(field.value + 1)}
                          className="px-4 py-2 text-white bg-primary flex items-center gap-2 border-l"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3  gap-5">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.area")}</FormLabel>
                  <FormControl>
                    <div className="flex relative">
                      <Input
                    type="number" 
                     {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) )}
            className="pr-24" // Add padding to the right side of the input
                  
                      />
                      <div className="bg-gray-300 absolute right-0 rounded-[0.4rem] h-full w-1/3 flex items-center justify-center">
                        m <sup>2</sup>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plotWidth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.plotWidth")}</FormLabel>
                  <FormControl>
                    <div className="flex relative">
                      <Input
                        {...field} // spread field to bind the input value and onChange
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            className="pr-24" // Add padding to the right side of the input

                      />
                      <div className="bg-gray-300 absolute right-0 rounded-[0.4rem] h-full w-1/3 flex items-center justify-center">
                        m <sup>2</sup>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
  control={form.control}
  name="plotLength"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t("addUser.plotLength")}</FormLabel>
      <FormControl>
        <div className="flex relative">
          <Input
            {...field} // Spread field to bind the input value and onChange
            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            className="pr-24" // Add padding to the right side of the input
          />
          <div className="bg-gray-300 absolute right-0 rounded-[0.4rem] h-full w-1/3 flex items-center justify-center">
            m<sup>2</sup>
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          </div>

          <FormField
            control={form.control}
            name="landNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("addUser.landNumber")}</FormLabel>
                <FormControl>
                  <Input
                    {...field} // Spread field to bind the input value and onChange
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}

                    placeholder="0000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />




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


















                 <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input
                    {...field} 
                   
                    placeholder="address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Amenities */}
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
          <div className="bg-white absolute -top-4 left-5">
            <h2 className="text-secondary   px-6 text-2xl font-medium">
              {t("addUser.amenities")}
            </h2>
          </div>

          {/* Render the checkboxes dynamically */}
          <FormField
  control={form.control}
  name="amenities"
  render={({ field }) => (
    <FormItem>
      <div className="grid grid-cols-2 gap-4">
        {Amenities.map((amenity, index) => {
          const isChecked = field.value?.includes(amenity._id); // Check if already selected

          return (
            <div key={index} className="items-top flex gap-3">
              <Checkbox
                id={`amenity-${index}`}
                value={amenity._id}
                checked={isChecked} // Bind checked state
                onCheckedChange={(checked) => {
                  // Update form state
                  const newValue = checked
                    ? [...(field.value || []), amenity._id] // Add to array
                    : field.value.filter((item: string) => item !== amenity._id); // Remove from array
                  field.onChange(newValue);
                }}
              />
      
              <label
                htmlFor={`amenity-${index}`}
                className="text-sm font-medium leading-none"
              >
                {locale==="ar"? amenity.name.ar : amenity.name.en }
              </label>
            </div>
          );
        })}
      </div>
      <FormMessage />
    </FormItem>
  )}
/>

        </div>
        {/* Media */}
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full mb-20">
          <div className="bg-white absolute -top-4 left-5">
            <h2 className="text-secondary   px-6 text-2xl font-medium">
              {t("addUser.media")}
            </h2>
          </div>

          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col items-center space-y-4">
                    <label
                      htmlFor="imageUpload"
                      className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-6 w-full hover:shadow-md cursor-pointer text-center"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <FiUpload className="text-gray-600 text-4xl" />
                        <p className="text-gray-600 font-medium">
                          Upload Images
                        </p>
                      </div>
                    </label>
                    <input
                    
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                     
                    />

                    {selectedImages.length > 0 && (
                      <div className="w-full space-y-4">
                        <p className="text-center text-gray-500 mb-2">
                          Selected Images:
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Uploaded ${index}`}
                                className="rounded-md shadow-md w-full h-40 object-cover"
                              />
                              <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-md"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button  type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default Page;
