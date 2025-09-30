/* PlumbWise — modules + revision + resources + simple mocks */
const app = document.getElementById("app");

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
  { id: "wr",   title: "Water Regulations", pass: 70 }
];

const NOTES = {
  hs:["PPE, COSHH, permits, safe isolation."],
  elec:["RCDs, bonding/earthing, prove-test-prove."],
  sci:["Pressure≈ρgh; 10m head≈1 bar; expansion control."],
  proc:["Measure, deburr/clean, heat fitting (not solder), press-fit jaw/profile."],
  cold:["Isolation, DCV/backflow, avoid dead legs."],
  hot:["Store ~60°C+, TMVs, unvented safety set & tundish."],
  ch:["Sealed systems: expansion vessel, PRV, inhibitor, balance."],
  san:["50 mm water seal, venting/anti-siphon, correct falls."],
  drn:["100 mm pipe ≈ 18–90 mm/m fall, rodding points at changes."],
  comm:["Confirm scope/changes in writing, keep photos/test records."],
  wr:["WRAS fittings, backflow categories, notify where required."]
};

const RESOURCES = {
  hs: [
    { label: "6035 Health and Safety PowerPoint 1", file: "/resources/hs/6035 Health and safety powerpoint 1.pdf" },
    { label: "6035 Health and Safety PowerPoint 2", file: "/resources/hs/6035 Health and safety powerpoint 2.pdf" },
    { label: "6035 Health and Safety PowerPoint 3", file: "/resources/hs/6035 Health and safety powerpoint 3.pdf" },
    { label: "6035 Health and Safety PowerPoint 4", file: "/resources/hs/6035 Health and safety powerpoint 4.pdf" },
    { label: "6035 Health and Safety PowerPoint 5", file: "/resources/hs/6035 Health and safety powerpoint 5.pdf" },
    { label: "6035 Health and Safety PowerPoint 6", file: "/resources/hs/6035 Health and safety powerpoint 6.pdf" },
    { label: "Health & Safety Revision Study Pack (2014)", file: "/resources/hs/Health and Safety Revision Study Pack 2014 reduced.pdf" }
  ],
  elec: [
    { label: "6035 Electrical 1", file: "/resources/elec/6035 electrical 1.pdf" },
    { label: "6035 Electrical 2", file: "/resources/elec/6035 electrical 2.pdf" },
    { label: "6035 Electrical 3", file: "/resources/elec/6035 electrical 3.pdf" },
    { label: "6035 Electrical 5", file: "/resources/elec/6035 electrical 5.pdf" },
    { label: "6035 Electrical 6", file: "/resources/elec/6035 electrical 6.pdf" }
  ],
  sci: [
    { label: "Science 1", file: "/resources/sci/6035_l2u203_Science 1.pdf" },
    { label: "Science 2", file: "/resources/sci/6035_l2u203_Science 2.pdf" },
    { label: "Science 3", file: "/resources/sci/6035_l2u203_Science 3.pdf" },
    { label: "Science 4", file: "/resources/sci/6035_l2u203_Science 4.pdf" },
    { label: "Science 5", file: "/resources/sci/6035_l2u203_Science 5.pdf" },
    { label: "Science 6", file: "/resources/sci/6035_l2u203_Science 6.pdf" },
    { label: "Key Plumbing Principles L2 Revision", file: "/resources/sci/Key Plumbing Principles level 2 Revision.pdf" }
  ],
  proc: [
    { label: "Unit 204 Outcome 1", file: "/resources/proc/6035_l2u204_ppt_outcome1.pdf" },
    { label: "Unit 204 Outcome 3", file: "/resources/proc/6035_l2u204_ppt_outcome3.pdf" },
    { label: "Unit 204 Outcome 4", file: "/resources/proc/6035_l2u204_ppt_outcome4.pdf" },
    { label: "Unit 204 Outcome 5", file: "/resources/proc/6035_l2u204_ppt_outcome5.pdf" },
    { label: "Unit 204 Outcome 6", file: "/resources/proc/6035_l2u204_ppt_outcome6.pdf" },
    { label: "Unit 204 Outcome 7", file: "/resources/proc/6035_l2u204_ppt_outcome7.pdf" }
  ],
  cold: [
    { label: "Unit 205 Outcome 1", file: "/resources/cold/6035_l2u205_ppt_outcome1.pdf" },
    { label: "Unit 205 Outcome 2", file: "/resources/cold/6035_l2u205_ppt_outcome2.pdf" },
    { label: "Unit 205 Outcome 3", file: "/resources/cold/6035_l2u205_ppt_outcome3.pdf" },
    { label: "Unit 205 Outcome 4", file: "/resources/cold/6035_l2u205_ppt_outcome4.pdf" },
    { label: "Unit 205 Outcome 5", file: "/resources/cold/6035_l2u205_ppt_outcome5.pdf" },
    { label: "Unit 205 Outcome 6", file: "/resources/cold/6035_l2u205_ppt_outcome6.pdf" }
  ],
  hot: [
    { label: "Unit 206 Outcome 1 (Part 1)", file: "/resources/hot/6035_l2u206_ppt_outcome1_part_1.pdf" },
    { label: "Unit 206 Outcome 1 (Part 2)", file: "/resources/hot/6035_l2u206_ppt_outcome1_part_2.pdf" },
    { label: "Unit 206 Outcome 2", file: "/resources/hot/6035_l2u206_ppt_outcome2.pdf" },
    { label: "Unit 206 Outcome 3 (Part 1)", file: "/resources/hot/6035_l2u206_ppt_outcome3_part_1.pdf" },
    { label: "Unit 206 Outcome 3 (Part 2)", file: "/resources/hot/6035_l2u206_ppt_outcome3_part_2.pdf" },
    { label: "Unit 206 Outcome 4", file: "/resources/hot/6035_l2u206_ppt_outcome4.pdf" },
    { label: "Unit 206 Outcome 5", file: "/resources/hot/6035_l2u206_ppt_outcome5.pdf" },
    { label: "Unit 206 Outcome 6", file: "/resources/hot/6035_l2u206_ppt_outcome6.pdf" }
  ],
  ch: [
    { label: "Unit 208 Outcome 1 (Part 1)", file: "/resources/ch/6035_l2u208_ppt_outcome1_part_1.pdf" },
    { label: "Unit 208 Outcome 1 (Part 2)", file: "/resources/ch/6035_l2u208_ppt_outcome1_part_2.pdf" },
    { label: "Unit 208 Outcome 1 (Part 3)", file: "/resources/ch/6035_l2u208_ppt_outcome1_part_3.pdf" },
    { label: "Unit 208 Outcome 2", file: "/resources/ch/6035_l2u208_ppt_outcome2.pdf" },
    { label: "Unit 208 Outcome 3 (Part 1)", file: "/resources/ch/6035_l2u208_ppt_outcome3_part_1.pdf" },
    { label: "Unit 208 Outcome 3 (Part 2)", file: "/resources/ch/6035_l2u208_ppt_outcome3_part_2.pdf" },
    { label: "Unit 208 Outcome 4", file: "/resources/ch/6035_l2u208_ppt_outcome4.pdf" }
  ],
  san: [
    { label: "Unit 209 Outcome 1 (Part 1)", file: "/resources/san/6035_l2u209_ppt_outcome1_part_1.pdf" },
    { label: "Unit 209 Outcome 1 (Part 2)", file: "/resources/san/6035_l2u209_ppt_outcome1_part_2.pdf" },
    { label: "Unit 209 Outcome 1 (Part 3)", file: "/resources/san/6035_l2u209_ppt_outcome1_part_3.pdf" },
    { label: "Unit 209 Outcome 2 (Part 1)", file: "/resources/san/6035_l2u209_ppt_outcome2_part_1.pdf" },
    { label: "Unit 209 Outcome 2 (Part 2)", file: "/resources/san/6035_l2u209_ppt_outcome2_part_2.pdf" },
    { label: "Unit 209 Outcome 3", file: "/resources/san/6035_l2u209_ppt_outcome3.pdf" },
    { label: "Unit 209 Outcome 4 (Part 1)", file: "/resources/san/6035_l2u209_ppt_outcome4_part_1.pdf" },
    { label: "Unit 209 Outcome 4 (Part 2)", file: "/resources/san/6035_l2u209_ppt_outcome4_part_2.pdf" },
    { label: "Unit 209 Outcome 4 (Part 3)", file: "/resources/san/6035_l2u209_ppt_outcome4_part_3.pdf" },
    { label: "Unit 209 Outcome 4 (Part 4)", file: "/resources/san/6035_l2u209_ppt_outcome4_part_4.pdf" }
  ],
  drn: [],
  comm: [
    { label: "6035 Communication 1", file: "/resources/comm/6035 communication 1.pdf" },
    { label: "6035 Communication 2", file: "/resources/comm/6035 communication 2.pdf" },
    { label: "6035 Communication 3", file: "/resources/comm/6035 communication 3.pdf" },
    { label: "Effective Working Relationships L2 Revision", file: "/resources/comm/Effective Working Relationships Level 2 Revision.pdf" }
  ],
  wr: []
};

