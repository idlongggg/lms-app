import { useEffect, useState } from "react";

export function useCountdown(initialSeconds = 0) {
  const [count, setCount] = useState(initialSeconds);

  useEffect(() => {
    if (count <= 0) return;

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  const start = (seconds: number) => setCount(seconds);
  const reset = () => setCount(0);
  const isCounting = count > 0;

  return {
    count,
    start,
    reset,
    isCounting,
  };
}
