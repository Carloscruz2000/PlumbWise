const app = document.getElementById("app");

const modules = [
  {id:"safety", title:"Health & Safety / PPE"},
  {id:"tools", title:"Hand & Power Tools"},
  {id:"cold", title:"Cold Water Systems"},
  {id:"hot", title:"Hot Water & Unvented (G3 basics)"},
  {id:"drain", title:"Drainage & Sanitation"}
];

app.innerHTML = `
  <div class="card">
    <h2>Modules</h2>
    <ul>${modules.map(m=>`<li>${m.title}</li>`).join("")}</ul>
    <p class="muted">We’ll add revision notes, quizzes, and subscriptions next.</p>
  </div>
`;
