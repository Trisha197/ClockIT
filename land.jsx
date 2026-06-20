import { Tag } from "../common/Tag";
import { Card } from "../common/Card";
import { FEATURES } from "../../data/mockData";

export const Features = () => (
  <section
    style={{
      background: "#ffffff",
      padding: "80px 40px",
      position: "relative",
    }}
  >
    {/* Y2K decorative elements */}
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 40,
        fontSize: 16,
        opacity: 0.08,
      }}
    >
      ✦ ✧ ✦ ✧ ✦ ✧ ✦
    </div>

    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <Tag label="✨ The Solution" color="#8b5cf6" />
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
          4 engines. Running quietly.
          <br />
          <span style={{ color: "#8b5cf6" }}>All for you.</span>
        </h2>
        <p
          style={{
            color: "#6b718a",
            fontSize: 18,
            marginTop: 12,
            fontFamily: "'VT323', monospace",
            letterSpacing: "0.5px",
          }}
        >
          The ClockIT Quadfecta — protection, backup, fair scores, and discovery.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {FEATURES.map(({ icon, name, short, desc, col, tech }) => (
          <Card key={name} glow={col} className="hover-lift">
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: col + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  flexShrink: 0,
                  border: `3px solid ${col}33`,
                }}
              >
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#1a1a2e",
                    marginBottom: 4,
                    fontFamily: "'VT323', monospace",
                    letterSpacing: "0.5px",
                  }}
                >
                  {name}
                </div>
                <Tag label={short} color={col} small />
                <p
                  style={{
                    color: "#6b718a",
                    fontSize: 13,
                    lineHeight: 1.7,
                    marginTop: 10,
                    marginBottom: 10,
                    fontFamily: "'VT323', monospace",
                  }}
                >
                  {desc}
                </p>
                <span
                  style={{
                    fontSize: 11,
                    color: col,
                    fontWeight: 700,
                    background: col + "12",
                    padding: "3px 12px",
                    borderRadius: 8,
                    fontFamily: "'VT323', monospace",
                    border: `1px solid ${col}33`,
                  }}
                >
                  ⚙️ {tech}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Y2K divider */}
      <div
        style={{
          marginTop: 48,
          height: 4,
          background: "repeating-linear-gradient(90deg, #8b5cf6 0px, #8b5cf6 15px, #ff2e8a 15px, #ff2e8a 30px, #22d3ee 30px, #22d3ee 45px, #fef08a 45px, #fef08a 60px)",
        }}
      />
    </div>
  </section>
);
