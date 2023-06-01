const DragCorner = () => {
  return (
    <svg
      fill="#ffffff"
      width="25px"
      height="25px"
      viewBox="0 0 36 36"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>drag-handle-corner-line</title>
      <circle
        cx="12"
        cy="24"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-1"
      ></circle>
      <circle
        cx="18"
        cy="24"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-2"
      ></circle>
      <circle
        cx="18"
        cy="18"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-3"
      ></circle>
      <circle
        cx="24"
        cy="12"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-4"
      ></circle>
      <circle
        cx="24"
        cy="24"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-5"
      ></circle>
      <circle
        cx="24"
        cy="18"
        r="1.5"
        className="clr-i-outline clr-i-outline-path-6"
      ></circle>
      <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
    </svg>
  );
};

export default DragCorner;
