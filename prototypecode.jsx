import { useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

// ─── CSS INJECTED ─────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
    @keyframes wobble{0%,100%{border-radius:63% 37% 54% 46%/55% 48% 52% 45%}50%{border-radius:37% 63% 46% 54%/48% 55% 45% 52%}}
    .float{animation:float 4s ease-in-out infinite;}
    .spin-slow{animation:spin 12s linear infinite;}
    .fadeUp{animation:fadeUp 0.6s ease forwards;}
    .hover-lift{transition:transform .2s,box-shadow .2s;cursor:pointer;}
    .hover-lift:hover{transform:translateY(-6px);}
    .hover-scale{transition:transform .2s;cursor:pointer;}
    .hover-scale:hover{transform:scale(1.03);}
    .modal-in{animation:fadeUp 0.25s ease;}
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-thumb{background:#8b5cf6;border-radius:3px;}
    textarea:focus,input:focus{border-color:#8b5cf6 !important;outline:none;}
  `}</style>
);

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  pink:"#ff2e8a", purple:"#8b5cf6", blue:"#7dd3fc",
  sage:"#87a87a",  yellow:"#fef08a", teal:"#22d3ee",
  bg:"#f7f0ff",   card:"#ffffff",   text:"#1a1a2e", muted:"#6b718a",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const TICKER = [
  "🧘 @solarwave · Wellness","📚 @techminds_ · EdTech","🌿 @greengal · Sustainability",
  "💜 @mindfulmarc · Mental Health","🎨 @pixelqueen · Art & Design","⚡ TechForge · SaaS Brand",
  "🌱 MindBloom Co. · Wellness Brand","💻 @codewitch · Tech","🥗 GreenBite · F&B Brand",
  "🎵 @beatmaker99 · Music","🏋️ @liftwithleo · Fitness","🌍 @ecotales · Environment",
];

const PROBLEMS = [
  {icon:"🤖",title:"AI Slop Takeover",  desc:"Original content gets copied and generated within minutes. Low-quality AI posts flood every feed. Original creators get buried.",col:C.pink},
  {icon:"💀",title:"Random Suspensions", desc:"Years of work gone overnight. No closure, no backup, no receipts. Start from zero. No way to even prove you existed.",col:C.purple},
  {icon:"📏",title:"Same Scorecard for All",desc:"A meme page and a mental-health educator judged by identical metrics. That math ain't mathing and creators pay for it.",col:C.blue},
];

const FEATURES = [
  {icon:"🏆",name:"Winner Takes It All",short:"Proof of First",
   desc:"Cryptographic timestamp the second you upload. AI similarity detection catches every copy. You're the OG — we have the receipts.",
   col:C.pink,tech:"SHA-256 hash + pgvector cosine search"},
  {icon:"📦",name:"StoreRoom",short:"Cloud Backup",
   desc:"Content, engagement history, analytics — all backed up outside platform walls. Get suspended? Rebuild anywhere, anytime.",
   col:C.purple,tech:"Encrypted Supabase Storage + API sync"},
  {icon:"📊",name:"IT Scorecard",short:"Impact Score",
   desc:"Personalised score compared only to creators in your exact niche. A science educator isn't competing with meme pages here.",
   col:C.blue,tech:"LLM niche classifier + 3-layer scoring"},
  {icon:"🔍",name:"Brand Finder",short:"Smart Discovery",
   desc:"Brands find you through what you actually create, not your hashtags. Hidden gems get discovered. No keyword BS.",
   col:C.sage,tech:"Semantic embeddings + cosine matching"},
];

const RADAR_DATA = [
  {s:"Engagement",v:88},{s:"Originality",v:76},{s:"Depth",v:84},{s:"Reach",v:72},{s:"Consistency",v:90},
];

const SCORES = [
  {label:"Engagement",     score:88, col:C.pink},
  {label:"Originality",    score:76, col:C.purple},
  {label:"Knowledge Depth",score:84, col:C.blue},
  {label:"Reach",          score:72, col:C.sage},
  {label:"Consistency",    score:90, col:"#e8a317"},
];

const PRICING = [
  {tier:"FREE",emoji:"✨",price:"$0",      col:C.sage,  cta:"Start Free",
   feats:["Content fingerprinting","Basic backup","Basic IT Score","Basic brand visibility"]},
  {tier:"PRO", emoji:"🔥",price:"$9.99/mo",col:C.pink,  cta:"Go Pro",highlight:true,
   feats:["Deep analytics","Faster backup sync","Copycat alerts","Brand discovery opt-in"]},
  {tier:"STUDIO",emoji:"🚀",price:"$24.99/mo",col:C.purple,cta:"Get Studio",
   feats:["Team accounts","Pitch deck generator","Priority support","Premium match alerts"]},
];

const BRAND_MATCHES = [
  {handle:"@solarwave", name:"Priya Mehta",niche:"Wellness",      followers:"14.2K",impact:84,match:96,avatar:"🧘"},
  {handle:"@techminds_",name:"Arjun Shah", niche:"EdTech",        followers:"8.9K", impact:91,match:89,avatar:"📚"},
  {handle:"@greengal",  name:"Sofia Lin",  niche:"Sustainability", followers:"22K",  impact:79,match:82,avatar:"🌿"},
];

const MY_CONTENT = [
  {id:1,title:"5 breathing techniques for anxiety",     platform:"Instagram",likes:2100,date:"Oct 12, 2025",niche:"Wellness"},
  {id:2,title:"Morning routine for ADHD brains",        platform:"TikTok",   likes:5400,date:"Nov 3, 2025", niche:"Mental Health"},
  {id:3,title:"Why hustle culture is hurting you",      platform:"YouTube",  likes:8900,date:"Dec 1, 2025", niche:"Wellness"},
  {id:4,title:"A beginner's guide to therapy",          platform:"Instagram",likes:3200,date:"Jan 5, 2026", niche:"Mental Health"},
];

const VAULT_STATS = [
  {label:"Items Backed Up",value:"47",       icon:"📦",col:C.purple},
  {label:"Last Sync",      value:"2 hrs ago",icon:"🔄",col:C.blue},
  {label:"Storage Used",   value:"2.1 GB",   icon:"💾",col:C.sage},
  {label:"Platforms",      value:"3 active", icon:"🌐",col:C.pink},
];

const PLT = {Instagram:C.pink,TikTok:C.purple,YouTube:"#ff6b6b",Twitter:C.blue};

// ─── ATOMS ───────────────────────────────────────────────────────────────────
const Tag = ({label,color})=>(
  <span style={{background:color+"22",color,border:`1px solid ${color}55`,borderRadius:20,
    padding:"3px 12px",fontSize:12,fontWeight:700,display:"inline-block",whiteSpace:"nowrap"}}>
    {label}
  </span>
);

const Card = ({children,glow,style={},className=""})=>(
  <div className={className} style={{background:C.card,borderRadius:20,
    boxShadow:glow?`0 0 0 2px ${glow}33,0 8px 32px ${glow}18`:"0 4px 24px rgba(139,92,246,0.08)",...style}}>
    {children}
  </div>
);

const GBtn = ({children,onClick,a=C.pink,b=C.purple,style={},disabled})=>(
  <button onClick={onClick} disabled={disabled} className="hover-scale" style={{
    background:disabled?"#ddd":`linear-gradient(135deg,${a},${b})`,
    color:"white",border:"none",borderRadius:50,padding:"12px 30px",
    fontWeight:800,fontSize:14,cursor:disabled?"not-allowed":"pointer",...style}}>
    {children}
  </button>
);

const OBtn = ({children,color=C.purple,onClick,style={}})=>(
  <button onClick={onClick} className="hover-scale" style={{
    background:"white",color,border:`2.5px solid ${color}`,borderRadius:50,
    padding:"10px 26px",fontWeight:800,fontSize:14,cursor:"pointer",...style}}>
    {children}
  </button>
);

const Blob = ({size=100,color,style={}})=>(
  <div className="wobble" style={{
    width:size,height:size,background:color,position:"absolute",
    animation:"wobble 8s ease-in-out infinite",
    borderRadius:"63% 37% 54% 46%/55% 48% 52% 45%",
    filter:"blur(1px)",...style}}/>
);

const ScoreBar = ({label,score,col})=>(
  <div style={{marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
      <span style={{fontSize:13,fontWeight:600,color:C.text}}>{label}</span>
      <span style={{fontSize:13,fontWeight:800,color:col}}>{score}</span>
    </div>
    <div style={{background:"#ede8ff",borderRadius:20,height:8}}>
      <div style={{background:`linear-gradient(90deg,${col},${col}99)`,width:`${score}%`,height:8,borderRadius:20}}/>
    </div>
  </div>
);

// ─── AUTH MODAL ──────────────────────────────────────────────────────────────
const AuthModal = ({onClose,onLogin})=>{
  const [tab,setTab]=useState("login");
  const [utype,setUtype]=useState("creator");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [name,setName]=useState("");

  const inp = {width:"100%",padding:"11px 16px",borderRadius:12,
    border:`2px solid ${C.purple}33`,fontSize:14,marginBottom:12,
    fontFamily:"inherit",color:C.text,background:"white"};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,26,46,0.75)",zIndex:1000,
      display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)"}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-in" style={{width:400,borderRadius:24,overflow:"hidden",
        boxShadow:"0 24px 80px rgba(0,0,0,0.25)"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${C.pink},${C.purple})`,padding:"28px 32px 20px",textAlign:"center"}}>
          <div style={{fontFamily:"'Courier New',monospace",fontWeight:900,fontSize:30,letterSpacing:6,
            color:C.teal,textShadow:`-2px -2px 0 ${C.pink},2px -2px 0 ${C.pink},-2px 2px 0 ${C.pink},2px 2px 0 ${C.pink}`}}>
            ⏰ ClockIT
          </div>
          <div style={{display:"flex",gap:0,marginTop:18,background:"rgba(255,255,255,0.2)",borderRadius:50,padding:4}}>
            {["login","signup"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px 0",borderRadius:50,border:"none",
                cursor:"pointer",fontWeight:700,fontSize:13,transition:"all .2s",
                background:tab===t?"white":"transparent",color:tab===t?C.purple:"white"}}>
                {t==="login"?"Log In":"Sign Up"}
              </button>
            ))}
          </div>
        </div>
        {/* Body */}
        <div style={{background:"white",padding:"24px 32px 28px"}}>
          <div style={{fontWeight:700,color:C.text,fontSize:13,marginBottom:10}}>I am a...</div>
          <div style={{display:"flex",gap:10,marginBottom:18}}>
            {[["creator","🎨 Creator"],["brand","🏢 Brand"]].map(([t,l])=>(
              <button key={t} onClick={()=>setUtype(t)} style={{flex:1,padding:"10px 0",borderRadius:14,
                cursor:"pointer",fontWeight:700,fontSize:14,transition:"all .2s",
                border:`2px solid ${utype===t?C.pink:"#ddd"}`,
                background:utype===t?C.pink+"14":"white",
                color:utype===t?C.pink:C.muted}}>{l}</button>
            ))}
          </div>
          {tab==="signup"&&<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name / handle" style={inp}/>}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" style={inp}/>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{...inp,marginBottom:20}}/>
          <GBtn onClick={()=>email&&onLogin(utype)} style={{width:"100%",padding:"14px",borderRadius:14,fontSize:15}}>
            {tab==="login"?"Let's Go ✨":"Create Account 🚀"}
          </GBtn>
          <button onClick={onClose} style={{width:"100%",marginTop:10,padding:"8px",background:"none",
            border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>Maybe later</button>
        </div>
      </div>
    </div>
  );
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const Navbar = ({onLogin,onNav,page})=>(
  <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,
    display:"flex",alignItems:"center",justifyContent:"space-between",
    padding:"12px 40px",background:"rgba(255,255,255,0.94)",
    backdropFilter:"blur(14px)",borderBottom:`2px solid ${C.purple}18`,
    boxShadow:"0 2px 16px rgba(139,92,246,0.07)"}}>
    <button onClick={()=>onNav("landing")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:26}}>⏰</span>
      <span style={{fontFamily:"'Courier New',monospace",fontWeight:900,fontSize:24,letterSpacing:5,
        color:C.teal,
        textShadow:`-2px -2px 0 ${C.pink},2px -2px 0 ${C.pink},-2px 2px 0 ${C.pink},2px 2px 0 ${C.pink},0 0 16px ${C.teal}66`}}>
        ClockIT
      </span>
    </button>
    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      {page!=="landing"&&(
        <>
          <button onClick={()=>onNav("creator")} style={{padding:"8px 18px",borderRadius:20,border:"none",
            background:page==="creator"?C.purple+"18":"transparent",
            color:page==="creator"?C.purple:C.muted,fontWeight:700,cursor:"pointer",fontSize:13}}>
            Creator
          </button>
          <button onClick={()=>onNav("brand")} style={{padding:"8px 18px",borderRadius:20,border:"none",
            background:page==="brand"?C.blue+"22":"transparent",
            color:page==="brand"?C.blue:C.muted,fontWeight:700,cursor:"pointer",fontSize:13}}>
            Brand
          </button>
        </>
      )}
      <OBtn color={C.purple} onClick={onLogin} style={{padding:"8px 20px",fontSize:13}}>Log In</OBtn>
      <GBtn onClick={onLogin} style={{padding:"8px 20px",fontSize:13}}>Sign Up ✨</GBtn>
    </div>
  </nav>
);

