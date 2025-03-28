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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useParams, useRouter } from "next/navigation";
import Map from "../Map";

// Define Zod schema for form validation
const formSchema = z.object({
  address: z.string().min(1, "plese inser address"),
  amenities: z.array(z.string()).optional(),

  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  area: z.string().min(1, "Area is required"),
  propertyType: z.string().min(1, "Property type is required"),
  bedrooms: z.number().nonnegative("Bedrooms cannot be negative"),
  bathrooms: z.number().nonnegative("Bathrooms cannot be negative"),
  floors: z.number().nonnegative("Floors cannot be negative"),

  numFloors: z.number().min(1, "floors is required"),
  plotWidth: z.string().optional(),
  landNumber: z.string().optional(),
  plotLength: z.string().optional(),
  city: z.string().min(1, "city is required"),
  rentaltype: z.string().optional(),
  currency: z.string().min(1, "currency is required"),
  for: z.string().min(1, "plese complete"),
});

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

import React from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";

interface Property {
  user?: { _id: string };
  amenities?: { _id: string }[];
  plotWidth?: string;
  plotLength?: string;
  landNumber?: string;
  numFloors?: number;
  title?: string;
  des?: string;
  for?: string;
  address?: string;
  price?: string;
  area?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  images?: string[];
  city?: { _id: string };
  currency?: string;
  rentaltype?: string;
}

