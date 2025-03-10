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