// ─── LANDING SECTIONS ────────────────────────────────────────────────────────

const Hero = ({onLogin})=>(
  <section style={{minHeight:"100vh",background:`linear-gradient(155deg,#f7f0ff 0%,#eaf6ff 45%,#fff0f6 100%)`,
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    textAlign:"center",padding:"110px 40px 70px",position:"relative",overflow:"hidden"}}>
    <Blob size={220} color={C.pink+"18"} style={{top:"8%",left:"-4%"}}/>
    <Blob size={160} color={C.blue+"22"} style={{top:"15%",right:"1%",animationDelay:"2s"}}/>
    <Blob size={130} color={C.yellow+"99"} style={{bottom:"12%",left:"3%",animationDelay:"4s"}}/>
    <Blob size={100} color={C.sage+"44"} style={{bottom:"20%",right:"5%",animationDelay:"1s"}}/>

    {/* Floating stars */}
    {[
      {s:36,c:C.pink,t:"15%",l:"10%",d:"0s"},{s:24,c:C.purple,t:"22%",r:"12%",d:"1s"},
      {s:28,c:C.yellow,b:"22%",r:"10%",d:"0.5s"},{s:20,c:C.blue,b:"18%",l:"18%",d:"1.5s"},
      {s:18,c:C.sage,t:"40%",l:"4%",d:"2s"},{s:22,c:C.teal,t:"35%",r:"4%",d:"0.8s"},
    ].map((s,i)=>(
      <div key={i} className="float" style={{
        position:"absolute",fontSize:s.s,color:s.c,
        top:s.t,left:s.l,right:s.r,bottom:s.b,
        animationDelay:s.d,animationDuration:`${3+i*0.5}s`,zIndex:0
      }}>✦</div>
    ))}

    {/* Badge */}
    <div className="float" style={{display:"inline-block",background:C.yellow,borderRadius:50,
      padding:"6px 22px",fontWeight:800,color:C.text,fontSize:13,marginBottom:32,zIndex:1,
      boxShadow:"0 4px 16px rgba(254,240,138,0.6)"}}>
      ✨ creator safety net + discovery engine ✨
    </div>

    {/* BIG LOGO */}
    <div style={{zIndex:1,marginBottom:8}}>
      <div style={{fontFamily:"'Courier New',monospace",fontWeight:900,
        fontSize:80,letterSpacing:10,lineHeight:0.95,
        color:C.teal,
        textShadow:`-4px -4px 0 ${C.pink},4px -4px 0 ${C.pink},-4px 4px 0 ${C.pink},4px 4px 0 ${C.pink},0 0 40px ${C.teal}77`}}>
        ⏰
      </div>
      <div style={{fontFamily:"'Courier New',monospace",fontWeight:900,
        fontSize:80,letterSpacing:10,lineHeight:1,
        color:C.teal,
        textShadow:`-4px -4px 0 ${C.pink},4px -4px 0 ${C.pink},-4px 4px 0 ${C.pink},4px 4px 0 ${C.pink},0 0 40px ${C.teal}77`}}>
        ClockIT
      </div>
    </div>

    <div style={{fontWeight:900,fontSize:16,marginBottom:20,zIndex:1,
      background:`linear-gradient(135deg,${C.pink},${C.purple})`,
      WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
      by team MicroChips 🎮
    </div>

    <p style={{color:C.muted,fontSize:17,maxWidth:560,lineHeight:1.75,marginBottom:10,zIndex:1}}>
      Creators out here grinding, building audiences, shifting culture — but platforms don't protect them, don't back them up, and AI slop content be crazy.
    </p>
    <p style={{color:C.text,fontWeight:800,fontSize:15,marginBottom:40,zIndex:1}}>
      So ClockIT is the <span style={{color:C.sage}}>ogre layer</span> they needed. (Shrek reference, pls get it 🧅)
    </p>

    <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",zIndex:1}}>
      <GBtn onClick={onLogin} style={{padding:"15px 38px",fontSize:16,borderRadius:16}}>🛡️ I'm a Creator</GBtn>
      <GBtn onClick={onLogin} a={C.blue} b={C.purple} style={{padding:"15px 38px",fontSize:16,borderRadius:16}}>🔍 I'm a Brand</GBtn>
    </div>

    <div className="float" style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",
      color:C.muted,fontSize:12,fontWeight:600,letterSpacing:1,zIndex:1}}>
      ↓ scroll ↓
    </div>
  </section>
);

