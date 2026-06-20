import { GBtn } from "../common/GBtn";
import { Blob } from "../common/Blob";

export const Hero = ({ onLogin }) => (
  <section
    style={{
      minHeight: "100vh",
      background: `
        linear-gradient(155deg, #f7f0ff 0%, #eaf6ff 45%, #fff0f6 100%),
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 40px,
          rgba(139, 92, 246, 0.03) 40px,
          rgba(139, 92, 246, 0.03) 41px
        )
      `,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "110px 40px 70px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Y2K Blobs */}
    <Blob size={300} color="#ff2e8a12" style={{ top: "5%", left: "-8%" }} />
    <Blob size={200} color="#7dd3fc22" style={{ top: "10%", right: "-5%", animationDelay: "2s" }} />
    <Blob size={180} color="#fef08a99" style={{ bottom: "10%", left: "2%", animationDelay: "4s" }} />
    <Blob size={140} color="#87a87a44" style={{ bottom: "18%", right: "3%", animationDelay: "1s" }} />

    {/* Floating Y2K stars */}
    {[
      { s: 40, c: "#ff2e8a", t: "12%", l: "8%", d: "0s" },
      { s: 28, c: "#8b5cf6", t: "18%", r: "10%", d: "1s" },
      { s: 32, c: "#fef08a", b: "18%", r: "8%", d: "0.5s" },
      { s: 24, c: "#7dd3fc", b: "14%", l: "16%", d: "1.5s" },
      { s: 20, c: "#87a87a", t: "35%", l: "3%", d: "2s" },
      { s: 26, c: "#22d3ee", t: "30%", r: "3%", d: "0.8s" },
    ].map((s, i) => (
      <div
        key={i}
        className="float"
        style={{
          position: "absolute",
          fontSize: s.s,
          color: s.c,
          top: s.t,
          left: s.l,
          right: s.r,
          bottom: s.b,
          animationDelay: s.d,
          animationDuration: `${3 + i * 0.5}s`,
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        ✦
      </div>
    ))}

    {/* Badge */}
    <div
      className="float"
      style={{
        display: "inline-block",
        background: "#fef08a",
        borderRadius: 50,
        padding: "8px 24px",
        fontWeight: 800,
        color: "#1a1a2e",
        fontSize: 14,
        marginBottom: 32,
        zIndex: 1,
        border: "3px solid #1a1a2e",
        boxShadow: "6px 6px 0 rgba(0,0,0,0.1)",
        fontFamily: "'VT323', monospace",
        letterSpacing: "1px",
      }}
    >
      ✨ creator safety net + discovery engine ✨
    </div>

    {/* BIG LOGO */}
    <div style={{ zIndex: 1, marginBottom: 8 }}>
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontWeight: 900,
          fontSize: 100,
          letterSpacing: 12,
          lineHeight: 0.9,
          color: "#22d3ee",
          textShadow: `
            -6px -6px 0 #ff2e8a,
            6px -6px 0 #ff2e8a,
            -6px 6px 0 #ff2e8a,
            6px 6px 0 #ff2e8a,
            0 0 60px #22d3ee77
          `,
          animation: "float 4s ease-in-out infinite",
        }}
      >
        ⏰
      </div>
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontWeight: 900,
          fontSize: 70,
          letterSpacing: 10,
          lineHeight: 1.1,
          color: "#22d3ee",
          textShadow: `
            -6px -6px 0 #ff2e8a,
            6px -6px 0 #ff2e8a,
            -6px 6px 0 #ff2e8a,
            6px 6px 0 #ff2e8a,
            0 0 60px #22d3ee77
          `,
          marginTop: -10,
        }}
      >
        ClockIT
      </div>
    </div>

    <div
      style={{
        fontWeight: 900,
        fontSize: 18,
        marginBottom: 20,
        zIndex: 1,
        fontFamily: "'VT323', monospace",
        letterSpacing: "2px",
        background: "linear-gradient(135deg, #ff2e8a, #8b5cf6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      by team MicroChips 🎮
    </div>

    <p
      style={{
        color: "#6b718a",
        fontSize: 18,
        maxWidth: 560,
        lineHeight: 1.8,
        marginBottom: 10,
        zIndex: 1,
        fontFamily: "'VT323', monospace",
        letterSpacing: "0.5px",
      }}
    >
      Creators out here grinding, building audiences, shifting culture — but
      platforms don't protect them, don't back them up, and AI slop content be
      crazy.
    </p>

    <p
      style={{
        color: "#1a1a2e",
        fontWeight: 800,
        fontSize: 18,
        marginBottom: 40,
        zIndex: 1,
        fontFamily: "'VT323', monospace",
        letterSpacing: "0.5px",
      }}
    >
      So ClockIT is the{" "}
      <span style={{ color: "#87a87a", fontSize: 20 }}>ogre layer</span> they
      needed. (Shrek reference, pls get it 🧅)
    </p>

    <div
      style={{
        display: "flex",
        gap: 14,
        justifyContent: "center",
        flexWrap: "wrap",
        zIndex: 1,
      }}
    >
      <GBtn
        onClick={onLogin}
        style={{
          padding: "16px 42px",
          fontSize: 18,
          borderRadius: 16,
          border: "4px solid #1a1a2e",
        }}
      >
        🛡️ I'm a Creator
      </GBtn>
      <GBtn
        onClick={onLogin}
        a="#7dd3fc"
        b="#8b5cf6"
        style={{
          padding: "16px 42px",
          fontSize: 18,
          borderRadius: 16,
          border: "4px solid #1a1a2e",
        }}
      >
        🔍 I'm a Brand
      </GBtn>
    </div>

    <div
      className="float"
      style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        color: "#6b718a",
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: 2,
        zIndex: 1,
        fontFamily: "'VT323', monospace",
      }}
    >
      ↓ scroll ↓
    </div>

    {/* Y2K divider at bottom */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 6,
        background: "repeating-linear-gradient(90deg, #ff2e8a, #ff2e8a 20px, #fef08a 20px, #fef08a 40px, #22d3ee 40px, #22d3ee 60px, #8b5cf6 60px, #8b5cf6 80px)",
      }}
    />
  </section>
);
