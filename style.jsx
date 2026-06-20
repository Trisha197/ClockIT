export const GlobalStyles = () => (
  <style>{`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: 'VT323', 'Courier New', monospace;
      background: #f7f0ff;
      overflow-x: hidden;
    }
    
    /* Y2K Animations */
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-16px) rotate(2deg); }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.98); }
    }
    
    @keyframes wobble {
      0%, 100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; }
      50% { border-radius: 37% 63% 46% 54% / 48% 55% 45% 52%; }
    }
    
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-3px, 3px); }
      40% { transform: translate(3px, -3px); }
      60% { transform: translate(-2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    /* Utility Classes */
    .float { animation: float 4s ease-in-out infinite; }
    .float-delay-1 { animation: float 5s ease-in-out infinite 1s; }
    .float-delay-2 { animation: float 4.5s ease-in-out infinite 2s; }
    .float-delay-3 { animation: float 5.5s ease-in-out infinite 3s; }
    
    .spin-slow { animation: spin 12s linear infinite; }
    .fadeUp { animation: fadeUp 0.6s ease forwards; }
    .fadeUp-delay { animation: fadeUp 0.8s ease forwards 0.3s; opacity: 0; }
    .fadeUp-delay-2 { animation: fadeUp 0.8s ease forwards 0.6s; opacity: 0; }
    
    .hover-lift {
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }
    .hover-lift:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2);
    }
    
    .hover-scale {
      transition: transform 0.2s;
      cursor: pointer;
    }
    .hover-scale:hover {
      transform: scale(1.04);
    }
    
    .hover-glitch:hover {
      animation: glitch 0.3s ease;
    }
    
    .modal-in {
      animation: fadeUp 0.25s ease;
    }
    
    /* Y2K Glow Text */
    .glow-text {
      text-shadow: 
        0 0 10px rgba(255, 46, 138, 0.5),
        0 0 20px rgba(255, 46, 138, 0.3),
        0 0 40px rgba(255, 46, 138, 0.1);
    }
    
    .glow-text-cyan {
      text-shadow: 
        0 0 10px rgba(0, 245, 255, 0.5),
        0 0 20px rgba(0, 245, 255, 0.3),
        0 0 40px rgba(0, 245, 255, 0.1);
    }
    
    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f0ebff;
    }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #ff2e8a, #8b5cf6);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #ff1493, #7c3aed);
    }
    
    /* Y2K Pixel Border */
    .pixel-border {
      border: 4px solid #1a1a2e;
      box-shadow: 
        6px 6px 0 rgba(26, 26, 46, 0.2),
        inset -4px -4px 0 rgba(26, 26, 46, 0.1);
    }
    
    .pixel-border-pink {
      border: 4px solid #ff2e8a;
      box-shadow: 
        6px 6px 0 rgba(255, 46, 138, 0.25),
        inset -4px -4px 0 rgba(255, 46, 138, 0.1);
    }
    
    /* Focus states */
    textarea:focus, input:focus {
      border-color: #8b5cf6 !important;
      outline: none;
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
    }
    
    /* Y2K Divider */
    .divider-y2k {
      width: 100%;
      height: 4px;
      background: repeating-linear-gradient(
        90deg,
        #ff2e8a 0px,
        #ff2e8a 10px,
        #fef08a 10px,
        #fef08a 20px,
        #22d3ee 20px,
        #22d3ee 30px,
        #8b5cf6 30px,
        #8b5cf6 40px
      );
    }
  `}</style>
);