const Ticker = ()=>{
  const all=[...TICKER,...TICKER];
  return(
    <div style={{background:C.purple,overflow:"hidden",padding:"11px 0",
      borderTop:`3px solid ${C.pink}`,borderBottom:`3px solid ${C.pink}`}}>
      <div style={{display:"flex",animation:"marquee 32s linear infinite",width:"max-content"}}>
        {all.map((item,i)=>(
          <span key={i} style={{color:"white",fontWeight:700,fontSize:13,
            padding:"0 28px",whiteSpace:"nowrap",opacity:i%2===0?1:0.65}}>
            {item}&nbsp;·
          </span>
        ))}
      </div>
    </div>
  );
};

const Problems = ()=>(
  <section style={{background:C.bg,padding:"80px 40px"}}>
    <div style={{maxWidth:920,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:52}}>
        <Tag label="The Problem" color={C.pink}/>
        <h2 style={{fontSize:38,fontWeight:900,color:C.text,marginTop:14,lineHeight:1.2}}>
          The internet is failing creators.<br/>
          <span style={{color:C.pink}}>In 3 very specific ways.</span>
        </h2>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
        {PROBLEMS.map(({icon,title,desc,col})=>(
          <Card key={title} glow={col} className="hover-lift" style={{padding:30,textAlign:"center"}}>
            <div style={{width:68,height:68,borderRadius:"50%",background:col+"18",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 18px"}}>
              {icon}
            </div>
            <h3 style={{fontWeight:800,fontSize:16,color:col,marginBottom:10}}>{title}</h3>
            <p style={{color:C.muted,fontSize:13,lineHeight:1.65}}>{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Features = ()=>(
  <section style={{background:"white",padding:"80px 40px"}}>
    <div style={{maxWidth:920,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:52}}>
        <Tag label="The Solution" color={C.purple}/>
        <h2 style={{fontSize:38,fontWeight:900,color:C.text,marginTop:14,lineHeight:1.2}}>
          4 engines. Running quietly.<br/>
          <span style={{color:C.purple}}>All for you.</span>
        </h2>
        <p style={{color:C.muted,fontSize:15,marginTop:10}}>
          The ClockIT Quadfecta — protection, backup, fair scores, and discovery.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:18}}>
        {FEATURES.map(({icon,name,short,desc,col,tech})=>(
          <Card key={name} glow={col} className="hover-lift" style={{padding:28}}>
            <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
              <div style={{width:56,height:56,borderRadius:16,background:col+"18",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>
                {icon}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:16,color:C.text,marginBottom:5}}>{name}</div>
                <Tag label={short} color={col}/>
                <p style={{color:C.muted,fontSize:13,lineHeight:1.65,marginTop:10,marginBottom:10}}>{desc}</p>
                <span style={{fontSize:11,color:col,fontWeight:700,background:col+"12",
                  padding:"3px 10px",borderRadius:8}}>⚙️ {tech}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FlowStep = ({icon,label,sub,col,last})=>(
  <div style={{display:"flex",alignItems:"center",flexShrink:0}}>
    <div style={{textAlign:"center",minWidth:100}}>
      <div style={{width:46,height:46,borderRadius:"50%",background:col,color:"white",
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,
        margin:"0 auto 7px",boxShadow:`0 4px 16px ${col}55`}}>
        {icon}
      </div>
      <div style={{fontWeight:700,fontSize:11,color:C.text,lineHeight:1.3}}>{label}</div>
      <div style={{fontSize:10,color:C.muted,lineHeight:1.3}}>{sub}</div>
    </div>
    {!last&&<div style={{width:28,height:2,background:`linear-gradient(90deg,${col},${C.purple})`,flexShrink:0,margin:"0 -3px -16px"}}/>}
  </div>
);

const HowItWorks = ()=>(
  <section style={{background:C.bg,padding:"80px 40px"}}>
    <div style={{maxWidth:920,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:52}}>
        <Tag label="Architecture" color={C.blue}/>
        <h2 style={{fontSize:38,fontWeight:900,color:C.text,marginTop:14}}>
          How ClockIT works
        </h2>
        <p style={{color:C.muted,fontSize:15,marginTop:10}}>Two flows. One shared brain. The whole system in one view.</p>
      </div>

      {/* Creator flow */}
      <div style={{marginBottom:28}}>
        <div style={{fontWeight:800,color:C.pink,fontSize:12,letterSpacing:2,marginBottom:14}}>► CREATOR FLOW</div>
        <Card style={{padding:"20px 24px",overflowX:"auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:0,minWidth:600}}>
            <FlowStep icon="📤" label="Upload" sub="Next.js" col={C.pink}/>
            <FlowStep icon="🔐" label="Hash + Embed" sub="Authenticity Engine" col={C.pink}/>
            <FlowStep icon="🔍" label="Dupe Check" sub="pgvector search" col={C.pink}/>
            <FlowStep icon="🧠" label="AI Score" sub="FastAPI + LLM" col={C.purple}/>
            <FlowStep icon="💾" label="Vault Backup" sub="Supabase Storage" col={C.purple}/>
            <FlowStep icon="✅" label="Verified Profile" sub="Live to brands" col={C.sage} last/>
          </div>
        </Card>
      </div>

      {/* Shared brain */}
      <Card glow={C.purple} style={{padding:"18px 24px",textAlign:"center",marginBottom:28,
        background:`linear-gradient(135deg,${C.purple}0a,${C.blue}0a)`}}>
        <div style={{fontWeight:800,fontSize:16,color:C.text,marginBottom:4}}>
          🧠 Supabase Data Layer — PostgreSQL + pgvector + Storage
        </div>
        <div style={{color:C.muted,fontSize:13}}>
          Single source of truth · Creator embeddings · Verified scores · Brand match index
        </div>
      </Card>

      {/* Brand flow */}
      <div>
        <div style={{fontWeight:800,color:C.blue,fontSize:12,letterSpacing:2,marginBottom:14}}>► BRAND FLOW</div>
        <Card style={{padding:"20px 24px",overflowX:"auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:0,minWidth:600}}>
            <FlowStep icon="📝" label="Submit Brief" sub="Free text" col={C.blue}/>
            <FlowStep icon="⚡" label="Embed Brief" sub="Discovery Engine" col={C.blue}/>
            <FlowStep icon="🎯" label="Vector Search" sub="pgvector cosine" col={C.blue}/>
            <FlowStep icon="🛡️" label="Anti-gaming" sub="LLM re-rank" col={C.purple}/>
            <FlowStep icon="🤝" label="Top Matches" sub="10-20 creators" col={C.purple}/>
            <FlowStep icon="💰" label="Deal + Fee" sub="3-5% via Stripe" col={C.sage} last/>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const ScoreShowcase = ()=>(
  <section style={{background:"white",padding:"80px 40px"}}>
    <div style={{maxWidth:920,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:52}}>
        <Tag label="IT Scorecard" color={C.blue}/>
        <h2 style={{fontSize:38,fontWeight:900,color:C.text,marginTop:14}}>
          Fair scores, <span style={{color:C.blue}}>finally.</span>
        </h2>
        <p style={{color:C.muted,fontSize:15,marginTop:10}}>
          Compared only to creators in your exact niche. Not the whole internet.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"start"}}>
        <div>
          <Card glow={C.pink} style={{padding:24,marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:44}}>🧘</div>
              <div>
                <div style={{fontWeight:800,fontSize:17,color:C.text}}>@solarwave</div>
                <div style={{color:C.muted,fontSize:12}}>Priya Mehta · Wellness & Mental Health</div>
                <div style={{marginTop:8}}><Tag label="✓ Verified Creator" color={C.sage}/></div>
              </div>
            </div>
          </Card>
          {SCORES.map(s=><ScoreBar key={s.label} {...s}/>)}
          <div style={{marginTop:16,padding:"16px 20px",background:C.yellow+"aa",borderRadius:16,
            display:"flex",alignItems:"center",gap:16}}>
            <span style={{fontSize:44,fontWeight:900,color:C.pink}}>84</span>
            <div>
              <div style={{fontWeight:800,fontSize:14,color:C.text}}>Overall IT Score</div>
              <div style={{fontSize:12,color:C.muted}}>Top 12% in Wellness niche</div>
            </div>
          </div>
        </div>
        <Card glow={C.purple} style={{padding:20}}>
          <div style={{height:270}}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke={C.purple+"33"}/>
                <PolarAngleAxis dataKey="s" tick={{fontSize:11,fill:C.muted}}/>
                <Radar dataKey="v" stroke={C.pink} fill={C.purple} fillOpacity={0.2} strokeWidth={3}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{textAlign:"center",marginTop:8}}>
            <Tag label="Niche-adjusted radar · 5 dimensions" color={C.purple}/>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const DiscoveryShowcase = ({onLogin})=>{
  const [brief,setBrief]=useState("");
  const [shown,setShown]=useState(false);
  const [loading,setLoading]=useState(false);

  const submit=()=>{
    if(!brief||loading)return;
    setLoading(true);
    setTimeout(()=>{setLoading(false);setShown(true);},2000);
  };

  return(
    <section style={{background:`${C.purple}09`,padding:"80px 40px"}}>
      <div style={{maxWidth:920,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <Tag label="Brand Discovery" color={C.purple}/>
          <h2 style={{fontSize:38,fontWeight:900,color:C.text,marginTop:14}}>
            No keywords. No hashtag roulette.<br/>
            <span style={{color:C.purple}}>Just the right creators.</span>
          </h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}}>
          <div>
            <Card glow={C.blue} style={{padding:26}}>
              <div style={{fontWeight:700,color:C.text,marginBottom:10,fontSize:14}}>
                Try it live — submit a campaign brief
              </div>
              <textarea value={brief} onChange={e=>setBrief(e.target.value)}
                placeholder="e.g. We're launching a mindfulness app for stressed Gen Z professionals. We want creators who genuinely talk about mental health and work-life balance..."
                style={{width:"100%",padding:14,borderRadius:14,border:`2px solid ${C.blue}44`,
                  fontSize:13,resize:"none",height:110,fontFamily:"inherit",
                  marginBottom:14,boxSizing:"border-box",color:C.text}}/>
              <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                {["Wellness","EdTech","Sustainability","Mental Health"].map(tag=>(
                  <button key={tag} onClick={()=>setBrief(`Campaign for a ${tag} product targeting Gen Z`)}
                    style={{padding:"5px 14px",borderRadius:20,border:`1.5px solid ${C.blue}`,
                      background:"white",color:C.blue,fontSize:12,fontWeight:600,cursor:"pointer"}}>
                    {tag}
                  </button>
                ))}
              </div>
              <GBtn onClick={submit} a={C.blue} b={C.purple} disabled={!brief||loading}
                style={{width:"100%",padding:"13px",borderRadius:14,fontSize:14}}>
                {loading?"🔍 Analysing content...":"🔍 Find My Creators"}
              </GBtn>
            </Card>
          </div>
          <div>
            {shown?(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div style={{fontWeight:700,color:C.muted,fontSize:12,letterSpacing:1,marginBottom:4}}>
                  MATCHED BY CONTENT — NOT KEYWORDS
                </div>
                {BRAND_MATCHES.map((c,i)=>(
                  <Card key={c.handle} glow={i===0?C.pink:C.purple} className="hover-lift" style={{padding:16}}>
                    <div style={{display:"flex",gap:12,alignItems:"center"}}>
                      <div style={{width:46,height:46,borderRadius:"50%",fontSize:22,flexShrink:0,
                        background:(i===0?C.pink:C.purple)+"22",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {c.avatar}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:800,fontSize:14,color:C.text}}>{c.handle}</div>
                        <div style={{fontSize:12,color:C.muted}}>{c.niche} · {c.followers} followers</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{background:i===0?C.pink:C.purple,color:"white",
                          borderRadius:20,padding:"3px 12px",fontWeight:800,fontSize:13}}>
                          {c.match}% match
                        </div>
                        <div style={{fontSize:11,color:C.muted,marginTop:3}}>Impact: {c.impact}</div>
                      </div>
                    </div>
                  </Card>
                ))}
                <GBtn onClick={onLogin} style={{marginTop:4}}>See Full Results & Reach Out →</GBtn>
              </div>
            ):(
              <Card style={{padding:48,textAlign:"center",background:C.bg,height:"100%",
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontSize:52,marginBottom:14}}>🎯</div>
                <div style={{color:C.muted,fontSize:14,lineHeight:1.6}}>
                  Submit a brief on the left<br/>to see content-matched creators here.
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = ({onLogin})=>(
  <section style={{background:"white",padding:"80px 40px"}}>
    <div style={{maxWidth:920,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:52}}>
        <Tag label="Pricing" color={C.yellow}/>
        <h2 style={{fontSize:38,fontWeight:900,color:C.text,marginTop:14}}>
          I got like hella money 💰<br/>
          <span style={{color:C.sage}}>(without selling creators out, ofc)</span>
        </h2>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,alignItems:"start"}}>
        {PRICING.map(({tier,emoji,price,col,cta,highlight,feats})=>(
          <Card key={tier} glow={col} className="hover-lift"
            style={{padding:30,textAlign:"center",position:"relative",
              border:highlight?`3px solid ${col}`:"none",
              transform:highlight?"scale(1.04)":"none",
              zIndex:highlight?1:0}}>
            {highlight&&(
              <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",
                background:col,color:"white",borderRadius:50,padding:"4px 18px",
                fontWeight:800,fontSize:11,whiteSpace:"nowrap"}}>
                MOST POPULAR 🔥
              </div>
            )}
            <div style={{fontSize:36,marginBottom:8}}>{emoji}</div>
            <div style={{fontWeight:900,fontSize:20,color:C.text,marginBottom:4}}>{tier}</div>
            <div style={{fontWeight:900,fontSize:30,color:col,marginBottom:22}}>{price}</div>
            <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:24,textAlign:"left"}}>
              {feats.map(f=>(
                <div key={f} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{color:col,fontWeight:700,flexShrink:0,marginTop:1}}>✓</span>
                  <span style={{color:C.muted,fontSize:13}}>{f}</span>
                </div>
              ))}
            </div>
            <GBtn onClick={onLogin} a={col} b={col+"bb"} style={{width:"100%",padding:"12px",borderRadius:14}}>
              {cta}
            </GBtn>
          </Card>
        ))}
      </div>
      <div style={{marginTop:28,padding:"20px 28px",background:`${C.purple}0a`,
        borderRadius:20,textAlign:"center",border:`2px solid ${C.purple}22`}}>
        <span style={{color:C.text,fontWeight:700}}>For Brands 🏢 </span>
        <span style={{color:C.muted,fontSize:14}}>
          &nbsp;Self-serve <strong style={{color:C.purple}}>$99/brief</strong> → 20 matched creators&nbsp;·&nbsp;
          Enterprise <strong style={{color:C.purple}}>$999/mo</strong> → unlimited briefs&nbsp;·&nbsp;
          Deals <strong style={{color:C.pink}}>3–5% facilitation fee</strong>
        </span>
      </div>
    </div>
  </section>
);

const FooterCTA = ({onLogin})=>(
  <section style={{background:`linear-gradient(135deg,${C.purple},${C.pink})`,padding:"80px 40px",textAlign:"center"}}>
    <div className="float" style={{fontSize:64,marginBottom:16}}>⏰</div>
    <h2 style={{fontSize:38,fontWeight:900,color:"white",marginBottom:12}}>
      Don't let the clock run out.
    </h2>
    <p style={{color:"rgba(255,255,255,0.8)",fontSize:17,maxWidth:480,margin:"0 auto 36px",lineHeight:1.6}}>
      For the ones who move culture, not just metrics.<br/>
      <strong>ClockIT has your back.</strong> ✨
    </p>
    <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:60}}>
      <button onClick={onLogin} style={{background:"white",color:C.purple,border:"none",
        borderRadius:50,padding:"14px 36px",fontWeight:800,fontSize:15,cursor:"pointer"}}>
        🛡️ Join as Creator
      </button>
      <button onClick={onLogin} style={{background:"rgba(255,255,255,0.18)",color:"white",
        border:"2px solid white",borderRadius:50,padding:"14px 36px",fontWeight:800,fontSize:15,cursor:"pointer"}}>
        🔍 Join as Brand
      </button>
    </div>
    <div style={{borderTop:"1px solid rgba(255,255,255,0.2)",paddingTop:28,
      color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:2}}>
      Team MicroChips · Trisha · Shreyasi · Manpreet · Deepanshu<br/>
      ✉️ trisha.tt66@gmail.com
    </div>
  </section>
);

// ─── CREATOR PORTAL ──────────────────────────────────────────────────────────

const UploadPanel = ()=>{
  const [file,setFile]=useState("");
  const [platform,setPlatform]=useState("Instagram");
  const [caption,setCaption]=useState("");
  const [step,setStep]=useState(0);

  const STEPS=[
    {label:"Hashing content fingerprint",icon:"🔐"},
    {label:"Checking for duplicates via pgvector",icon:"🔍"},
    {label:"AI niche classification + scoring",icon:"🧠"},
    {label:"Encrypting to vault",icon:"💾"},
  ];

  const run=()=>{
    if(!file)return;
    setStep(1);
    STEPS.forEach((_,i)=>setTimeout(()=>setStep(i+2),(i+1)*900));
  };

  if(step===5)return(
    <div style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:72}}>🎉</div>
      <h2 style={{color:C.pink,fontWeight:900,fontSize:26,margin:"16px 0 8px"}}>Content Protected!</h2>
      <p style={{color:C.muted,marginBottom:24}}>Fingerprinted, scored, backed up. You're the OG. ✨</p>
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:28}}>
        <Tag label="IT Score: 84" color={C.purple}/>
        <Tag label="Niche: Wellness" color={C.sage}/>
        <Tag label="✓ Verified OG" color={C.pink}/>
      </div>
      <OBtn onClick={()=>{setStep(0);setFile("");setCaption("");}}>Upload Another</OBtn>
    </div>
  );

  if(step>=1&&step<=4)return(
    <div>
      <h2 style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:20}}>Processing... ⚡</h2>
      {STEPS.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:16,borderRadius:14,marginBottom:10,
          background:i<step-1?"#f0fff7":i===step-1?C.purple+"0e":"#fafafa",
          border:`2px solid ${i<step-1?C.sage:i===step-1?C.purple:"#ebebeb"}`,
          transition:"all 0.3s"}}>
          <span style={{fontSize:22}}>{s.icon}</span>
          <span style={{flex:1,fontWeight:600,color:C.text,fontSize:13}}>{s.label}</span>
          <span style={{fontSize:18}}>{i<step-1?"✅":i===step-1?"⏳":"⬜"}</span>
        </div>
      ))}
    </div>
  );

  return(
    <div>
      <h2 style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>Upload Content</h2>
      <p style={{color:C.muted,fontSize:13,marginBottom:20}}>Fingerprint, score, and back it up in one click. 🛡️</p>
      <div onClick={()=>setFile("my_content.mp4")} style={{
        border:`2px dashed ${file?C.sage:C.purple}`,borderRadius:18,padding:"40px 20px",
        textAlign:"center",background:file?C.sage+"10":C.purple+"07",cursor:"pointer",marginBottom:14,transition:"all .2s"}}>
        <div style={{fontSize:40,marginBottom:8}}>{file?"✅":"📤"}</div>
        <div style={{fontWeight:700,color:file?C.sage:C.purple,fontSize:14}}>
          {file?file:"Click to select your content"}
        </div>
        <div style={{color:C.muted,fontSize:12,marginTop:3}}>Videos · Images · Audio · Text</div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        {Object.keys(PLT).map(p=>(
          <button key={p} onClick={()=>setPlatform(p)} style={{padding:"6px 16px",borderRadius:20,cursor:"pointer",
            fontWeight:600,fontSize:12,border:`2px solid ${platform===p?PLT[p]:"#ddd"}`,
            background:platform===p?PLT[p]+"16":"white",color:platform===p?PLT[p]:C.muted}}>{p}</button>
        ))}
      </div>
      <textarea value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Caption or description..."
        style={{width:"100%",padding:14,borderRadius:14,border:`2px solid ${C.purple}33`,
          fontSize:13,resize:"none",height:72,fontFamily:"inherit",marginBottom:14,
          boxSizing:"border-box",color:C.text}}/>
      <GBtn onClick={run} disabled={!file} style={{width:"100%",padding:"14px",borderRadius:14,fontSize:14}}>
        🚀 Protect My Content
      </GBtn>
    </div>
  );
};

