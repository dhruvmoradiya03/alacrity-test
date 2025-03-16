"use client";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditProfile from "../editProfile/editProfile";
import { getCurrentUser } from "@/services/auth.api";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState("dashboard");
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });
  const router = useRouter();

  const path = usePathname();

  const fetchUserProfile = async () => {
    try {
      const idToken: any = localStorage.getItem("token");
      const res = await getCurrentUser(idToken);
      const data = await res.json();
      if (res.ok) {
        setUserProfile({
          name: data.name || "Admin",
          email: data.email,
          profilePicture: data.profilePicture || "/images/sidebar-profile.svg",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  };

  useEffect(() => {
    const page = path.split("/")[1];

    if (page && page !== "" && page !== "users") {
      setActiveButton(page);
    }

    fetchUserProfile();
  }, []);

  return (
    <div
      className="w-[15%] h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between p-6"
      style={{ backgroundImage: "url('/images/sidenav-bg.png')" }}
    >
      <div className="h-[60%] flex flex-col justify-between">
        <div className="text-white text-3xl font-bold h-[30%] text-center justify-center flex items-center">
          LOGO
        </div>
        <div className="h-[65%] flex flex-col space-y-4">
          <a
            onClick={() => {
              setActiveButton("dashboard");
              router.push("/dashboard");
            }}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              activeButton === "dashboard"
                ? "bg-white text-[#E9947F] font-medium"
                : "text-white opacity-80 hover:opacity-100"
            }`}
          >
            {activeButton === "dashboard" ? (
              <img
                src="/images/dashboard-orange.svg"
                alt="Dashboard"
                className="w-5 h-5"
              />
            ) : (
              <img
                src="/images/dashboard.svg"
                alt="Dashboard"
                className="w-5 h-5"
              />
            )}
            <span>Dashboard</span>
          </a>

          <a
            onClick={() => {
              setActiveButton("manageClient");
              router.push("/manageClient");
            }}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              activeButton === "manageClient"
                ? "bg-white text-[#E9947F] font-medium"
                : "text-white opacity-80 hover:opacity-100"
            }`}
          >
            {activeButton === "manageClient" ? (
              <img
                src="/images/client-orange.svg"
                alt="Manage Client"
                className="w-5 h-5"
              />
            ) : (
              <img
                src="/images/client.svg"
                alt="Manage Client"
                className="w-5 h-5"
              />
            )}
            <span>Manage Client</span>
          </a>

          <a
            onClick={() => {
              setActiveButton("introVideo");
              router.push("/introVideo");
            }}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              activeButton === "introVideo"
                ? "bg-white text-[#E9947F] font-medium"
                : "text-white opacity-80 hover:opacity-100"
            }`}
          >
            {activeButton === "introVideo" ? (
              <img
                src="/images/intro-video-orange.svg"
                alt="Intro Video"
                className="w-5 h-5"
              />
            ) : (
              <img
                src="/images/intro-video.svg"
                alt="Intro Video"
                className="w-5 h-5"
              />
            )}

            <span>Intro Video</span>
          </a>
        </div>
      </div>
      <div
        className="h-[20%] bg-white text-black p-4 rounded-xl flex flex-col items-center space-y-2 relative bg-cover bg-center cursor-pointer"
        style={{
          backgroundImage: "url('/images/sidebar-profile-bg.png')",
          backgroundSize: "150%",
          backgroundPosition: "center",
        }}
        onClick={() => {
          fetchUserProfile();
          setEditProfileVisible(true);
        }}
      >
        <div
          className="w-12 h-12 bg-gray-300 rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${userProfile.profilePicture})`,
          }}
        ></div>
        <div className="text-center">
          <p className="font-semibold">{userProfile.name}</p>
          <p className="text-sm text-gray-500">{userProfile.email}</p>
        </div>
      </div>
      {editProfileVisible && (
        <EditProfile
          visible={editProfileVisible}
          onCancel={() => setEditProfileVisible(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
