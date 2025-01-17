"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/Company/data-table";
import { Project, useColumns } from "./Columns";
import { useSession } from "next-auth/react";
import Title from "@/components/Company/titile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TableSkelton from "@/components/TableSkelton";
import { useSharedState } from "@/app/context/stateProvider";
import { useTranslations } from "next-intl";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

export default function DemoPage() {
   const columns = useColumns();
  const [loading, setLoading] = useState(true);
  const {projects,setProjects}=useSharedState()
  const { data: session,status  } = useSession();
  const t = useTranslations()
 const id = session?.user?.id

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${URL_SERVER}/api/agency/${id}`);
        const result = await response.json();
        setProjects(result.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    if(status==="authenticated") fetchProjects();

 }, [status, id]);

  return (
    <div className="mx-auto py-10">
      <div className="flex w-full justify-between">
        <Title name="Project" />
        <Link href={"project/addProject"}>
          <Button>{t("project.add_Project")}</Button>
        </Link>
      </div>

      {loading ? (
        <TableSkelton/>
      ) : (
        <DataTable columns={columns} data={projects} columFilter="title" />
      )}
    </div>
  );
}