const ContentPanel = ()=>(
  <div>
    <h2 style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>My Content</h2>
    <p style={{color:C.muted,fontSize:13,marginBottom:20}}>All verified. Timestamped. Yours forever. 🧾</p>
    {MY_CONTENT.map(item=>(
      <Card key={item.id} glow={C.purple} style={{padding:18,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:8}}>
              <span style={{fontWeight:700,fontSize:13,color:C.text}}>{item.title}</span>
              <span style={{background:C.sage+"22",color:C.sage,border:`1px solid ${C.sage}`,
                borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700}}>✓ VERIFIED OG</span>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <Tag label={item.platform} color={PLT[item.platform]||C.blue}/>
              <Tag label={item.niche} color={C.purple}/>
              <Tag label={`❤️ ${item.likes.toLocaleString()}`} color={C.pink}/>
              <Tag label={item.date} color={C.muted}/>
            </div>
          </div>
          <OBtn color={C.blue} style={{padding:"6px 12px",fontSize:11,flexShrink:0}}>Receipt 🧾</OBtn>
        </div>
      </Card>
    ))}
  </div>
);

const ScorePanel = ()=>(
  <div>
    <h2 style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>IT Scorecard</h2>
    <p style={{color:C.muted,fontSize:13,marginBottom:20}}>Niche-adjusted. Fair. Not just your followers. 📊</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
      <Card glow={C.pink} style={{padding:26,textAlign:"center"}}>
        <div style={{fontSize:64,fontWeight:900,color:C.pink,lineHeight:1}}>84</div>
        <div style={{color:C.muted,fontWeight:600,marginTop:5,fontSize:12}}>Overall IT Score</div>
        <div style={{margin:"8px 0"}}><Tag label="🧘 Wellness" color={C.sage}/></div>
        <div style={{fontSize:11,color:C.muted,background:C.yellow+"aa",borderRadius:8,padding:"3px 10px",display:"inline-block"}}>Top 12% in niche</div>
      </Card>
      <Card glow={C.purple} style={{padding:10}}>
        <div style={{height:185}}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke={C.purple+"33"}/>
              <PolarAngleAxis dataKey="s" tick={{fontSize:10,fill:C.muted}}/>
              <Radar dataKey="v" stroke={C.pink} fill={C.purple} fillOpacity={0.2} strokeWidth={2.5}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
    {SCORES.map(s=><ScoreBar key={s.label} {...s}/>)}
  </div>
);

