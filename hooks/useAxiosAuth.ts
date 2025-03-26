"use client";

import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useCallback, useMemo } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  
  // Always get the latest access token
  const getAccessToken = () => session?.user?.accessToken;

  console.log("getAccessToken",getAccessToken());

  useEffect(() => {
    if (!getAccessToken()) return;

    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          // Refresh the token
          await refreshToken();

          // Ensure the latest token is used
          prevRequest.headers["Authorization"] = `Bearer ${getAccessToken()}`;
          return axiosAuth(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]); // Depend on session to always get the latest token

  return axiosAuth;
};

export default useAxiosAuth;
