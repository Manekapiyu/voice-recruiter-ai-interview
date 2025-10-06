"use client";

import React from "react";
import { useUser } from "@/provider";

function WelcomeContainer() {
  const { user } = useUser();

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome Back, {user.name}</h2>
    </div>
  );
}

export default WelcomeContainer;
