"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  prefix = "",
  suffix = "",
  duration = 2.5,
  className,
  decimals = 0,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          end={end}
          prefix={prefix}
          suffix={suffix}
          duration={duration}
          decimals={decimals}
          separator=","
        />
      ) : (
        `${prefix}0${suffix}` 
      )}
    </span>
  );
};
