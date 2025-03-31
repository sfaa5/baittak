import PaginationControll from "@/components/PaginationControll";
import axios from "axios";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BlogList = async ({ searchParams }: PageProps) => {
  const t = await getTranslations();
  const resolvedSearchParams = await searchParams;
  const queryParams = new URLSearchParams();

  for (const key in resolvedSearchParams) {
    const value = resolvedSearchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else if (value !== undefined) {
      queryParams.append(key, value);
    }
  }

  const page = queryParams.get("page") ?? "1";
  const per_page = 10;
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page);

  console.log("page", page);

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_SERVER}/api/blogs?page=${page}&limit=9`
  );

  const blogs = res.data.blogs;

  blogs.isNext = page < res.data.totalPages;

  return (
    <div className="container mt-5 md:container mx-auto px-0 2xl:px-[120px] ">
      {/* path */}
      <ul className="hidden text-sm md:flex items-center gap-2 mb-5">
        <li className="flex gap-3">
          <Link href={"/"}>
            <IoHomeSharp className="text-secondary" />
          </Link>

          <MdArrowForwardIos className="text-[#707070]" />
        </li>

        <li className="text-[#707070] flex gap-3 items-center">
          {t("blogs.blogs")}
        </li>
      </ul>
      <div className=" mt-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 ">
        {blogs.map((blog) => (
          <Link href={`blogs/${blog._id}`}>
            <div key={blog._id} className="border rounded h-full">
              <img
                src={blog.coverImage.url}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 pt-0 ">
                {" "}
                <h2 className="text-xl font-semibold mt-2">{blog.title}</h2>
                <p className="text-gray-500 mt-4">
                  {blog.author} •     {new Date(blog.createdAt).toLocaleDateString()}
             
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center mb-10 mt-5 px-4 py-3 sm:px-6">
        <PaginationControll
          length={blogs.totalPages}
          hasNextPage={blogs.isNext}
          hasPrevPage={start > 0}
        />
      </div>
    </div>
  );
};

export default BlogList;
