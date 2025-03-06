"use client";

import Image from "next/image";
import { Button, Input, message, InputRef } from "antd";
import { useState } from "react";

const ForgotPassword = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: any) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendLink = async (event: any) => {
    event.preventDefault();

    let valid = true;

    if (!email || email.trim() === "") {
      setEmailError("Please enter email address");
      valid = false;
    } else {
      const emailValidate = validateEmail(email);

      if (!emailValidate) {
        setEmailError("Please enter valid email");
        valid = false;
      }
    }

    if (valid) {
      setLoading(false);
      setEmailSent(true);
    } else {
      message.error("Admin account not found for this email.");
      setLoading(false);
    }
  };

  return emailSent ? (
    <div className="flex flex-col items-center justify-center w-[25%] bg-transparent ">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">LOGO</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Reset Password</h2>
      <h2 className="text-[16px] text-gray-800 mb-4 text-center">
        We've sent a password reset link to your email. Please check your inbox
      </h2>
      <div className="flex flex-col w-full mt-5 justify-center items-center">
        <Image
          src="/images/email-sent.svg"
          width={108}
          height={108}
          alt="Email Sent"
        />
      </div>
      <Button
        onClick={() => {
          setLoading(false);
          setEmailSent(false);
          props.onClick();
        }}
        type="primary"
        className="!bg-[#EC8C6F] !border-[#EC8C6F] !text-white !h-[48px] !w-full hover:!bg-[#d9785c] hover:!border-[#d9785c] !rounded-[32px] mt-8"
        disabled={loading}
        loading={loading}
      >
        Back to Login
      </Button>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-[25%] bg-transparent ">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">LOGO</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Reset Password</h2>
      <h2 className="text-[16px] text-gray-800 mb-4 text-center">
        Type your registered email ID. We’ll send a recovery link to reset your
        password.
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
            className={`!border !bg-white !w-full h-[48px] !rounded-[32px] !mt-2 ${
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
      </div>

      <Button
        onClick={handleSendLink}
        type="primary"
        className="!bg-[#EC8C6F] !border-[#EC8C6F] !text-white !h-[48px] !w-full hover:!bg-[#d9785c] hover:!border-[#d9785c] !rounded-[32px] mt-8"
        disabled={loading}
        loading={loading}
      >
        Send
      </Button>
    </div>
  );
};

export default ForgotPassword;