const VaultPanel = ()=>(
  <div>
    <h2 style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>Content Vault 🔒</h2>
    <p style={{color:C.muted,fontSize:13,marginBottom:20}}>Your career, backed up. Platform-agnostic. Forever yours.</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      {VAULT_STATS.map(({label,value,icon,col})=>(
        <Card key={label} glow={col} style={{padding:18}}>
          <div style={{fontSize:26}}>{icon}</div>
          <div style={{fontSize:22,fontWeight:800,color:col,marginTop:6}}>{value}</div>
          <div style={{color:C.muted,fontSize:12,marginTop:2}}>{label}</div>
        </Card>
      ))}
    </div>
    <Card glow={C.sage} style={{padding:22}}>
      <div style={{fontWeight:700,color:C.text,marginBottom:14,fontSize:13}}>Platform Sync Status</div>
      {[{name:"Instagram",items:28,col:C.pink},{name:"TikTok",items:14,col:C.purple},{name:"YouTube",items:5,col:"#ff6b6b"}].map(({name,items,col},i,arr)=>(
        <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"11px 0",borderBottom:i<arr.length-1?"1px solid #f0eeff":"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:9,height:9,borderRadius:"50%",background:C.sage,display:"inline-block"}}/>
            <span style={{fontWeight:600,color:C.text,fontSize:13}}>{name}</span>
          </div>
          <div style={{display:"flex",gap:7}}><Tag label={`${items} items`} color={col}/><Tag label="✓ Synced" color={C.sage}/></div>
        </div>
      ))}
    </Card>
  </div>
);

