import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { List, TypeOutline, Clock, Mail, ArrowLeft, Plus ,Copy} from "lucide-react";
import Dashboard from "../../page";
import Link from "next/link";
import { toast } from "sonner";


function InterviewLink({ interview_id, formData }) {
     const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;
  const GetInterviewUrl = () => {
    return url;
  }

  const onCopyLink=async()=>{
    await navigator.clipboard.writeText(url);
    toast('Link Copied')
    


  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src={"/check.png"}
        alt="check"
        width={150}
        height={150}
        className="w-[60px] h-[60px]"
      />
      <h2 className="font-bold text-xl mt-4">
        {" "}
        Your AI Interview is Ready Now!
      </h2>
      <br />
      <p className="mt-3 text-sm">
        Share this link with your candidates to start the interview process
      </p>

      <div className="w-full p-7 mt-6 rounded-xl bg-white">
        <div className="flex justify-between items-center ">
          <h2 className=" text-lg text-blue-900">Interview Link</h2>
          <p className="p-1 px-2  text-primary bg-blue-50">Valid for 30 Days</p>
        </div>
        <div className="mt-3 flex gap-3 items-center">
          <Input defaultValue={GetInterviewUrl()} disabled={true} />
          <Button onClick={()=>onCopyLink()}><Copy/> Copy Link</Button>
        </div>

        <hr className="my-5" />
        <div className="flex gap-5">
          <h2 className="text-sm  text-gray-500 flex  gap-2 items-center">
            <Clock className="h-4 w-4" />
            {formData?.duration}
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" /> 10 Questions
          </h2>
          {/* <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Calender className='h-4 w-4'/>30 Min {formData?.duration}</h2>*/}
        </div>
      </div>

      <div className="mt-7 bg-gray p-5 rounded-lg w-full bg-blue-50 border border-blue-200">
        <h2 className="text-lg font-semibold">Share Via</h2>
        <div className="flex gap-7 mt-2 border border-blue-500 p-5 rounded-lg">
          <Button variant="outline" className="">
            <Mail />
            Mail
          </Button>
          <Button variant="outline" className="">
            <Mail />
            Stack
          </Button>
          <Button variant="outline" className="">
            <Mail />
            Whatsapp
          </Button>
        </div>
      </div>

      <div className="flex w-full gap-5 justify-between mt-8">
        <Link href={"/dashboard"}>
          <Button variant={"outline"}>
            <ArrowLeft />
            Back to Dashboard
          </Button>
        </Link>
        <Link href={"/create-interview"}>
          <Button>
            <Plus /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
