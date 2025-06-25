import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import './Range.css'
const SVG_WIDTH = 600;
const SVG_HEIGHT = 600;
const DRAG_MIN = 146;
const DRAG_MAX = 446;

export const GooSlider: React.FC = () => {
  const draggerRef = useRef<SVGCircleElement>(null);
  const displayRef = useRef<SVGCircleElement>(null);
  const upTextRef = useRef<SVGTextElement>(null);
  const downTextRef = useRef<SVGTextElement>(null);
  const [dragX, setDragX] = useState(DRAG_MIN);
  const [dragValue, setDragValue] = useState(0);

  useEffect(() => {
    gsap.set("#gooSVG", { visibility: "visible" });
    gsap.set(upTextRef.current, { opacity: 0 });
  }, []);

  // Drag logic
  useEffect(() => {
    const svg = document.getElementById("gooSVG");
    let isDragging = false;

    const onPointerDown = () => {
      isDragging = true;
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const svgRect = svg?.getBoundingClientRect();
      if (!svgRect) return;
      let x = e.clientX - svgRect.left;
      x = Math.max(DRAG_MIN, Math.min(DRAG_MAX, x));
      setDragX(x);
      setDragValue(Math.round(((x - DRAG_MIN) / (DRAG_MAX - DRAG_MIN)) * 100));
    };

    const onPointerUp = () => {
      isDragging = false;
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      // Animate upText
      gsap.to(upTextRef.current, { opacity: 1, duration: 1 });
      gsap.to(displayRef.current, { attr: { cy: 299.5, r: 0 }, duration: 1 });
      gsap.to(draggerRef.current, { attr: { r: 15 }, duration: 1 });
    };

    draggerRef.current?.addEventListener("pointerdown", onPointerDown);

    return () => {
      draggerRef.current?.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  useEffect(() => {
    // Move dragger and display
    gsap.to(draggerRef.current, { attr: { cx: dragX }, duration: 0.2 });
    gsap.to(displayRef.current, { attr: { cx: dragX }, duration: 0.2 });
    if (downTextRef.current) downTextRef.current.textContent = dragValue.toString();
    if (upTextRef.current) upTextRef.current.textContent = dragValue.toString();
  }, [dragX, dragValue]);

  return (
    <div
      style={{
        background: "#03A9F4",
        width: "100%",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Ropa Sans', sans-serif",
      }}
    >
      <svg
        id="gooSVG"
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        style={{ visibility: "hidden" }}
        viewBox="0 0 600 600"
      >
        <defs>
          <filter id="goo" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              result="cm"
            />
          </filter>
        </defs>
        <g id="dragGroup">
          <path
            id="dragBar"
            fill="#FFFFFF"
            d="M447,299.5c0,1.4-1.1,2.5-2.5,2.5h-296c-1.4,0-2.5-1.1-2.5-2.5l0,0c0-1.4,1.1-2.5,2.5-2.5
            h296C445.9,297,447,298.1,447,299.5L447,299.5z"
          />
          <g id="displayGroup">
            <g id="gooGroup" filter="url(#goo)">
              <circle
                id="display"
                ref={displayRef}
                fill="#FFFFFF"
                cx={dragX}
                cy="299.5"
                r="16"
              />
              <circle
                id="dragger"
                ref={draggerRef}
                fill="#FFFFFF"
                stroke="#03A9F4"
                strokeWidth="0"
                cx={dragX}
                cy="299.5"
                r="15"
                style={{ cursor: "pointer" }}
              />
            </g>
            <text
              className="downText"
              ref={downTextRef}
              x={dragX}
              y="304"
              style={{
                textAnchor: "middle",
                fontWeight: 700,
                fontSize: 14,
                fill: "#03A9F4",
                letterSpacing: "0.4px",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {dragValue}
            </text>
            <text
              className="upText"
              ref={upTextRef}
              x={dragX - 1}
              y="266"
              style={{
                textAnchor: "middle",
                fontWeight: 700,
                fontSize: 24,
                fill: "#03A9F4",
                letterSpacing: "0.4px",
                userSelect: "none",
                pointerEvents: "none",
                opacity: 0,
              }}
            >
              {dragValue}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default GooSlider;