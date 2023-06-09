const IndexSubscribe = () => {
  return (
    <div className="max-w-[1400px] bg-[#1E2235] rounded-3xl py-10 w-full m-auto flex flex-col my-10">
      <div className="m-auto py-7 flex flex-col space-y-4 max-w-[550px]">
        <h2 className="text-3xl font-bold text-center">
          Subscribe to receive our new news.
        </h2>
        <p className="text-left whitespace-pre-line">
          {`Stay informed about the latest Focusify features and updates\ndeliveredto your inbox every month..`}
        </p>
        <div className="flex rounded-full w-full bg-[#252A41] pl-5 py-4 relative">
          <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Enter your email here"
          />
          <button className="absolute bg-[#4581FF] rounded-full px-5 py-2 top-2 right-2">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default IndexSubscribe;
