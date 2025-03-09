import { Project } from "@/app/[locale]/Company/project/Columns";

import { toast } from "@/hooks/use-toast";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

export async function deleteProject({
  id,
  setProjects,
}: {
  id: string;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {

    setProjects((prevData) => prevData.filter((item) => item._id !== id));
  try {
    const response = await fetch(`${URL_SERVER}/api/projects/${id}`, {
      method: "DELETE",
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }



    toast({
      description: "the project deleted succussfuly",
    });
  } catch (error) {
    console.error("Failed to delete project:", error);
      // **Rollback (التراجع)** في حالة فشل الطلب
      setProjects((prevData) => [...prevData, prevData.find((item) => item._id === id)!]);
    alert("An error occurred while trying to delete the project.");
  }
}

export const deleteSelectedRequests = async (
  selectedIds,
  setDataRequest,
  setReq,
  table
) => {
  try {
    const response = await fetch(`${URL_SERVER}/api/requests/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedIds }),
    });

    if (response.ok) {
      // Remove deleted requests from allRequest and dataRequest
      setDataRequest((prevData) =>
        prevData.filter((item) => !selectedIds.includes(item._id))
      );
      // setAllRequest((prevData) =>
      //   prevData.filter((item) => !selectedIds.includes(item._id))
      // );

      table.resetRowSelection(); // Clear table selection
    } else {
      console.error("Error deleting requests");
    }
  } catch (error) {
    console.error("Error deleting requests:", error);
  }
};

// export const starrSelectedRequests = async (selectedIds, setDataRequest, setStarRequest,starRequest, table) => {
//   try {
//     const response = await fetch("http://localhost:5001/api/requests/star", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ids: selectedIds }),
//     });

//     if (response.ok) {

//       setStarRequest((prevStarred) => [
//         ...prevStarred,
//         ...selectedIds.map((id) =>
//           prevStarred.find((item) => item._id === id)
//         ),
//       ]);

//       // // // Mark selected requests as starred in both dataRequest and starRequest
//       // setDataRequest(starRequest
//       // );

//       table.resetRowSelection(); // Clear table selection
//     } else {
//       console.error("Error starring requests");
//     }
//   } catch (error) {
//     console.error("Error starring requests:", error);
//   }
// };
// export const unstarSelectedRequests = async (selectedIds, setDataRequest, setStarRequest,starRequest, table) => {
//   try {
//     const response = await fetch("http://localhost:5001/api/requests/unstar", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ids: selectedIds }),
//     });

//     if (response.ok) {
//       console.log("starring requests:", starRequest);
//       console.log("selectedIds:", selectedIds);
//       // Update the starred requests state
//       setStarRequest((prevStarred) =>
//         prevStarred.filter((item) => !selectedIds.includes(item._id))
//       );

//       console.log("starring requests:", starRequest);

//       // Clear table selection
//       table.resetRowSelection();
//     } else {
//       console.error("Error unstarring requests");
//     }
//   } catch (error) {
//     console.error("Error unstarring requests:", error);
//   }
// };
