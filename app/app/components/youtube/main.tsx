import { useAppDispatch } from "@/app/redux/hook";
import { setOpenApp } from "@/app/redux/slice/appControl.slice";
import { motion } from "framer-motion";
import { Resizable } from "re-resizable";
import DragCorner from "./dragCornert";
import { useState } from "react";
import Image from "next/image";

const YoutubeMain = () => {
  const dispatch = useAppDispatch();
  const closeApp = () => {
    dispatch(setOpenApp({ app: "appYoutube", isShow: false }));
  };

  const [url, setUrl] = useState("");
  const [urlPlay, setUrlPlay] = useState("");
  const [error, setError] = useState("");
  const [heightWidget, setHeightWidget] = useState(400);

  const playVideo = (event: any) => {
    event.preventDefault();
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?v=([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeUrlPattern);
    if (match) {
      const videoId = match[4];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setUrlPlay(embedUrl);
      // Add logic to play the video with the given embed URL
    } else {
      console.log("Invalid YouTube URL");
      setError("Invalid YouTube URL");
    }
  };

  const goToSearchPage = () => {
    setUrlPlay("");
    setUrl("");
  };

  return (
    <Resizable
      defaultSize={{
        width: 500,
        height: 400,
      }}
      minHeight={200}
      minWidth={300}
      handleStyles={{
        top: { display: "none" },
        left: { display: "none" },
        bottom: { display: "none" },
        right: { display: "none" },
        topRight: { display: "none" },
        bottomLeft: { display: "none" },
        topLeft: { display: "none" },
        bottomRight: { fill: "red" },
      }}
      handleClasses={{
        bottomRight: "w-4 h-4 rounded-full bg-primaryLight mr-3 mb-3 opacity-0",
      }}
      //onresize get width and height
      onResizeStop={(e, direction, ref, d) => {
        console.log(ref.style.width, ref.style.height);
        setHeightWidget(parseInt(ref.style.height));
      }}
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.7 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="bg-primary bg-opacity-95 backdrop-blur-lg border border-primaryLight rounded-md text-sm h-full flex flex-col"
      >
        <div className="flex justify-between">
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={closeApp}
              className="fi fi-rr-horizontal-rule cursor-pointer"
            ></i>
          </div>
          <div className="w-full cursor-grab handle"></div>
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={goToSearchPage}
              className="fi fi-br-search cursor-pointer"
            ></i>
          </div>
        </div>
        {urlPlay.length <= 0 ? (
          <div className="px-5 h-full">
            <form onSubmit={playVideo} className="flex space-x-3">
              <input
                name="url"
                type="text"
                className="outline-none w-9/12 bg-primaryLight px-3 py-2 rounded-md"
                placeholder="Place youtube url here"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  setError("");
                }}
              />
              <button
                type="submit"
                onClick={playVideo}
                className="w-3/12 px-3 py-2 rounded-md text-white bg-red-500"
              >
                Play
              </button>
            </form>
            {error.length > 0 && (
              <div className="text-red-500 text-xs">{error}</div>
            )}
            <div>
              <p className="pt-3 pb-1 text-lg">Recommeded Videos</p>
              <div className="grid grid-cols-2 gap-4 overflow-scroll no-scrollbar" style={{
                height: heightWidget - 130
              }}>
                <div className="relative h-[135px] w-full aspect-ratio-1">
                  <Image
                    src="https://picsum.photos/400/400"
                    alt="Image 1"
                    fill
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="relative h-[135px] w-full aspect-ratio-1">
                  <Image
                    src="https://picsum.photos/400/400"
                    alt="Image 1"
                    fill
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <iframe
              width="100%"
              height="100%"
              src={urlPlay}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-0 right-0">
              <DragCorner />
            </div>
          </>
        )}
      </motion.div>
    </Resizable>
  );
};

export default YoutubeMain;
