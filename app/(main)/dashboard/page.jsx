"use client";

import React from "react";
import Provider from "@/provider"; // make sure this path is correct
import WelcomeContainer from "./_components/WelcomeContainer";

export default function Dashboard() {
  return (
    <Provider>
      <WelcomeContainer />
    </Provider>
  );
}
