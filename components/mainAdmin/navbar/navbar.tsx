"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import ChangePassword from "../changePassword/changePassword";
import Logout from "../logout/logout";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleMenuClick = (e: any) => {
    if (e.key === "changePassword") {
      setChangePasswordVisible(true);
    } else if (e.key === "logout") {
      setLogoutVisible(true);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="changePassword">
        <div className="flex items-center">
          <Image
            src="/images/lock.svg"
            alt="Change Password"
            width={16}
            height={16}
          />
          <span className="ml-2">Change Password</span>
        </div>
      </Menu.Item>
      <Menu.Item key="logout">
        <div className="flex items-center">
          <Image src="/images/logout.svg" alt="Logout" width={16} height={16} />
          <span className="ml-2">Logout</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-[100%] h-[12%] bg-white text-black flex items-center justify-between px-6 shadow-md font-roboto">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full border-2 border-orange-300 overflow-hidden">
          {/* <img
            src="/images/profile.jpg" // Replace with actual profile image path
            alt="Profile"
            className="w-full h-full object-cover"
          /> */}
        </div>

        <div>
          <p className="text-lg font-bold">Hello, John!</p>
          <p className="text-sm text-gray-500">Sunday, June 25, 2024</p>
        </div>
      </div>

      <Dropdown overlay={menu} trigger={["click"]}>
        <div
          className="flex items-center space-x-2 p-2 px-4 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center">
            <img
              src="/images/setting.svg"
              alt="Settings"
              className="w-[80%] h-[80%] object-contain"
            />
          </div>
          <DownOutlined
            className="text-gray-600"
            style={{
              fontSize: "9px",
              fontWeight: "bold",
              transform: "scaleX(1.4)",
            }}
          />
        </div>
      </Dropdown>

      {changePasswordVisible && (
        <ChangePassword
          visible={changePasswordVisible}
          onCancel={() => setChangePasswordVisible(false)}
        />
      )}
      {logoutVisible && (
        <Logout
          visible={logoutVisible}
          onCancel={() => setLogoutVisible(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
