import { useScramble } from "../hooks/use-scramble";

interface Props {
  text: string;
  className?: string;
  trigger?: "mount" | "view" | "manual";
  duration?: number;
  speed?: number;
  delay?: number;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
}

export default function ScrambleText({
  text,
  className,
  trigger = "view",
  duration = 60,
  speed = 1,
  delay = 0,
  as = "span",
}: Props) {
  const { output, elRef } = useScramble(text, { trigger, duration, speed, delay });
  const Tag = as;
  return (
    <Tag
      ref={elRef as never}
      className={className}
      style={{ display: "inline-block", whiteSpace: "pre" }}
    >
      {output}
    </Tag>
  );
}
