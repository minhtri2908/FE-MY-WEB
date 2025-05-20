import { ChevronDown } from "lucide-react";

const ScrollDownButton = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.7,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScroll}
      className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition duration-300 shadow-md text-sm bg-white"
    >
      {/* Icon chuột với chấm nhảy mượt hơn */}
      <div className="w-5 h-8 rounded-full border border-gray-500 flex justify-center items-start pt-1">
        <div className="w-0.5 h-3 bg-gray-700 rounded-full animate-bounce duration-[1500ms] ease-in-out" />
      </div>

      <span>Scroll Down</span>
      <ChevronDown className="w-4 h-4" />
    </button>
  );
};

export default ScrollDownButton;
