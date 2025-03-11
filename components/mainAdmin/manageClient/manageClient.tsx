"use client";
import { Roboto } from "next/font/google";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Table, TableProps, Dropdown, Menu, message, Button } from "antd";
import Image from "next/image";
import { EllipsisOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getOrgList,
  OrgParams,
  rejectOrg,
  RejectOrgParams,
  acceptOrg,
  deleteOrg,
} from "@/services/organization.api";
import RejectRequest from "../rejectRequest/rejectRequest";
import ClientDetail from "./clientDetail";

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
  id: string;
  email: string;
  mobile: string;
  address: string;
}

const ManageClient = () => {
  const [loader, setLoader] = useState(true);
  const [orgData, setOrgData] = useState<ClientData[]>([]);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
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
    e.domEvent.stopPropagation();
    if (e.key === "edit") {
      // Handle edit action
    } else if (e.key === "delete") {
      setSelectedRecord(record);
      setDeleteModalVisible(true);
    }
  };

  const handleRejectClick = (record: ClientData) => {
    setSelectedRecord(record);
    setRejectModalVisible(true);
  };

  const handleRejectSubmit = async (reason: string) => {
    if (!selectedRecord) {
      message.error("Failed to reject organization.");
      return;
    }

    if (!reason || reason === "") {
      message.error("Please specify reason to reject organization");
      return;
    }

    try {
      const idToken: any = localStorage.getItem("token");
      const params: RejectOrgParams = {
        id: selectedRecord.id,
        reason,
      };

      const res = await rejectOrg(idToken, params);

      if (res) {
        message.success("Organization rejected successfully");
        setOrgData((prevData) =>
          prevData.map((item) =>
            item.id === selectedRecord.id
              ? { ...item, organizationStatus: "REJECTED" }
              : item
          )
        );
        setDetailModalVisible(false);
      } else {
        message.error("Failed to reject organization");
      }
    } catch (error) {
      message.error("Error while rejecting organization");
    } finally {
      setRejectModalVisible(false);
      setSelectedRecord(null);
    }
  };

  const handleAcceptClick = async (record: ClientData) => {
    try {
      const idToken: any = localStorage.getItem("token");
      const res = await acceptOrg(idToken, record.id);

      if (res) {
        message.success("Organization approved successfully");
        setOrgData((prevData) =>
          prevData.map((item) =>
            item.id === record.id
              ? { ...item, organizationStatus: "APPROVED" }
              : item
          )
        );
        setDetailModalVisible(false);
      } else {
        message.error("Failed to approve organization");
      }
    } catch (error) {
      message.error("Error while approving organization");
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord) return;

    try {
      const idToken: any = localStorage.getItem("token");
      const res = await deleteOrg(idToken, selectedRecord.id);

      if (res) {
        message.success("Organization deleted successfully");
        setOrgData((prevData) =>
          prevData.filter((item) => item.id !== selectedRecord.id)
        );
      } else {
        message.error("Failed to delete organization");
      }
    } catch (error) {
      message.error("Error while deleting organization");
    } finally {
      setDeleteModalVisible(false);
      setSelectedRecord(null);
    }
  };

  const handleRowClick = (record: ClientData) => {
    setSelectedRecord(record);
    setDetailModalVisible(true);
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleAcceptClick(record);
                }}
              />
              <Image
                src="/images/close-square.svg"
                alt="Reject"
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRejectClick(record);
                }}
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
        <div className="flex justify-center items-center gap-2 z-8">
          <Dropdown overlay={menu(record)} trigger={["click"]}>
            <EllipsisOutlined
              style={{
                fontSize: "24px",
                transform: "rotate(90deg)",
                cursor: "pointer",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen w-full flex">
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
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              className: "cursor-pointer",
            })}
            className="w-full custom-scrollbar"
            scroll={orgData.length > 9 ? { y: 450 } : undefined}
            sticky
          />
        </div>
      </div>
      <RejectRequest
        visible={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        onSubmit={handleRejectSubmit}
      />
      {detailModalVisible && selectedRecord && (
        <ClientDetail
          visible={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          record={selectedRecord}
          onApprove={handleAcceptClick}
          onReject={handleRejectClick}
        />
      )}
      {deleteModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-[#2D3C5280] opacity-50 -z-2"
            onClick={() => setDeleteModalVisible(false)}
          ></div>
          <div
            className="bg-white rounded-3xl overflow-hidden relative"
            style={{ width: "430px", height: "360px" }}
          >
            <div
              className="w-full flex justify-center items-center"
              style={{
                backgroundImage: "url('/images/trash-bg.svg')",
                backgroundSize: "cover",
                backgroundPosition: "top",
                height: "160px",
              }}
            ></div>
            <div className="flex flex-col items-center p-6">
              <h2 className="text-xl font-semibold mt-4">Delete</h2>
              <p className="mt-4 mb-1 text-[#676767] text-center">
                Do you really want to delete {selectedRecord?.organizationName}?
              </p>
              <div className="flex justify-between w-full mt-6">
                <Button
                  onClick={() => setDeleteModalVisible(false)}
                  className="w-[45%] !bg-white !border-[#F14249] !text-[#F14249] !h-[48px] hover:!bg-gray-100 hover:!border-[#F14249] !rounded-[32px]"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="w-[45%] !bg-[#F14249] !border-[#EC8C6F] !text-white !h-[48px] hover:!bg-[#ff6c6c] hover:!border-[#f14242] !rounded-[32px]"
                  onClick={handleDelete}
                >
                  Submit
                </Button>
              </div>
            </div>
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setDeleteModalVisible(false)}
            >
              <Image src="/images/add.svg" alt="Close" width={24} height={24} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClient;
