import dayjs from "@/libs/day";
import { useState } from "react";

const DatePreview = ({
  date,
  defaultMode = false,
  className = "text-[#eaeaea] text-xs cursor-pointer",
}: {
  date: Date;
  className?: string;
  defaultMode?: boolean;
}) => {
  //change mode to dayjs
  const [mode, setMode] = useState(defaultMode);
  const handleDate = (date: any) => {
    //use dayjs
    if (mode) return dayjs(date).format("DD/MM/YYYY HH:mm");
    return dayjs(date).fromNow();
  };

  const handleClick = () => {
    setMode(!mode);
  };

  return (
    <>
      <p onClick={handleClick} className={className}>
        {handleDate(date)}
      </p>
    </>
  );
};

export default DatePreview;
