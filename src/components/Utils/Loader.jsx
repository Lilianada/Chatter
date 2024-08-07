export default function Loader() {
    return (
      <div className="fixed inset-0 bg-chocolate bg-opacity-95 flex justify-center items-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-500"></div>
        <div className="absolute animate-ping rounded-full h-32 w-32 border-t-4 border-b-4 border-red opacity-90"></div>
      </div>
    </div>
    
    );
  }
  