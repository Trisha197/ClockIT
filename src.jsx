import { TICKER } from "../../data/mockData";

export const Ticker = () => {
  const all = [...TICKER, ...TICKER];
  
  return (
    <div
      style={{
        background: "#8b5cf6",
        overflow: "hidden",
        padding: "12px 0",
        borderTop: "4px solid #1a1a2e",
        borderBottom: "4px solid #1a1a2e",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: 14,
              padding: "0 32px",
              whiteSpace: "nowrap",
              fontFamily: "'VT323', monospace",
              letterSpacing: "0.5px",
              opacity: i % 2 === 0 ? 1 : 0.7,
            }}
          >
            {item}
            <span style={{ marginLeft: 20, opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
