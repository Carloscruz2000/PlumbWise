/* PlumbWise – modules + revision + mocks (per-module + full mixed)
   Works fully client-side; saves best scores in localStorage.
*/

const app = document.getElementById("app");

/* ---------- Modules ---------- */
const MODULES = [
  { id: "hs",   title: "Health & Safety", pass: 70 },
  { id: "elec", title: "Electrical", pass: 70 },
  { id: "sci",  title: "Scientific Principles", pass: 70 },
  { id: "proc", title: "Plumbing Processes", pass: 70 },
  { id: "cold", title: "Cold Water", pass: 70 },
  { id: "hot",  title: "Hot Water", pass: 70 },
  { id: "ch",   title: "Central Heating", pass: 70 },
  { id: "san",  title: "Sanitation", pass: 70 },
  { id: "drn",  title: "Drainage", pass: 70 },
  { id: "comm", title: "Communications", pass: 70 },
  { id: "wr",   title: "Water Regulations", pass: 70 },
];

/* ---------- Revision notes (short, bite-size) ---------- */
const NOTES = {
   const RESOURCES = {
  hs: [
    { label: "Hot Works Safety (PPTX)", file: "/resources/hs/hot-works-safety.pptx" },
    { label: "PPE Quick Guide (PDF)",   file: "/resources/hs/ppe-quick-guide.pdf" }
  ],
  elec: [
    { label: "Safe Isolation (PDF)",    file: "/resources/elec/safe-isolation.pdf" }
  ],
  sci: [], proc: [], cold: [], hot: [], ch: [], san: [], drn: [], comm: [], wr: []
};

  hs: [
    "Dynamic risk assessment; stop if new hazards appear.",
    "PPE: boots, gloves, eye/ear protection where needed.",
    "Isolate safely; lock-off/tag-out; verify dead.",
    "COSHH: check SDS, correct storage & PPE."
  ],
  elec: [
    "Safe isolation: test-test-test method with a proven tester.",
    "RCD protection for portable tools in damp areas.",
    "Bonding/earthing must be intact before work begins."
  ],
  sci: [
    "Pressure = ρgh; head of water ≈ 1 m ≈ 0.1 bar.",
    "Heat transfer: conduction, convection, radiation.",
    "Expansion of heated water requires expansion control."
  ],
  proc: [
    "Measure twice, cut once; deburr and clean pipe ends.",
    "Soldering: clean, light flux, heat fitting not solder.",
    "Press-fit: correct jaw/profile; mark insertion depth."
  ],
  cold: [
    "Stopcocks at point of entry; accessible isolation.",
    "Backflow protection (double check valve) where required.",
    "Support pipework; avoid dead legs to maintain quality."
  ],
  hot: [
    "Store hot water ~60°C+ (legionella control).",
    "TMVs for outlets to control scald risk.",
    "Unvented: T&P relief, expansion, visible tundish."
  ],
  ch: [
    "System types: open vented, sealed, combi.",
    "Correct sizing & balancing of emitters.",
    "Mag filter & inhibitor for longevity; vent air."
  ],
  san: [
    "Traps maintain water seal (50 mm typical).",
    "Anti-siphon & correct venting to protect seals.",
    "Correct falls prevent blockages & smells."
  ],
  drn: [
    "100 mm pipefalls typically 1:40–1:110 (≈ 18–90 mm/m).",
    "Provide access for rodding at changes of direction.",
    "AAVs within limits; ensure ventilation of stack."
  ],
  comm: [
    "Confirm scope, timelines, and access with customers.",
    "Use plain language; confirm variations in writing.",
    "Record photos, serials, and readings for reports."
  ],
  wr: [
    "WRAS-compliant fittings; prevent contamination.",
    "Backflow categories & required devices matter.",
    "Notification for certain works (e.g., unapproved fittings)."
  ]
};

