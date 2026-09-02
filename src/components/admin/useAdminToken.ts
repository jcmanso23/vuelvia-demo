"use client";

import { useEffect, useState } from "react";

const KEY = "vuelvia_admin_token";

export function useAdminToken() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(window.localStorage.getItem(KEY) ?? "");
  }, []);

  function saveToken(value: string) {
    setToken(value);
    window.localStorage.setItem(KEY, value);
  }

  return { token, saveToken };
}
