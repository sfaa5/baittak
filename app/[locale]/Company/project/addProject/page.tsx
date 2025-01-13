"use client";
import { FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import imageCompression from "browser-image-compression";
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
import Map from "@/app/[locale]/(root)/User/AddPost/Map";

// Define Zod schema for form validation
const formSchema = z.object({
  status: z.string().min(1, "staus is required"),
  address: z.string().min(1, "plese inser address"),
  amenities: z.array(z.string()),
  title: z.string().min(1, "Title is required"),
  des: z.string().min(1, "Description is required"),
  price: z.string().min(1,"Price is required"),
  bedrooms: z.number().nonnegative("Bedrooms cannot be negative"),
  images: z.array(z.string()).optional(),
  city: z.string().min(1, "city is required"),
  file: z.array(z.string()).optional(),
  user: z.string().optional(),
  priceM: z.string().min(1,"Price is required").optional(),
  units: z.string().min(1, "units is required"),
  firstPayment:z.string().optional(),
  annualInterest:z.string().max(100,"max 100").optional(),
  installmentPeriod:z.string().optional(),
  currency:z.string().min(1, "currency is required"),
  projectType:z.string().min(1,"project type is required")

});

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;


function Page() {
  const t = useTranslations();
  const locale = useLocale();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewSource, setPreviewSource] = useState<string[]>([]);
  const [imageBuffers, setImageBuffers] = useState<string[]>([]);

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
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState('');

const [errorr,setErrorr]= useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstPayment:'',
      annualInterest:'',
      installmentPeriod:'',
      amenities: [] as string[],
      status: "",
      title: "",
      des: "",
      address: "",
      price: "",
      bedrooms: 0,
      priceM: '',
      file: [],
      city: "",
      units: '',
      currency:"",
      projectType:""
    },
  });


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

const handleLocationSelect = async (selectedLocation) => {
  setLocation(selectedLocation);

  try {
    // Reverse geocode to get the address
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedLocation.latitude}&lon=${selectedLocation.longitude}`);
    const data = await response.json();
    const addressComponents = data.address;
    if (addressComponents) {
      // Construct the address excluding city, postcode, and country
      const { road, house_number, suburb, neighbourhood,city } = addressComponents;
      const address = [house_number, road, suburb, neighbourhood,city].filter(Boolean).join(', ');
      setAddress(address);
      form.setValue('address', address); // Update the form value
      console.log("Selected Address:", address);
    } else {
      console.error("No address found for the selected location.");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    const newFiles = Array.from(files);
    setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index)); //  delet image
    setErrorr('')
  };

  useEffect(() => {
    async function fetchAmenities() {
      try {
        const response = await fetch(
          `${URL_SERVER}/api/amenity`
        );
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(666666666);
    setLoading(true)
    try {
      const formData = new FormData()
      console.log(selectedImages);

      if(selectedImages.length > 0){
              Array.from(selectedImages).forEach((files) => {
        formData.append("images", files);  // "images" is the key for each file in the array
      });
      }

      if (session?.user?.id) {
        formData.append("user",session.user.id)
      } else {
        console.error("User ID is undefined");
      }

      formData.append("firstPayment", values.firstPayment.toString());
      formData.append("annualInterest", values.annualInterest.toString());
      formData.append("installmentPeriod", values.installmentPeriod.toString());
      formData.append("status", values.status);
      formData.append("title", values.title);
      formData.append("des",values.des);
      formData.append("address", values.address);
      formData.append("price", values.price.toString());
      formData.append("bedrooms", values.bedrooms.toString());
      formData.append("priceM", values.priceM.toString());
      formData.append("city", values.city);
      formData.append("units", values.units.toString());
      formData.append("currency", values.currency);
formData.append("projectType",values.projectType)
      formData.append("location", JSON.stringify(location))
      
      values.amenities?.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });




      const response = await fetch(`${URL_SERVER}/api/projects/add`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {

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
    }finally{
      setLoading(false)
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col gap-6 mb-20 mt-8"
      >
        {/* addProject */}
         <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
          <div className="bg-white absolute -top-4 left-5">
            <h2 className="text-secondary   px-6 text-2xl font-medium">
              {t("addUser.addProject")}
            </h2>
          </div>

          <div className="grid gap-3 grid-cols-3">
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
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("addUser.status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Completed">
                          {t("addUser.Completed")}
                        </SelectItem>
                        <SelectItem value="UnderDevelopment">
                          {t("addUser.UnderDevelopment")}
                        </SelectItem>
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
                    <Input {...field} placeholder={`${t("addUser.title")}..`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



              <div className="">
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("addUser.selectProjectType")}</FormLabel>
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
                          <SelectItem value="apartment">شقة</SelectItem>
                          <SelectItem value="villa">فيلا</SelectItem>
                          <SelectItem value="farm">مزرعة</SelectItem>
                          <SelectItem value="rest-house">استراحة</SelectItem>
                          <SelectItem value="residential-complex">
                            مجمع سكني
                          </SelectItem>
                          <SelectItem value="duplex">دوبلكس</SelectItem>
                          <SelectItem value="building">
                            عمارة بالكامل
                          </SelectItem>
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
              /></div>







            <div className="col-span-3">
              <FormField
                control={form.control}
                name="des"
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
            </div>



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
              
                      placeholder="Units"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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





     


  
          </div>
        </div>


          {/* Address */}
          <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
            <div className="bg-white absolute -top-4 left-5">
              <h2 className="text-secondary  px-6 text-2xl font-medium">
                {t("addUser.address")}
              </h2>
            </div>

            <div className="grid  sm:grid-cols-3  gap-14 ">

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
        <div className="relative p-7 grid grid-cols-1 gap-7 pt-12 mt-5 rounded-[0.6rem] border-[1px] w-full">
          <div className="bg-white absolute -top-4 left-5">
            <h2 className="text-secondary   px-6 text-2xl font-medium">
              {t("addUser.details")}
            </h2>
          </div>



          <FormField
                control={form.control}
                name="installmentPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("addUser.InstallmentPeriod")} <span className="text-primary/90">{t("addUser.InstallmentSystem")}</span> </FormLabel>
                    <FormControl>
                    <Input
              type="number"
                      {...field}
            
                      placeholder={t("addUser.InstallmentPeriod")}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />  


<FormField
              control={form.control}
              name="firstPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.firstPayment")} <span className="text-primary/90">{t("addUser.InstallmentSystem")}</span> </FormLabel>
                  <FormControl>
                    <Input
                  type="number"
                      {...field}
             
                      placeholder={t("addUser.firstPayment")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


<FormField
              control={form.control}
              name="annualInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.annualInterest")} <span className="text-primary/90">{t("addUser.InstallmentSystem")}</span>  </FormLabel>
                  <FormControl>
                    <Input
                   type="number"
                      {...field}
                
                      placeholder={` ${t("addUser.annualInterest")} %`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<div className="grid grid-cols-3 gap-5"><FormField
              control={form.control}
              name="priceM"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("addUser.priceM")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                
                      placeholder="priceM"
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
                  <FormLabel>{t("addUser.start")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                 
                      placeholder={`${t("addUser.start")}..`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("addUser.currency")}</FormLabel>
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
                          {locale === "ar" ? amenity.name.ar : amenity.name.en}
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
            name="file"
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
           <span className="text-red-600">{errorr}</span>     
              </FormItem>
            )}
          />
        </div>
        <Button 
  type="submit" 
  disabled={loading} // Disable the button while loading
>
  {loading ? 'Submitting...' : 'Submit'} {/* Change text while loading */}
</Button>
      </form>
    </Form>
  );
}

export default Page;
