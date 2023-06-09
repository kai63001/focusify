import Image from "next/image";

const IndexBanner = () => {
  return (
    <div className="relative w-full mt-14">
      <div className="circleBackdrop top-6 absolute"></div>
      <div className="flex justify-center mt-5">
        <div className="w-[1600px] h-[890px] relative z-40">
          <Image
            src="/main/Home.webp"
            alt="main"
            fill
            quality={100}
            className="rounded-3xl object-scale-down"
          />
        </div>
      </div>
    </div>
  );
};

export default IndexBanner;
