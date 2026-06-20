export const OBtn = ({
  children,
  color = "#8b5cf6",
  onClick,
  style = {},
  small = false,
}) => (
  <button
    onClick={onClick}
    className="hover-scale"
    style={{
      background: "white",
      color,
      border: `3px solid ${color}`,
      borderRadius: 50,
      padding: small ? "6px 16px" : "10px 26px",
      fontWeight: 800,
      fontSize: small ? 11 : 14,
      fontFamily: "'VT323', monospace",
      cursor: "pointer",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      boxShadow: `0 0 0 0 ${color}22`,
      transition: "all 0.2s ease",
      ...style,
    }}
  >
    {children}
  </button>
);
