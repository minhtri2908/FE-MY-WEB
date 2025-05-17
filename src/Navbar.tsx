import { useState,useEffect } from "react";

const data = [
  { label: "Giới thiệu", href: "/about" },
  { label: "Chuyện nghề", href: "/story" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const commandText = 'TriMinhPham';
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (index < commandText.length) {
      const timeoutId = setTimeout(() => {
        setText(text + commandText[index]);
        setIndex(index + 1);
      }, 100); // Delay for each character
      return () => clearTimeout(timeoutId);
    }
  }, [index, text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev); // Toggle cursor visibility
    }, 500); // Toggle cursor visibility every 500ms
    return () => clearInterval(cursorInterval);
  }, []);

  
  return (
    <nav className="p-[20px] shadow-md z-50 bg-white fixed top-0 left-0 w-full">
      <div className="flex items-center justify-between mx-auto w-full max-w-[760px]">
      <a href="/" className="font-mono font-bold text-lg text-black px-2 py-1 rounded-md">
          <span className="text-green-400">{'>'}</span> {text}
          <span className={cursorVisible ? 'text-green-400' : 'invisible'}>|</span>
        </a>
        {/* Hamburger icon */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          {data.map((item, index) => (
            <a key={index} href={item.href} className="text-base hover:underline">
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile popup menu */}
      <div
        className={`fixed top-0 right-0 h-fit w-[250px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 rounded-bl-2xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Nút đóng (X) */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col p-6 pt-20 space-y-6">
          {data.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-lg font-medium hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Optional backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  );
}
