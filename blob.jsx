export const Blob = ({ size = 100, color, style = {} }) => (
  <div
    style={{
      width: size,
      height: size,
      background: color,
      position: "absolute",
      animation: "wobble 8s ease-in-out infinite",
      borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
      filter: "blur(1px)",
      zIndex: 0,
      ...style,
    }}
  />
);