const QB = {
  hs:[{ q:"First step before hot works?", type:"mcq", options:["Warn others","Open window","Risk assessment/permit","Put on gloves"], answer:[2] }],
  elec:[{ q:"Safe isolation requires:", type:"multi", options:["Prove tester","Test supply","Lock-off","Skip proving"], answer:[0,1,2] }],
  sci:[{ q:"1 m head ≈ ?", type:"mcq", options:["0.01 bar","0.1 bar","1 bar","10 bar"], answer:[1] }]
};

const shuffle = a => { for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

function renderHome(){
  const cards = MODULES.map(m=>`
    <div class="card">
      <h2>${m.title}</h2>
      <div class="note">${(NOTES[m.id]||[])[0]||""}</div>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn" onclick="openRevision('${m.id}')">Revision</button>
        <button class="btn primary" onclick="startQuiz('${m.id}')">Mock Exam</button>
      </div>
    </div>`).join("");
  app.innerHTML = `<section class="grid">${cards}</section>`;
}

window.openRevision = (id)=>{
  const mod = MODULES.find(m=>m.id===id);
  const notes = NOTES[id] || [];
  const files = (RESOURCES[id] || []);
  app.innerHTML = `
    <div class="card">
      <h2>${mod.title} — Revision</h2>
      ${notes.length ? notes.map(n=>`<div class="note">${n}</div>`).join("") : `<div class="note">No notes yet.</div>`}
      ${files.length ? `
        <div class="card" style="margin-top:12px">
          <h3>Resources</h3>
          <ul style="line-height:1.9; padding-left:18px">
            ${files.map(r=>`
              <li>
                <a class="btn" href="${r.file}" target="_blank" rel="noopener">View</a>
                <a class="btn" href="${r.file}" download>Download</a>
                <span class="muted" style="margin-left:8px">${r.label}</span>
              </li>`).join("")}
          </ul>
          <p class="muted">PDFs open in the browser. PPTX usually download. If a link 404s, check the exact filename and folder.</p>
        </div>` : ``}
      <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn primary" onclick="startQuiz('${id}')">Start Mock</button>
        <a class="btn" href="#" onclick="renderHome();return false;">← Back</a>
      </div>
    </div>`;
};

function newState(pool,title){ return { idx:0, order:shuffle([...pool.keys()]), pool, answers:{}, title }; }
window.startQuiz = (id)=>{
  const qs = (QB[id]||[]).map((q,i)=>({...q,_id:`${id}_${i}`}));
  if(!qs.length){ alert("No questions in this module yet."); return; }
  window._state = newState(qs, `${MODULES.find(m=>m.id===id).title} — Mock`);
  renderQuiz();
};
function renderQuiz(){
  const s=window._state; if(!s) return;
  const i=s.order[s.idx], q=s.pool[i], total=s.pool.length, cur=s.idx+1, sel=s.answers[q._id]||[];
  const opts = (q.type==="multi")
    ? q.options.map((o,idx)=>`<label class="opt"><input type="checkbox" ${sel.includes(idx)?"checked":""} onchange="toggleMulti('${q._id}',${idx})"/> <span>${o}</span></label>`).join("")
    : q.options.map((o,idx)=>`<label class="opt"><input type="radio" name="opt" ${sel.includes(idx)?"checked":""} onchange="selectOne('${q._id}',${idx})"/> <span>${o}</span></label>`).join("");
  app.innerHTML = `
    <div class="card">
      <h2>${s.title} (${cur}/${total})</h2>
      <div class="q"><b>${q.q}</b><div class="options">${opts}</div></div>
      <div style="display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn" onclick="prevQ()">Back</button>
        <button class="btn" onclick="nextQ()">Next</button>
        <button class="btn primary" onclick="submitQuiz()">Submit</button>
      </div>
    </div>`;
}
window.selectOne=(id,idx)=>{const s=window._state; s.answers[id]=[idx]; renderQuiz();};
window.toggleMulti=(id,idx)=>{const s=window._state; const set=new Set(s.answers[id]||[]); set.has(idx)?set.delete(idx):set.add(idx); s.answers[id]=[...set].sort((a,b)=>a-b);};
window.nextQ=()=>{const s=window._state; if(s.idx<s.pool.length-1)s.idx++; renderQuiz();};
window.prevQ=()=>{const s=window._state; if(s.idx>0)s.idx--; renderQuiz();};
window.submitQuiz=()=>{const s=window._state; let correct=0,total=s.pool.length,review=[]; s.pool.forEach(q=>{const a=s.answers[q._id]||[];const ans=(q.answer||[]).slice().sort((x,y)=>x-y);const ok=a.length===ans.length&&a.every((v,i)=>v===ans[i]); if(ok)correct++; else review.push(q);}); const p=Math.round((correct/total)*100); app.innerHTML = `<div class="card"><h2>${s.title} — Results</h2><p>Score: <b>${p}%</b> (${correct}/${total}) • Pass: 70%</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0"><button class="btn" onclick="renderHome()">Home</button></div></div>`;};

renderHome();
