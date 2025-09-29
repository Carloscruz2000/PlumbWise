const app = document.getElementById("app");

const MODULES = [
  { id: "safety", title: "Health & Safety / PPE", pass: 70 },
  { id: "tools", title: "Hand & Power Tools", pass: 70 },
  { id: "cold", title: "Cold Water Systems", pass: 70 },
  { id: "hot", title: "Hot Water & Unvented (G3 basics)", pass: 70 },
  { id: "drain", title: "Drainage & Sanitation", pass: 70 }
];

const NOTES = {
  safety: ["Dynamic risk assessment; stop if new hazards appear.","PPE: boots, eye/hand protection; hearing protection for noisy tools.","Lock-off / tag-out; verify dead.","COSHH: SDS, correct PPE, ventilation."],
  tools: ["Use the right tool.","Torque wrench calibration; PAT test.","Soldering: clean, light flux, heat fitting not solder.","Press-fit: correct jaw, full insertion depth."],
  cold: ["Stopcocks at entry.","Double check valves for backflow.","Support pipework; expansion allowance.","Avoid dead legs; maintain water quality (WRAS)."],
  hot: ["Unvented cylinders: G3 installer.","T&P relief, PRV, expansion vessel, visible tundish.","Store hot ~60°C+; TMVs at outlets."],
  drain:["Trap water seal 50mm typical.","Ventilation/AAVs limits.","Gradients 18–90 mm/m (100mm pipe).","Air/water tests; rodding access."]
};

const QUESTIONS = {
  safety: [{ q:"Before hot works, first action?", type:"mcq",
    options:["Put on gloves","Risk assessment/permit","Warn others","Open window"],
    answer:[1], why:"Control hazards before starting." }],
  tools: [{ q:"Sound solder joint (choose TWO)", type:"multi",
    options:["Heavy flux","Clean & deburr","Heat solder directly","Heat fitting and feed solder"],
    answer:[1,3], why:"Cleanliness + heat the fitting, not the solder." }],
  cold: [{ q:"Backflow protection for an appliance:", type:"mcq",
    options:["Double check valve","Stop end","Gate valve","Drain cock"],
    answer:[0], why:"DCV prevents contamination." }],
  hot: [{ q:"Unvented cylinders installed by:", type:"mcq",
    options:["DIYer","G3-qualified","Electrician","Building control"],
    answer:[1], why:"Requires G3 competence." }],
  drain:[{ q:"Typical trap water seal:", type:"mcq",
    options:["10 mm","25 mm","50 mm","100 mm"],
    answer:[2], why:"50 mm is common." }]
};

const FREE = new Set(["safety","tools"]); // others are shown but “Pro” (locked)

function percent(n,d){ return d?Math.round((n/d)*100):0; }
function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

function renderHome(){
  const cards = MODULES.map(m=>{
    const best = JSON.parse(localStorage.getItem("pw_score_"+m.id) || "null");
    const locked = !FREE.has(m.id);
    return `
      <div class="card">
        <div class="row">
          <div>
            <h2>${m.title} ${locked?'<span class="note">Pro (locked)</span>':''}</h2>
            <div class="note">${(NOTES[m.id]||[])[0]||""}</div>
          </div>
          <button class="btn ${locked?'':'primary'}" ${locked?'disabled':''}
            onclick="startModule('${m.id}')">${locked?'Locked':'Revise & Mock'}</button>
        </div>
        ${best ? `<div class="progress"><div style="width:${percent(best.correct,best.total)}%"></div></div>
                  <div class="muted">Best: ${percent(best.correct,best.total)}% (${best.correct}/${best.total})</div>` 
               : `<div class="muted">No attempts yet.</div>`}
      </div>`;
  }).join("");

  app.innerHTML = `
    <section class="card">
      <h1>PlumbWise — Revision & Mock Questions</h1>
      <p class="muted">Free preview unlocked: Health & Safety, Tools.</p>
    </section>
    <section class="grid">${cards}</section>
    <div class="card">
      <button class="btn" disabled title="Pro feature">Full Mock Exam (Pro)</button>
    </div>
  `;
}

window.startModule = (id)=>{
  if(!FREE.has(id)){ alert("Pro feature — we’ll enable subscriptions later."); return; }
  const mod = MODULES.find(m=>m.id===id);
  const notes = NOTES[id]||[];
  const qs = (QUESTIONS[id]||[]).map((q,i)=>({...q,_id:id+"_"+i}));
  if(!qs.length){ alert("No questions yet."); return; }

  app.innerHTML = `
    <div class="card">
      <h2>${mod.title} — Revision</h2>
      ${notes.map(n=>`<div class="note">${n}</div>`).join("")}
      <div style="margin-top:12px">
        <button class="btn primary" onclick="startQuiz('${id}')">Start Mock</button>
        <a class="btn" href="#" onclick="renderHome();return false;">← Back</a>
      </div>
    </div>
  `;
};

