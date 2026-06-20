export const ScoreBar = ({ label, score, col }) => (
  <div style={{ marginBottom: 12 }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#1a1a2e",
          fontFamily: "'VT323', monospace",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: col,
          fontFamily: "'VT323', monospace",
        }}
      >
        {score}
      </span>
    </div>
    <div
      style={{
        background: "#ede8ff",
        borderRadius: 20,
        height: 10,
        border: "2px solid #1a1a2e",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg, ${col}, ${col}aa)`,
          width: `${score}%`,
          height: "100%",
          borderRadius: 20,
          transition: "width 1s ease",
          borderRight: "3px solid #1a1a2e",
        }}
      />
    </div>
  </div>
);
