
import NextAuth from "next-auth";

declare module "next-auth"{
    interface Session{
        user:{
            name?:string|null
            email?:string|null
            image?:string|null
            phoneNumber?:string|null
            id:string
            role:string
            accessToken?:string
            refreshToken?:string

        }
    }

    interface JWT{
        id:string
    }
}