
import React from "react";

import { getTranslations } from "next-intl/server";
import PlanCard from "@/components/PlanCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { formatDistanceToNow } from "date-fns";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

async function Page() {
  const t = await getTranslations("plan");
  const session = await getServerSession(authOptions as object); // Load translations from the "common" namespace
  const id = session?.user.id;
  const response = await fetch(`${URL_SERVER}/api/plans`);

  const responseUser = await fetch(`${URL_SERVER}/api/agency/${id}`);
  const rowData = await responseUser.json();
  const dataUserr = rowData.agency;
  const data = await response.json();

  
  const limit = dataUserr.activePlan?.limit | 0;
  const freeLimit = dataUserr.freePlanLimit;
  console.log("freeLimit", freeLimit);
  const postsLeft = limit + freeLimit - dataUserr.propertiesPosted;
  const totalLimit = freeLimit + limit;
  const progressPercentage = (dataUserr.propertiesPosted / totalLimit) * 100;
  console.log("progressPercentage", progressPercentage);
  const expiresAt = dataUserr.activePlan?.expiresAt
    ? new Date(dataUserr.activePlan.expiresAt)
    : null;


  const timeUntilExpiration = expiresAt
    ? formatDistanceToNow(expiresAt, { addSuffix: true })
    : "";

  return (
    <div>
    <h1 className="h1 py-0 mt-5">{t("select_ad_packages")}</h1>

    <div className="border mt-3 p-4 rounded-md bg-white shadow-sm">
      <h1 className="text-xl font-semibold mb-4">
        {t("current_subscription_part1")}        <span className="text-primary font-medium ml-2">
          {dataUserr.activePlan?.name || t("free")}
        </span>

      </h1>

      <p className="text-gray-700 text-sm mb-2">
        {t("posts_left")}: <span className="text-primary font-medium ml-1">{postsLeft}</span>
      
      </p>

      <div className="relative mb-4">
        <div className="relative w-full bg-gray-200 rounded-full h-4">
          <div
            className="absolute top-0 left-0 bg-primary h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          {t("progress")}: {Math.round(progressPercentage)}%
        </p>
      </div>

      {timeUntilExpiration && (
        <p className="text-gray-500 text-sm">
          <span className="text-primary font-medium">
            {timeUntilExpiration}
          </span>{" "}
          {t("time_until_expiration")}
        </p>
      )}
    </div>

    <div className="w-full flex items-center justify-center mt-10">
      <PlanCard plan={data} />
    </div>
  </div>
  );
}

export default Page;
