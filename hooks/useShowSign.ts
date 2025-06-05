import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function useShowSign() {
  const router = useRouter();
  const { status } = useSession();
  const params = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (params.get("login") === "true") {
      setShowLoginModal(true);
    }
  }, [params]);

  const closeModal = () => {
    setShowLoginModal(false);

    // Create a new instance so we can modify it
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("login");

    // Push the URL without the login param
    router.push(`?${newParams.toString()}`);
  };

  return { closeModal, showLoginModal,setShowLoginModal };
}

export default useShowSign;
