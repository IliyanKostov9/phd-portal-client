"use client";

import { useSelector } from "react-redux";
import selectSessionToken from "../features/sessionToken/slices/sessionTokenMemoSelector";
const API_URL = "/api/logs";

export default function LogsAPI() {
  const sessionToken = useSelector(selectSessionToken);

  const saveLog = async (log) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: sessionToken.accessToken
        },
        body: JSON.stringify(log)
      });

      const result = await response.json();
      return result;
    } catch (exception) {
      console.error(`Server error when trying to log in ${exception}`);
    }
  };

  return {
    saveLog
  };
}
