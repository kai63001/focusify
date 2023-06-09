import Image from "next/image";

const IndexFeature = () => {
  return (
    <div className="max-w-[1400px] py-4 w-full m-auto flex flex-col justify-center relative">
      <div className="absolute h-full w-full hidden md:block">
        <Image
          src="/main/Line1.webp"
          alt="line"
          className="object-contain h-[1893px]  mt-[550px]"
          width={2000}
          height={200}
          
        />
      </div>
      <h2 className="text-6xl text-center mt-24 font-bold">Features</h2>
      <p className="text-center text-4xl mt-5 whitespace-pre-line">
        {`Focusify is your one-stop \n solution to boost productivity`}
      </p>
      <div className="flex justify-between items-center mt-10">
        <div className="relative h-[400px] w-7/12">
          <div className="circleBackdrop-sm top-6"></div>
          <Image
            src="/main/V5.webp"
            alt="pomodoro"
            fill
            unoptimized={true}
            quality={100}
            className="rounded-3xl object-scale-down z-40"
          />
        </div>
        <div className="text-left w-5/12">
          <h3 className="text-5xl font-bold whitespace-pre-line">{`Immerse Yourself\n in Focusify`}</h3>
          <p className="whitespace-pre-line text-3xl -mt-3 font-light">
            {`
            The Deep Focused Experience
            with a Virtual Touch and
            Pomodoro Timer.`}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-14">
        <div className="text-left w-7/12">
          <h3 className="text-5xl font-bold whitespace-pre-line">{`Noise cancellation \nwith Soothing Sounds. `}</h3>
          <p className="whitespace-pre-line text-3xl -mt-3 font-light">
            {`
            Focusify Cut Out the Noise with
            Soothing Sounds. Adjustable 
            Soundscapes for Each Scene - 
            Rain , Campfire , Forest , and More.`}
          </p>
        </div>
        <div className="relative h-[400px] w-5/12">
          <div className="circleBackdrop-sm top-6"></div>
          <Image
            src="/main/V4.webp"
            alt="Sound"
            fill
            unoptimized={true}
            quality={100}
            className="rounded-3xl object-scale-down z-40"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-14">
        <div className="relative h-[400px] w-7/12">
          <div className="circleBackdrop-sm top-6"></div>
          <Image
            src="/main/V1.webp"
            alt="Music"
            fill
            unoptimized={true}
            quality={100}
            className="rounded-3xl object-scale-down z-40"
          />
        </div>
        <div className="text-left w-5/12">
          <h3 className="text-5xl font-bold whitespace-pre-line">{`The Perfect Playlist.`}</h3>
          <p className="whitespace-pre-line text-3xl -mt-3 font-light">
            {`
            The perfect playlist. Play.
            Music is ad-free and still has How to play YouTube videos 
            via URL link.`}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-14">
        <div className="text-left w-7/12">
          <h3 className="text-5xl font-bold whitespace-pre-line">{`Take note of the story\n& To do list.`}</h3>
          <p className="whitespace-pre-line text-3xl -mt-3 font-light">
            {`
            Capture your thoughts and ideas \nbefore they're lost by taking notes. \nAnd you can also define a to-do list..`}
          </p>
        </div>
        <div className="relative h-[400px] w-5/12">
          <div className="circleBackdrop-sm top-6"></div>
          <Image
            src="/main/V3.webp"
            alt="noteTodo"
            fill
            unoptimized={true}
            quality={100}
            className="rounded-3xl object-scale-down z-40"
          />
        </div>
      </div>
      {/* center */}
      <div className="flex flex-col justify-center items-center mt-14 ">
        <div className="relative h-[400px] w-5/12">
          <div className="circleBackdrop-sm top-6"></div>
          <Image
            src="/main/V2.png"
            alt="wallpaper note book"
            fill
            unoptimized={true}
            quality={100}
            className="rounded-3xl object-scale-down z-40"
          />
        </div>
        <h3 className="text-5xl font-bold whitespace-pre-line text-center">{` Choose to use a wallpaper catalog \nand can import wallpapers.`}</h3>
        <p className="whitespace-pre-line text-3xl mt-5 font-light text-center">
          {`Choose from a full catalog of original scenes, interactive \nscenes, and more, and even import photos from \nyour PC. You can set it as wallpaper too.`}
        </p>
      </div>
    </div>
  );
};

export default IndexFeature;
