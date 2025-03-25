import { toast } from "@/hooks/use-toast";
import { Console } from "console";

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
    toast({
      description: "An error occurred while trying to delete the property.",
    });

  }
}



export const toggleFeaturedProperty = async (id: string, featured: boolean, session) => {
  try {
    const response = await fetch(`${URL_SERVER}/api/properties/featured/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ featured: featured, userId: session.user.id }),
    });

    if (!response.ok) {
      throw new Error("Failed to toggle featured property");
    }

    toast({
      description: featured
        ? "The property has been marked as featured"
        : "The property has been unmarked as featured",
    });
  } catch (error) {
    toast({
      description: "Error toggling featured property",
    });
    console.error("Error toggling featured property:", error);
    throw error;
  }
};