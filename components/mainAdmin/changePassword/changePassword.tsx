"use client";
import { Button, Input, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import { changePassword } from "@/services/auth.api";

const ChangePassword = ({
  visible,
  onCancel,
}: {
  visible: boolean;
  onCancel: () => void;
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      message.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      const idToken: any = localStorage.getItem("token");
      const res = await changePassword(idToken, {
        currentPassword,
        newPassword,
      });

      if (res.ok) {
        message.success("Password changed successfully");
        onCancel();
      } else {
        message.error("Failed to change password");
      }
    } catch (error) {
      message.error("Error while changing password");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#2D3C5280] opacity-50 -z-2"
        onClick={onCancel}
      ></div>
      <div
        className="bg-white rounded-3xl overflow-hidden relative"
        style={{ width: "460px", height: "410px" }}
      >
        <div
          className="w-full flex justify-center items-center"
          style={{
            backgroundImage: "url('/images/detail-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            height: "80px",
          }}
        >
          <h2 className="text-xl font-semibold mt-3">Change Password</h2>
        </div>
        <div className="flex flex-col items-center py-4 px-6">
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">Current Password</label>
            <Input.Password
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">New Password</label>
            <Input.Password
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">
              Confirm New Password
            </label>
            <Input.Password
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="flex justify-between w-full mt-5">
            <Button
              onClick={onCancel}
              className="w-[45%] !bg-white !border-[#EC8C6F] !text-[#EC8C6F] !h-[40px] hover:!bg-gray-100 hover:!border-[#EC8C6F] !rounded-[32px]"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="w-[45%] !bg-[#EC8C6F] !border-[#EC8C6F] !text-white !h-[40px] hover:!bg-[#d9785c] hover:!border-[#d9785c] !rounded-[32px]"
              onClick={handleSubmit}
              loading={loading}
            >
              Update
            </Button>
          </div>
        </div>
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onCancel}
        >
          <Image src="/images/add.svg" alt="Close" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
