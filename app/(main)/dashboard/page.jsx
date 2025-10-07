"use client";

import React from "react";
import Provider from "@/provider"; 
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";

export default function Dashboard() {
  return (
    <Provider>
      <WelcomeContainer />
      <h2 className="my-3 font-bold text-2xl mt-8">Dashboard</h2>
      <CreateOptions/>
    </Provider>
  );
}
