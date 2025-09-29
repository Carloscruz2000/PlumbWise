const app = document.getElementById("app");

const MODULES = [
  { id: "safety", title: "Health & Safety / PPE" },
  { id: "tools",  title: "Hand & Power Tools" },
  { id: "cold",   title: "Cold Water Systems" },
  { id: "hot",    title: "Hot Water & Unvented (G3 basics)" },
  { id: "drain",  title: "Drainage & Sanitation" }
];

const NOTES = {
  safety: [
    "Dynamic risk assessment; stop if new hazards appear.",
    "PPE: boots, eye/hand protection; hearing protection for noisy tools.",
    "Lock-off / tag-out; verify dead.",
    "COSHH: SDS, correct PPE, ventilation."
  ],
  tools: [
    "Use the right tool.",
    "Torque wrench calibration; PAT test.",
    "Soldering: clean, light flux, heat the fitting (not the solder).",
    "Press-fit: correct jaw profile, full insertion depth."
  ],
  cold: [
    "Stopcocks at entry.",
    "Double check valve for backflow.",
    "Support pipework; allow expansion.",
    "Avoid dead legs; maintain water quality (WRAS)."
  ],
  hot: [
    "Unvented cylinders: G3 installer.",
    "T&P relief, PRV, expansion vessel, visible tundish.",
    "Store hot ~60°C+; TMVs at outlets."
  ],
  drain: [
    "Typical trap water seal: 50 mm.",
    "Ventilation / AAV limits.",
    "Gradients 18–90 mm/m (100 mm pipe).",
    "Air/water tests; rodding access."
  ]
};

function renderHome(){
  const cards = MODULES.map(m => {
    const firstNote = (NOTES[m.id] || [])[0] || "";
    return `
      <div class="card">
        <h2>${m.title}</h2>
        <div class="note">${firstNote}</div>
        <div style="margin-top:10px">
          <button class="btn primary" onclick="openModule('${m.id}')">Open</button>
        </div>
      </div>
    `;
  }).join("");

  app.innerHTML = `
    <section class="card">
      <h2>Modules</h2>
      <p class="muted">Browse quick notes for each module. We’ll add mock questions next.</p>
    </section>
    <section class="grid">${cards}</section>
  `;
}

window.openModule = (id)=>{
  const mod = MODULES.find(m => m.id === id);
  const notes = NOTES[id] || [];
  app.innerHTML = `
    <div class="card">
      <h2>${mod.title} — Notes</h2>
      ${notes.map(n => `<div class="note">${n}</div>`).join("")}
      <div style="margin-top:12px">
        <a class="btn" href="#" onclick="renderHome();return false;">← Back</a>
      </div>
    </div>
  `;
};

renderHome();