const BriefPanel = ({onResults})=>{
  const [brief,setBrief]=useState("");
  const [budget,setBudget]=useState("$1K–5K");
  const [loading,setLoading]=useState(false);

  const submit=()=>{
    if(!brief||loading)return;
    setLoading(true);
    setTimeout(()=>{setLoading(false);onResults();},2200);
  };

  return(
    <div>
      <h2 style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>Submit Campaign Brief</h2>
      <p style={{color:C.muted,fontSize:13,marginBottom:20}}>No keywords needed. Tell us what you're trying to do. 🎯</p>
      <Card glow={C.blue} style={{padding:20,marginBottom:12}}>
        <div style={{fontWeight:700,color:C.text,marginBottom:8,fontSize:13}}>What's your campaign about?</div>
        <textarea value={brief} onChange={e=>setBrief(e.target.value)}
          placeholder="e.g. We're launching a mindfulness app for stressed Gen Z professionals. We want creators who genuinely talk about mental health — not just aesthetic content..."
          style={{width:"100%",padding:14,borderRadius:12,border:`2px solid ${C.blue}44`,
            fontSize:13,resize:"none",height:100,fontFamily:"inherit",boxSizing:"border-box",color:C.text}}/>
      </Card>
      <Card glow={C.purple} style={{padding:20,marginBottom:16}}>
        <div style={{fontWeight:700,color:C.text,marginBottom:10,fontSize:13}}>Campaign Budget</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["Under $1K","$1K–5K","$5K–20K","$20K+"].map(b=>(
            <button key={b} onClick={()=>setBudget(b)} style={{padding:"6px 16px",borderRadius:20,cursor:"pointer",
              fontWeight:600,fontSize:12,border:`2px solid ${budget===b?C.purple:"#ddd"}`,
              background:budget===b?C.purple+"15":"white",color:budget===b?C.purple:C.muted}}>{b}</button>
          ))}
        </div>
      </Card>
      <GBtn onClick={submit} disabled={!brief||loading} a={C.blue} b={C.purple}
        style={{width:"100%",padding:"14px",borderRadius:14,fontSize:14}}>
        {loading?"🔍 Finding your perfect creators...":"🔍 Find My Creators"}
      </GBtn>
    </div>
  );
};

