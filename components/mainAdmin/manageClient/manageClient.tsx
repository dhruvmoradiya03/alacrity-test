"use client";
import { Roboto } from "next/font/google";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Table, TableProps, Dropdown, Menu } from "antd";
import Image from "next/image";
import { EllipsisOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getOrgList, OrgParams } from "@/services/organization.api";
import RejectRequest from "../rejectRequest/rejectRequest";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

interface ClientData {
  serialNo: number;
  organizationName: string;
  gstNumber: string;
  gstCertificate: string;
  createdAt: string;
  organizationStatus: string;
}

const ManageClient = () => {
  const [loader, setLoader] = useState(true);
  const [orgData, setOrgData] = useState<ClientData[]>([]);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ClientData | null>(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchAllOrg = async (page = 1) => {
    try {
      setLoader(true);
      const idToken: any = localStorage.getItem("token");

      const params: OrgParams = {
        orderBy: "createdAt|desc",
        skip: (page - 1) * pagination.pageSize,
        take: pagination.pageSize,
      };

      const res = await getOrgList(idToken, params);

      if (res.list.length !== 0) {
        setOrgData(res.list);
        setPagination({
          ...pagination,
          current: page,
          total: res.total,
        });
      } else {
        setOrgData([]);
        setPagination({
          ...pagination,
          current: page,
          total: res.total,
        });
      }
    } catch (error) {
      console.error("Error fetching organizations: ", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchAllOrg();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchAllOrg(pagination.current);
  };

  const handleMenuClick = (e: any, record: ClientData) => {
    if (e.key === "edit") {
      // Handle edit action
    } else if (e.key === "delete") {
      // Handle delete action
    }
  };

  const handleRejectClick = (record: ClientData) => {
    setSelectedRecord(record);
    setRejectModalVisible(true);
  };

  const handleRejectSubmit = (reason: string) => {
    console.log("Rejected reason:", reason);
    setRejectModalVisible(false);
    setSelectedRecord(null);
  };

  const menu = (record: ClientData) => (
    <Menu onClick={(e) => handleMenuClick(e, record)}>
      <Menu.Item key="edit">
        <div className="flex items-center">
          <Image src="/images/edit.svg" alt="Edit" width={16} height={16} />
          <span className="ml-2">Edit</span>
        </div>
      </Menu.Item>
      <Menu.Item key="delete">
        <div className="flex items-center">
          <Image src="/images/trash.svg" alt="Delete" width={16} height={16} />
          <span className="ml-2">Delete</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const columns: TableProps<ClientData>["columns"] = [
    {
      title: <div className="text-center">SR. NO.</div>,
      dataIndex: "serialNo",
      key: "serialNo",
      width: "5%",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">ORGANIZATION NAME</div>,
      dataIndex: "organizationName",
      key: "organizationName",
      width: "20%",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">GST. NO.</div>,
      dataIndex: "gstNumber",
      key: "gstNumber",
      width: "15%",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: <div className="text-center">GST CERTIFICATE</div>,
      dataIndex: "gstCertificate",
      key: "gstCertificate",
      width: "20%",
      render: (text) => (
        <div className="flex items-center justify-center">
          <Image src="/images/pdf-icon.svg" alt="PDF" width={24} height={24} />
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
    {
      title: <div className="text-center">Date and Time</div>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      render: (text) => (
        <div className="text-center">{new Date(text).toLocaleString()}</div>
      ),
    },
    {
      title: <div className="text-center">STATUS</div>,
      dataIndex: "organizationStatus",
      key: "organizationStatus",
      width: "10%",
      render: (status, record) => (
        <div className="text-center">
          {status === "APPROVED" ? (
            <span className="text-green-500 text-[16px]">Approved</span>
          ) : status === "REJECTED" ? (
            <span className="text-red-500 text-[16px]">Rejected</span>
          ) : (
            <div className="flex justify-center items-center gap-4">
              <Image
                src="/images/tick-square.svg"
                alt="Approve"
                width={30}
                height={30}
                className="cursor-pointer"
              />
              <Image
                src="/images/close-square.svg"
                alt="Reject"
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={() => handleRejectClick(record)}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: <div className="text-center">ACTION</div>,
      key: "action",
      width: "10%",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2">
          <Dropdown overlay={menu(record)} trigger={["click"]}>
            <EllipsisOutlined
              style={{
                fontSize: "24px",
                transform: "rotate(90deg)",
                cursor: "pointer",
              }}
            />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="w-[85%] h-screen">
        <Navbar />
        <div className="p-6">
          <Table
            columns={columns}
            dataSource={orgData.map((item: any, index) => ({
              ...item,
              serialNo:
                index + 1 + (pagination.current - 1) * pagination.pageSize,
              key: item.id,
            }))}
            pagination={
              pagination.total > pagination.pageSize ? pagination : false
            }
            onChange={handleTableChange}
            loading={loader}
            className="w-full"
          />
        </div>
      </div>
      <RejectRequest
        visible={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        onSubmit={handleRejectSubmit}
      />
    </div>
  );
};

export default ManageClient;
