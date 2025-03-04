"use client";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useConversationContext } from "@/app/context/ConversationProvider";
import useGetConversations from "@/hooks/useGetConversations";
import { toast } from "@/hooks/use-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversationContext();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
	console.log(search)
    if (!search) return;
	console.log(search)
    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );
	console.log(search)
    console.log(1);
    if (conversation) {
      console.log(2);
      setSelectedConversation(conversation);
      setSearch("");
    } else
      toast({
        description: "not such user found",
        className: "bg-red-500 text-white p-4 rounded shadow-lg",
      });
  };

  return (
    <form className="flex items-center  gap-2" onSubmit={handleSubmit}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search…"
        className="input bg-[#F0F2F5]  focus-visible:ring-0 "
      />

      <Button type="submit" className=" text-white ">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </Button>
    </form>
  );
};
export default SearchInput;
