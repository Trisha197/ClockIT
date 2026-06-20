import { Tag } from "../common/Tag";
import { Card } from "../common/Card";
import { PROBLEMS } from "../../data/mockData";

export const Problems = () => (
  <section
    style={{
      background: "#f7f0ff",
      padding: "80px 40px",
      position: "relative",
    }}
  >
    {/* Decorative Y2K elements */}
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 40,
        fontSize: 20,
        opacity: 0.15,
      }}
    >
      ✦ ✧ ✦ ✧ ✦
    </div>

    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <Tag label="🚨 The Problem" color="#ff2e8a" />
        <h2
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#1a1a2e",
            marginTop: 14,
            lineHeight: 1.2,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          The internet is failing creators.
          <br />
          <span style={{ color: "#ff2e8a" }}>In 3 very specific ways.</span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {PROBLEMS.map(({ icon, title, desc, col }) => (
          <Card key={title} glow={col} className="hover-lift">
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: col + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 34,
                  margin: "0 auto 16px",
                  border: `3px solid ${col}33`,
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  color: col,
                  marginBottom: 10,
                  fontFamily: "'VT323', monospace",
                  letterSpacing: "0.5px",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: "#6b718a",
                  fontSize: 14,
                  lineHeight: 1.7,
                  fontFamily: "'VT323', monospace",
                }}
              >
                {desc}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Y2K divider */}
      <div
        style={{
          marginTop: 48,
          height: 4,
          background: "repeating-linear-gradient(90deg, #ff2e8a 0px, #ff2e8a 15px, #fef08a 15px, #fef08a 30px, #22d3ee 30px, #22d3ee 45px, #8b5cf6 45px, #8b5cf6 60px)",
        }}
      />
    </div>
  </section>
);
