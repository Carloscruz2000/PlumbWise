const app = document.getElementById("app");
const modules = [
  {id:'safety', title:'Health & Safety / PPE'},
  {id:'tools',  title:'Hand & Power Tools'},
  {id:'cold',   title:'Cold Water Systems'},
  {id:'hot',    title:'Hot Water & Unvented (G3)'},
  {id:'drain',  title:'Drainage & Sanitation'}
];
app.innerHTML = `
  <div class="card">
    <h1>PlumbWise — Revision & Mock Questions</h1>
    <p class="muted">Free preview shown. (Payments later.)</p>
  </div>
  <div class="card">
    <h2>Modules</h2>
    <ul>${modules.map(m=>`<li>${m.title}</li>`).join('')}</ul>
    <a class="btn" href="/">← Home</a>
  </div>
`;
