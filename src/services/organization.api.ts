"use client";

const host = process.env.NEXT_API_ENDPOINT;

export enum OrgStatus {
  Approved = "APPROVED",
  Rejected = "REJECTED",
  Requested = "REQUESTED",
}

export interface OrgParams {
  skip?: number;
  take?: number;
  include?: string | string[];
  orderBy?: string;
  search_column?: string;
  search?: string;
  organizationStatus?: string;
}

export interface RejectOrgParams {
  id: string;
  reason: string;
}

export const getOrgList = async (
  authorization: string,
  params: OrgParams
): Promise<any> => {
  const queryParams = new URLSearchParams(params as any).toString();
  const res = await fetch(`${host}/organization/org-list?${queryParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });

  return res.json();
};

export const rejectOrg = async (
  authorization: string,
  params: RejectOrgParams
): Promise<any> => {
  const queryParams = new URLSearchParams(params as any).toString();

  const res = await fetch(`${host}/organization/reject-org?${queryParams}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });

  return res.json();
};

export const acceptOrg = async (
  authorization: string,
  id: string
): Promise<any> => {
  const queryParams = new URLSearchParams({ id }).toString();

  const res = await fetch(`${host}/organization/approve-org?${queryParams}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });

  return res.json();
};

export const deleteOrg = async (
  authorization: string,
  id: string
): Promise<any> => {
  const queryParams = new URLSearchParams({ id }).toString();

  const res = await fetch(`${host}/organization/delete-org?${queryParams}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });

  return res.json();
};

export interface CreateOrgParams {
  organizationName?: string;
  gstNumber?: string;
  gstCertificate?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  address?: string;
}

export const createOrg = async (
  authorization: string,
  createOrgParams: CreateOrgParams
): Promise<any> => {
  const res = await fetch(`${host}/organization/create-org`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createOrgParams),
  });

  return res.json();
};

export const updateOrg = async (
  authorization: string,
  id: string,
  createOrgParams: CreateOrgParams
): Promise<any> => {
  const queryParams = new URLSearchParams({ id }).toString();

  const res = await fetch(`${host}/organization/update-org?${queryParams}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createOrgParams),
  });

  return res.json();
};
