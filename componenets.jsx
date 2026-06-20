export const GBtn = ({
  children,
  onClick,
  a = "#ff2e8a",
  b = "#8b5cf6",
  style = {},
  disabled = false,
  small = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="hover-scale"
    style={{
      background: disabled
        ? "#ddd"
        : `linear-gradient(135deg, ${a}, ${b})`,
      color: "white",
      border: "3px solid rgba(255,255,255,0.2)",
      borderRadius: 50,
      padding: small ? "8px 18px" : "12px 30px",
      fontWeight: 800,
      fontSize: small ? 12 : 14,
      fontFamily: "'VT323', monospace",
      cursor: disabled ? "not-allowed" : "pointer",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      boxShadow: disabled
        ? "none"
        : `0 4px 16px ${a}44`,
      transition: "all 0.2s ease",
      ...style,
    }}
  >
    {children}
  </button>
);
