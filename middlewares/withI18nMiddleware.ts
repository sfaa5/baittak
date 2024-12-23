import  createMiddleware  from 'next-intl/middleware';
// middlewares/withI18nMiddleware.ts
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import {routing} from "../i18n/routing"
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { CustomMiddleware } from './chain';


function getLocale(request: NextRequest): string | undefined {

    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
   
   // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
   
   const locale = matchLocale(languages, locales, routing.defaultLocale);
    return locale;
   }


   


   export function withI18nMiddleware(middleware: CustomMiddleware) {
 return async (
 request: NextRequest,
 event: NextFetchEvent,
 response: NextResponse
 ) => {



  createMiddleware(routing);

return middleware(request, event, response);
 };
}
   