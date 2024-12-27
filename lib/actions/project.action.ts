import { useSharedState } from "@/app/context/stateProvider";
import { toast } from "@/hooks/use-toast";

export async function deleteProject({id}: { id: string }){


    const confirmDelete = window.confirm(
        "Are you sure you want to delete this projecc? This action cannot be undone."
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(`http://localhost:5001/api/projects/${id}`, { 
          method: "DELETE",
        });
    
        console.log(response);
    
        if (!response.ok) {
          throw new Error("Failed to delete project");
        }
    
     toast({
      description: "the project deleted succussfuly",
    })
    
    
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert("An error occurred while trying to delete the project.");
      }

}


export const updateReq= (e)=>{
      console.log(e.target.value)

  console.log(e)
}