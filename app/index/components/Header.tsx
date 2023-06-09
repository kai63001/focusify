import Link from "next/link";

const IndexHeader = () => {
  return (
    <div className="max-w-[1400px] py-4 w-full m-auto flex flex-col justify-center">
      <h1 className="text-6xl text-center mt-24 font-bold">Focusify</h1>
      <p className="text-center text-4xl mt-5 whitespace-pre-line">
        {`Your workspace to get things \n done smoothly.`}
      </p>
      <div className="flex justify-center mt-7">
        <Link href="/app" className="rounded-full px-5 py-2 bg-red-500">
          Try In Browser
        </Link>
      </div>
    </div>
  );
};

export default IndexHeader;
