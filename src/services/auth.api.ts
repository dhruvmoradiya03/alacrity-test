"use client";
import axios from "axios";

const host = process.env.NEXT_API_ENDPOINT;

console.log("host", host);

export enum UserType {
  MAIN_ADMIN = "MAIN_ADMIN",
  ORG_SUPER_ADMIN = "ORG_SUPER_ADMIN",
  ORG_SUB_ADMIN = "ORG_SUB_ADMIN",
  CLIENT_ADMIN = "CLIENT_ADMIN",
}

export interface loginPayload {
  email?: string;
  password?: string;
  userType?: UserType;
}
export const signIn = async (payload: loginPayload): Promise<any> => {
  const { email, password, userType } = payload;

  const res = await fetch(`${host}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, userType }),
  });

  return res;
};
