const Contact = () => {
  return (
    <div className="px-4 sm:px-8 py-12 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-2">Get in touch</h2>
      <p className="text-center text-gray-500 mb-10">Contact Me</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Contact Info */}
        <div className="space-y-6">
          <ContactCard
            icon="📧"
            title="Email"
            detail="minhtri.pmt2023@gmail.com"
          />
          <ContactCard
            icon="📞"
            title="Telephone"
            detail="+84 356 333 070"
          />
          <ContactCard
            icon="💬"
            title="Facebook Messenger"
            detail="Trí Phạm"
            linkText="Write me"
          />
        </div>

        {/* Right Side - Contact Form */}
        <form className="space-y-6">
          <FormInput label="Name" placeholder="Insert your name" />
          <FormInput label="Mail" placeholder="Insert your email" />
          <FormInput label="Phone Number" placeholder="Insert your phone" />
          <FormTextArea label="Details" placeholder="Write your details" />
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
  icon: string;
  title: string;
  detail: string;
  linkText?: string;
}) => (
  <div className="border rounded-xl p-6 shadow-sm bg-white">
    <div className="text-3xl mb-2">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-gray-700">{detail}</p>
    {linkText && (
      <p className="text-blue-600 mt-2 cursor-pointer hover:underline">
        {linkText} →
      </p>
    )}
  </div>
);

const FormInput = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-gray-400"
    />
  </div>
);

const FormTextArea = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <textarea
      placeholder={placeholder}
      className="w-full border rounded-md px-4 py-2 h-32 resize-none outline-none focus:ring-2 focus:ring-gray-400"
    ></textarea>
  </div>
);
