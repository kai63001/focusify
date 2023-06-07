import Image from "next/image";

const IndexFeature = () => {
  return (
    <div className="max-w-[1600px] py-4 w-full m-auto flex flex-col justify-center">
      <h2 className="text-6xl text-center mt-24 font-bold">Features</h2>
      <p className="text-center text-4xl mt-5 whitespace-pre-line">
        {`Focusify is your one-stop \n solution to boost productivity`}
      </p>
      <div className="flex justify-between mt-10">
        <div className="relative h-[400px] w-7/12">
          <div className="circleBackdrop-sm top-6"></div>
          <Image
            src="/main/pomodoro.png"
            alt="main"
            fill
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
    </div>
  );
};

export default IndexFeature;
