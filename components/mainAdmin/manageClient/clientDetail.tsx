"use client";
import { Button } from "antd";
import Image from "next/image";

const ClientDetail = ({
  visible,
  onCancel,
  record,
  onApprove,
  onReject,
}: {
  visible: boolean;
  onCancel: () => void;
  record: any;
  onApprove: (record: any) => void;
  onReject: (record: any) => void;
}) => {
  if (!visible) return null;

  const containerHeight =
    record.organizationStatus === "REQUESTED" ? "460px" : "400px";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#2D3C5280] opacity-50 -z-2"
        onClick={onCancel}
      ></div>
      <div
        className="bg-white rounded-3xl overflow-hidden relative"
        style={{ width: "460px", height: containerHeight }}
      >
        <div
          className="absolute w-full flex flex-col justify-center items-center"
          style={{
            backgroundImage: "url('/images/detail-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            width: "530px",
            height: "140px",
          }}
        >
          <div className="font-bold text-3xl max-w-[300px] break-words whitespace-normal leading-tight -ml-16">
            {record.organizationName}
          </div>
          {record.organizationStatus === "APPROVED" && (
            <div className="text-green-500 mt-3 -ml-16">Approved</div>
          )}
          {record.organizationStatus === "REJECTED" && (
            <div className="text-red-500 mt-3 -ml-16">Rejected</div>
          )}
        </div>
        <div className="flex flex-col items-center p-6 mt-[140px]">
          {record.organizationStatus === "REQUESTED" ? (
            <div className="flex justify-between w-full mb-4">
              <Button
                onClick={() => {
                  onReject(record);
                  onCancel();
                }}
                className="w-[45%] !bg-white !border-[#e64646] !text-[#e64646] !h-[40px] hover:!bg-[#ffecec] hover:!border-[#e64646] !rounded-[32px]"
              >
                Reject
              </Button>
              <Button
                type="primary"
                className="w-[45%] !bg-white !border-[#38a169] !text-[#38a169] !h-[40px] hover:!bg-[#e6f4ea] hover:!border-[#38a169] !rounded-[32px]"
                onClick={() => {
                  onApprove(record);
                  onCancel();
                }}
              >
                Approve
              </Button>
            </div>
          ) : (
            ""
          )}
          <p className="mt-4 mb-1 text-[#676767] text-left w-full ml-1">
            GST No.: {record.gstNumber}
          </p>
          <p className="mt-4 mb-1 text-[#676767] text-left w-full ml-1">
            Email: {record.email}
          </p>
          <p className="mt-4 mb-1 text-[#676767] text-left w-full ml-1">
            Mobile No.: {record.phoneNumber}
          </p>
          <p className="mt-4 mb-1 text-[#676767] text-left w-full ml-1">
            Address: {record.address}
          </p>
          <p className="mt-4 mb-1 text-[#676767] text-left w-full ml-1">
            GST Certificate: {record.gstCertificate}
          </p>
        </div>
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          <Image src="/images/add.svg" alt="Close" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
