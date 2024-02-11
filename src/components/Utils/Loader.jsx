export default function Loader() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        <div className="absolute animate-ping rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500 opacity-75"></div>
      </div>
    );
  }
  