const DiscoveryPanel = ()=>(
  <div>
    <h2 style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>Discovery Results 🎯</h2>
    <p style={{color:C.muted,fontSize:13,marginBottom:20}}>Matched by content, not keywords. No hashtag roulette.</p>
    {BRAND_MATCHES.map((c,i)=>(
      <Card key={c.handle} glow={i===0?C.pink:C.purple} className="hover-lift" style={{padding:18,marginBottom:12}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:48,height:48,borderRadius:"50%",fontSize:24,flexShrink:0,
            background:(i===0?C.pink:C.purple)+"22",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {c.avatar}
          </div>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:6}}>
              <div>
                <div style={{fontWeight:800,fontSize:14,color:C.text}}>{c.handle}</div>
                <div style={{color:C.muted,fontSize:11}}>{c.name} · {c.followers}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{background:i===0?C.pink:C.purple,color:"white",borderRadius:20,
                  padding:"3px 12px",fontWeight:800,fontSize:12}}>{c.match}% match</div>
                <div style={{fontSize:11,color:C.muted,marginTop:3}}>Impact: {c.impact}</div>
              </div>
            </div>
            <div style={{marginBottom:8}}><Tag label={c.niche} color={C.purple}/></div>
            <div style={{display:"flex",gap:7}}>
              <GBtn style={{padding:"7px 16px",fontSize:12,borderRadius:8}}>💌 Reach Out</GBtn>
              <OBtn style={{padding:"7px 14px",fontSize:12,borderRadius:8}}>View Profile</OBtn>
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

// ─── PORTALS ─────────────────────────────────────────────────────────────────

const CreatorPortal = ({onNav})=>{
  const [tab,setTab]=useState("upload");
  const TABS=[["upload","Upload","📤"],["content","My Content","📁"],["score","IT Scorecard","📊"],["vault","Vault","🔒"]];

  return(
    <div style={{display:"flex",flex:1,overflow:"hidden",height:"calc(100vh - 65px)"}}>
      {/* Sidebar */}
      <div style={{width:200,background:"white",padding:"20px 12px",
        borderRight:`1px solid ${C.purple}18`,flexShrink:0,overflowY:"auto"}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:24,padding:"0 4px"}}>
          <div style={{width:38,height:38,borderRadius:"50%",background:C.pink+"22",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🧘</div>
          <div>
            <div style={{fontWeight:800,fontSize:12,color:C.text}}>@solarwave</div>
            <div style={{fontSize:10,color:C.sage,fontWeight:600}}>✓ Verified</div>
          </div>
        </div>
        <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:1.5,marginBottom:10,paddingLeft:6}}>
          CREATOR PORTAL
        </div>
        {TABS.map(([id,label,icon])=>(
          <button key={id} onClick={()=>setTab(id)} style={{display:"flex",alignItems:"center",gap:9,
            width:"100%",padding:"10px 12px",borderRadius:12,marginBottom:3,cursor:"pointer",
            fontSize:13,textAlign:"left",transition:"all .15s",
            background:tab===id?C.purple+"14":"transparent",
            color:tab===id?C.purple:C.muted,fontWeight:tab===id?700:500,
            border:tab===id?`2px solid ${C.purple}33`:"2px solid transparent"}}>
            <span>{icon}</span>{label}
          </button>
        ))}
        <div style={{marginTop:28,padding:14,background:C.yellow+"88",borderRadius:14,textAlign:"center"}}>
          <div style={{fontSize:20}}>✨</div>
          <div style={{fontSize:11,fontWeight:700,color:C.text,marginTop:6,lineHeight:1.4}}>
            Your work. Your receipts. Always.
          </div>
        </div>
      </div>
      {/* Content */}
      <div style={{flex:1,padding:"24px 28px",overflowY:"auto",background:C.bg}}>
        {tab==="upload"&&<UploadPanel/>}
        {tab==="content"&&<ContentPanel/>}
        {tab==="score"&&<ScorePanel/>}
        {tab==="vault"&&<VaultPanel/>}
      </div>
    </div>
  );
};

const BrandPortal = ({onNav})=>{
  const [tab,setTab]=useState("brief");
  const TABS=[["brief","Submit Brief","📝"],["results","Discovery","🔍"]];

  return(
    <div style={{display:"flex",flex:1,overflow:"hidden",height:"calc(100vh - 65px)"}}>
      <div style={{width:200,background:"white",padding:"20px 12px",
        borderRight:`1px solid ${C.blue}18`,flexShrink:0}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:24,padding:"0 4px"}}>
          <div style={{width:38,height:38,borderRadius:"50%",background:C.blue+"22",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏢</div>
          <div>
            <div style={{fontWeight:800,fontSize:12,color:C.text}}>MindBloom Co.</div>
            <div style={{fontSize:10,color:C.blue,fontWeight:600}}>Brand Account</div>
          </div>
        </div>
        <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:1.5,marginBottom:10,paddingLeft:6}}>
          BRAND PORTAL
        </div>
        {TABS.map(([id,label,icon])=>(
          <button key={id} onClick={()=>setTab(id)} style={{display:"flex",alignItems:"center",gap:9,
            width:"100%",padding:"10px 12px",borderRadius:12,marginBottom:3,cursor:"pointer",
            fontSize:13,textAlign:"left",transition:"all .15s",
            background:tab===id?C.blue+"14":"transparent",
            color:tab===id?C.blue:C.muted,fontWeight:tab===id?700:500,
            border:tab===id?`2px solid ${C.blue}33`:"2px solid transparent"}}>
            <span>{icon}</span>{label}
          </button>
        ))}
        <div style={{marginTop:28,padding:14,background:C.blue+"18",borderRadius:14,textAlign:"center"}}>
          <div style={{fontSize:20}}>🎯</div>
          <div style={{fontSize:11,fontWeight:700,color:C.text,marginTop:6,lineHeight:1.4}}>
            Find the real ones. Not just the loud ones.
          </div>
        </div>
      </div>
      <div style={{flex:1,padding:"24px 28px",overflowY:"auto",background:C.bg}}>
        {tab==="brief"&&<BriefPanel onResults={()=>setTab("results")}/>}
        {tab==="results"&&<DiscoveryPanel/>}
      </div>
    </div>
  );
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState("landing");
  const [showModal,setShowModal]=useState(false);

  const handleLogin=(utype)=>{
    setShowModal(false);
    setPage(utype);
  };

  return(
    <div style={{fontFamily:"'Arial',sans-serif",background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <GlobalStyles/>
      <Navbar onLogin={()=>setShowModal(true)} onNav={setPage} page={page}/>
      {showModal&&<AuthModal onClose={()=>setShowModal(false)} onLogin={handleLogin}/>}

      {page==="landing"&&(
        <main style={{paddingTop:65}}>
          <Hero onLogin={()=>setShowModal(true)}/>
          <Ticker/>
          <Problems/>
          <Features/>
          <HowItWorks/>
          <ScoreShowcase/>
          <DiscoveryShowcase onLogin={()=>setShowModal(true)}/>
          <Pricing onLogin={()=>setShowModal(true)}/>
          <FooterCTA onLogin={()=>setShowModal(true)}/>
        </main>
      )}

      {page==="creator"&&(
        <div style={{paddingTop:65,display:"flex",flexDirection:"column",flex:1}}>
          <CreatorPortal onNav={setPage}/>
        </div>
      )}

      {page==="brand"&&(
        <div style={{paddingTop:65,display:"flex",flexDirection:"column",flex:1}}>
          <BrandPortal onNav={setPage}/>
        </div>
      )}
    </div>
  );
}
