export const FooterCTA = ({ onLogin }) => (
  <section
    style={{
      background: "linear-gradient(135deg, #8b5cf6, #ff2e8a)",
      padding: "80px 40px",
      textAlign: "center",
      borderTop: "4px solid #1a1a2e",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Decorative Y2K elements */}
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        fontSize: 48,
        opacity: 0.2,
        animation: "spin 20s linear infinite",
      }}
    >
      ✦
    </div>
    <div
      style={{
        position: "absolute",
        bottom: "10%",
        right: "5%",
        fontSize: 36,
        opacity: 0.2,
        animation: "spin 25s linear infinite reverse",
      }}
    >
      ✧
    </div>

    <div className="float" style={{ fontSize: 72, marginBottom: 16 }}>
      ⏰
    </div>

    <h2
      style={{
        fontSize: 42,
        fontWeight: 900,
        color: "white",
        marginBottom: 12,
        fontFamily: "'Press Start 2P', monospace",
        textShadow: "4px 4px 0 rgba(0,0,0,0.2)",
      }}
    >
      Don't let the clock run out.
    </h2>

    <p
      style={{
        color: "rgba(255,255,255,0.9)",
        fontSize: 20,
        maxWidth: 480,
        margin: "0 auto 36px",
        lineHeight: 1.6,
        fontFamily: "'VT323', monospace",
        letterSpacing: "1px",
      }}
    >
      For the ones who move culture, not just metrics.
      <br />
      <strong style={{ color: "#fef08a", fontSize: 22 }}>
        ClockIT has your back.
      </strong>
      ✨
    </p>

    <div
      style={{
        display: "flex",
        gap: 14,
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: 60,
      }}
    >
      <button
        onClick={onLogin}
        style={{
          background: "white",
          color: "#8b5cf6",
          border: "4px solid #1a1a2e",
          borderRadius: 50,
          padding: "14px 36px",
          fontWeight: 800,
          fontSize: 16,
          fontFamily: "'VT323', monospace",
          cursor: "pointer",
          letterSpacing: "1px",
          boxShadow: "6px 6px 0 rgba(0,0,0,0.15)",
          transition: "all 0.2s",
        }}
        className="hover-scale"
      >
        🛡️ Join as Creator
      </button>
      <button
        onClick={onLogin}
        style={{
          background: "
