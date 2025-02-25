

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

export const like = async (favorites,userid) => {

  try {



      console.log(userid)


    const data = { favorites };
    const response = await fetch(`${URL_SERVER}/api/users/${userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to like property");
      }


    const responseData = await response.json();
    console.log("Property liked successfully:", responseData);
    
      return responseData.user.favorites
  } catch (error) {
    console.log(error);
    console.error("Error liking property:", error.message);
    throw error; 
  }
};
