import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

function SignOut({ user }) {
  return (
    <div className="relative inline-block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100">
            <img
              src={user?.image || "/fallback-image.png"}
              alt="user"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">{user?.name || "User"}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-md py-1">
          <DropdownMenuItem
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <IoIosLogOut size={20} />
            <span className="text-sm font-medium">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SignOut;
