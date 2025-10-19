"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../services/supabaseClient";

export const UserDetailContext = createContext(null);

export default function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: Users } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email);

      if (!Users || Users.length === 0) {
        const { data } = await supabase.from("Users").insert([{
          name: user.user_metadata?.name,
          email: user.email,
          picture: user.user_metadata?.picture,
        }]);
        setUser(data[0]);
        return;
      }

      setUser(Users[0]);
    };

    fetchUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) return { user: null, setUser: () => {} };
  return context;
};
