
import GoogleProvider from "next-auth/providers/google";

// Type augmentation for NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` property to the user object
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // Add the `id` property to the user object
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/',
  },

  callbacks: {
    async signIn({ user }:any) {
      try {
        console.log("uaweeee",user);

        if (!user.email) {
          console.error("User email is missing");
          return false;
        }

        const response = await fetch(`${process.env.API_URL}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        });

        if (!response.ok) {
          console.error("Failed to create or fetch user:", await response.text());
          return false;
        }

        // Parse the response and assign the user ID
        const { data } = await response.json();
        user.id = data._id; // Safely assign the ID
        console.log(user);
        console.log(data);

        return true;
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false;
      }
    },

    async jwt({ token, user }:any) {
      // If the user is present (on sign in), add the user's ID to the token
      if (user) {
        token.id = user.id; // Store the user ID in the token
      }

      console.log("Token in jwt callback:", token);
      return token;
    },

    async session({ session, token }:any) {
      // Add the token's ID to the session's user object
      session.user.id = token.id;
      console.log("Session in session callback:", session);
      return session;
    },
  },

  
};