function Page() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [property, setProperty] = useState<Property>();
  const [originalImages, setOriginalImages] = useState([]); // الصور الأصلية
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [Amenities, setAmenities] = useState<Amenity[]>([]);
  const t = useTranslations();
  const {status}=useSession();

  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [errImage, setErrImage] = useState("");
  const [errorr, setErrorr] = useState(false);
  const tE = useTranslations("erorr");
    const axiosAuth = useAxiosAuth();
  

  const handleLocationSelect = async (selectedLocation) => {
    setLocation(selectedLocation);

    try {
      // Reverse geocode to get the address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedLocation.latitude}&lon=${selectedLocation.longitude}`
      );
      const data = await response.json();
      const addressComponents = data.address;
      if (addressComponents) {
        // Construct the address excluding city, postcode, and country
        const { road, house_number, suburb, neighbourhood, city } =
          addressComponents;
        const address = [house_number, road, suburb, neighbourhood, city]
          .filter(Boolean)
          .join(", ");

        form.setValue("address", address); // Update the form value
        console.log("Selected Address:", address);
      } else {
        console.error("No address found for the selected location.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  interface Amenity {
    _id: string;
    name: {
      ar: string;
      en: string;
    };
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amenities: [] as string[],
      plotWidth: "",
      plotLength: "",
      landNumber: "",
      numFloors: 0,
      title: "",
      description: "",
      for: "",
      address: "",
      price: "",
      area: "",
      propertyType: "",
      bedrooms: 0,
      bathrooms: 0,
      floors: 0,
      images: [],
      city: "",
      currency: "",
      rentaltype: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedImages.length + originalImages.length > 2) {
      setErrorr(false);
    }
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (selectedImages.length + originalImages.length < 4) {
      setErrorr(true);
      return;
    }
    setSelectedImages((prev) => prev.filter((_, i) => i !== index)); //  delet image
  };

  // useEffect(() => {
  //   if (selectedImages.length < 3) {
  //     setErrorr(true);
  //   } else {
  //     setErrorr(false);
  //   }
  // }, [selectedImages]);

  const handelDelete = (index: number) => {
    if (selectedImages.length + originalImages.length < 4) {
      setErrorr(true);
      return;
    }

    // Extract the publicId of the image to be deleted
    const publicIdToDelete = originalImages[index]?.publicId;

    if (publicIdToDelete) {
      // Add only the publicId to the deletedImages state
      setDeletedImages((prev) => [...prev, publicIdToDelete]);

      // Remove the image object from originalImages state
      setOriginalImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  //fetch propery info
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${URL_SERVER}/api/properties/${params.id}`
        ); // Fetch the data
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
        }
        const data = await response.json(); // Parse the JSON
        setProperty(data); // Update state with the fetched data
        setOriginalImages(data.images);
      } catch (error) {
        console.error("Failed to fetch agency:", error); // Log errors
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchUser();
  }, [params.id]);

  useEffect(() => {
    if (property) {
      form.reset({
        amenities: property.amenities.map((amenity) => amenity._id) || [],
        plotWidth: property.plotWidth || "",
        plotLength: property.plotLength || "",
        landNumber: property.landNumber || "",
        numFloors: property.numFloors || 0,
        title: property.title || "",
        description: property.des || "",
        for: property.for || "",
        address: property.address || "",
        price: property.price.toString() || "",
        area: property.area.toString() || "",
        propertyType: property.propertyType || "",
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        floors: property.floors || 0,
        images: property.images || [],
        city: property.city._id || "",
        currency: property.currency || "",
        rentaltype: property.rentaltype || "",
      });
    }
  }, [property]);

  // fetch Amenities
  useEffect(() => {
    async function fetchAmenities() {
      try {
        const response = await fetch(`${URL_SERVER}/api/amenity`);
        const data = await response.json();
        setAmenities(data);
        console.log("amenities");
      } catch (err) {
        console.error("Failed to fetch amenities:", err);
      }
    }
    fetchAmenities();
  }, []);

  // fetch cities
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`${URL_SERVER}/api/cities`);
        const data = await response.json();
        await setCities(data);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }
    fetchCities();
  }, [property?.city._id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();

      console.log(deletedImages);
      console.log(selectedImages);
      console.log(originalImages);

      if (deletedImages) {
        deletedImages.forEach((image) => {
          formData.append("deletedImages", image);
        });
      }

      const validImages = originalImages.filter(
        (image) => image && image.publicId && image.url
      );

      if (validImages.length > 0) {
        formData.append("originalImages", JSON.stringify(validImages));
      }

      if (selectedImages) {
        // Append all files to FormData
        selectedImages.forEach((file) => {
          formData.append("images", file);
        });
      }

      console.log("values",values);

      formData.append("propertyType", values.propertyType);
      formData.append("title", values.title);
      formData.append("price", values.price.toString());
      formData.append("address", values.address);
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
      formData.append("location", JSON.stringify(location));
      formData.append("currency", values.currency);
      formData.append("rentalType", values.rentaltype);
      formData.append("user", property.user._id);

      console.log(values);

      values.amenities.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });

      if(status==="unauthenticated"){
          router.push("/?login=true")
      }

          console.log("first",formData.get("city"))

          const response = await axiosAuth.put(
            `${URL_SERVER}/api/properties/${params.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
      
      console.log("data",response)
      if (response.status >= 200 && response.status < 300) {
        router.push("/User/Posts");
        toast({
          description: "the post updated succussfuly",
          className: "bg-green-500 text-white p-4 rounded shadow-lg",
        });
      }

    } catch (error) {
      console.log(error)
      toast({
        description: "Something went Wrong",
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col gap-6 mt-6 mb-20"
      >
        {/* add a listing */}
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full bg-white">
          <div className="bg-white absolute rounded-lg -top-4 left-5">
            <h2 className="text-secondary  px-6 text-2xl font-medium">
              {"Add Listing"}
            </h2>
          </div>

          <div className="grid gap-3 grid-cols-8">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"PropertyType"}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"Select"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Apartment">شقة</SelectItem>
                          <SelectItem value="Villa">فيلا</SelectItem>
                          <SelectItem value="Farm">مزرعة</SelectItem>
                          <SelectItem value="Rest-house">استراحة</SelectItem>
                          <SelectItem value="Residential-complex">
                            مجمع سكني
                          </SelectItem>
                          <SelectItem value="Duplex">دوبلكس</SelectItem>
                          <SelectItem value="Building">
                            عمارة بالكامل
                          </SelectItem>
                          <SelectItem value="Hotel-apartments">
                            فندق/شقق فندقية
                          </SelectItem>
                          <SelectItem value="Land">ارض</SelectItem>
                          <SelectItem value="Full-floor">طابق كامل</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"title"}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={"title"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4 grid grid-cols-7 gap-2">
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder={"Price.."}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Currency"}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={"Select"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="IQD">IQD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="SAR">SAR</SelectItem>
                            <SelectItem value="AED">AED</SelectItem>
                            <SelectItem value="KWD">KWD</SelectItem>
                            <SelectItem value="QAR">QAR</SelectItem>
                            <SelectItem value="OMR">OMR</SelectItem>
                            <SelectItem value="BHD">BHD</SelectItem>
                            <SelectItem value="JOD">JOD</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="rentaltype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"RentalType"}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={"Select"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                            <SelectItem value="Yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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
                      <Label htmlFor="r1">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="r2" />
                      <Label htmlFor="r2">Sell</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address */}
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full bg-white">
          <div className="bg-white rounded-lg absolute -top-4 left-5">
            <h2 className="text-secondary  px-6 text-2xl font-medium">
              Address
            </h2>
          </div>

          <div className="grid  sm:grid-cols-3  gap-14">
            <div className="relative w-full col-span-1">
              <img
                src="/map.png" // Replace with an actual static map URL
                alt="Static Map"
                className="w-full h-40 rounded-lg" // Adjust the width and height as needed
              />

              {/* Overlay Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-white text-sm border-none rounded cursor-pointer"
              >
                Select on Map
              </button>
            </div>

            <div className="col-span-2 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"Select"} />
                        </SelectTrigger>

                        <SelectContent>
                          {cities.map((city, index) => (
                            <SelectItem key={index} value={city._id}>
                              {city.name.en}
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
                      <Input {...field} placeholder="address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[1400px]">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Close
                </button>
                <Map
                  initialLatitude={37.7749} // Example latitude
                  initialLongitude={-122.4194} // Example longitude
                  onLocationSelect={handleLocationSelect}
                />
              </div>
            </div>
          )}
        </div>

        {/* details */}
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full bg-white">
          <div className="bg-white absolute rounded-lg -top-4 left-5">
            <h2 className="text-secondary   px-6 text-2xl font-medium">
              Details
            </h2>
          </div>

          <div className="grid  sm:grid-cols-3   gap-5">
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
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
                  <FormLabel>Bathrooms</FormLabel>
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
                  <FormLabel>Floors</FormLabel>
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
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <div className="flex relative">
                      <Input
                        type="number"
                        {...field}
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
                  <FormLabel>Add plot width</FormLabel>
                  <FormControl>
                    <div className="flex relative">
                      <Input
                        {...field} // spread field to bind the input value and onChange
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
                  <FormLabel>Add plot length</FormLabel>
                  <FormControl>
                    <div className="flex relative">
                      <Input
                        {...field} // Spread field to bind the input value and onChange
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
                <FormLabel>land Number</FormLabel>
                <FormControl>
                  <Input
                    {...field} // Spread field to bind the input value and onChange
                    placeholder="0000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Amenities */}
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full bg-white">
          <div className="bg-white rounded-lg absolute  -top-4 left-5">
            <h2 className="text-secondary   px-6 text-2xl font-medium">
              {"Amenities"}
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
                              : (field.value || []).filter(
                                  (item: string) => item !== amenity._id
                                );
                            field.onChange(newValue);
                            console.log("Updated amenities:", newValue);
                          }}
                        />

                        <label
                          htmlFor={`amenity-${index}`}
                          className="text-sm font-medium leading-none"
                        >
                          {amenity.name.en}
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
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full mb-20 bg-white">
          <div className="bg-white absolute -top-4 left-5 rounded-lg">
            <h2 className="text-secondary   px-6 text-2xl font-medium">
              Media
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

                    <div className="w-full space-y-4">
                      <p className="text-center text-gray-500 mb-2">
                        {t("inputs.SelectedImages")}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedImages.length > 0 &&
                          selectedImages.map((image, index) => (
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

                        {originalImages.length > 0 &&
                          originalImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image?.url}
                                alt={`Uploaded ${index}`}
                                className="rounded-md shadow-md w-full h-40 object-cover"
                              />
                              <button
                                onClick={() => handelDelete(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-md"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>

                    {(() => {
                      if (errorr) {
                        setErrImage(tE("At_least_3_images_required"));
                        return <span className="text-red-600">{errImage}</span>;
                      }
                      return null;
                    })()}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={loading} // Disable the button while loading
        >
          {loading ? t("property.Submitting") : t("property.Submit")}
          {/* Change text while loading */}
        </Button>
      </form>
    </Form>
  );
}

export default Page;
