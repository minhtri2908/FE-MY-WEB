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

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-10 items-stretch justify-center">
        <div className="space-y-6 ">
          <a>Talk to Me</a>
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
  <div className="w-full  border border-gray-200 rounded-xl p-6 mt-6 bg-white shadow">
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
