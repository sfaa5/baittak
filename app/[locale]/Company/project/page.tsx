"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/Company/data-table";
import { Project, columns } from "./Columns";

import Title from "@/components/Company/titile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TableSkelton from "@/components/TableSkelton";
import { useSharedState } from "@/app/context/stateProvider";

const URL_SERVER = process.env.NEXT_PUBLIC_URL_SERVER;

export default function DemoPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {projects,setProjects}=useSharedState()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${URL_SERVER}/api/projects/get`);
        const result = await response.json();
        setData(result.projects || []);
        setProjects(result.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="mx-auto py-10">
      <div className="flex w-full justify-between">
        <Title name="Project" />
        <Link href={"project/addProject"}>
          <Button>Add Project</Button>
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
