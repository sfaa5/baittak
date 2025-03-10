import { toast } from "@/hooks/use-toast";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

export async function deleteProperty({ id, setProperty }) {
  try {

    setProperty((prevData) =>
      prevData.filter((property) => property._id !== id)
    );
    
    const response = await fetch(`${URL_SERVER}/api/properties/${id}`, {
      method: "DELETE",
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to delete property");
    }

    toast({
      description: "the user deleted succussfuly",
    });


  } catch (error) {
    console.error("Failed to delete property", error);
    alert("An error occurred while trying to delete the property.");
  }
}
