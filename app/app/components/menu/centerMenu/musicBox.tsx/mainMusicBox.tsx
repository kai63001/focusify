import { useState, useRef, useEffect } from "react";

const MainMusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
          className="cursor-pointer"
          width="16"
          height="10"
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
          className="cursor-pointer"
          width="17"
          height="10"
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
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isLoop} onChange={handleLoopChange} />
          Loop
        </label>
        <i
          className={`fi ${
            isMute ? "fi-sr-volume-mute" : "fi-sr-volume"
          } mt-1 cursor-pointer`}
          onClick={handleMute}
        ></i>
      </div>
    </>
  );
};

export default MainMusicBox;
