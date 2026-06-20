export const Tag = ({ label, color = "#8b5cf6", small = false }) => (
  <span
    style={{
      background: color + "22",
      color,
      border: `2px solid ${color}55`,
      borderRadius: 20,
      padding: small ? "2px 10px" : "4px 14px",
      fontSize: small ? 10 : 12,
      fontWeight: 700,
      display: "inline-block",
      whiteSpace: "nowrap",
      fontFamily: "'VT323', monospace",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    }}
  >
    {label}
  </span>
);
