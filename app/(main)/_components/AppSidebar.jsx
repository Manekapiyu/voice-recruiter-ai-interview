"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SideBarOptions } from "@/services/Constants";
import { usePathname } from "next/navigation";

export default function AppSidebar() {

  const path = usePathname();
  console.log(path);
  return (
    <Sidebar>


      <SidebarHeader className="flex flex-col items-center mt-4">
        <div className="flex items-center mb-2 ml-2">
          <Image src="/logo.png" alt="logo" width={85} height={85} />
          <h1 className="text-2xl font-semibold tracking-wide ">
            <span className="text-indigo-300">Inter</span>
            <span className="text-blue-400">Vox</span>
          </h1>
        </div>
        <Link href="/dashboard/create-interview" className="w-[90%] mt-5">
          <Button className="w-full">
            <Plus className="mr-1" /> Create New Interview
          </Button>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {SideBarOptions.map((option, index) => (
              <SidebarMenuItem key={index} className="p-1">
                <SidebarMenuButton
                  asChild
                  className={`p-5 ${path === option.path ? "bg-gray-100" : ""
                    }`}
                >
                  <Link href={option.path} className="flex items-center gap-2">
                    <option.icon
                      className={`text-[20px] ${path === option.path ? "text-blue-600" : "text-gray-400 "
                        }`}
                    />
                    <span
                      className={`font-medium text-[16px] ${path === option.path ? "text-blue-600" : "text-gray-300 hover:text-blue-600"
                        }`}
                    >
                      {option.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />

    </Sidebar>
  );
}
