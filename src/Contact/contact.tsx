import { useState } from "react";
import React from "react";
import api from "../api.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone: string) => /^[0-9]{8,11}$/.test(phone);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, details } = formData;

    const newErrors = {
      name: name ? "" : "Tên không được để trống.",
      email: isValidEmail(email) ? "" : "Email không hợp lệ.",
      phone: isValidPhone(phone) ? "" : "SĐT phải từ 8 hoặc 11 chữ số.",
      details: details ? "" : "Nội dung không được để trống.",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (hasErrors) {
      toast.error("Vui lòng kiểm tra lại các trường dữ liệu.");
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post("/contacts", formData);
      toast.success("Gửi thông tin thành công!");
      setFormData({ name: "", email: "", phone: "", details: "" });
    } catch (err) {
      console.error("Lỗi khi gửi thông tin:", err);
      toast.error("Gửi thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false); // Kết thúc gửi
    }
  };

  return (
    <div className="px-4 sm:px-8 py-12 mx-auto  max-w-[760px]">
      <h2 className="text-4xl font-bold text-center mb-2">Góc Liên Hệ</h2>
      <p className="text-center text-gray-500 mb-10">
        Hãy để lại lời nhắn, tôi sẽ phản hồi trong thời gian sớm nhất!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-10 items-stretch justify-center">
        <div className="space-y-6 ">
          <a className="font-bold ">Liên hệ trực tiếp</a>
          <ContactCard
            icon={
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6.75L12 13.5l9-6.75M4.5 18h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0019.5 6h-15A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18z"
                  />
                </svg>
              </div>
            }
            title="Email"
            detail="minhtri.pmt2023@gmail.com"
          />
          <ContactCard
            icon={
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 2.25h-9A2.25 2.25 0 005.25 4.5v15a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-15A2.25 2.25 0 0016.5 2.25zM9 18.75h6"
                  />
                </svg>
              </div>
            }
            title="Telephone"
            detail="+84 356 333 070"
          />
          <ContactCard
            icon={
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="w-5 h-5 text-black"
                  fill="currentColor"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91V131.77c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.11 0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.2V288z" />
                </svg>
              </div>
            }
            title="Facebook Messenger"
            detail="Trí Phạm"
            linkText="Send a message"
          />
        </div>

        {/* Right Side - Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <a className="font-bold ">
            Gửi tôi mô tả công việc hoặc lời nhắn của bạn
          </a>
          <FormInput
            label="Name"
            placeholder="Insert your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormInput
            label="Mail"
            placeholder="Insert your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormInput
            label="Phone Number"
            placeholder="Insert your phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormTextArea
            label="Details"
            placeholder="Write your details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            error={errors.details}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={` items-center cursor-pointer justify-center gap-2 bg-black text-white px-6 py-2 rounded ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Đang gửi...</span>
              </div>
            ) : (
              "Gửi tin nhắn"
            )}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;

// Sub-components
const ContactCard = ({
  icon,
  title,
  detail,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  linkText?: string;
}) => (
  <div className="w-full  border border-gray-200 rounded-xl p-6 mt-6 bg-[#f8f5f5] shadow">
    <div className="flex justify-center  mb-2">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-gray-700">{detail}</p>
    {linkText && (
      <a
        href={"https://www.facebook.com/minhtri.pham.2001/"}
        target="_blank"
        rel="noopener noreferrer"
        className=" mt-2 inline-flex items-center gap-1 group"
      >
        {linkText}
        <span className="transform transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>
    )}
  </div>
);

const FormInput = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="relative w-full mt-6">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`peer w-full border ${
        error ? "border-red-500" : "border-gray-400"
      } rounded-md px-4 pt-4 pb-2 focus:outline-none focus:border-black`}
    />
    <label className="absolute left-3 -top-3 bg-[#f2f2f2] px-1 text-sm text-gray-500 peer-focus:text-black">
      {label}
    </label>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormTextArea = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="relative w-full mt-6">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`peer w-full resize-none border ${
        error ? "border-red-500" : "border-gray-400"
      } rounded-md px-4 pt-4 pb-2 focus:outline-none focus:border-black h-40`}
    />
    <label className="absolute left-3 -top-3 bg-[#f2f2f2] px-1 text-sm text-gray-500 peer-focus:text-black">
      {label}
    </label>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
