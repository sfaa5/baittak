import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Type augmentation for NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` property to the user object
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phoneNumber?: string | null;
      accessToken?: string | null;
      refreshToken?: string | null;
      role: string | null;
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

    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials || {};
        console.log("hereeeeeeee");

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_SERVER}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!response.ok) {
            throw new Error("Invalid email or password");
          }

          const user = await response.json();

          console.log("userrrrr", user);

          return {
            id: user.data._id,
            name: user.data.username,
            email: user.data.email,
            image: user.data.image || null,
            role: user.data.role || null,
            phoneNumber: user.data.phoneNumber || null,
          };
        } catch (error) {
          console.error("Error in credentials login:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        console.log("uaweeee", user);

        if (!user.email) {
          console.error("User email is missing");
          return false;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_SERVER}/api/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to create or fetch user:", errorText);
          return "/?login=true";
        }

        // Parse the response and assign the user ID
        const { data, accessToken, refreshToken } = await response.json();
        user.id = data._id; // Safely assign the ID
        user.role = data.role;
        user.name = data.username;
        user.phoneNumber = data.phoneNumber || "";
        user.image = data.image?.url || "";
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        console.log(user);
        console.log(data);

        return true;
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false;
      }
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      // If the user is present (on sign in), add the user's ID to the token
      if (user) {
        token.id = user.id; // Store the user Id in the token
        token.role = user.role;
        token.image = user?.image;
        token.name = user.name;
        token.phoneNumber = user.phoneNumber || "";
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      console.log("Token in jwt callback:", token);
      return token;
    },

    async session({ session, token }) {
      // Add the token's ID to the session's user object
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.image = token?.image;
      session.user.name = token.name;
      session.user.phoneNumber = token.phoneNumber || "";
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      console.log("Session in session callback:", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to home with the query parameter if `signIn` returns `/?login=true`
      if (url === "/?login=true") {
        return `${baseUrl}/?login=true`; // Append `login=true` to the base URL
      }

      return url; // Allow other redirects to work as expected
    },
  },
};
