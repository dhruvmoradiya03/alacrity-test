"use client";
import { Button, Input, message } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { getCurrentUser, editCurrentUser } from "@/services/auth.api";

const EditProfile = ({
  visible,
  onCancel,
}: {
  visible: boolean;
  onCancel: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const idToken: any = localStorage.getItem("token");
        const res = await getCurrentUser(idToken);
        const data = await res.json();
        if (res.ok) {
          setUsername(data.name || "Admin");
          setEmail(data.email);
          setCountryCode(data.countryCode || "");
          setMobile(data.phoneNumber || "");
          setProfilePicture(null); // Assuming profile picture is not editable for now
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    if (visible) {
      fetchUserProfile();
    }
  }, [visible]);

  const handlePhoneChange = (value: string, data: any) => {
    setCountryCode(data.dialCode);
    setMobile(value.slice(data.dialCode.length));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!username || !email || !mobile) {
      message.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const idToken: any = localStorage.getItem("token");
      const updateUserParams = {
        name: username,
        email,
        countryCode,
        phoneNumber: mobile,
      };

      const res = await editCurrentUser(idToken, updateUserParams);

      if (res.ok) {
        message.success("Profile updated successfully");
        onCancel();
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      message.error("Error while updating profile");
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
        style={{ width: "460px", height: "530px" }}
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
          <h2 className="text-xl font-semibold mt-3">Edit Profile</h2>
        </div>
        <div className="flex flex-col items-center py-4 px-6">
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleProfilePictureChange}
            />
            <div className="w-24 h-24 rounded-full bg-white !border-[#D0D5DD] !border flex items-center justify-center overflow-hidden">
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/images/profile-circle.svg"
                  alt="Profile"
                  width={96}
                  height={96}
                />
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#EC8C6F] rounded-full flex items-center justify-center">
              <Image
                src="/images/camera.svg"
                alt="Edit"
                width={16}
                height={16}
              />
            </div>
          </div>
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">Username</label>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!rounded-full !py-2 !text-sm"
            />
          </div>
          <div className="w-full mb-3">
            <label className="text-gray-500 text-sm">Email Id</label>
            <Input
              placeholder="Email Id"
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

export default EditProfile;
