import React, { useRef, useState } from 'react';

function Video() {
  const videoRef = useRef(null); // Reference to the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause(); // Pause the video
      } else {
        videoRef.current.play(); // Play the video
      }
      setIsPlaying(!isPlaying); // Toggle play state
    }
  };

  return (
    <div className="relative flex flex-col items-center py-10">
      <h2 className="text-xl font-semibold mb-5">How We Made This Video</h2>
      <div className="relative w-full">
        <video
          ref={videoRef}
          className="w-screen h-auto"
          src="video.mp4" // Replace with your video URL
          onClick={handlePlayPause} // Allow clicking on video to play/pause
        />
        {/* Play Button Overlay */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl"
          style={{ display: isPlaying ? 'none' : 'flex' }} // Hide when playing
        >
           <i className="ri-play-large-line   text-black text-4xl"></i>
        </button>
        {/* Pause Button Overlay */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl"
          style={{ display: isPlaying ? 'flex' : 'none' }} // Hide when paused
        >
          <i className="ri-pause-large-line text-black text-4xl"></i>
        </button>
      </div>
    </div>
  );
}

export default Video;
