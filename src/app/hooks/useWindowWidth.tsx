"use client";

import { useState, useEffect } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState<number>(0); // 초기 값 설정

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      // 초기 width 설정
      setWidth(window.innerWidth);

      // 창 크기 변경 감지
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
}
