import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import {Plus} from "lucide-react"

import { Button } from "@/components/ui/button";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader  className='flex item-center mt-4 '>
      <div className="flex items-center mb-2 ml-5" >
        <Image src={"/logo.jpg"} alt="logo" width ={85} height={85}/>
        <h1 className=" text-2xl font-semibold tracking-wide">
            <span className="text-indigo-900">Inter</span>
            <span className="text-blue-400">Vox</span>
          </h1>
          </div>
          <Button className="w-full mt-5"><Plus /> Create New Interview </Button>
          </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}