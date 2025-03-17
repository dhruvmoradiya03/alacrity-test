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

export const getCurrentUser = async (authorization: string): Promise<any> => {
  const res = await fetch(`${host}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
    },
  });

  return res;
};

export interface EditMainAdminPayload {
  email?: string;
  name?: string;
  countryCode?: string;
  phoneNumber?: string;
}

export const editCurrentUser = async (
  authorization: string,
  editMainAdminPayload: EditMainAdminPayload
): Promise<any> => {
  const res = await fetch(`${host}/auth/edit-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editMainAdminPayload),
  });

  return res;
};

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (
  authorization: string,
  changePasswordPayload: ChangePasswordPayload
): Promise<any> => {
  const queryParams = new URLSearchParams(
    changePasswordPayload as any
  ).toString();

  const res = await fetch(
    `${host}/auth/change-main-admin-password?${queryParams}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authorization}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

export const logoutUser = async (authorization: string): Promise<any> => {
  const res = await fetch(`${host}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
    },
  });

  return res;
};
