import { toast } from "@/hooks/use-toast";

export async function deleteProperty({id}: { id: string }){


    const confirmDelete = window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(`http://localhost:5001/api/properties/${id}`, { 
          method: "DELETE",
        });
    
        console.log(response);
    
        if (!response.ok) {
          throw new Error("Failed to delete property");
        }
    
     toast({
      description: "the user deleted succussfuly",
    })
    
    
      } catch (error) {
        console.error("Failed to delete property:", error);
        alert("An error occurred while trying to delete the property.");
      }

}