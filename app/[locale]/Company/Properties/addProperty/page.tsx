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
import SignPhone from "@/components/SignPhoen";
import { redirect, useRouter } from "next/navigation";
import Map from "../../../(root)/User/AddPost/Map";


const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

function Page() {
  const { data: session, status } = useSession();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [address, setAddress] = useState("");
  const t = useTranslations();
  const tE = useTranslations("erorr")
  const locale = useLocale();


  const router = useRouter();




// Define Zod schema for form validation
const formSchema = z.object({
    address: z.string().min(1, tE("address")),
    amenities: z.array(z.string()),
    title: z.string().min(1, tE("title")),
    description: z.string().min(1, tE("description")),
    price: z.string().min(1, tE("price")),
    area: z.string().min(1, tE("area")),
    propertyType: z.string().min(1, tE("propertyType")),
    bedrooms: z.number().nonnegative(tE("bedrooms")),

    bathrooms: z.number().nonnegative(tE("bathrooms")),
    floors: z.number().nonnegative(tE("floors")),
    numFloors: z.number().min(1, tE("numFloors")),
    city: z.string().min(1, tE("city")),
    currency: z.string().min(1, tE("currency")),
    for: z.string().min(1, tE("for")),
    plotWidth: z.string().optional(),
    plotLength: z.string().optional(),
    landNumber: z.string().optional(),
    rentalType: z.string().optional(),
    images: z.array(z.string()).optional(),
});


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to home page
    }
  }, [status, router]);

  useEffect(() => {
    console.log("setionnINNN", session);
    if (status === "authenticated" && !session?.user?.phoneNumber) {
      setShowPhoneModal(true);
    }
  }, [session, status]);

  const handlePhoneUpdate = async (newPhoneNumber) => {
    try {
      // Send the update request
      const response = await fetch(
        `${URL_SERVER}/api/users/${session?.user.id}`,
        {
          method: "PUT", // Use PATCH for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: newPhoneNumber }), // Pass the new phone number
        }
      );

      // Check if the response is successful
      if (response.ok) {
        // Optionally refetch the session or update it locally
        session.user.phoneNumber = newPhoneNumber; // Simulating session update for now
        setShowPhoneModal(false);
      } else {
        console.error("Failed to update phone number");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
        setAddress(address);
        form.setValue("address", address); // Update the form value
        console.log("Selected Address:", address);
      } else {
        console.error("No address found for the selected location.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  console.log("location", location);



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
      rentalType: "",
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
        const response = await fetch(`${URL_SERVER}/api/amenity`);
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
        const response = await fetch(`${URL_SERVER}/api/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }
    fetchCities();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
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
      formData.append("rentalType", values.rentalType);

      values.amenities?.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });

      if (selectedImages) {
        // Append all files to FormData
        selectedImages.forEach((file) => {
          formData.append("images", file);
        });
      }

      const response = await fetch(`${URL_SERVER}/api/properties/add`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        router.push('/Company/Properties')
        form.reset()
        toast({
          description: "the post add succussfuly",
          className: "bg-green-500 text-white p-4 rounded shadow-lg",
        });
      } else {
        toast({
          description: data.message,
          className: "bg-red-500 text-white p-4 rounded shadow-lg",
        });
      }
    } catch (err) {
      toast({
        description: err.message,
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-6 mt-8 mb-20"
        >
          {/* add a listing */}
          <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
            <div className="bg-white absolute -top-4 left-5">
              <h2 className="text-secondary  px-6 text-2xl font-medium">
                {t("addUser.addListing")}
              </h2>
            </div>

            <div className="grid gap-3 grid-cols-8">
              <div className="col-span-2">
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
      <SelectItem value="Apartment">{t("inputs.apartment")}</SelectItem>
      <SelectItem value="Villa">{t("inputs.villa")}</SelectItem>
      <SelectItem value="Farm">{t("inputs.farm")}</SelectItem>
      <SelectItem value="Rest-House">{t("inputs.rest-house")}</SelectItem>
      <SelectItem value="Residential-Complex">{t("inputs.residential-complex")}</SelectItem>
      <SelectItem value="Duplex">{t("inputs.duplex")}</SelectItem>
      <SelectItem value="Building">{t("inputs.building")}</SelectItem>
      <SelectItem value="Hotel-Apartments">{t("inputs.hotel-apartments")}</SelectItem>
      <SelectItem value="Land">{t("inputs.land")}</SelectItem>
      <SelectItem value="Full-Floor">{t("inputs.full-floor")}</SelectItem>
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
              </div>

              <div className="col-span-4 grid grid-cols-7 gap-2">
                <div className="col-span-3">
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
                            placeholder={`${t("addUser.price")}..`}
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
            <FormLabel>{t("inputs.currency.label")}</FormLabel>
            <FormControl>
              <Select   dir={locale === "ar" ? "rtl" : "ltr"} onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("inputs.currency.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">{t("inputs.currency.options.USD")}</SelectItem>
                  <SelectItem value="IQD">{t("inputs.currency.options.IQD")}</SelectItem>
                  <SelectItem value="EUR">{t("inputs.currency.options.EUR")}</SelectItem>
                  <SelectItem value="SAR">{t("inputs.currency.options.SAR")}</SelectItem>
                  <SelectItem value="AED">{t("inputs.currency.options.AED")}</SelectItem>
                  <SelectItem value="KWD">{t("inputs.currency.options.KWD")}</SelectItem>
                  <SelectItem value="QAR">{t("inputs.currency.options.QAR")}</SelectItem>
                  <SelectItem value="OMR">{t("inputs.currency.options.OMR")}</SelectItem>
                  <SelectItem value="BHD">{t("inputs.currency.options.BHD")}</SelectItem>
                  <SelectItem value="JOD">{t("inputs.currency.options.JOD")}</SelectItem>
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
                    name="rentalType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("addUser.rentalType")}</FormLabel>
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
                              <SelectItem value="Monthly">
                                {t("addUser.monthly")}
                              </SelectItem>
                              <SelectItem value="Yearly">
                                {t("addUser.yearly")}
                              </SelectItem>
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

          {/* Address */}
          <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
            <div className="bg-white absolute -top-4 left-5">
              <h2 className="text-secondary  px-6 text-2xl font-medium">
                {t("addUser.address")}
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
                  {t("inputs.Select on Map")}
                </button>
              </div>

              <div className="col-span-2 flex flex-col gap-5">
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
               <FormLabel>{t("inputs.address")}</FormLabel>

                      <FormControl>
                        <Input {...field} placeholder={t("inputs.address")} />
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
                        type="number"
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
                    <FormLabel>{t("addUser.plotLength")}</FormLabel>
                    <FormControl>
                      <div className="flex relative">
                        <Input
                        type="number"
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
                  <FormLabel>{t("addUser.landNumber")}</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
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
                                : field.value.filter(
                                    (item: string) => item !== amenity._id
                                  ); // Remove from array
                              field.onChange(newValue);
                            }}
                          />

                          <label
                            htmlFor={`amenity-${index}`}
                            className="text-sm font-medium leading-none"
                          >
                            {locale === "ar"
                              ? amenity.name.ar
                              : amenity.name.en}
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
                          {t("company.agentInfo.UploadImages")}
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
                          {t("inputs.SelectedImages")}

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
                                                                  {t("inputs.Remove")}

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
          <Button
            type="submit"
            disabled={loading} // Disable the button while loading
          >
            {loading ? t("property.Submitting") : t("property.Submit")}

          </Button>
        </form>
      </Form>

      {showPhoneModal && (
        <SignPhone
          onComplete={handlePhoneUpdate} // Pass handler to update phone
          isOpen={showPhoneModal}
        />
      )}
    </>
  );
}

export default Page;
