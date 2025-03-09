"use client";
import React, { useEffect } from "react";
import MessageInput from "../../../../components/messages/MessageInput";
import Messages from "../../../../components/messages/Messages";
import { TiMessages } from "react-icons/ti";
import { useConversationContext } from "@/app/context/ConversationProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSharedState } from "@/app/context/stateProvider";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";


function Page() {
  const { selectedConversation, setSelectedConversation } =
    useConversationContext();
  const isMobile = useIsMobile();
  const { showSidebar, setShowSidebar } = useSharedState();



  const locale = useLocale();

  useEffect(() => {
    // Cleanup function
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div
      className={`md:min-w-[450px] w-full  bg-[#EFEAE2]   flex-col transition-all duration-300  backdrop-blur-lg ${
        locale === "en" ? "rounded-r-[8px]" : "rounded-l-[8px]"
      }  shadow-sm
         ${showSidebar && isMobile ? "translate-x-full " : "translate-x-0 "}`}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#F0F2F5] flex items-center px-2 py-2 mb-2 rounded-tr-[8px]">
            {isMobile && (
              <button
                onClick={() => {
                  setShowSidebar(true);
                  setSelectedConversation("");
                }}
                className="self-start text-gray-600 "
              >
                <ChevronRight size={24} />
              </button>
            )}
            <span className="text-sm"> </span>{" "}
            <span className="text-gray-900 font-medium mx-1 text-sm">
           
              {selectedConversation.username}
            </span>
          </div>

          <Messages />

          <MessageInput />
        </>
      )}
    </div>
  );
}

export default Page;

const NoChatSelected: React.FC = () => {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-600 font-semibold flex flex-col items-center gap-2">
        <p>{t("search.Welcome")} 👋 </p>
        <p>{t("search.Select_a_chat_to_start_messaging")}</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
