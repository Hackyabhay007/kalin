import React, { useRef, useState, useEffect } from 'react';

function Video() {
  const videoRef = useRef(null); // Reference to the video container
  const [isPlaying, setIsPlaying] = useState(false); // Track if video is playing
  const [player, setPlayer] = useState(null); // Hold YouTube player instance

  useEffect(() => {
    // Load the YouTube API if not already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onload = () => {
        window.onYouTubeIframeAPIReady = initializePlayer;
      };
      document.body.appendChild(script);
    }

    return () => {
      // Clean up player on component unmount
      if (player) {
        player.destroy();
      }
    };
  }, []);

  // Initialize the YouTube player once the API is loaded
  const initializePlayer = () => {
    if (window.YT && window.YT.Player && !player) {
      const ytPlayer = new window.YT.Player(videoRef.current, {
        videoId: '-ECqbfX0IUA', // Use your YouTube video ID here
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      setPlayer(ytPlayer); // Save player instance
    }
  };

  // Triggered when the player is ready
  const onPlayerReady = (event) => {
    console.log('Player is ready');
    event.target.mute();
  };

  // Handle video state changes
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  // Toggle play/pause for the video
  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo(); // Pause if currently playing
      } else {
        player.playVideo(); // Play if currently paused
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center py-10">
      <h2 className="text-xl font-semibold mb-5">How We Made This Video</h2>
      <div className="relative w-full">
        {/* YouTube Embedded Video Container */}
        <div
          ref={videoRef}
          className="w-full h-[calc(100vh-150px)] md:h-auto aspect-video"
        ></div>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl"
          >
            <i className="ri-play-large-line text-white text-4xl"></i>
          </button>
        )}

        {/* Pause Button Overlay */}
        {isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center  text-white text-3xl"
          >
            <i className="ri-pause-large-line text-white text-4xl"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Video;
