
import { useState } from "react";
import { fetchVideos } from "./api/mediaApi";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchVideos = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchVideos("cat");
      setVideos(data.videos || []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-500 flex flex-col items-center p-6 text-white">
      <button
        onClick={handleFetchVideos}
        className="mb-6 bg-gray-700 px-4 py-2 rounded-lg"
      >
        {loading ? "Loading..." : "Get Videos"}
      </button>

      {error && <div className="mb-4 text-red-300">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {videos.map((video) => {
          const picture = video.image;
          const videoFile = video.video_files?.find((file) => file.quality === "sd") || video.video_files?.[0];

          return (
            <div key={video.id} className="rounded-lg bg-gray-700 overflow-hidden">
              {videoFile ? (
                <video
                  controls
                  width="100%"
                  className="block h-64 w-full object-cover"
                  poster={picture}
                >
                  <source src={videoFile.link} type={videoFile.file_type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="p-4 text-center">No video file available</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;