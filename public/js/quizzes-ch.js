/* PlumbWise – CENTRAL HEATING (hard) – 10 mocks × 30 Qs
   Sources: “Central Heating Revision (6129)” + “Unit 208 Outcome 2: Materials (CH)”
   Topics: one-/two-pipe, fully pumped, S/Y plans, vents & cold feeds, F&E cisterns,
           ABV, TRVs, stats/programmers, motorised valves, pumps & neutral point,
           PRVs/anti-gravity, emitters & clearances, testing/flushing/commissioning,
           draining/decommissioning/safe isolation, materials (copper grades, LCS,
           polybutylene, microbore), clip spacings, insulation. (c) PlumbWise
*/

(function(){
  // ---------- deterministic shuffle ----------
  function xmur3(str){ let h=1779033703^str.length; for(let i=0;i<str.length;i++){ h=Math.imul(h^str.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return function(){ h=Math.imul(h^(h>>>16),2246822507); h=Math.imul(h^(h>>>13),3266489909); return (h^=h>>>16)>>>0; }; }
  function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr, seed){
    const rnd = mulberry32(xmur3(String(seed))());
    const a = arr.slice();
    for (let i=a.length-1;i>0;i--){ const j = Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  // ---------- helpers ----------
  const mcq   = (q, options, correctIndex, why) => ({ q, type:"mcq",  options, answer:[correctIndex], why });
  const multi = (q, options, idxs, why)        => ({ q, type:"multi",options, answer:idxs.slice().sort((a,b)=>a-b), why });
  const tf    = (q, isTrue, why)               => mcq(q, ["False","True"], isTrue?1:0, why);

  // ---------- HARD question bank ----------
  const BANK = [
    // Systems & layouts
    mcq("Main disadvantage of a one-pipe system per notes:", ["Radiators overheat near boiler","Radiators cool progressively further from boiler","Pump cavitation","Needs sealed system"], 1, "One-pipe loop cools along the run. :contentReference[oaicite:2]{index=2}"),
    mcq("Two-pipe system hallmark:", ["Common pipe for flow/return","Separate flow and return; rads tee between them","No return pipe","Gravity only"], 1, "Two independent mains. :contentReference[oaicite:3]{index=3}"),
    mcq("Fully pumped systems typically use:", ["No thermostats","Zone valves with room & cylinder stats","Only TRVs","Only gravity primaries"], 1, "Stats + zone valves control H/W & CH. :contentReference[oaicite:4]{index=4}"),
    mcq("In fully pumped layouts, cylinder return should tee:", ["Anywhere on return","Boiler side of common return","Far end of return run","Into cold main"], 1, "Avoid reverse circulation. :contentReference[oaicite:5]{index=5}"),
    mcq("S-Plan uses:", ["One 3-port valve","Two 2-port motorised valves","No valves","Only TRVs"], 1, "Two × 2-port for H/W & CH. :contentReference[oaicite:6]{index=6}"),
    mcq("Y-Plan uses:", ["Three 2-port valves","One mid-position 3-port valve","No pump","Gravity only"], 1, "Single mid-position valve. :contentReference[oaicite:7]{index=7}"),
    mcq("Combi boiler system:", ["Open-vented with CWSC","Sealed; no cylinders or cisterns; filling loop","Always gravity","Twin coil cylinder"], 1, "Sealed CH, DHW instant. :contentReference[oaicite:8]{index=8}"),

    // Vents, cold feeds, F&E
    mcq("Good practice sizes for vent & cold feed on CH:", ["15 mm both","22 mm both (min CF 15 mm)","28 mm both only","10 mm both"], 1, "Often both 22 mm, CF ≥15 mm. :contentReference[oaicite:9]{index=9}"),
    mcq("Primary vent purpose:", ["Faster circulation","Let air escape & protect on overheat","Reduce scale","Increase pressure"], 1, "Venting + safety. :contentReference[oaicite:10]{index=10}"),
    mcq("F&E cistern water level should be set:", ["High as possible","Just above cold feed to absorb expansion","Below outlet to rads","Same as CWSC level"], 1, "To take thermal expansion. :contentReference[oaicite:11]{index=11}"),
    tf ("F&E level should be kept below the CWSC level when both share a platform.", true, "Avoid drawing heating water into domestic via failed coil. :contentReference[oaicite:12]{index=12}"),
    mcq("Treat CH water with corrosion inhibitor such as:", ["MB-1","Flux","G12","Salt"], 0, "Fernox MB-1 in slides. :contentReference[oaicite:13]{index=13}"),

    // Air separators & neutral point
    mcq("Fitting an air separator:", ["Adds head","Separates dissolved/entrained air to reduce noise & air locks","Is a PRV","Replaces open vent"], 1, "Shown in fully pumped diagrams. :contentReference[oaicite:14]{index=14}"),
    mcq("‘Neutral point’ on CH system is:", ["Pump location","Where cold feed enters system","Highest point","At boiler flow"], 1, "Defined in pump/vent diagram. :contentReference[oaicite:15]{index=15}"),
    mcq("Pump position relative to vent/CF (desirable):", ["Anywhere","Create positive pressure at boiler; avoid negative zones","Always on return","Only after all rads"], 1, "See diagram A/B/C zones. :contentReference[oaicite:16]{index=16}"),

    // Controls
    mcq("Programmer function:", ["Sets stat calibration","Schedules H/W and CH on/off","Sets pump speed","Opens PRV"], 1, "Time control. :contentReference[oaicite:17]{index=17}"),
    mcq("Room thermostat siting:", ["Next to radiator","1.5 m high, away from heat sources/draughts","On the floor","Inside cupboard"], 1, "Location guidance. :contentReference[oaicite:18]{index=18}"),
    mcq("Cylinder thermostat typical setpoint:", ["40–45°C","50–55°C","≈60°C","75–80°C"], 2, "≈60°C in notes. :contentReference[oaicite:19]{index=19}"),
    mcq("Frost stat with pipe stat combo:", ["Runs boiler continuously","Protects in unheated spaces; pipe stat limits run time/temperature","Replaces programmer","Is illegal"], 1, "Energy-saving pairing. :contentReference[oaicite:20]{index=20}"),

    // Valves & faults
    mcq("3-port mid-position ports labelled:", ["A=HW, B=CH, AB=common","A=CH, B=HW, AB=common","A=common, B=CH","A=HW, B=common"], 1, "A=CH, B=HW, AB=common flow. :contentReference[oaicite:21]{index=21}"),
    mcq("Motorised valve symptom: pump & boiler won’t turn off:", ["Stat failed only","Micro-switch in valve may be stuck","PRV jammed","Air separator blocked"], 1, "Common micro-switch fault. :contentReference[oaicite:22]{index=22}"),
    mcq("Anti-gravity (gravity NRV) used to:", ["Increase pump head","Stop unwanted gravity circulation heating rads in summer","Bleed air","Reduce noise only"], 1, "Prevents gravity creep heating. :contentReference[oaicite:23]{index=23}"),
    mcq("Automatic bypass valve (ABV) purpose:", ["Drain system faster","Maintain minimum flow when TRVs shut; reduce pump wear/noise","Increase pressure","Replace TRVs"], 1, "Install ~3 m from boiler between flow/return. :contentReference[oaicite:24]{index=24}"),

    // TRVs & radiator practice
    mcq("Fitting TRVs to every radiator can cause:", ["Lower bills only","Pump over-pressure & noise when all close","No effect","Higher DHW temps"], 1, "Hence ABV recommendation. :contentReference[oaicite:25]{index=25}"),
    mcq("TRV behind curtains/furniture:", ["Fine as is","Use remote sensor head","Remove curtains","Set to max"], 1, "Remote sensor TRV. :contentReference[oaicite:26]{index=26}"),
    mcq("Radiator clearances to maintain convection:", ["5 mm top & bottom","50 mm top under sill and 50 mm above floor","150 mm top only","Touching skirting"], 1, "50/50 rule shown. :contentReference[oaicite:27]{index=27}"),
    mcq("Removing a radiator for decorating with TRV fitted:", ["Leave TRV head on","Fit decorators cap (blank) to hold pin closed","Open bleed and walk away","Close lockshield only"], 1, "Avoid flooding if temp drops. :contentReference[oaicite:28]{index=28}"),
    mcq("Domestic pump isolation:", ["Pull 13 A plug","Isolate at fused spur; remove/retain fuse; safe isolation checks","Stat only","Programmer only"], 1, "Safe isolation steps. :contentReference[oaicite:29]{index=29}"),

    // Testing / flushing / commissioning / draining / decommissioning
    mcq("Hydraulic test rule given:", ["1.25 × system pressure 30 min","1.5 × system pressure for 1 h (after 30 min stabilisation)","2.0 × for 10 min","1.1 × indefinitely"], 1, "As stated in slides (example 3.5 → 5.25 bar). :contentReference[oaicite:30]{index=30}"),
    mcq("Before hot flushing/commissioning:", ["Add inhibitor first","Remove pump and bridge temporarily to protect from debris","Open PRV fully","Open vent cap"], 1, "Prevent debris lodging in pump. :contentReference[oaicite:31]{index=31}"),
    multi("Typical pre-handover sequence (per notes):", [
      "Visual check & stabilisation period",
      "Hydraulic test to 1.5 ×",
      "Hot flush; neutraliser/cleanser",
      "Drain & dose inhibitor; recommission"
    ], [0,1,2,3], "Sequence shown in commissioning slides. :contentReference[oaicite:32]{index=32}"),
    multi("Draining a CH system good practice:", [
      "Isolate F&E cistern service valve",
      "Isolate boiler & controls electrically",
      "Open upstairs air vents first",
      "Only drain upstairs if altering only first-floor circuits"
    ], [0,1,2], "Slides: upstairs vents first; last bullet says you *may* only drain upstairs if only upstairs work, not downstairs. :contentReference[oaicite:33]{index=33}"),
    mcq("Decommissioning: before draining in winter you should:", ["Proceed without notice","Confirm alternative heating & inform occupant/tenant","Remove radiators first","Leave ends uncapped"], 1, "Notify + ensure alternatives; cap open ends. :contentReference[oaicite:34]{index=34}"),

    // Materials (copper/LCS/plastic) & clip spacings
    mcq("Copper grades legacy→new mapping: Table X ≈", ["R290","R250","R220","R200"], 1, "Table X everyday above-ground bendable. :contentReference[oaicite:35]{index=35}"),
    mcq("Soft coil microbore grade used for 8–10 mm:", ["R290","R250","R220","R200"], 2, "R220 coil for microbore. :contentReference[oaicite:36]{index=36}"),
    mcq("LCS heavy/medium/light colour code:", ["Blue/Red/Brown","Red/Blue/Brown","Brown/Blue/Red","Red/Brown/Blue"], 1, "Heavy=Red, Medium=Blue, Light=Brown. :contentReference[oaicite:37]{index=37}"),
    mcq("Polybutylene barrier pipe advantage noted:", ["Higher friction","Microporous without barrier; barrier stops air ingress & sludge formation","Cannot be clipped","Only for cold"], 1, "Barrier layer prevents air ingress. :contentReference[oaicite:38]{index=38}"),
    mcq("Microbore (6–12 mm) often uses:", ["Series radiators","Manifolds off 22/28 mm flow/return","Only tees","Only compression on copper"], 1, "Manifold feeds several rads. :contentReference[oaicite:39]{index=39}"),
    mcq("Clip spacing (BS 6700) 15 mm copper horizontal:", ["0.6 m","1.2 m","1.8 m","2.4 m"], 1, "Table in both packs. :contentReference[oaicite:40]{index=40}"),
    mcq("Clip spacing 22 mm copper vertical:", ["1.2 m","1.8 m","2.4 m","3.0 m"], 2, "22 mm: 1.8 h / 2.4 v. :contentReference[oaicite:41]{index=41}"),
    mcq("At 60°C, small-bore plastic horizontal support distance (10–15 mm) from table:", ["0.8 m","0.6 m","0.5 m","0.3 m"], 3, "Table shows 10–15 mm horiz: 500 mm @60°C → 0.5 m. :contentReference[oaicite:42]{index=42}"),

    // Insulation & welfare
    mcq("Primary H/W and heating pipework should be insulated:", ["Only in lofts","Where outside heated envelope; H/W primary throughout; 1 m from cylinder on connected pipes","Never near cylinder","Only on returns"], 1, "Part L guidance in slides. :contentReference[oaicite:43]{index=43}"),
    mcq("Insulation mainly works by:", ["Conduction","Convection","Trapped still air reducing heat transfer","Radiation only"], 2, "Material list & principles. :contentReference[oaicite:44]{index=44}"),

    // Fault finding
    mcq("Lukewarm H/W and rads complaint most likely:", ["Scale only","Sluggish/defective pump performance","Stat stuck high","Blocked TRV cap"], 1, "Pump is prime suspect in notes. :contentReference[oaicite:45]{index=45}"),
  ];

  // Tough numericals / programmatic variants
  // 1) Hydraulic test pressure calcs
  [3.2, 3.5, 4.0, 2.6].forEach(wp=>{
    const tp = +(wp*1.5).toFixed(2);
    BANK.push(mcq(
      `Hydraulic test: system charged to ${wp.toFixed(2)} bar. Required test pressure = ?`,
      [`${(wp*1.25).toFixed(2)} bar`, `${tp.toFixed(2)} bar`, `${(wp*2).toFixed(2)} bar`, `${wp.toFixed(2)} bar`],
      1,
      "Rule stated: 1.5 × system pressure for 1 h, after 30 min stabilisation. :contentReference[oaicite:46]{index=46}"
    ));
  });
  // 2) Radiator clearance check
  [ ["top",50], ["bottom",50] ].forEach(([pos,val])=>{
    BANK.push(mcq(
      `Recommended radiator clearance at the ${pos} for convection (domestic panels):`,
      ["10 mm","25 mm","50 mm","100 mm"],
      2,
      "Maintain ~50 mm above & below for airflow. :contentReference[oaicite:47]{index=47}"
    ));
  });
  // 3) Clip spacings quick picks
  BANK.push(mcq("Clip spacing 28 mm copper (horizontal):", ["1.2 m","1.8 m","2.4 m","3.0 m"], 1, "Table: 1.8 m horiz. :contentReference[oaicite:48]{index=48}"));
  BANK.push(mcq("Clip spacing 28 mm copper (vertical):", ["1.8 m","2.4 m","3.0 m","1.2 m"], 1, "Table: 2.4 m vert. :contentReference[oaicite:49]{index=49}"));

  // ---------- build 10 mocks ----------
  function buildMocks(bank, num=10, size=30, seedBase=10091){
    const mocks=[];
    for (let i=1;i<=num;i++){
      const sample = seededShuffle(bank, seedBase + i*181).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }
  const QUIZZES = { ch: buildMocks(BANK, 10, 30) };

  // ---------- hook into app startQuiz ----------
  function install(){
    if (window.__plumbwiseChHooked) return;
    window.__plumbwiseChHooked = true;

    const originalStart = window.startQuiz;
    const renderQ = window.renderQ;

    window.startQuiz = function(id){
      if (QUIZZES[id]){
        let n = prompt("Central Heating — choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = QUIZZES[id][idx].map((q,i)=> ({...q, _id:`${id}_m${idx+1}_${i}`}) );
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${id.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      if (typeof originalStart === "function") return originalStart(id);
    };

    // quick check
    window.__CH_BANK_LEN = BANK.length;
  }

  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
