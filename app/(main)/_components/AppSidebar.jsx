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
        <div className="flex items-center mb-2 ml-5">
          <Image src="/logo.jpg" alt="logo" width={85} height={85} />
          <h1 className="text-2xl font-semibold tracking-wide ml-2">
            <span className="text-indigo-900">Inter</span>
            <span className="text-blue-400">Vox</span>
          </h1>
        </div>
        <Link href="/dashboard/create-interview">
          <Button className="w-[90%] mt-5">
            <Plus className="mr-2" /> Create New Interview
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
                  className={`p-5 ${path == option.path && "bg-blue-50"}`}
                >
                  <Link href={option.path}>
                    <option.icon
                      className={`${path == option.path && "text-primary"}`}
                    />
                    <span
                      className={` font- medium text-[16px] ${
                        path == option.path && "text-primary"
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
