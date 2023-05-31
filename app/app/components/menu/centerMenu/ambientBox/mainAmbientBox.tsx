import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MainAmbientBox = () => {
  const [selectedSounds, setSelectedSounds] = useState<any[]>([]);
  const [sounds, setSounds] = useState<any[]>([
    {
      id: 0,
      name: "Rain",
      url: "https://cloud.appwrite.io/v1/storage/buckets/647617e7f3c9f268c1f5/files/6476c7ece074568124c1/view?project=646bba5e9c9dd4ddcb4b&mode=admin",
      icon: "fi fi-rr-cloud-rain",
    },
    {
      id: 1,
      name: "Campfire",
      url: "https://cloud.appwrite.io/v1/storage/buckets/647617e7f3c9f268c1f5/files/6476bd688099e1f82b63/view?project=646bba5e9c9dd4ddcb4b&mode=admin",
      icon: "fi fi-sr-camping",
    },
    {
      id: 2,
      name: "Forest",
      url: "https://cloud.appwrite.io/v1/storage/buckets/647617e7f3c9f268c1f5/files/6476d146caf20266d5d4/view?project=646bba5e9c9dd4ddcb4b&mode=admin",
      icon: "fi fi-rr-tree",
    },
  ]);
  const [volumeList, setVolumeList] = useState<number[]>([]);
  const [audioList, setAudioList] = useState<any[]>([]);

  //useEffect to set volumeList
  useEffect(() => {
    setVolumeList(
      sounds.map((item) => {
        return 0.5;
      })
    );
  }, [sounds]);

  const [isOpen, setIsOpen] = useState(false);

  const handleSoundSelect = (sound: any) => {
    // setSelectedSounds([...selectedSounds, sound]);
    // console.log(selectedSounds);
    //filter sound if it is already selected remove it
    if (selectedSounds.includes(sound)) {
      setSelectedSounds(selectedSounds.filter((s) => s !== sound));
    }
    //else add it to the array
    else {
      setSelectedSounds([...selectedSounds, sound]);
    }
  };

  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sound: any,
    index: number
  ) => {
    const value = parseFloat(event.target.value);
    const newVolumeList = [...volumeList];
    newVolumeList[index] = value;
    setVolumeList(newVolumeList);
  };

  useEffect(() => {
    // Create an array of Audio objects for each selected sound
    const audioObjects = selectedSounds.map((sound, i) => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = 0.5;
      audio.id = sound.id;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            console.log("audio played auto");
          })
          .catch((error) => {
            console.log("playback prevented");
          });
      }

      return audio;
    });
    setAudioList(audioObjects);

    // Return a cleanup function that pauses all the Audio objects
    return () => {
      Promise.all(audioObjects.map((audio) => audio.pause()));
    };
  }, [selectedSounds]);

  useEffect(() => {
    audioList.forEach((audio, i) => {
      audio.volume = volumeList[audio.id];
    });
  }, [audioList, volumeList]);

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.7 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="relative">
        <div className="px-5 h-8 bg-primary bg-opacity-75 backdrop-blur-xl rounded-md flex justify-center items-center space-x-3">
          <i
            onClick={() => setIsOpen(!isOpen)}
            className={`fi fi-rr-waveform-path mt-1 cursor-pointer ${selectedSounds.length > 0 && "text-red-500"}`}
          ></i>
          {isOpen && (
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="absolute z-50 top-full bg-primary bg-opacity-75 backdrop-blur-xl rounded-md shadow-md mt-1 w-[500px] py-2"
            >
              <h2 className="text-2xl px-5 py-2 pb-5">Ambient Sound</h2>
              <div className="grid grid-cols-3 gap-4 justify-center items-center">
                {sounds.map((sound, i) => (
                  <div key={i} className="px-5">
                    <div
                      onClick={() => handleSoundSelect(sound)}
                      className="flex flex-col justify-center items-center space-x-2 cursor-pointer text-center"
                    >
                      <i
                        className={`${sound.icon} text-2xl text-center ${
                          selectedSounds.includes(sound) && "text-red-500"
                        }`}
                      ></i>
                      <p className="text-center">{sound.name}</p>
                    </div>
                    {selectedSounds.includes(sound) ? (
                      <input
                        type="range"
                        className="w-full h-6"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volumeList[i]}
                        onChange={(e) => {
                          handleVolumeChange(e, sound, i);
                        }}
                      />
                    ) : (
                      <div className="h-7"></div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MainAmbientBox;
