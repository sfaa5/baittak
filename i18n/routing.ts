
import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  pathnames:{
    "/":{
      en:"/",
      ar:"/"
    },
    "/User/Posts":{
      en:"/User/Posts",
      ar:"/User/Posts",
    },
    "/Company":{
      en:"/Company",
      ar:"/Company"
    },
    "/Company/about":{
      en:"/Company/about",
      ar:"/Company/about"
    },
    "/Company/Properties":{
      en:"/Company/Properties",
      ar:"/Company/Properties"
    }, 
       "/messages":{
      en:"/messages",
      ar:"/messages"
    },
    "/Plan":{
      en:"/Plan",
      ar:"/Plan"
    },

    


    "/Property":{
      en:"/Property",
      ar:"/العقارات"
      },
      "/Projects":{
        en:"/Projects",
        ar:"/المشاريع"
      },
      "/Agency":{
        en:"/Agency",
        ar:"/الوكيل"
      },
      "/User/AddPost":{
        en:"/User/AddPost",
        ar:"/User/AddPost"
      },
      "/Property/:id": {
        en: "/Property/:id",  
        ar: "/عقار/:id",      
      },
      "/User/Favorit": {
        en: "/User/Favorit",  
        ar: "/User/Favorit",      
      },"/User/plan":{
        en:"/User/plan",
        ar:"/User/plan"
      },"/User/Edit":{
        en:"/User/Edit",
        ar:"/User/Edit"
      },"/User/messages":{
        en:"/User/messages",
        ar:"/User/messages"
      },
      "/blogs":{
        en:"/blogs",
        ar:"/blogs"
      }


  },
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);