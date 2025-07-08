import { PropsWithChildren } from "react";
import { SvgProps } from "@/app/_types";

export default function Svg({
  children,
  ariaLabel,
  viewBox,
  style,
}: PropsWithChildren<SvgProps>) {
  return (
    <svg aria-label={ariaLabel} role="img" viewBox={viewBox} style={style}>
      <title>{ariaLabel}</title>
      {children}
    </svg>
  );
}
