export const Card = ({ children, glow, style = {}, className = "" }) => (
  <div
    className={className}
    style={{
      background: "#ffffff",
      borderRadius: 20,
      padding: "20px",
      border: glow ? `3px solid ${glow}` : "3px solid #e8e0f0",
      boxShadow: glow
        ? `0 0 0 2px ${glow}22, 0 8px 32px ${glow}18, inset 0 0 40px ${glow}08`
        : "0 4px 24px rgba(139,92,246,0.08)",
      transition: "all 0.3s ease",
      ...style,
    }}
  >
    {children}
  </div>
);
