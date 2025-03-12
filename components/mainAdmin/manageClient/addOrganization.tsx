"use client";
import { Button, Input, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { createOrg } from "@/services/organization.api";

const AddOrganization = ({
  visible,
  onCancel,
  onAddOrganization,
}: {
  visible: boolean;
  onCancel: () => void;
  onAddOrganization: (newOrg: any) => void;
}) => {
  const [organizationName, setOrganizationName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gstCertificate, setGstCertificate] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (value: string, data: any) => {
    setCountryCode(data.dialCode);
    setMobile(value.slice(data.dialCode.length));
  };

  const handleSubmit = async () => {
    if (
      !organizationName ||
      !gstNumber ||
      !gstCertificate ||
      !email ||
      !mobile ||
      !address
    ) {
      message.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const idToken: any = localStorage.getItem("token");
      const createOrgParams = {
        organizationName,
        gstNumber,
        gstCertificate,
        email,
        countryCode,
        phoneNumber: mobile,
        address,
      };

      const res = await createOrg(idToken, createOrgParams);

      if (res) {
        message.success("Organization created successfully");
        onAddOrganization(res);
        onCancel();
      } else {
        message.error("Failed to create organization");
      }
    } catch (error) {
      message.error("Error while creating organization");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-8">
      <div
        className="absolute inset-0 bg-[#2D3C5280] opacity-50 -z-2"
        onClick={onCancel}
      ></div>
      <div
        className="bg-white rounded-3xl overflow-hidden relative"
        style={{ width: "460px", height: "650px" }}
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
          <h2 className="text-xl font-semibold mt-3">Add New Organization</h2>
        </div>
        <div className="flex flex-col items-center py-4 px-6">
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">Organization Name</label>
            <Input
              placeholder="Organization Name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">GST Number</label>
            <Input
              placeholder="GST Number"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">GST Certificate</label>
            <Input
              placeholder="GST Certificate"
              value={gstCertificate}
              onChange={(e) => setGstCertificate(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">Email</label>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">Mobile No.</label>
            <PhoneInput
              country={"eg"}
              enableSearch={true}
              value={countryCode + mobile}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="w-full mb-5">
            <label className="text-gray-500 text-sm">
              Organization Address
            </label>
            <Input
              placeholder="Organization Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="flex justify-between w-full mt-4">
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
              Submit
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

export default AddOrganization;
