"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { Button, Input, message, Spin } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPassword from "../forgotPassword/forgotPassword";
import { signIn, UserType } from "@/services/auth.api";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const MainAdminSignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasForgotPassword, setHasForgotPassword] = useState(false);

  const validateEmail = (email: any) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  console.log("hihihihihihihih");

  const handleSignIn = async (event: any) => {
    console.log("in event");
    event.preventDefault();

    let valid = true;

    if (!email || email.trim() === "") {
      setEmailError("Please enter email address");
      valid = false;
    } else {
      const emailValidate = validateEmail(email);

      if (!emailValidate) {
        setEmailError("Please enter valid email format");
        valid = false;
      }
    }

    if (!password || password.trim() === "") {
      setPasswordError("Please enter password");
      valid = false;
    } else {
      const length = password.length;
      if (length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
        valid = false;
      }
    }

    console.log(valid, "this is valid");

    // if (valid) {
    try {
      setLoading(true);
      const res = await signIn({
        email,
        password,
        userType: UserType.MAIN_ADMIN,
      });

      if (res.status === 201) {
        const data = await res.json();
        localStorage.setItem("token", data.userSession.authToken);
        router.push("/dashboard");
      } else {
        const data = await res.json();
        message.error(data.message);
      }
    } catch (error: unknown) {
      message.error("Error while signing in");
    } finally {
      setLoading(false);
    }
    // }
  };

  return (
    <Spin spinning={loading}>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 relative">
        <Image
          src="/images/map-background.svg"
          layout="fill"
          objectFit="contains"
          alt="Background"
          className="absolute inset-0 z-0 w-full h-full"
        />

        {hasForgotPassword ? (
          <ForgotPassword
            onClick={() => {
              setHasForgotPassword(false);
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-[25%] bg-transparent font-roboto">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">LOGO</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome Back!
            </h2>
            <h2 className="text-[16px] text-gray-800 mb-4 text-center">
              Log in to explore destinations, plan trips, and unlock exclusive
              travel deals!
            </h2>
            <div className="flex flex-col w-full mt-10">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="text-black text-[18px] leading-[20px] font-semibold z-4 ml-1"
                >
                  Email id
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmailError("");
                    setEmail(e.target.value);
                  }}
                  className={`!border !bg-white !w-full h-[48px] !rounded-[32px] !mt-1 ${
                    emailError
                      ? "!border-red-500 bg-red-300"
                      : "!border-[rgba(236,140,111,0.4)]"
                  }`}
                />
                {emailError && (
                  <p className="text-red-500 text-[12px] absolute ml-1">
                    {emailError}
                  </p>
                )}
              </div>
              <div className="mb-1">
                <label
                  htmlFor="password"
                  className="text-black text-[18px] leading-[20px] font-semibold z-4 ml-1"
                >
                  Password
                </label>
                <Input.Password
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPasswordError("");
                    setPassword(e.target.value);
                  }}
                  className={`!border !bg-white !w-full h-[48px] !rounded-[32px] !mt-1 ${
                    passwordError
                      ? "!border-red-500 bg-red-300"
                      : "!border-[rgba(236,140,111,0.4)]"
                  }`}
                />
                {passwordError && (
                  <p className="text-red-500 text-[12px] absolute ml-1">
                    {passwordError}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <p
                  className="text-sm cursor-pointer hover:underline z-4 mt-1"
                  onClick={() => setHasForgotPassword(true)}
                >
                  Forgot your password?
                </p>
              </div>
            </div>
            <Button
              onClick={(e) => handleSignIn(e)}
              type="primary"
              className="!bg-[#EC8C6F] !border-[#EC8C6F] !text-white !h-[48px] !w-full hover:!bg-[#d9785c] hover:!border-[#d9785c] !rounded-[32px] mt-12"
              disabled={loading}
              loading={loading}
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default MainAdminSignIn;
