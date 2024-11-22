"use client";
import {
    Sheet,
    SheetContent,

    SheetTrigger,
  } from "@/components/ui/sheet";
  import { usePathname } from "next/navigation";
  import Link from "next/link";
  import { CiMenuFries } from "react-icons/ci";
  import Image from "next/image";

  const links = [
    {
      name: "Property",
      path: "/",
    },
    {
      name: "Projects",
      path: "/Projects",
    },
    {
      name: "Agency",
      path: "/Agency",
    },
    {
      name: "property",
      path: "/property",
    },
  ];

function MobileNavbar() {
    const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-secondry" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-14 mb-40 text-center text-2xl">
          <Link href="/">
          <Image src="/BaittakLOGO1 2.png" alt="logo" width={200} height={30} />
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={` ${
                  link.path === pathname &&
                  "text-secondry border-b-2 border-secondry"
                } text-xl capitalize hover:text-primary transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-t-2 border-indigo-500">
            kbklfb
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar