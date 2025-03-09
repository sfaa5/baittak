import { useState } from "react";
import { IoArrowBackSharp, IoSearchSharp } from "react-icons/io5";
import { Input } from "../ui/input";
import { useConversationContext } from "@/app/context/ConversationProvider";
import useGetConversations from "@/hooks/useGetConversations";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { debounce } from "lodash"; // Import lodash debounce

const SearchInput = () => {
  const { setFilteredResults, search, setSearch } = useConversationContext();
  const { conversations } = useGetConversations();
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState(search);

  // Debounced search function (runs after 300ms of no typing)
  const debouncedSearch = debounce((value) => {
    if (value.trim() === "") {
      setFilteredResults([]);
      return;
    }
    const filtered = conversations.filter((c) =>
      c.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(filtered);
  }, 300); // Adjust delay as needed

  // Handle input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Local state updates instantly
    setSearch(value); // Global state updates

    debouncedSearch(value); // Trigger debounced function
  };

  // Clear search
  const clearSearch = () => {
    setSearch("");
    setSearchTerm("");
    setFilteredResults([]);
  };

  console.log("search", search);

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {search ? (
          <motion.div
            key="back"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.1 }}
            className="absolute left-3 top-2 transform -translate-y-1/2"
          >
            <IoArrowBackSharp
              className="text-primary w-5 h-5 cursor-pointer"
              onClick={clearSearch}
            />
          </motion.div>
        ) : (
          <motion.div
            key="search"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.1 }}
            className="absolute left-2 top-2 transform -translate-y-1/2"
          >
            <IoSearchSharp className="text-gray-500 w-5 h-5 cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>

      <Input
        value={searchTerm}
        onChange={handleSearch}
        type="text"
        placeholder={search ? "" : t("landing.search")}
        className="w-full bg-[#F0F2F5] focus-visible:ring-0 pl-10 py-2 rounded-md"
      />
    </div>
  );
};

export default SearchInput;