/* ---------- Question bank (2 Qs per module for demo) ---------- */
const QB = {
  hs: [
    { q: "First step before hot works?", type:"mcq",
      options:["Warn others","Open window","Risk assessment/permit","Put on gloves"],
      answer:[2], why:"Identify hazards and controls before starting." },
    { q: "Which is COSHH-related?", type:"mcq",
      options:["PAT test","Safety Data Sheet","RCD test","MFT continuity"],
      answer:[1], why:"SDS gives handling/PPE info for substances." }
  ],
  elec: [
    { q: "Safe isolation includes:", type:"multi",
      options:["Prove tester","Test supply","Lock-off","Skip proving"],
      answer:[0,1,2], why:"Prove tester, test supply, secure isolation." },
    { q: "RCD use is most critical in:", type:"mcq",
      options:["Dry office","Damp cellar","Open field on dry day","Server room"],
      answer:[1], why:"Greater shock risk in damp locations." }
  ],
  sci: [
    { q: "1 m head ≈ ?", type:"mcq",
      options:["0.01 bar","0.1 bar","1 bar","10 bar"],
      answer:[1], why:"Rough rule: 10 m head ≈ 1 bar." },
    { q: "Heat transfer heating a room radiator:", type:"mcq",
      options:["Conduction only","Convection mainly","Radiation only","None"],
      answer:[1], why:"Radiators mainly heat by convection." }
  ],
  proc: [
    { q: "Good solder joint needs:", type:"multi",
      options:["Clean pipe & fitting","Heavy flux","Heat fitting, feed solder","Heat solder directly"],
      answer:[0,2], why:"Cleanliness + heat the fitting." },
    { q: "Press-fit best practice:", type:"mcq",
      options:["Any jaw fits","No depth marking","Correct jaw/profile","Crimp twice randomly"],
      answer:[2], why:"Use correct jaws and mark full insertion." }
  ],
  cold: [
    { q: "Backflow device for domestic appliance:", type:"mcq",
      options:["Stop end","Drain cock","Double check valve","Gate valve"],
      answer:[2], why:"DCV prevents contamination." },
    { q: "Dead legs should be:", type:"mcq",
      options:["Maximised","Minimised","Painted","Capped with tape"],
      answer:[1], why:"Reduce stagnation risk." }
  ],
  hot: [
    { q: "Legionella control storage temp:", type:"mcq",
      options:["40°C","50°C","60°C+","80°C"],
      answer:[2], why:"Store at ~60°C or higher." },
    { q: "Unvented cylinder safety requires:", type:"multi",
      options:["T&P relief","Expansion control","Visible tundish","None of these"],
      answer:[0,1,2], why:"All are critical safety features." }
  ],
  ch: [
    { q: "Sealed CH systems require:", type:"mcq",
      options:["Open feed cistern","Expansion vessel","No inhibitor","No PRV"],
      answer:[1], why:"Expansion vessel manages volume change." },
    { q: "Mag filter benefit:", type:"mcq",
      options:["Adds scale","Traps magnetite","Raises pH","Creates flow noise"],
      answer:[1], why:"Removes sludge to protect components." }
  ],
  san: [
    { q: "Typical trap water seal:", type:"mcq",
      options:["10 mm","25 mm","50 mm","100 mm"],
      answer:[2], why:"50 mm is common standard." },
    { q: "Trap seal loss prevention:", type:"mcq",
      options:["No venting","Correct venting/anti-siphon","Steeper falls only","Smaller bore"],
      answer:[1], why:"Venting prevents siphonage." }
  ],
  drn: [
    { q: "Fall for 100 mm pipe acceptable:", type:"mcq",
      options:["1 mm/m","10 mm/m","18–90 mm/m","150 mm/m"],
      answer:[2], why:"Approx 1:40 to 1:110." },
    { q: "Provide rodding points at:", type:"mcq",
      options:["Random places","Every 3 m","Changes of direction","After branch only"],
      answer:[2], why:"For blockage clearance." }
  ],
  comm: [
    { q: "Best practice with client changes:", type:"mcq",
      options:["Verbal only","Confirm in writing","Ignore","Invoice without note"],
      answer:[1], why:"Agree and record to avoid disputes." },
    { q: "Good handover includes:", type:"multi",
      options:["Photos/serials","Test results","No documentation","User guidance"],
      answer:[0,1,3], why:"Evidence + guidance build trust." }
  ],
  wr: [
    { q: "WRAS relates to:", type:"mcq",
      options:["Gas regs","Electrical safety","Approved water fittings","Ventilation rates"],
      answer:[2], why:"WRAS = water fittings compliance." },
    { q: "Backflow categories matter because:", type:"mcq",
      options:["Decor only","Noise only","Contamination risk level","Pipe colour"],
      answer:[2], why:"They set the protection device required." }
  ]
};

