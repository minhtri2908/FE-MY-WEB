import { useState } from "react";
import React from "react";
import api from "../api.ts";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/contacts", formData);
      alert("Gửi thông tin thành công!");
      setFormData({ name: "", email: "", phone: "", details: "" });
    } catch (err) {
      console.error("Lỗi khi gửi thông tin:", err);
      alert("Gửi thất bại!");
    }
  };
  return (
    <div className="px-4 sm:px-8 py-12 mx-auto  max-w-[760px]">
      <h2 className="text-4xl font-bold text-center mb-2">Get in touch</h2>
      <p className="text-center text-gray-500 mb-10">Contact Me</p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-10 items-stretch">
        <div className="space-y-6 ">
          <a>Talk to Me</a>
          <ContactCard
            icon={
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m0 0A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25zm0 0L12 13.5 2.25 6.75"
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
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M14 2C14 2 16.2 2.2 19 5C21.8 7.8 22 10 22 10"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14.207 5.53564C14.207 5.53564 15.197 5.81849 16.6819 7.30341C18.1668 8.78834 18.4497 9.77829 18.4497 9.77829"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.00655 7.93309C3.93421 9.84122 4.41713 13.0817 7.6677 16.3323C8.45191 17.1165 9.23553 17.7396 10 18.2327M5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C15.2529 20.0243 14.1963 19.9541 13 19.6111"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
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
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.83c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.77-1.61 1.56v1.87h2.74l-.44 2.89h-2.3v6.99C18.34 21.13 22 17 22 12z" />
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
          <a>Write me your jobs description</a>
          <FormInput
            label="Name"
            placeholder="Insert your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormInput
            label="Mail"
            placeholder="Insert your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormInput
            label="Phone Number"
            placeholder="Insert your phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormTextArea
            label="Details"
            placeholder="Write your details"
            name="details"
            value={formData.details}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Send Message
          </button>
        </form>
      </div>
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
  <div className="w-full max-w-xs border border-gray-200 rounded-xl p-6 mt-6 bg-white shadow">
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
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="relative w-full mt-6">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="peer w-full border border-gray-400 rounded-md px-4 pt-4 pb-2 focus:outline-none focus:border-black h-15"
    />
    <label className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-500 peer-focus:text-black">
      {label}
    </label>
  </div>
);

const FormTextArea = ({
  label,
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="relative w-full mt-6">
    <label className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-500 peer-focus:text-black">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-400 rounded-md px-4 py-2 h-60 outline-none focus:border-black"
    ></textarea>
  </div>
);
