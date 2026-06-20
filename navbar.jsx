import { useState } from "react";
import { GBtn } from "../common/GBtn";
import { OBtn } from "../common/OBtn";

export const Navbar = ({ onLogin, onNav, page }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        background: "rgba(247, 240, 255, 0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "4px solid #1a1a2e",
        boxShadow: "0 4px 24px rgba(139, 92, 246, 0.12)",
        flexWrap: "wrap",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => onNav("landing")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 32,
            animation: "spin 8s linear infinite",
            display: "inline-block",
          }}
        >
          ⏰
        </span>
        <span
          style={{
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            fontWeight: 900,
            fontSize: 20,
            letterSpacing: 4,
            color: "#22d3ee",
            textShadow: `
              -3px -3px 0 #ff2e8a,
              3px -3px 0 #ff2e8a,
              -3px 3px 0 #ff2e8a,
              3px 3px 0 #ff2e8a,
              0 0 20px #22d3ee66
            `,
          }}
        >
          ClockIT
        </span>
      </button>

      {/* Desktop Nav */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {page !== "landing" && (
          <>
            <button
              onClick={() => onNav("creator")}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: page === "creator" ? "3px solid #8b5cf6" : "3px solid transparent",
                background: page === "creator" ? "#8b5cf614" : "transparent",
                color: page === "creator" ? "#8b5cf6" : "#6b718a",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "'VT323', monospace",
                letterSpacing: "0.5px",
                transition: "all 0.2s",
              }}
            >
              🎨 Creator
            </button>
            <button
              onClick={() => onNav("brand")}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: page === "brand" ? "3px solid #7dd3fc" : "3px solid transparent",
                background: page === "brand" ? "#7dd3fc14" : "transparent",
                color: page === "brand" ? "#7dd3fc" : "#6b718a",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "'VT323', monospace",
                letterSpacing: "0.5px",
                transition: "all 0.2s",
              }}
            >
              🏢 Brand
            </button>
          </>
        )}
        <OBtn
          color="#8b5cf6"
          onClick={onLogin}
          small
          style={{ padding: "6px 16px", fontSize: 12 }}
        >
          Log In
        </OBtn>
        <GBtn
          onClick={onLogin}
          small
          style={{ padding: "6px 16px", fontSize: 12 }}
        >
          Sign Up ✨
        </GBtn>
      </div>
    </nav>
  );
};
