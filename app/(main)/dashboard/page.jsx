"use client";

import React from "react";
import Provider from "@/provider"; 
import WelcomeContainer from "./_components/WelcomeContainer";

export default function Dashboard() {
  return (
    <Provider>
      <WelcomeContainer />
    </Provider>
  );
}
