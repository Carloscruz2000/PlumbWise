/* PlumbWise – SANITATION + DRAINAGE (hard) – 10 mocks × 30 Qs each
   Modules:
     - "san"  -> Sanitation (wastes, traps, appliances, AAVs, gradients, testing)
     - "drn"  -> Above-ground Drainage (soil stacks, branches, offsets, ventilation)
   Integrates with your app's quiz engine by overriding window.startQuiz for ids "san" and "drn".
   (c) PlumbWise
*/

(function(){
  // -------------------- deterministic shuffle utilities --------------------
  function xmur3(str){ let h=1779033703^str.length; for(let i=0;i<str.length;i++){ h=Math.imul(h^str.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return function(){ h=Math.imul(h^(h>>>16),2246822507); h=Math.imul(h^(h>>>13),3266489909); return (h^=h>>>16)>>>0; }; }
  function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr, seed){
    const rnd = mulberry32(xmur3(String(seed))());
    const a = arr.slice();
    for (let i=a.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  // -------------------- helpers to define questions --------------------
  const mcq   = (q, options, correctIndex, why) => ({ q, type:"mcq",  options, answer:[correctIndex], why });
  const multi = (q, options, idxs, why)        => ({ q, type:"multi",options, answer:idxs.slice().sort((a,b)=>a-b), why });
  const tf    = (q, isTrue, why)               => mcq(q, ["False","True"], isTrue?1:0, why);

  // =====================================================================
  // SANITATION – HARD BANK
  // =====================================================================
  const SAN_BANK = [
    // Trap seals & anti-siphonage
    mcq("Minimum trap seal for a washbasin connected to a soil stack:", ["38 mm","50 mm","75 mm","100 mm"], 2, "75 mm seal helps resist induced/self/anti-siphonage."),
    mcq("Bath trap typical minimum seal depth:", ["38 mm","50 mm","75 mm","100 mm"], 1, "50 mm commonly specified for baths/shower trays in many syllabi."),
    mcq("Shower waste (40 mm) minimum trap seal often taught:", ["38 mm","50 mm","75 mm","100 mm"], 1, "50 mm used widely; deeper seals reduce loss risk."),
    mcq("Which most likely causes trap seal loss on a long branch?", ["Backfall","Self-siphonage due to rapid discharge","Thermal expansion","Electrolysis"], 1, "Rapid discharge causes negative pressure; seal pulled out."),
    multi("Measures that reduce trap seal loss:", ["Air admittance valve (AAV) on branch","Increase trap seal depth","Reduce excessive gradient","Fit bottle trap on every outlet"], [0,1,2], "Vent/air, adequate seal, and correct gradient help."),
    mcq("Anti-siphon traps are designed to:", ["Increase flow noise","Admit air locally to protect the seal","Increase water seal beyond 100 mm","Reduce pipe sizes"], 1, "Local air admission = less negative pressure."),
    tf ("A running trap is recommended directly under a single basin to prevent seal loss.", false, "Running traps are for floor gullies; use appropriate appliance trap."),

    // Pipe sizes & gradients (sanitation wastes)
    mcq("Standard waste sizes taught: basin/kitchen sink/shower/bath respectively:", ["32/32/32/32","32/40/40/40","40/32/50/50","50/40/32/32"], 1, "Common set: 32 mm basin; 40 mm sink & shower; 40 mm bath."),
    mcq("Recommended gradient band for small bore wastes (e.g., 32–50 mm):", ["5–10 mm/m","12–15 mm/m","18–90 mm/m",">100 mm/m"], 2, "Too flat silts; too steep de-waters pipe."),
    mcq("A 3.2 m long 40 mm waste at 1:60 fall requires roughly:", ["32 mm drop","53 mm drop","90 mm drop","170 mm drop"], 1, "1/60 ≈ 16.7 mm per m → 3.2×16.7 ≈ 53 mm."),

    // Branch lengths & AAV use (sanitary appliances)
    mcq("Maximum unvented branch length often taught for 32 mm waste:", ["1.0 m","1.7 m","3.0 m","4.0 m"], 1, "Beyond this, venting or larger pipe may be needed."),
    mcq("Maximum unvented branch length often taught for 40 mm waste:", ["1.7 m","3.0 m","4.0 m","6.0 m"], 2, "Typical teaching tables show ~4.0 m for 40 mm unvented."),
    mcq("Fitting an AAV at the end of a long branch primarily:", ["Raises static pressure","Prevents induced siphonage by admitting air","Increases dynamic head","Eliminates need for trap"], 1, "AAV balances pressure at discharge."),
    tf ("An AAV can be used to terminate a primary ventilating stack externally.", false, "Stacks that terminate externally require open vent to atmosphere with guard."),

    // Appliance specifics
    mcq("Minimum trap seal for a kitchen sink connected to soil:", ["38 mm","50 mm","75 mm","100 mm"], 2, "Many curricula require 75 mm for sinks to resist pressure fluctuations."),
    mcq("A bidet with ascending spray is classified as backflow fluid category:", ["Cat 2","Cat 3","Cat 4","Cat 5"], 3, "High risk; requires appropriate air gap/valve selection."),
    mcq("Urinal waste usual pipework size:", ["25 mm","32 mm","40 mm","50 mm"], 1, "32 mm commonly used per typical college tables."),

    // Connections & junctions
    mcq("Use of long-radius bends and swept junctions on wastes:", ["Discouraged","Only aesthetic","Reduces self-cleansing and should be avoided","Encouraged to improve flow and reduce blockages"], 3, "Swept entries mitigate crossflow/turbulence."),
    mcq("Connections of two opposing branches into a stack should be:", ["Directly opposite","Vertically separated by offset and/or at different levels","Joined with a 90° tee","At any point convenient"], 1, "Prevent crossflow by separation/offset."),
    mcq("Parallel junction detail to avoid WC discharge zone on stack requires:", ["Any tee","Y-branch only","50 mm parallel junction beyond WC zone","Saddle strap"], 2, "Keep branch out of WC discharge cone."),

    // Testing & commissioning (san)
    mcq("Sanitary waste systems should be water tested by:", ["Filling to spillover of highest appliance served and checking for leaks","Applying air at 1.5× working pressure","Only visual check","Smoke test only"], 0, "Hydraulic test per teaching practice."),
    mcq("Before testing a new waste system you should:", ["Seal open ends and trap outlets appropriately","Increase gradient to max","Fit AAVs only after test","Remove traps"], 0, "Seal & isolate to conduct meaningful test."),
    tf ("Smoke testing of internal wastes is used to detect leakage paths and faulty seals.", true, "An accepted method in some curricula/building control contexts."),

    // Materials & workmanship
    mcq("Solvent welding of PVC-U requires:", ["No cleaning","Use of a proprietary cleaner/primer and correct cement","PTFE tape","Soldering flux"], 1, "Clean/prime/cement with correct cure time."),
    mcq("For polypropylene push-fit wastes:", ["Use solvent cement","Do not use inserts; just push","Ensure chamfered pipe end and use correct sealing ring","Heat to form bends"], 2, "Chamfer, lubricate if recommended, correct ring."),
    mcq("Copper trapped wastes require:", ["Soft solder above floor level only","Capillary or compression joints and correct fall","Threaded-only joints","Always lead solder"], 1, "Joints suitable for sanitary duty with correct gradients."),

    // Fault diagnosis (san)
    mcq("Gurgling basin after bath discharge indicates:", ["Over-vented system","Seal intake at basin trap (induced siphonage)","Insufficient fall on bath waste causing ponding","Scale in basin mixer"], 1, "Rapid bath discharge pulls negative pressure."),
    mcq("Slow shower tray drain with no blockage found likely due to:", ["Insufficient trap seal","Trap set high relative to outlet and inadequate fall","AAV stuck open","Pipe too large"], 1, "Tray outlet must be above branch invert with adequate fall."),
    mcq("Foul odour from bath panel area intermittently:", ["Air freshener issue","Loose trap compression nut or perished washer","Incorrect PRV setting","Water hammer"], 1, "Check mechanical seals first."),

    // Numericals / scenarios (san)
    mcq("A 5.0 m 40 mm branch at 1:80 has a total fall of:", ["50 mm","62.5 mm","75 mm","100 mm"], 1, "1/80 = 12.5 mm/m → 62.5 mm."),
    mcq("Choose the best gradient for 32 mm waste serving a basin (2.0 m):", ["4 mm/m","10 mm/m","20 mm/m","120 mm/m"], 2, "20 mm/m in the 18–90 window; 4 & 10 are too flat."),
    multi("Select causes of recurring blockage on a 32 mm waste:", ["Backfall near trap","Excessive gradient near entry","Grease/food solids from kitchen sink","Dead-leg with no scouring flow"], [0,2,3], "Backfall, FOGs, and stagnant legs cause fouling."),

    // Air admittance & terminations (san)
    mcq("AAVs must be installed:", ["Below flood level rim","Above spillover level of highest served appliance","Inside sealed cupboard","Externally without cage"], 1, "Protect against overflow conditions."),
    tf ("AAVs do not provide positive ventilation of a system; they only admit air.", true, "They cannot relieve positive pressure."),

    // Housekeeping / access
    mcq("Access to wastes should be provided:", ["At every 500 mm","Only at terminal appliance","At changes of direction and at suitable intervals","Not required for 32–50 mm pipework"], 2, "Provide rodding/clearance where needed."),

    // More numericals
    mcq("A kitchen sink (40 mm) run is 4.0 m at 1:40. Total fall is about:", ["40 mm","80 mm","100 mm","160 mm"], 3, "1/40 = 25 mm/m → 100 mm; oh! Wait 4×25=100 → Correct: 100 mm.", "FIXME"), // we'll correct below
  ];
  // Fix the previous explanation to avoid confusion:
  SAN_BANK[SAN_BANK.length-1] = mcq(
    "A kitchen sink (40 mm) run is 4.0 m at 1:40. Total fall is about:",
    ["40 mm","80 mm","100 mm","160 mm"], 2,
    "1/40 = 25 mm per metre → 4 × 25 = 100 mm."
  );

  // Programmatically add tough numerical variants (san)
  [
    {L:2.8, ratio:60, expect: Math.round(2.8*1000/60)}, // mm
    {L:3.6, ratio:80, expect: Math.round(3.6*1000/80)},
    {L:5.5, ratio:90, expect: Math.round(5.5*1000/90)},
    {L:1.9, ratio:50, expect: Math.round(1.9*1000/50)},
  ].forEach(({L,ratio,expect})=>{
    SAN_BANK.push(mcq(
      `A ${L.toFixed(1)} m 40 mm waste at 1:${ratio} requires a minimum fall of:`,
      [`${Math.round(expect*0.6)} mm`, `${expect} mm`, `${Math.round(expect*1.3)} mm`, `${expect+50} mm`],
      1,
      `1:${ratio} ⇒ ${ (1000/ratio).toFixed(1) } mm/m → ${L} m × ${ (1000/ratio).toFixed(1) } ≈ ${expect} mm.`
    ));
  });

  // =====================================================================
  // DRAINAGE – HARD BANK (soil stacks, branches, offsets, ventilation)
  // =====================================================================
  const DRN_BANK = [
    // Stack basics & WC connections
    mcq("Minimum diameter of a soil stack serving WCs:", ["75 mm","82 mm","100 mm","125 mm"], 2, "100 mm common teaching value for domestic stacks."),
    mcq("WC branch nominal size:", ["50 mm","82 mm","100 mm","150 mm"], 2, "WC outlets/branches are 100 mm."),
    mcq("Minimum gradient often taught for WC branch:", ["10 mm/m","18 mm/m","25 mm/m","40 mm/m"], 1, "18 mm/m helps carriage of solids."),
    tf ("A single WC branch may be up to ~6 m unvented if layout meets rules.", true, "Typical tables allow ~6 m with correct fall & entry."),

    // Crossflow prevention & offsets
    mcq("Opposed connections on 100 mm stack should be separated by:", ["65 mm","110 mm","150 mm","250 mm"], 1, "Common offset separation is 110 mm for 100 mm stacks."),
    mcq("Opposed connections on 150 mm stack should be separated by:", ["110 mm","150 mm","200 mm","250 mm"], 3, "Use 250 mm separation."),
    mcq("Where a WC discharges into the stack, a parallel junction detail is used to:", ["Reduce noise only","Avoid entry into the WC discharge zone","Reduce gradient","Increase trap seal depth"], 1, "Keep branch out of the WC discharge cone."),
    mcq("Branch connection angle into a stack should be:", ["90° square tee","Swept or 45° combination fitting","Any angle","Vertical only"], 1, "Use swept/oblique connections to reduce turbulence."),

    // Branch lengths (unvented) – small-bore fixtures
    mcq("Max unvented branch length for 32 mm waste:", ["1.0 m","1.7 m","3.0 m","4.0 m"], 1, "Beyond ~1.7 m vent or upsize."),
    mcq("Max unvented branch length for 40 mm waste:", ["1.7 m","3.0 m","4.0 m","6.0 m"], 2, "≈4.0 m unvented commonly taught."),
    mcq("Max unvented branch length for 50 mm waste:", ["3.0 m","4.0 m","6.0 m","7.5 m"], 1, "≈4.0 m unvented per tables."),

    // Gradients for stacks/branches
    mcq("Typical gradient range for 100 mm foul drains (above ground guide):", ["1:10–1:20","1:40–1:110","1:80–1:200","Level"], 1, "Self-cleansing within this band."),
    mcq("A branch length of 3.0 m at 1:50 drop is:", ["50 mm","60 mm","75 mm","90 mm"], 2, "1/50 = 20 mm/m → 60 mm; wait, 3×20=60 → correct choice is 60 mm.", "FIXME"),
  ];
  // Fix that explanation and correct answer index:
  DRN_BANK[DRN_BANK.length-1] = mcq(
    "A branch length of 3.0 m at 1:50 has a total fall of:",
    ["30 mm","60 mm","90 mm","120 mm"], 1,
    "1/50 = 20 mm per metre → 3 × 20 = 60 mm."
  );

  // Ventilation & terminals
  DRN_BANK.push(
    mcq("Vent stack terminal must be at least this distance from any opening (window/air intake):", ["300 mm","600 mm","900 mm","1500 mm"], 2, "≥900 mm commonly taught."),
    tf ("Vent terminals should have a perforated guard/cage.", true, "Prevents ingress of debris/birds."),
    mcq("Branch vent connection point should be:", ["Below trap weir","Above spillover level of the highest connected appliance","At floor level","At gulley only"], 1, "Prevent overflow path."),
    mcq("AAVs on branch vents:", ["Provide positive system ventilation","Only admit air to relieve negative pressures","Replace open vents outdoors","Are installed below flood level rim"], 1, "They do not relieve positive pressure and must be above spillover."),
  );

  // Access & changes
  DRN_BANK.push(
    multi("Provide access fittings (chambers/rodding eyes) at:", [
      "Changes in direction",
      "Changes in gradient",
      "At the end of runs",
      "Random mid-runs only"
    ], [0,1,2], "Access where blockages could occur."),
    mcq("Soil stack offsets in upper storeys should:", ["Use 90° tees","Use double 45° bends with adequate access","Be avoided always","Use reducers"], 1, "Swept/double 45° with access points.")
  );

  // Testing (above-ground drainage)
  DRN_BANK.push(
    mcq("Above-ground drainage water test method:", ["Fill to terminal and check for seepage/leaks","Air at 2 bar","Smoke only","No test required"], 0, "Hydraulic test checks joints."),
    mcq("Before testing, ensure:", ["All traps removed","All open ends sealed and appliances isolated","AAVs permanently sealed","Stack left open"], 1, "Prevent leaks and false readings.")
  );

  // Fault finding (drainage)
  DRN_BANK.push(
    mcq("Repeated loss of trap seals on upper floor appliances suggests:", ["Positive pressure spikes in stack","Only backfall","Scale","Mixer cartridge wear"], 0, "Positive transients blow seals; review venting/stack layout."),
    mcq("Gurgling and odours on the lowest branch most likely:", ["Blocked ridge tile","Blocked stack/branch or inadequate venting","Air in CH system","No inhibitor"], 1, "Check vent, gradients, and obstructions."),
    mcq("Frequent blockages after refurb likely caused by:", ["Use of swept bends","Multiple 90° square tees and backfalls","Correct falls and AAVs","Oversized access"], 1, "Poor fittings and backfalls cause fouling."),
  );

  // Programmatic numerical variants (drn)
  [
    {L:4.8, r:80}, {L:6.0, r:110}, {L:2.5, r:40}, {L:7.2, r:100}
  ].forEach(({L,r})=>{
    const per = 1000/r; // mm per metre
    const drop = Math.round(L*per);
    DRN_BANK.push(mcq(
      `A ${L.toFixed(1)} m branch at 1:${r} has a total fall of:`,
      [`${drop-20} mm`, `${drop} mm`, `${drop+20} mm`, `${drop+40} mm`],
      1,
      `1:${r} ⇒ ${per.toFixed(1)} mm/m → ${L} m ≈ ${drop} mm.`
    ));
  });

  // =====================================================================
  // BUILD MOCKS (10×30) FOR EACH MODULE
  // =====================================================================
  function buildMocks(bank, num=10, size=30, seedBase=44001){
    const mocks=[];
    for (let i=1;i<=num;i++){
      const sample = seededShuffle(bank, seedBase + i*137).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }
  const QUIZZES_SAN = { san: buildMocks(SAN_BANK, 10, 30) };
  const QUIZZES_DRN = { drn: buildMocks(DRN_BANK, 10, 30) };

  // =====================================================================
  // HOOK INTO YOUR APP
  // =====================================================================
  function hookModule(id, qmap, flagName){
    if (window[flagName]) return;
    window[flagName] = true;
    const originalStart = window.startQuiz;
    const renderQ = window.renderQ;

    window.startQuiz = function(moduleId){
      if (qmap[moduleId]){
        let n = prompt((moduleId==="san"?"Sanitation":"Drainage")+" — choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = qmap[moduleId][idx].map((q,i)=> ({...q, _id:`${moduleId}_m${idx+1}_${i}`}) );
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${moduleId.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      if (typeof originalStart === "function") return originalStart(moduleId);
    };
  }

  // Install hooks
  function install(){
    hookModule("san", QUIZZES_SAN, "__SAN_HOOKED__");
    hookModule("drn", QUIZZES_DRN, "__DRN_HOOKED__");
    // Expose counts for sanity check
    window.__SAN_BANK_LEN = SAN_BANK.length;
    window.__DRN_BANK_LEN = DRN_BANK.length;
  }
  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
