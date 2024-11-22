const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-20 h-32 flex items-center justify-center space-x-2">
        {/* Bola 1 */}
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce-1"></div>
        {/* Bola 2 */}
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce-2"></div>
        {/* Bola 3 */}
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce-3"></div>
        {/* Bola 4 */}
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce-4"></div>
        {/* Bola 5 */}
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce-5"></div>
        {/* Bola 6 */}
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce-6"></div>
      </div>
    </div>
  );
};

export default Loader;
