/* PlumbWise – HOT WATER SYSTEMS (hard) – 10 mocks × 30 Qs
   Sources:
     - “Hot Water Revision” (L2 Technical Cert) – cylinders, systems, testing, maintenance. :contentReference[oaicite:2]{index=2}
     - “Outcome 4 – Design features of showers (Unit 206)” – pumps, heads, equal pressure, valves. :contentReference[oaicite:3]{index=3}
   Hooks window.startQuiz("hot") → offers Mock 1–10 (30 questions each), self-marking via your app.
*/

(function(){
  // ---- deterministic shuffle ----
  function xmur3(str){ let h=1779033703^str.length; for(let i=0;i<str.length;i++){ h=Math.imul(h^str.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return function(){ h=Math.imul(h^(h>>>16),2246822507); h=Math.imul(h^(h>>>13),3266489909); return (h^=h>>>16)>>>0; }; }
  function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr, seed){
    const rnd = mulberry32(xmur3(String(seed))());
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  // ---- helpers ----
  const mcq   = (q, options, correctIndex, why) => ({ q, type:"mcq",  options, answer:[correctIndex], why });
  const multi = (q, options, idxs, why)        => ({ q, type:"multi",options, answer:idxs.slice().sort((a,b)=>a-b), why });
  const tf    = (q, isTrue, why)               => mcq(q, ["False","True"], isTrue?1:0, why);

  // ---- HARD question bank (derived from your two files) ----
  const BANK = [
    // Regs / standards / guidance
    mcq("Statutory regs for domestic hot & cold installations are:", ["Gas Safety Regs 1998","Water Supply (Water Fittings) Regs 1999","Part P of Building Regs","EAWR 1989"], 1, "Slides state Water Fittings Regs 1999 govern H&C systems. :contentReference[oaicite:4]{index=4}"),
    mcq("General design guidance for H&C systems (legacy/teaching) is found in:", ["BS 7671","BS 6700 / BS EN 806","BS 1192","CDM 2015"], 1, "BS 6700/EN 806 noted repeatedly. :contentReference[oaicite:5]{index=5}"),
    tf ("Manufacturer commissioning instructions override generic rules where they differ.", true, "Your pack: always check MI for on-site performance/flow. :contentReference[oaicite:6]{index=6}"),

    // Systems: direct / indirect / primatic
    mcq("A direct cylinder system means:", ["Boiler/heating water and domestic hot are the same circuit","Two cisterns with a coil","Sealed unvented only","Instantaneous only"], 0, "Definition of direct system. :contentReference[oaicite:7]{index=7}"),
    mcq("Typical primary size for older gravity primaries (solid fuel):", ["15 mm flow/return","22 mm flow/return","28 mm flow/return","35 mm flow/return"], 2, "28 mm to aid convection; 22 mm minimum on small back boilers. :contentReference[oaicite:8]{index=8}"),
    mcq("An indirect double-feed arrangement uses:", ["One cistern only","Two cisterns and a coil in cylinder","Plate heat exchanger only","No vents"], 1, "Separated primary by coil + separate cisterns. :contentReference[oaicite:9]{index=9}"),
    mcq("Primatic (single-feed indirect) relies on:", ["Check valves","Air-lock in cylinder heat exchanger","RPZ valve","Constant pump overrun"], 1, "Air bubble separates primary & secondary. :contentReference[oaicite:10]{index=10}"),
    mcq("Brown water at hot taps on a primatic suggests:", ["Air bubble lost—drain & recharge","Scale only—ignore","Legionella","Blocked cold main"], 0, "Slides: drain/recharge to reinstate bubble. :contentReference[oaicite:11]{index=11}"),

    // Cylinders & connections
    multi("Good cylinder practice includes:", [
      "Drain-off at lowest point",
      "Isolate cold feed with service valve",
      "Insulate all connected pipes ≥1 m per Part L",
      "Never fit thermostat"
    ], [0,1,2], "Your list covers drain-offs, isolation, Part L insulation. :contentReference[oaicite:12]{index=12}"),
    mcq("Thermostat setting recommended in pack:", ["40–45°C","50–55°C","60–65°C","70–75°C"], 2, "60–65°C to balance scalding vs legionella. :contentReference[oaicite:13]{index=13}"),
    mcq("Some cylinders use a sacrificial anode made of:", ["Zinc","Magnesium","Aluminium","Lead"], 1, "Magnesium anode mentioned. :contentReference[oaicite:14]{index=14}"),
    mcq("To avoid one-pipe circulation around a cylinder connection you should:", ["Drop both flows","Maintain correct rise/falls & venting","Fit NRVs on all branches","Reduce pipe sizes"], 1, "Pack warns about partial air-locks and layout. :contentReference[oaicite:15]{index=15}"),

    // Cylinder grades (legacy vented)
    mcq("Legacy vented cylinder Grade 1 test pressure (approx) noted:", ["1.45 bar","2.20 bar","3.65 bar","5.00 bar"], 2, "Grade table in slides. :contentReference[oaicite:16]{index=16}"),

    // Secondary hot water circulation
    mcq("Secondaries are fitted when dead-legs exceed BS 6700 distances to:", ["Cool water faster","Maintain rapid delivery & reduce waste","Increase stratification","Avoid vents"], 1, "Purpose and energy note. :contentReference[oaicite:17]{index=17}"),
    tf ("Secondary circuits often use bronze pumps and timers.", true, "Shown and described in pack. :contentReference[oaicite:18]{index=18}"),

    // Showers – design features (Unit 206)
    mcq("Cistern-fed gravity shower requires minimum head of:", ["300 mm","600 mm","1.0 m","1.5 m"], 2, "Slides: ≥1 m from CWSC base to rose. :contentReference[oaicite:19]{index=19}"),
    mcq("Feeds to gravity shower should run:", ["Both in 15 mm all the way","22 mm to near mixer then 15 mm tails","28 mm all the way","Microbore"], 1, "22 mm until close to valve. :contentReference[oaicite:20]{index=20}"),
    mcq("Best mixer type for gravity systems:", ["Manual only","Thermostatic mixer valve","Pressure balancing only","Electric shower"], 1, "TMV compensates fluctuations. :contentReference[oaicite:21]{index=21}"),
    mcq("Twin-impeller pump connections on cylinder should use:", ["Any tapping","Surrey/Essex flange or angled HW take-off","Tundish branch","Cold feed only"], 1, "Avoid aeration; use dedicated flange/take-off. :contentReference[oaicite:22]{index=22}"),
    mcq("Positive vs negative head pumps chiefly differ by:", ["Colour","Impellor type and priming/activation method","Voltage","Pipe thread"], 1, "Regen vs centrifugal; activation details given. :contentReference[oaicite:23]{index=23}"),
    multi("Golden rules for pumped showers include:", [
      "Adequate CW storage & height",
      "Pump close to cylinder (push, don’t pull)",
      "Dedicated hot & cold feeds of correct size",
      "Temperature limits around 65°C"
    ], [0,1,2,3], "List reproduced from slides. :contentReference[oaicite:24]{index=24}"),

    // Mains-fed showers & unvented equal pressure
    mcq("On unvented systems, the cold to a mixer must be taken:", ["Before PRV","After PRV but before single check valve","After single check valve","Anywhere"], 1, "Equal pressure: take balanced cold after PRV. :contentReference[oaicite:25]{index=25}"),
    mcq("Instantaneous electric showers are isolated by:", ["DP ceiling pull-cord switch","1-pole wall switch","Plug top","RCBO only"], 0, "DP isolator highlighted. :contentReference[oaicite:26]{index=26}"),
    tf ("A mains-fed electric shower requires a double check valve to prevent backflow.", true, "Stated in pack. :contentReference[oaicite:27]{index=27}"),

    // Mixers & check valves
    mcq("Single-lever mixer where hot/cold mix inside the body requires:", ["No device","Single check valves on feeds","RPZ","Air gap"], 1, "To prevent cross-contamination. :contentReference[oaicite:28]{index=28}"),

    // Cistern practice / vents
    mcq("Finished water level in CWSC relative to warning pipe:", ["Above by 10 mm","25 mm below","Level with it","50 mm below"], 1, "Same as cold-water guidance repeated in hot pack. :contentReference[oaicite:29]{index=29}"),
    mcq("Primary vent should terminate over:", ["CWSC","F&E cistern","Bath","Tundish"], 1, "Primary vent → F&E; secondary vent → CWSC. :contentReference[oaicite:30]{index=30}"),
    tf ("Dip-tube FOVs (BS 1212 Pt1) are banned due to backflow risk.", true, "Highlighted in cistern section. :contentReference[oaicite:31]{index=31}"),

    // Materials & corrosion
    mcq("Galvanised LCS can be used on domestic H&C if:", ["Mixed freely with copper","Kept separate from copper to avoid electrolytic corrosion","Painted red","Used only on hot"], 1, "Pack warns Cu + galvanised causes electrolytic corrosion. :contentReference[oaicite:32]{index=32}"),

    // Immersion heaters & isolation
    mcq("Typical immersion heater lengths (top entry) are:", ["6\" and 12\"","11\" and 18\"","18\" and 27\"","32\" and 40\""], 2, "18\"/27\" given. :contentReference[oaicite:33]{index=33}"),
    multi("Modern rod thermostats include:", [
      "User adjustable control stat",
      "Overheat cut-out",
      "Network module",
      "Built-in PRV"
    ], [0,1], "Control + overheat in modern immersions. :contentReference[oaicite:34]{index=34}"),
    tf ("Safe isolation and temporary bonding may be required when cutting hot distribution pipework.", true, "Electrical isolation chapter. :contentReference[oaicite:35]{index=35}"),

    // Testing (rigid & plastic)
    mcq("Approx. relation used in notes: 1 bar ≈", ["1 m head","3 m head","10 m head","100 m head"], 2, "Rule of thumb in pack. :contentReference[oaicite:36]{index=36}"),
    mcq("Rigid HWS test pressure is:", ["Working pressure","1.25 × WP for 30 min","1.5 × WP for 1 h","2 × WP for 10 min"], 2, "Plus 30 min stabilisation recommended. :contentReference[oaicite:37]{index=37}"),
    multi("Plastic Test A sequence (BS 6700) includes:", [
      "Fill & leak check",
      "Pressurise to 1.5 × WP; hold 30 min",
      "Reduce to ~⅓ WP and monitor 90 min",
      "Cap the open vent during test"
    ], [0,1,2,3], "Steps listed under plastic test procedure. :contentReference[oaicite:38]{index=38}"),

    // Maintenance / decommissioning
    mcq("Gate valve on cold feed in airing cupboard isolates:", ["Cold only","All hot water to house","Heating only","Neither"], 1, "Pack reminder for maintenance. :contentReference[oaicite:39]{index=39}"),
    mcq("Tap servicing advice for elderly/infirm:", ["Replace with quarter-turn ceramic","Always use jumper washer","Use microbore","Use 3/4\" BSP everywhere"], 0, "Ease-of-use recommendation. :contentReference[oaicite:40]{index=40}"),
    tf ("Keep decommissioning/maintenance records; benchmark/domestic MI data may apply.", true, "Records noted multiple times. :contentReference[oaicite:41]{index=41}"),

    // Fault diagnosis
    mcq("Pumped shower fails to start; first check:", ["Thermostat stat","Flow switch/strainers","Immersion fuse","Anode"], 1, "Slides: flow switch & strainers. :contentReference[oaicite:42]{index=42}"),
    mcq("Excessively hot tap temps often due to:", ["Loose gland only","Cylinder stat/immersion stat set too high or faulty","Small PRV","Air in cold main"], 1, "Thermostat settings/faults listed. :contentReference[oaicite:43]{index=43}"),
  ];

  // ---- Tough numericals programmatically added ----
  const numericals = [
    { head_m: 9.0,  expect: 1.35 }, // 1.5 × 0.9
    { head_m: 12.0, expect: 1.80 },
    { head_m: 5.6,  expect: 0.84 },
    { head_m: 3.2,  expect: 0.48 },
  ];
  numericals.forEach(({head_m, expect})=>{
    const wp = +(head_m/10).toFixed(2);
    const opts = [wp, +(wp*1.25).toFixed(2), +(wp*1.5).toFixed(2), +(wp*2).toFixed(2)];
    BANK.push(mcq(
      `Rigid HWS test: static head = ${head_m.toFixed(2)} m. Required test pressure = ?`,
      opts.map(v=>v.toFixed(2)+" bar"),
      2,
      "Test rigid at 1.5 × working pressure (1 bar ≈ 10 m head). :contentReference[oaicite:44]{index=44}"
    ));
  });

  // ---- build 10 mocks × 30 ----
  function buildMocks(bank, num=10, size=30, seedBase=9307){
    const mocks=[];
    for(let i=1;i<=num;i++){
      const sample = seededShuffle(bank, seedBase + i*149).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }
  const QUIZZES = { hot: buildMocks(BANK, 10, 30) };

  // ---- hook into existing startQuiz ----
  function install(){
    if (window.__plumbwiseHotHooked) return;
    window.__plumbwiseHotHooked = true;

    const originalStart = window.startQuiz;
    const renderQ = window.renderQ;

    window.startQuiz = function(id){
      if (QUIZZES[id]){
        let n = prompt("Hot Water — choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = QUIZZES[id][idx].map((q,i)=> ({...q, _id:`${id}_m${idx+1}_${i}`}) );
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${id.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      if (typeof originalStart === "function") return originalStart(id);
    };

    // quick check
    window.__HOT_BANK_LEN = BANK.length;
  }

  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
