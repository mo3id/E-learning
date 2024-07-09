import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface Props {
  timeState: Dispatch<SetStateAction<string>>; // Time in milliseconds when the countdown should end
}

const CountdownTimer: React.FC<Props> = ({ timeState }) => {
  const [timeEnd, setTimeEnd] = useState(0);
  const [showTime, setShowTime] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const setTimeOut = (state: string) => {
    timeState(state);
  };

  useLayoutEffect(() => {
    const endTime = JSON.parse(
      localStorage.getItem("verficationCodeTime") || ""
    );
    setTimeEnd(endTime);
    // setTimeOut(false)
    // const currentTime = new Date();
    // const editedTime = currentTime.getTime() + 1 * 30 * 1000;

    const timer = setInterval(() => {
      setRemainingTime(timeEnd - Date.now());
      setTimeOut("pending");
    }, 1000);
    setShowTime(true);
    return () => {
      clearInterval(timer);
    };
  }, [timeEnd]);
  useEffect(() => {
    if (remainingTime < 0) {
      setShowTime(false);
      setTimeOut("resend");
    } else if (remainingTime > 0) {
      setTimeOut("verify");
    }
  }, [setTimeOut]);

  const formatTime = (time: number): string => {
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 1000 / 60) % 60;

    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      {remainingTime > 0 && showTime && (
        <span> {formatTime(remainingTime)}</span>
      )}
      {remainingTime < 0 && <span>Time out!</span>}
    </div>
  );
};

export default CountdownTimer;
