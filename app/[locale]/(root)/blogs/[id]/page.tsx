

import axios from "axios";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

const BlogDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const t = await getTranslations();
  

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_SERVER}/api/blogs/${id}`
  );

  const blog = response.data
  
  return (
    <div className="container mt-6 md:container mx-auto px-0 2xl:px-[120px] ">

      {/* path */}
      <ul className="hidden text-sm md:flex items-center gap-2 mb-5">
        <li className="flex gap-3">
          <Link href={"/"}>
            <IoHomeSharp className="text-secondary" />
          </Link>

          <MdArrowForwardIos className="text-[#707070]" />
        </li>

        <li className="text-[#707070] flex gap-3 items-center">
        <Link href={"/blogs"}>
          {t("blogs.blogs")}
          </Link>
          <MdArrowForwardIos className="text-[#707070]" />
       
        </li>

        <li className="text-[#707070] flex gap-3 items-center">
      
          {blog.title}
          
    
       
        </li>

        
      </ul>

      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-500">
        {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <img
        src={blog.coverImage.url}
        alt={blog.title}
        className="w-full h-80 object-cover mt-4 bg-center rounded-md"
      />
      <p className="mt-6 break-words whitespace-pre-line">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
