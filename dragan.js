(() => {
  const mount = document.getElementById("app");
  if (!mount) return;

  mount.innerHTML = `
<div class="wrap">
  <div class="board" id="board">

    <!-- RGB split + embers -->
    <div class="rgbSplit" aria-hidden="true"></div>
    <canvas class="embers" id="embers"></canvas>

    <!-- decals -->
    <div class="freeImg" style="--x:305px;--y: -115px;--w:200px;--h:800px;--rot:0deg;--opa:.75;--z:5;--blur:0px;--fit:contain">
      <img src="https://pomf2.lain.la/f/3jcsggve.png" alt=""> 
    </div>
    <div class="freeImg2" style="--x:390px;--y:280px;--w:240px;--h:500px;--rot:0deg;--opa:.78;--z:8;--blur:0px;--fit:contain">
      <img src="https://pomf2.lain.la/f/d1drjm53.png" alt="">
    </div>

    <div class="grid">
      <aside class="left">
        <div class="nameBanner">
          <div class="nameRow">
            <div class="name">DRAGAN LAD</div>
            <div class="fileCode">DRAGON </div>
          </div>
          <div class="subline">
            <span>ALT FORM / PEAK STATE</span>
            <span>STATUS <b>UNLOCKED</b></span>
          </div>
        </div>

        <div class="chipsBox">
          <div class="file">
            <div class="tag"><i>●</i>LINK <b>ON</b></div>
            <div class="tag"><i>▲</i> <b>ACTIVE</b></div>
            <div class="tag"><i>■</i>SYNC <b id="sync">97%</b></div>
          </div>
        </div>

        <!-- portrait -->
        <div class="pframe">
          <div class="portrait">
            <img src="https://pomf2.lain.la/f/bktq4un1.png" alt="portrait"/>
            <div class="scan"></div>
            <div class="pulseTat"></div>
            <div class="shockwave"></div>
          </div>
        </div>

        <!-- DNA strip -->
        <div class="dnaStrip">
          <div class="k">DNA STRIP</div>
          <div class="dnaHelix"><canvas class="dnaCanvas" id="dnaCanvas"></canvas></div>

          <!-- NEW: sequencer line -->
          <div class="dnaSeqLine" id="dnaSeqLine" aria-hidden="true"></div>

          <div class="dnaRead">
            <span>SEQ <b>VX-UMB</b></span>
            <span>MUTATION <b>99%</b></span>

          </div>
        </div>
      </aside>

      <main class="right">
        <div class="top">
          <div class="title"><span class="dot"></span> DRAGON VECTOR / OVERDRIVE CONSOLE</div>
          <div class="clock" id="clock">--:--</div>
        </div>

        <div class="ticker">
          <span id="tickerSpan">
            DRAGON STATE: ONLINE<br>
            TATTOO LUMINANCE: PURPLE TINT<br>
            OCULAR SHIFT: WHITE / VIOLET HAZE<br>
            VOICE: DISTORTED // FILTERED
          </span>
        </div>

        <!-- Core Vector -->
        <section class="panel coreVec corrupt" id="corePanel">
          <div class="slice" aria-hidden="true"></div>

          <div class="phead">
            <h2>Core Vector</h2>
            <div class="sub" id="subHdr">LIVE STATS - DRAGON STATE</div>
          </div>

          <div class="pbody">
            <div class="coreGrid">
              <svg class="flowSvg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M92 18 C78 18,60 28,44 36 C34 41,26 46,18 50"/>
                <path class="p2" d="M92 38 C76 38,58 44,44 50 C34 55,26 58,18 60"/>
                <path d="M92 58 C76 58,58 60,44 64 C34 68,26 70,18 72"/>
                <path class="p2" d="M92 78 C78 78,60 74,44 70 C34 66,26 62,18 58"/>
              </svg>

              <div class="canvasBox">
                <canvas id="radar" width="150" height="150"></canvas>

                <svg class="orbits" viewBox="0 0 150 150" aria-hidden="true">
                  <g class="r1">
                    <circle cx="75" cy="75" r="54" stroke="rgba(245,245,255,.20)" stroke-width="1.2" fill="none" stroke-dasharray="2 10"/>
                    <circle cx="75" cy="75" r="44" stroke="rgba(255,255,255,.14)" stroke-width="1" fill="none" stroke-dasharray="6 14"/>
                  </g>
                  <g class="r2">
                    <circle cx="75" cy="75" r="34" stroke="rgba(184,107,255,.22)" stroke-width="1.2" fill="none" stroke-dasharray="3 12"/>
                  </g>
                  <g class="r3">
                    <circle cx="75" cy="75" r="24" stroke="rgba(138,45,255,.18)" stroke-width="1.1" fill="none" stroke-dasharray="2 9"/>
                  </g>
                </svg>

                <svg class="reticle" id="reticle" viewBox="0 0 150 150" aria-hidden="true">
                  <circle cx="75" cy="75" r="60" stroke="rgba(255,255,255,.20)" stroke-width="1" fill="none" stroke-dasharray="8 10"/>
                  <circle cx="75" cy="75" r="8" stroke="rgba(184,107,255,.45)" stroke-width="1.5" fill="none"/>
                  <path d="M75 14V34M75 116V136M14 75H34M116 75H136" stroke="rgba(245,245,255,.40)" stroke-width="2" stroke-linecap="round"/>
                  <path d="M75 42V48M75 102V108M42 75H48M102 75H108" stroke="rgba(184,107,255,.32)" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>

              <div>
                <svg width="0" height="0" style="position:absolute">
                  <defs>
                    <linearGradient id="hxg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stop-color="rgba(255,255,255,.55)"/>
                      <stop offset=".55" stop-color="rgba(184,107,255,.80)"/>
                      <stop offset="1" stop-color="rgba(138,45,255,.95)"/>
                    </linearGradient>
                    <filter id="hxglow">
                      <feGaussianBlur stdDeviation="1.9" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                </svg>

                <div class="statGrid" id="statGrid">
                  <div class="hexStat">
                    <div class="hexHdr"><span>Durability</span><b class="num"><i id="g0">92</i><span id="v0">92</span></b></div>
                    <div class="hexBody">
                      <svg class="hexSvg" viewBox="0 0 64 64">
                        <polygon class="hexBase" points="32,6 52,18 52,46 32,58 12,46 12,18"/>
                        <polygon class="hexFill" id="hf0" points="32,6 52,18 52,46 32,58 12,46 12,18"/>
                        <polygon class="hexGlow" id="hx0" points="32,6 52,18 52,46 32,58 12,46 12,18" stroke-dasharray="210" stroke-dashoffset="30"/>
                        <line class="hexNeedle" id="hn0" x1="32" y1="32" x2="32" y2="14"/>
                        <circle class="hexDot" cx="32" cy="32" r="2.6"/>
                      </svg>
                      <div class="hexMeta">
                        <div><span>CAL</span> <b id="p0">92%</b></div>
                        <div class="microBar"><div class="microFill" id="m0" style="width:92%"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="hexStat">
                    <div class="hexHdr"><span>Overpower</span><b class="num"><i id="g1">90</i><span id="v1">90</span></b></div>
                    <div class="hexBody">
                      <svg class="hexSvg" viewBox="0 0 64 64">
                        <polygon class="hexBase" points="32,6 52,18 52,46 32,58 12,46 12,18"/>
                        <polygon class="hexFill" id="hf1" points="32,6 52,18 52,46 32,58 12,46 12,18"/>
                        <polygon class="hexGlow" id="hx1" points="32,6 52,18 52,46 32,58 12,46 12,18" stroke-dasharray="210" stroke-dashoffset="45"/>
                        <line class="hexNeedle" id="hn1" x1="32" y1="32" x2="32" y2="14"/>
                        <circle class="hexDot" cx="32" cy="32" r="2.6"/>
                      </svg>
                      <div class="hexMeta">
                        <div><span>CAL</span> <b id="p1">90%</b></div>
                        <div class="microBar"><div class="microFill" id="m1" style="width:90%"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="hexStat">
                    <div class="hexHdr"><span>Speed</span><b class="num"><i id="g2">88</i><span id="v2">88</span></b></div>
                    <div class="hexBody">
                      <svg class="hexSvg" viewBox="0 0 64 64">
                        <polygon class="hexBase" points="32,6 52,18 52,46 32,58 12,46 12,18"/>
                        <polygon class="hexFill" id="hf2" points="32,6 52,18 52,46 32,58 12,46 12,18"/>
                        <polygon class="hexGlow" id="hx2" points="32,6 52,18 52,46 32,58 12,46 12,18" stroke-dasharray="210" stroke-dashoffset="40"/>
                        <line class="hexNeedle" id="hn2" x1="32" y1="32" x2="32" y2="14"/>
                        <circle class="hexDot" cx="32" cy="32" r="2.6"/>
                      </svg>
                      <div class="hexMeta">
                        <div><span>CAL</span> <b id="p2">88%</b></div>
                        <div class="microBar"><div class="microFill" id="m2" style="width:88%"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="hexStat">
                    <div class="hexHdr"><span>Predation</span><b class="num"><i id="g3">85</i><span id="v3">85</span></b></div>
                    <div class="hexBody">
                      <svg class="hexSvg" viewBox="0 0 64 64">
                        <polygon class="hexBase" points="32,6 52,18 52,46 32,58 12,46 12,18"/>
                        <polygon class="hexFill" id="hf3" points="32,6 52,18 52,46 32,58 12,46 12,18"/>
                        <polygon class="hexGlow" id="hx3" points="32,6 52,18 52,46 32,58 12,46 12,18" stroke-dasharray="210" stroke-dashoffset="58"/>
                        <line class="hexNeedle" id="hn3" x1="32" y1="32" x2="32" y2="14"/>
                        <circle class="hexDot" cx="32" cy="32" r="2.6"/>
                      </svg>
                      <div class="hexMeta">
                        <div><span>CAL</span> <b id="p3">85%</b></div>
                        <div class="microBar"><div class="microFill" id="m3" style="width:85%"></div></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="trustRow">
                  <span><em>FEAR VALUE</em></span>
                  <b id="trust">8742</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Identity / Manifest -->
        <section class="idBoard">
          <div class="ibHead">
            <h3>ID</h3>
            <div class="sig">CLEARANCE: BLACK</div>
          </div>
          <div class="ibBody">
            <div class="ibRow">
              <div class="ibCell"><div class="k">State</div><div class="v">Dragon Form • Peak Trigger</div></div>
              <div class="ibCell"><div class="k">Trigger</div><div class="v">Severe beating / threshold breach</div></div>
            </div>
            <div class="ibRow">
              <div class="ibCell"><div class="k">Skin</div><div class="v">Pitch black</div></div>
              <div class="ibCell"><div class="k">Tattoos</div><div class="v">White • Purple luminescence</div></div>
            </div>
            <div class="ibRow ibRowFull">
              <div class="ibCell">
                <div class="k">Ability</div>
                <div class="v"><b>Pain Induced Strength</b> • power increases by factor of two with sustained damage</div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>
</div>

<audio id="loopAudio" src="https://pomf2.lain.la/f/i4xc9d.mp3" autoplay loop hidden></audio>
  `;

  // Original JS below (unchanged)
  const $=s=>document.querySelector(s);

  function tick(){
    const d=new Date();
    $("#clock").textContent=String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
  }
  tick(); setInterval(tick,1000);

  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  const lerp=(a,b,t)=>a+(b-a)*t;

  function pingLock(){
    const r=$("#reticle");
    if(!r)return;
    r.classList.remove("on");
    void r.offsetWidth;
    r.classList.add("on");
  }

  /* ===== HEARTBEAT (fear-linked) ===== */
  let hb=0;
  let lastBeat=performance.now();
  let beatPhase=0;
  function setHB(target){
    hb=lerp(hb,target,0.15);
    document.documentElement.style.setProperty("--hb", hb.toFixed(3));
  }

  /* ===== State machine so overload isn't permanent ===== */
  const corePanel=$("#corePanel");
  let surgeState="high"; // "cool" | "high" | "over"
  let stateUntil=performance.now()+2600;

  function pulseCorrupt(el, ms=420){
    if(!el) return;
    el.classList.add("on");
    setTimeout(()=>el.classList.remove("on"), ms);
  }

  let fxPulse=0;
  function microFxKick(str=1){
    fxPulse=Math.max(fxPulse, 0.18*str + Math.random()*0.18);
  }

  /* Umbra dynamics */
  let baseTrust=8742;
  let threat=93;
  let control=78;

  /* Radar values order: DUR, OVP, SPD, PRD, CTL, THR */
  let vals=[92,90,88,85,control,threat];
  const baseCore=[92,90,88,85];

  /* ===== OVERLOAD CAP ===== */
  const MAXN=140;   // allow past 100
  const OVR=100;

  /* Enter overload = short spike, then return to high */
  function enterOverload(){
    surgeState="over";
    stateUntil=performance.now() + (900 + Math.random()*900);
    pulseCorrupt(corePanel, 520);
    microFxKick(1.2);

    // one-time spike
    for(let i=0;i<4;i++){
      vals[i]=clamp(vals[i] + (18+Math.random()*28), 55, MAXN);
    }
    baseTrust += 120 + Math.floor(Math.random()*220);
  }

  function setStateNext(){
    const now=performance.now();
    if(now < stateUntil) return;

    if(surgeState==="cool"){
      surgeState="high";
      stateUntil=now + (2200 + Math.random()*1600);
    }else if(surgeState==="high"){
      // sometimes jump to overload, sometimes cool down
      if(Math.random()<0.35) enterOverload();
      else{
        surgeState="cool";
        stateUntil=now + (1600 + Math.random()*1200);
      }
    }else{
      // over -> high
      surgeState="high";
      stateUntil=now + (2400 + Math.random()*1800);
    }
  }

  /* ===== Fear Value + heartbeat feed ===== */
  let fear=baseTrust;

  setInterval(()=>{
    $("#sync").textContent=(96+Math.floor(4*Math.random()))+"%";

    fear = baseTrust + Math.floor((Math.random()-.5)*160);
    $("#trust").textContent=String(fear);

    const t=clamp((fear-8500)/900, 0, 1);
    setHB(t);

    threat=88+Math.floor(12*Math.random());
    control=76+Math.floor(10*Math.random());
    vals[4]=control; vals[5]=threat;

    // occasional lock ping
    if(Math.random()<0.65) pingLock();

    // small tearing sometimes in HIGH, more in OVER
    if(surgeState==="over" || (surgeState==="high" && Math.random()<0.28)){
      pulseCorrupt(corePanel, surgeState==="over"?520:360);
      microFxKick(surgeState==="over"?1.0:0.45);
    }
  }, 950);

  /* ===== Radar render ===== */
  const c=$("#radar"),ctx=c.getContext("2d");
  const labels=["DUR","OVP","SPD","PRD","CTL","THR"];

  function drawRadar(){
    const w=c.width,h=c.height;
    ctx.clearRect(0,0,w,h);
    const cx=w/2, cy=h/2;
    const R=Math.min(w,h)*.42;
    const n=vals.length;

    for(let g=1;g<=4;g++){
      const r=R*(g/4);
      ctx.beginPath();
      for(let i=0;i<n;i++){
        const a=-Math.PI/2+i*(Math.PI*2/n);
        const x=cx+Math.cos(a)*r;
        const y=cy+Math.sin(a)*r;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.save();
      ctx.lineJoin="round";
      ctx.lineCap="round";
      ctx.shadowBlur=10;
      ctx.shadowColor="rgba(184,107,255,.18)";
      ctx.strokeStyle="rgba(184,107,255,.16)";
      ctx.lineWidth=2.4;
      ctx.stroke();
      ctx.shadowBlur=0;
      ctx.strokeStyle="rgba(255,255,255,.16)";
      ctx.lineWidth=1.2;
      ctx.stroke();
      ctx.restore();
    }

    for(let i=0;i<n;i++){
      const a=-Math.PI/2+i*(Math.PI*2/n);
      const x=cx+Math.cos(a)*R, y=cy+Math.sin(a)*R;
      ctx.beginPath();
      ctx.moveTo(cx,cy); ctx.lineTo(x,y);
      ctx.save();
      ctx.lineCap="round";
      ctx.shadowBlur=10;
      ctx.shadowColor="rgba(245,245,255,.10)";
      ctx.strokeStyle="rgba(245,245,255,.12)";
      ctx.lineWidth=2.0;
      ctx.stroke();
      ctx.shadowBlur=0;
      ctx.strokeStyle="rgba(184,107,255,.12)";
      ctx.lineWidth=1.0;
      ctx.stroke();
      ctx.restore();

      ctx.font="900 10px Orbitron,sans-serif";
      ctx.fillStyle="rgba(255,255,255,.72)";
      const lx=cx+Math.cos(a)*(R+10);
      const ly=cy+Math.sin(a)*(R+10);
      ctx.fillText(labels[i],lx-10,ly+4);
    }

    function poly(){
      ctx.beginPath();
      for(let i=0;i<n;i++){
        const a=-Math.PI/2+i*(Math.PI*2/n);
        const rr=R*(clamp(vals[i],0,100)/100);
        const x=cx+Math.cos(a)*rr;
        const y=cy+Math.sin(a)*rr;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.closePath();
    }

    ctx.save();
    ctx.lineJoin="round";
    ctx.lineCap="round";
    ctx.shadowBlur=26;
    ctx.shadowColor="rgba(184,107,255,.55)";
    poly();
    ctx.strokeStyle="rgba(184,107,255,.75)";
    ctx.lineWidth=4.0;
    ctx.stroke();
    ctx.shadowBlur=34;
    ctx.shadowColor="rgba(255,255,255,.18)";
    poly();
    ctx.strokeStyle="rgba(255,255,255,.55)";
    ctx.lineWidth=1.2;
    ctx.stroke();
    ctx.restore();

    poly();
    ctx.fillStyle="rgba(138,45,255,.14)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx,cy,2.2,0,Math.PI*2);
    ctx.fillStyle="rgba(184,107,255,.70)";
    ctx.fill();
  }

  /* ===== Hex UI updates (OVERLOAD SUPPORT) ===== */
  function setHex(i,v){
    v=clamp(v,0,MAXN);

    const pct=$("#p"+i);
    const micro=$("#m"+i);
    const glow=$("#hx"+i);
    const needle=$("#hn"+i);
    const fill=$("#hf"+i);

    const showPct=Math.round(clamp(v,0,100));
    pct && (pct.textContent=showPct+"%");

    micro && (micro.style.width=clamp(v,0,100)+"%");

    if(glow){
      const total=210, filled=total*(clamp(v,0,100)/100);
      glow.style.strokeDasharray=String(total);
      glow.style.strokeDashoffset=String(total-filled);
    }

    const deg=-125+(clamp(v,0,MAXN)/MAXN)*250;
    needle && needle.setAttribute("transform",`rotate(${deg} 32 32)`);

    if(fill){
      const s=.2+.8*(clamp(v,0,100)/100);
      fill.style.opacity=(.10+.28*(clamp(v,0,100)/100)).toFixed(3);
      fill.setAttribute("transform",`translate(32 32) scale(${s}) translate(-32 -32)`);
    }

    const statEl=document.querySelectorAll(".hexStat")[i];
    if(statEl){
      statEl.dataset.over = v>OVR ? "1" : "0";
    }
  }

  /* ===== Impact memory (ghost) ===== */
  let ghosts=[92,90,88,85];
  function ghostHit(i, v){
    if(v > ghosts[i] + 6){
      ghosts[i]=v;
      const g=$("#g"+i);
      if(g){
        g.textContent=Math.round(v);
        g.classList.remove("on");
        void g.offsetWidth;
        g.classList.add("on");
        setTimeout(()=>g.classList.remove("on"), 520);
      }
    }else{
      ghosts[i]=lerp(ghosts[i], v, 0.03);
    }
  }

  /* main breathe loop */
  function breathe(){
    setStateNext();

    // target shaping by state (fixes "always overload")
    for(let i=0;i<4;i++){
      const base=baseCore[i];
      const noise=(Math.sin(Date.now()/900 + i*1.7)*0.35) + ((Math.random()-.5)*0.22);

      let target=base;
      if(surgeState==="cool") target = base - (4 + Math.random()*3);
      else if(surgeState==="high") target = base + (0.8 + Math.random()*2.2);
      else target = base + (18 + Math.random()*28); // overload, but short

      vals[i]=lerp(vals[i], target + noise, surgeState==="over"?0.12:0.06);
      vals[i]=clamp(vals[i], 55, MAXN);
    }

    for(let i=0;i<4;i++){
      const el=$("#v"+i);
      el && (el.textContent=Math.round(vals[i])); // shows >100 too
      ghostHit(i, vals[i]);
      setHex(i, vals[i]);
    }

    drawRadar();

    // heartbeat pulse (two-beat feel)
    const now=performance.now();
    const bpm=72 + hb*22;
    const beatMs=60000/bpm;
    const t=(now-lastBeat)/beatMs;
    if(t>=1){ lastBeat=now; beatPhase=0; }
    beatPhase=clamp(t,0,1);

    const dub = Math.max(0, 1 - Math.abs((beatPhase-0.18)/0.12));
    const dub2= Math.max(0, 1 - Math.abs((beatPhase-0.46)/0.10)) * 0.55;
    const pulse = clamp((dub + dub2)*hb, 0, 1);
    document.documentElement.style.setProperty("--hb", (hb*0.65 + pulse*0.9).toFixed(3));

    // heat follows state
    const heatTarget = (surgeState==="cool") ? 0.05 : (surgeState==="high" ? 0.35 : 1);
    const curHeat = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--heat"))||0;
    document.documentElement.style.setProperty("--heat", lerp(curHeat, heatTarget, 0.08).toFixed(3));

    // decay the auto glitch pulse
    fxPulse = Math.max(0, fxPulse - 0.028);
    document.documentElement.style.setProperty("--fx", fxPulse.toFixed(3));

    requestAnimationFrame(breathe);
  }
  breathe();

  /* ===== EMBERS (purple/white particles) ===== */
  (()=>{
    const board=$("#board");
    const canvas=$("#embers");
    if(!board || !canvas) return;
    const ctx=canvas.getContext("2d", {alpha:true});
    let w=1,h=1,dpr=1;
    let parts=[];
    const N=46;

    function resize(){
      const r=board.getBoundingClientRect();
      dpr=Math.max(1, Math.min(2, window.devicePixelRatio||1));
      w=Math.max(1, Math.floor(r.width*dpr));
      h=Math.max(1, Math.floor(r.height*dpr));
      canvas.width=w; canvas.height=h;
    }
    function spawn(){
      return{
        x:Math.random()*w,
        y:h + Math.random()*h*0.2,
        vx:(Math.random()-.5)*0.10*dpr,
        vy:-(0.18+Math.random()*0.42)*dpr,
        r:(0.8+Math.random()*2.2)*dpr,
        a:0.10+Math.random()*0.55,
        t:Math.random()*Math.PI*2,
        c:Math.random()<0.55 ? "white" : "violet"
      };
    }
    function init(){
      parts=new Array(N).fill(0).map(spawn);
    }

    function draw(){
      ctx.clearRect(0,0,w,h);

      const g=ctx.createRadialGradient(w*0.55,h*0.35,0,w*0.55,h*0.35,Math.max(w,h)*0.7);
      g.addColorStop(0, "rgba(184,107,255,.06)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle=g;
      ctx.fillRect(0,0,w,h);

      const fx=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fx"))||0;

      for(const p of parts){
        p.t+=0.02;
        p.x+=p.vx + Math.sin(p.t)*0.10*dpr;
        p.y+=p.vy;
        p.a -= 0.0012;

        if(fx>0){
          p.y += -(fx*0.55)*dpr;
          p.a += fx*0.0015;
        }

        if(p.y < -40*dpr || p.a<=0 || p.x<-50*dpr || p.x>w+50*dpr){
          Object.assign(p, spawn());
          continue;
        }

        const col = (p.c==="white")
          ? \`rgba(245,245,255,\${p.a})\`
          : \`rgba(184,107,255,\${p.a})\`;

        ctx.beginPath();
        ctx.fillStyle=col;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();

        ctx.globalAlpha=0.25;
        ctx.beginPath();
        ctx.strokeStyle=col;
        ctx.lineWidth=1.2*dpr;
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(p.x - p.vx*22, p.y - p.vy*18);
        ctx.stroke();
        ctx.globalAlpha=1;
      }
      requestAnimationFrame(draw);
    }

    resize();
    init();
    requestAnimationFrame(draw);
    window.addEventListener("resize", ()=>{ resize(); init(); }, {passive:true});
  })();

  /* ===== DNA canvas (unchanged visual) + NEW sequencer line ===== */
  (()=>{
    const canvas=document.getElementById("dnaCanvas");
    if(!canvas) return;

    const c2=canvas.getContext("2d",{alpha:true});
    let w=0,h=0,dpr=1;

    function resize(){
      const box=canvas.getBoundingClientRect();
      dpr=Math.max(1, Math.min(2, window.devicePixelRatio||1));
      w=Math.max(1, Math.floor(box.width*dpr));
      h=Math.max(1, Math.floor(box.height*dpr));
      canvas.width=w; canvas.height=h;
    }

    const white=[245,245,255];
    const violet=[184,107,255];
    const rgba=(rgb,a)=>\`rgba(\${rgb[0]},\${rgb[1]},\${rgb[2]},\${a})\`;

    function strokePass(color,phaseOffset,mode,time,mid,amp,freq,speed){
      c2.beginPath();
      let started=false;
      for(let x=0;x<=w;x+=2*dpr){
        const ph=x*freq+time*speed+phaseOffset;
        const y=mid+amp*Math.sin(ph);
        const z=(Math.cos(ph)+1)/2;
        const y3=y+(z-.5)*amp*.35;
        const isFront=z>.55;
        const take=(mode==="front")?isFront:!isFront;

        if(take){
          started?c2.lineTo(x,y3):(c2.moveTo(x,y3), started=true);
        }else if(started){
          const a=(mode==="front")?.92:.28;
          const lw=(mode==="front")?3.4*dpr:1.9*dpr;
          c2.strokeStyle=rgba(color,a);
          c2.lineWidth=lw;
          c2.lineCap="round";
          c2.lineJoin="round";
          c2.shadowBlur=(mode==="front")?10*dpr:0;
          c2.shadowColor=(mode==="front")?rgba(violet,.32):"transparent";
          c2.stroke();
          c2.beginPath();
          started=false;
        }
      }
      if(started){
        const a=(mode==="front")?.92:.28;
        const lw=(mode==="front")?3.4*dpr:1.9*dpr;
        c2.strokeStyle=rgba(color,a);
        c2.lineWidth=lw;
        c2.lineCap="round";
        c2.lineJoin="round";
        c2.shadowBlur=(mode==="front")?10*dpr:0;
        c2.shadowColor=(mode==="front")?rgba(violet,.32):"transparent";
        c2.stroke();
      }
      c2.shadowBlur=0;
    }

    function draw(t){
      const time=.001*t;
      c2.clearRect(0,0,w,h);

      const mid=.5*h, amp=.22*h;
      const freq=2*Math.PI/(.33*w);
      const speed=2.6;
      const baseStep=Math.max(18*dpr, w/16);

      const bg=c2.createLinearGradient(0,0,0,h);
      bg.addColorStop(0,"rgba(255,255,255,.06)");
      bg.addColorStop(1,"rgba(255,255,255,.02)");
      c2.fillStyle=bg;
      c2.fillRect(0,0,w,h);

      for(let x=-baseStep;x<=w+baseStep;x+=baseStep){
        const ph=x*freq+time*speed;
        const y1=mid+amp*Math.sin(ph);
        const y2=mid+amp*Math.sin(ph+Math.PI);
        const z=(Math.cos(ph)+1)/2;
        const front=z>.5;
        const y1p=y1+(z-.5)*amp*.35;
        const y2p=y2-(z-.5)*amp*.35;

        c2.strokeStyle=front?"rgba(245,245,255,.70)":"rgba(245,245,255,.22)";
        c2.lineWidth=front?1.6*dpr:1.0*dpr;
        c2.beginPath();
        c2.moveTo(x,y1p); c2.lineTo(x,y2p);
        c2.stroke();

        c2.fillStyle=front?"rgba(184,107,255,.40)":"rgba(245,245,255,.14)";
        c2.beginPath(); c2.arc(x,y1p,front?2*dpr:1.4*dpr,0,2*Math.PI); c2.fill();
        c2.beginPath(); c2.arc(x,y2p,front?2*dpr:1.4*dpr,0,2*Math.PI); c2.fill();
      }

      strokePass(violet,0,"back",time,mid,amp,freq,speed);
      strokePass(white,Math.PI,"back",time,mid,amp,freq,speed);
      strokePass(violet,0,"front",time,mid,amp,freq,speed);
      strokePass(white,Math.PI,"front",time,mid,amp,freq,speed);

      requestAnimationFrame(draw);
    }

    resize();
    requestAnimationFrame(draw);
    window.addEventListener("resize", resize, {passive:true});
  })();

  /* ===== NEW: DNA sequencer line that “mutates” with state ===== */
  (()=>{
    const dnaSeqLine=$("#dnaSeqLine");
    if(!dnaSeqLine) return;

    const bases=["A","C","G","T"];
    let seq = new Array(64).fill(0).map(()=>bases[(Math.random()*4)|0]);

    function rollBase(){
      const p = (surgeState==="cool") ? 0.05 : (surgeState==="high" ? 0.12 : 0.28);
      const mutate = Math.random()<p;
      const b = bases[(Math.random()*4)|0];
      return mutate ? \`<b>\${b}</b>\` : b;
    }

    setInterval(()=>{
      seq.shift();
      seq.push(bases[(Math.random()*4)|0]);
      dnaSeqLine.innerHTML = seq.map(()=>rollBase()).join(" ");
    }, 160);
  })();
})();