/* ---------- Small helpers ---------- */
const $ = s => document.querySelector(s);
const k = s => "pw_"+s;
const save = (s,v) => localStorage.setItem(k(s), JSON.stringify(v));
const load = (s,d=null) => {
  try { const v = JSON.parse(localStorage.getItem(k(s))); return v ?? d; }
  catch { return d; }
};
const pct = (n,d) => d ? Math.round((n/d)*100) : 0;
const shuffle = a => { for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

/* ---------- UI: Home (module grid + Full Mock) ---------- */
function renderHome(){
  const cards = MODULES.map(m=>{
    const best = load("score_"+m.id, null);
    const bestPct = best ? pct(best.correct, best.total) : null;
    return `
      <div class="card">
        <h2>${m.title}</h2>
        <div class="note">${(NOTES[m.id]||[])[0] || ""}</div>
        <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" onclick="openRevision('${m.id}')">Revision</button>
          <button class="btn primary" onclick="startQuiz('${m.id}')">Mock Exam</button>
        </div>
        ${best ? `<div class="progress"><div style="width:${bestPct}%"></div></div>
                  <div class="muted">Best: ${bestPct}% (${best.correct}/${best.total})</div>`
               : `<div class="muted">No attempts yet.</div>`}
      </div>
    `;
  }).join("");

  app.innerHTML = `
    <section class="card">
      <h2>PlumbWise — Modules</h2>
      <p class="muted">Choose a module to read quick notes, then take a short mock. Pass mark: 70%.</p>
    </section>
    <section class="grid">${cards}</section>
    <section class="card">
      <h2>Full Mixed Mock (all modules)</h2>
      <p class="muted">20 questions picked across all modules.</p>
      <button class="btn primary" onclick="startFullMock()">Start Full Mock</button>
    </section>
  `;
}

/* ---------- UI: Revision ---------- */
window.openRevision = (id)=>{
  const mod = MODULES.find(m=>m.id===id);
  const notes = NOTES[id] || [];
  const files = (typeof RESOURCES!=='undefined' ? RESOURCES[id] : []) || [];

  app.innerHTML = `
    <div class="card">
      <h2>${mod.title} — Revision</h2>
      ${notes.length ? notes.map(n=>`<div class="note">${n}</div>`).join("") : `<div class="note">No notes yet.</div>`}

      ${files.length ? `
        <div class="card" style="margin-top:12px">
          <h3>Resources</h3>
          <ul style="line-height:1.9; padding-left:18px">
            ${files.map(r => `
              <li>
                <a class="btn" href="${r.file}" target="_blank" rel="noopener">View</a>
                <a class="btn" href="${r.file}" download>Download</a>
                <span class="muted" style="margin-left:8px">${r.label}</span>
              </li>
            `).join("")}
          </ul>
          <p class="muted">PDFs open in the browser. PowerPoints usually download.</p>
        </div>` : ``}

      <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn primary" onclick="startQuiz('${id}')">Start Mock</button>
        <a class="btn" href="#" onclick="renderHome();return false;">← Back</a>
      </div>
    </div>
  `;
};

/* ---------- Quiz engine ---------- */
function newState(pool, title){
  return { idx:0, order:shuffle([...pool.keys()]), pool, answers:{}, finished:false, title, started:Date.now() };
}

window.startQuiz = (id)=>{
  const mod = MODULES.find(m=>m.id===id);
  const pool = (QB[id]||[]).map((q,i)=>({ ...q, _id: `${id}_${i}`, _mod: id }));
  if(!pool.length){ alert("No questions in this module yet."); return; }
  save("current", newState(pool, `${mod.title} — Mock`));
  renderQuiz();
};

window.startFullMock = ()=>{
  let pool = [];
  MODULES.forEach(m=>{
    const qs = (QB[m.id]||[]).map((q,i)=>({ ...q, _id: `${m.id}_${i}`, _mod: m.id }));
    pool = pool.concat(qs);
  });
  if(!pool.length){ alert("No questions yet."); return; }
  shuffle(pool);
  pool = pool.slice(0, 20); // 20 Q mixed paper
  save("current", newState(pool, "Full Mixed Mock"));
  renderQuiz();
};

function renderQuiz(){
  const s = load("current"); if(!s) return;
  const i = s.order[s.idx]; const q = s.pool[i];
  const total = s.pool.length; const cur = s.idx+1;
  const sel = s.answers[q._id] || [];

  const opts = (q.type==="multi")
    ? q.options.map((o,idx)=>`
        <label class="opt">
          <input type="checkbox" ${sel.includes(idx)?"checked":""}
            onchange="toggleMulti('${q._id}',${idx})"/> <span>${o}</span>
        </label>`).join("")
    : q.options.map((o,idx)=>`
        <label class="opt">
          <input type="radio" name="opt" ${sel.includes(idx)?"checked":""}
            onchange="selectOne('${q._id}',${idx})"/> <span>${o}</span>
        </label>`).join("");

  app.innerHTML = `
    <div class="card">
      <h2>${s.title} (${cur}/${total})</h2>
      <div class="q"><b>${q.q}</b><div class="options">${opts}</div></div>
      <div style="display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn" onclick="prevQ()">Back</button>
        <button class="btn" onclick="clearA('${q._id}')">Clear</button>
        <button class="btn primary" onclick="nextQ()">Next</button>
      </div>
      <div class="muted" style="margin-top:8px">${q.type==="multi" ? "Select all that apply" : "Select one"}.</div>
    </div>
    <div class="card"><button class="btn primary" onclick="submitQuiz()">Submit</button></div>
  `;
}

window.selectOne = (id, idx)=>{ const s=load("current"); s.answers[id]=[idx]; save("current",s); };
window.toggleMulti = (id, idx)=>{ const s=load("current"); const set=new Set(s.answers[id]||[]); set.has(idx)?set.delete(idx):set.add(idx); s.answers[id]=[...set].sort((a,b)=>a-b); save("current",s); };
window.clearA = (id)=>{ const s=load("current"); delete s.answers[id]; save("current",s); renderQuiz(); };
window.nextQ = ()=>{ const s=load("current"); if(s.idx<s.pool.length-1) s.idx++; save("current",s); renderQuiz(); };
window.prevQ = ()=>{ const s=load("current"); if(s.idx>0) s.idx--; save("current",s); renderQuiz(); };

window.submitQuiz = ()=>{
  const s = load("current"); if(!s) return;
  let correct=0, total=s.pool.length, review=[];
  s.pool.forEach(q=>{
    const a = s.answers[q._id] || [];
    const ans = (q.answer||[]).slice().sort((x,y)=>x-y);
    const ok = a.length===ans.length && a.every((v,i)=>v===ans[i]);
    if(ok) correct++; else review.push(q);
  });
  const p = Math.round((correct/total)*100);

  // If this was a single-module mock, save best
  const moduleId = s.pool.length && s.pool[0]._mod && s.pool.every(x=>x._mod===s.pool[0]._mod)
    ? s.pool[0]._mod : null;
  if(moduleId){
    const prev = load("score_"+moduleId, null);
    const better = !prev || p > Math.round((prev.correct/prev.total)*100);
    save("score_"+moduleId, better ? {correct,total} : prev || {correct,total});
  }

  app.innerHTML = `
    <div class="card">
      <h2>${s.title} — Results</h2>
      <p>Score: <b>${p}%</b> (${correct}/${total}) • Pass: 70%</p>
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin:8px 0">
        <button class="btn" onclick="retake()">Retake</button>
        <a class="btn" href="#" onclick="renderHome();return false;">Home</a>
      </div>
    </div>
    <div class="card">
      <h3>Review & Explanations</h3>
      ${
        review.length
        ? review.map(q=>{
            const corr = q.type==="mcq"
              ? q.options[q.answer[0]]
              : q.answer.map(i=>q.options[i]).join(", ");
            return `<div class="note" style="margin:8px 0">
                      <b>${q.q}</b><br/>
                      <div>Correct: ${corr}</div>
                      <div>Why: ${q.why || "See notes"}</div>
                    </div>`;
          }).join("")
        : "<div class='note'>Perfect! No mistakes to review.</div>"
      }
    </div>
  `;
};

window.retake = ()=>{
  const s = load("current"); if(!s) return;
  const title = s.title; // keep same title
  // rebuild order, reset answers
  const newS = newState(s.pool, title);
  save("current", newS);
  renderQuiz();
};

/* ---------- Initial render ---------- */
renderHome();
