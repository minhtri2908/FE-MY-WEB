export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-6 gap-4">
      <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-400 border-t-transparent"></div>
      <div className="text-gray-600 text-lg font-medium flex items-center">
        <span>Đang tải</span>
        <span className="dot-animation ml-1 flex">
          <span className="animate-bounce [animation-delay:.0s]">.</span>
          <span className="animate-bounce [animation-delay:.2s]">.</span>
          <span className="animate-bounce [animation-delay:.4s]">.</span>
        </span>
      </div>
    </div>
  );
}
