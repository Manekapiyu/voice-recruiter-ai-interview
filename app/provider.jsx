"use client";
import React, { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Provider = () => {
  const createNewUser = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }

    // Check if user already exists
    let { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user?.email);

    if (error) {
      console.error("Error fetching Users table:", error.message);
      return;
    }

    console.log("Existing Users:", Users);

    // If not found, create new user
    if (!Users || Users.length === 0) {
      const { data, error: insertError } = await supabase.from("Users").insert([
        {
          name: user?.user_metadata?.name,
          email: user?.email,
          picture: user?.user_metadata?.picture,
        },
      ]);

      if (insertError) {
        console.error("Error inserting new user:", insertError.message);
      } else {
        console.log("New user created:", data);
      }
    }
  };

  useEffect(() => {
    createNewUser();
  }, []);

  return <div>Provider</div>;
};

export default Provider;