window.startQuiz = (id)=>{
  const pool = (QUESTIONS[id]||[]).map((q,i)=>({...q,_id:id+"_"+i}));
  const state = { idx:0, order:shuffle([...pool.keys()]), pool, answers:{}, finished:false };
  localStorage.setItem("pw_current", JSON.stringify(state));
  renderQuiz(id);
};

function getState(){ return JSON.parse(localStorage.getItem("pw_current")||"null"); }
function setState(s){ localStorage.setItem("pw_current", JSON.stringify(s)); }

function renderQuiz(id){
  const s = getState(); if(!s) return;
  const i = s.order[s.idx]; const q = s.pool[i]; const total = s.pool.length, cur = s.idx+1;
  const sel = s.answers[q._id]||[];

  const opts = (q.type==="multi")
    ? q.options.map((o,idx)=>`<label class="opt"><input type="checkbox" ${sel.includes(idx)?"checked":""}
         onchange="toggleMulti('${q._id}',${idx})"/> <span>${o}</span></label>`).join("")
    : q.options.map((o,idx)=>`<label class="opt"><input type="radio" name="opt" ${sel.includes(idx)?"checked":""}
         onchange="selectOne('${q._id}',${idx})"/> <span>${o}</span></label>`).join("");

  app.innerHTML = `
    <div class="card">
      <h2>${MODULES.find(m=>m.id===id).title} — Mock (${cur}/${total})</h2>
      <div class="q"><b>${q.q}</b><div class="options">${opts}</div></div>
      <div class="row">
        <button class="btn" onclick="prevQ()">Back</button>
        <button class="btn" onclick="clearA('${q._id}')">Clear</button>
        <button class="btn primary" onclick="nextQ()">Next</button>
      </div>
      <div class="muted" style="margin-top:8px">Select ${q.type==="multi"?"all that apply":"one"}.</div>
    </div>
    <div class="card"><button class="btn primary" onclick="submitQuiz('${id}')">Submit</button></div>
  `;
}

window.selectOne = (id, idx)=>{ const s=getState(); s.answers[id]=[idx]; setState(s); };
window.toggleMulti = (id, idx)=>{ const s=getState(); const set=new Set(s.answers[id]||[]); set.has(idx)?set.delete(idx):set.add(idx); s.answers[id]=[...set].sort((a,b)=>a-b); setState(s); };
window.clearA = (id)=>{ const s=getState(); delete s.answers[id]; setState(s); renderQuiz(id.split("_")[0]); };
window.nextQ = ()=>{ const s=getState(); if(s.idx<s.pool.length-1) s.idx++; setState(s); renderQuiz(s.pool[0]._id.split("_")[0]); };
window.prevQ = ()=>{ const s=getState(); if(s.idx>0) s.idx--; setState(s); renderQuiz(s.pool[0]._id.split("_")[0]); };

window.submitQuiz = (id)=>{
  const s = getState(); let correct=0, total=s.pool.length, review=[];
  s.pool.forEach(q=>{
    const a = s.answers[q._id]||[];
    const ans = (q.answer||[]).slice().sort((x,y)=>x-y);
    const ok = a.length===ans.length && a.every((v,i)=>v===ans[i]);
    if(ok) correct++; else review.push(q);
  });
  const pct = Math.round((correct/total)*100);
  const prev = JSON.parse(localStorage.getItem("pw_score_"+id)||"null");
  const best = (!prev || pct>Math.round((prev.correct/prev.total)*100)) ? {correct,total} : prev;
  localStorage.setItem("pw_score_"+id, JSON.stringify(best));

  app.innerHTML = `
    <div class="card">
      <h2>${MODULES.find(m=>m.id===id).title} — Results</h2>
      <p>Score: <b>${pct}%</b> (${correct}/${total}) • Pass mark: 70%</p>
      <div style="margin:8px 0">
        <button class="btn" onclick="startQuiz('${id}')">Retake</button>
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
                      Correct: ${corr}<br/>
                      Why: ${q.why||"See notes"}
                    </div>`;
          }).join("")
        : "<div class='note'>Perfect! No mistakes to review.</div>"
      }
    </div>
  `;
};

renderHome();
