"use client";
import { Button, Input } from "antd";
import { useState } from "react";
import Image from "next/image";

const RejectRequest = ({
  visible,
  onCancel,
  onSubmit,
}: {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (reason: string) => void;
}) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    onSubmit(reason);
    setReason("");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#2D3C5280] opacity-50 -z-2"
        onClick={onCancel}
      ></div>
      <div
        className="bg-white rounded-lg overflow-hidden"
        style={{ width: "460px", height: "460px" }}
      >
        <div
          className="w-full flex justify-center items-center"
          style={{
            backgroundImage: "url('/images/bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            height: "160px", // Adjust height of the background image
          }}
        >
          <Image
            src="/images/folder-cross.svg"
            alt="Reject"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col items-center p-6">
          <h2 className="text-xl font-semibold mt-4">Reject request</h2>
          <p className="mt-4 mb-1 text-[#676767] text-left w-full ml-1">
            Please provide a reason for rejecting the profile.
          </p>
          <Input.TextArea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Type here..."
            rows={4}
            className="mt-4"
          />
          <div className="flex justify-between w-full mt-6">
            <Button
              onClick={onCancel}
              className="w-[45%] !bg-white !border-[#EC8C6F] !text-[#EC8C6F] !h-[48px] hover:!bg-gray-100 hover:!border-[#EC8C6F] !rounded-[32px]"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="w-[45%] !bg-[#EC8C6F] !border-[#EC8C6F] !text-white !h-[48px] hover:!bg-[#d9785c] hover:!border-[#d9785c] !rounded-[32px]"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectRequest;
