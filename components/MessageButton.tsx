"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

function MessageButton() {
  const t = useTranslations();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER || "http://localhost:3000";
  
  const locale = useLocale()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      if (!session) {
        toast({
          description: t("footer.unauthorized"),
        });
        router.push("/?login=true");
        return;
      }

      if (!message.trim()) {
        toast({
          description: t("footer.emptyMessageError"),
        });
        setLoading(false);
        return;
      }

      const user = session?.user.id;
      const email = session?.user.email;
      const username = session?.user.name;
      const phoneNumber = session?.user.phoneNumber;
      const response = await fetch(`${URL_SERVER}/api/requests/Send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, user,email,username,phoneNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the server");
      }

      toast({
        description: t("footer.success"),
      });

      setMessage(""); // Clear the input after successful submission
    } catch (error) {
      console.error("Error during form submission:", error);
      toast({
        description: t("footer.error"),
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
<div className="relative w-full max-w-lg mt-6">
  <input
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    type="text"
    placeholder={t("footer.contact")}
    className={`w-full px-1 sm:px-5 h-14 py-6 border text-black rounded-[6px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-100 ${
      locale === "ar" ? "pr-3 pl-6" : "pl-3 pr-6" // Conditional padding based on language direction
    }`}
  />
  <button
    onClick={handleSubmit}
    disabled={loading}
    className={`absolute ${
      locale === "ar" ? "left-2 sm:left-4" : "right-2 sm:right-4"
    } top-1/2 transform -translate-y-1/2 ${
      loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
    } text-white px-8 sm:px-10 py-2 rounded-[6px] font-medium text-sm`}
  >
    {loading ? t("footer.submitting") : t("footer.submit")}
  </button>
</div>

  );
}

export default MessageButton;
