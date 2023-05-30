import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const MainMusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isShowVolume, setIsShowVolume] = useState(false);

  const listMusic = [
    "https://cloud.appwrite.io/v1/storage/buckets/647617e7f3c9f268c1f5/files/6476182b5e55501b6c63/view?project=646bba5e9c9dd4ddcb4b&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/647617e7f3c9f268c1f5/files/647618390cc3efeddd0c/view?project=646bba5e9c9dd4ddcb4b&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/647617e7f3c9f268c1f5/files/647618320ced7076fa11/view?project=646bba5e9c9dd4ddcb4b&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/647617e7f3c9f268c1f5/files/6476203444c51d15f778/view?project=646bba5e9c9dd4ddcb4b&mode=admin",
  ];
  const [currentTrack, setCurrentTrack] = useState(0);

  //check volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(volume.toString());
    }
  }, [volume]);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    localStorage.setItem("volume", value.toString());
    setVolume(value);
  };

  const handleShowVolume = () => {
    setIsShowVolume(!isShowVolume);
  };

  const handleLoopChange = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
    }
    setIsLoop(!isLoop);
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMute;
    }
    setIsMute(!isMute);
  };

  const handleSkip = () => {
    if (audioRef.current) {
      const nextTrack = (currentTrack + 1) % listMusic.length;
      setCurrentTrack(nextTrack);
      audioRef.current.src = listMusic[nextTrack];
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (audioRef.current) {
      const prevTrack =
        (currentTrack - 1 + listMusic.length) % listMusic.length;
      setCurrentTrack(prevTrack);
      audioRef.current.src = listMusic[prevTrack];
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="px-5 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center space-x-3">
        <svg
          onClick={handlePrev}
          className="cursor-pointer w-5 h-5"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 0.499615C0.367392 0.499615 0.240214 0.552294 0.146446 0.646062C0.0526781 0.73983 0 0.867007 0 0.999615V8.99962C0 9.13222 0.0526781 9.2594 0.146446 9.35317C0.240214 9.44694 0.367392 9.49962 0.5 9.49962C0.632608 9.49962 0.759786 9.44694 0.853554 9.35317C0.947322 9.2594 1 9.13222 1 8.99962V5.75262L7.267 9.38862C7.807 9.70162 8.5 9.32262 8.5 8.69162V5.75162L14.767 9.38762C15.307 9.70261 16 9.32362 16 8.69262V1.30762C16 0.677616 15.307 0.297615 14.767 0.611615L8.5 4.24762V1.30762C8.5 0.677616 7.807 0.297615 7.267 0.611615L1 4.24762V0.999615C1 0.867007 0.947322 0.73983 0.853554 0.646062C0.759786 0.552294 0.632608 0.499615 0.5 0.499615Z"
            fill="white"
          />
        </svg>
        <i
          className={`fi ${
            isPlaying ? "fi-sr-pause" : "fi-sr-play"
          } mt-1 cursor-pointer`}
          onClick={handlePlay}
        ></i>
        <svg
          onClick={handleSkip}
          className="cursor-pointer w-5 h-5"
          viewBox="0 0 17 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4849 0.499615C16.6175 0.499615 16.7446 0.552294 16.8384 0.646062C16.9322 0.73983 16.9849 0.867007 16.9849 0.999615V8.99962C16.9849 9.13222 16.9322 9.2594 16.8384 9.35317C16.7446 9.44694 16.6175 9.49962 16.4849 9.49962C16.3523 9.49962 16.2251 9.44694 16.1313 9.35317C16.0375 9.2594 15.9849 9.13222 15.9849 8.99962V5.75262L9.71786 9.38862C9.17786 9.70162 8.48486 9.32262 8.48486 8.69162V5.75162L2.21786 9.38762C1.67786 9.70261 0.984863 9.32362 0.984863 8.69262V1.30762C0.984863 0.677616 1.67786 0.297615 2.21786 0.611615L8.48486 4.24762V1.30762C8.48486 0.677616 9.17786 0.297615 9.71786 0.611615L15.9849 4.24762V0.999615C15.9849 0.867007 16.0375 0.73983 16.1313 0.646062C16.2251 0.552294 16.3523 0.499615 16.4849 0.499615Z"
            fill="white"
          />
        </svg>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleSkip}
        >
          <source src={listMusic[currentTrack]} type="audio/mpeg" />
        </audio>
        {/* icon voulmn */}
        <i
          onClick={handleShowVolume}
          className={`fi fi-sr-volume cursor-pointer mt-1 ${
            isShowVolume && "text-red-500"
          }`}
        ></i>
        {/* motion range */}
        {isShowVolume && (
          <motion.div
            className="rounded-md w-72"
            initial={{ width: 0 }}
            animate={{ width: `${100}%` }}
          >
            <input
              type="range"
              className="w-full mt-1.5 "
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </motion.div>
        )}
      </div>
      <div className="px-5 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center space-x-3">
        {/* loop with icon */}

        <i
          className={`fi fi-sr-refresh cursor-pointer mt-1 ${
            isLoop && "text-red-500"
          }`}
          onClick={handleLoopChange}
        ></i>

        <svg
          className={`w-5 h-5 cursor-pointer ${
            isMute && "fill-red-500 text-red-500"
          }`}
          onClick={handleMute}
          viewBox="0 0 15 15"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.3644 13.3644L12.9338 11.9338C13.9948 10.7008 14.576 9.1267 14.5709 7.49999C14.5709 4.60712 12.8229 2.2297 10.3287 1.13571V2.54999C12.0166 3.53009 13.1566 5.41185 13.1566 7.49999C13.1535 8.75635 12.7381 9.97688 11.9742 10.9742L11.0656 10.0655C11.4913 9.29331 11.743 8.34149 11.743 7.49999C11.743 6.24769 11.1949 4.74213 10.3287 3.96428V9.32866L8.91442 7.91438V1.84285C8.91433 1.715 8.87963 1.5895 8.81382 1.47975C8.7481 1.37001 8.65382 1.28025 8.54105 1.21981C8.42829 1.15947 8.30128 1.1308 8.17353 1.13693C8.04577 1.14306 7.92197 1.1837 7.81552 1.25451L4.47847 3.47852L1.63585 0.635803L0.635857 1.6357L13.3644 14.3643L14.3644 13.3644ZM7.50014 3.16379L6.4992 3.83105L5.49817 4.49822L7.50014 3.16379ZM1.843 11.0357H3.75011L7.81477 13.7455C7.92141 13.8163 8.0452 13.857 8.17306 13.8632C8.30091 13.8695 8.4281 13.841 8.54105 13.7808C8.65391 13.7205 8.74829 13.6305 8.81401 13.5207C8.87973 13.4109 8.91452 13.2852 8.91442 13.1571V11.8285L7.50014 10.4142L4.7107 7.94785L4.35684 9.74022C4.33921 9.72825 4.67157 9.85713 4.29895 9.71693C4.21541 9.67149 3.82337 9.86581 3.72871 9.85713C3.70608 9.85506 7.73585 12.0642 4.67157 9.85713L4.7107 7.94785L1.843 5.37856L7.81552 10.7296L1.20798 4.12202C0.974531 4.23884 0.778134 4.41817 0.640571 4.64002C0.502914 4.86188 0.429654 5.11758 0.428711 5.37856V9.62142C0.428711 10.4014 1.06297 11.0357 1.843 11.0357Z"
            fill="currentColor"
          />
        </svg>

      </div>
    </>
  );
};

export default MainMusicBox;
