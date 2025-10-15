import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

type IdeaHeaderProps = {
  mediaUrl?: string;
  categories: string[];
  title: string;
  description: string;
  link: string;
};

const IdeaHeaderVideo: React.FC<IdeaHeaderProps> = ({
  mediaUrl,
  categories,
  title,
  description,
  link,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Detect if mediaUrl is a video or image
  const isVideo = mediaUrl ? /\.(mp4|webm|ogg)$/i.test(mediaUrl) : false;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen?.();
    }
  };

  const handleProgress = () => {
    if (!videoRef.current) return;
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(percent || 0);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime =
      (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(
      videoRef.current.duration,
      Math.max(0, videoRef.current.currentTime + seconds),
    );
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.addEventListener("timeupdate", handleProgress);
    return () => {
      vid.removeEventListener("timeupdate", handleProgress);
    };
  }, []);

  return (
    <>
      <Link
        href={link}
        className="flex justify-start gap-2 py-4 text-text-secondary hover:text-text-primary items-center cursor-pointer"
      >
        <ArrowLeft size={16} />
        <p className="font-semibold text-sm">Back to Ideas</p>
      </Link>

      <div className="relative w-full h-52 md:h-92 bg-black rounded-lg overflow-hidden">
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={mediaUrl}
              className="w-full h-full object-cover"
            />

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex flex-col gap-2">
              {/* Progress Bar */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={seek}
                className="w-full h-1 accent-text-primary cursor-pointer"
              />

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {/* Play / Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  {/* Rewind */}
                  <button
                    onClick={() => skip(-10)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                  >
                    <RotateCcw size={18} />
                  </button>

                  {/* Fast Forward */}
                  <button
                    onClick={() => skip(10)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                  >
                    <RotateCw size={18} />
                  </button>
                </div>

                <div className="flex gap-2">
                  {/* Volume */}
                  <button
                    onClick={toggleMute}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                  >
                    <Maximize size={18} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <img
            src={mediaUrl}
            alt="cover-media"
            className="w-full h-full object-cover rounded"
          />
        )}
      </div>

      <div className="flex my-4 gap-2">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-border-secondary px-2 py-1 rounded text-text-primary"
          >
            <p className="text-[10px] font-semibold">{cat}</p>
          </div>
        ))}
      </div>

      <h1 className="text-text-primary text-3xl md:text-4xl mb-4 font-semibold">
        {title}
      </h1>
      <p className="text-text-secondary tracking-wider mb-3 text-sm w-full md:w-2/3">
        {description}
      </p>
    </>
  );
};

export default IdeaHeaderVideo;
