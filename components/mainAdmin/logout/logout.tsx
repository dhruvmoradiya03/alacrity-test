"use client";
import { Button, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth.api";

const Logout = ({
  visible,
  onCancel,
}: {
  visible: boolean;
  onCancel: () => void;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const idToken: any = localStorage.getItem("token");
      const res = await logoutUser(idToken);

      if (res.ok) {
        localStorage.removeItem("token");
        router.push("/");
      } else {
        message.error("Failed to logout");
      }
    } catch (error) {
      message.error("Error while logging out");
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
        style={{ width: "430px", height: "360px" }}
      >
        <div
          className="w-full flex justify-center items-center"
          style={{
            backgroundImage: "url('/images/logout-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            height: "160px",
          }}
        ></div>
        <div className="flex flex-col items-center p-6">
          <h2 className="text-xl font-semibold mt-4">Logout</h2>
          <p className="mt-4 mb-1 text-[#676767] text-center">
            Are you sure you want to logout from Alacrity?
          </p>
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
              onClick={handleLogout}
            >
              Logout
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

export default Logout;
