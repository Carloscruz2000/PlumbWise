/* PlumbWise – Health & Safety mock generator
   Builds 10 deterministic 30-question mocks from a core bank.
   Source topics: HASAWA 1974, HSE/HSC, RIDDOR, COSHH, Work at Height, Scaffolds & Ladders,
   Site electrics (110V, RCD, PAT), Manual Handling, PPE, Fire classes/extinguishers, First Aid, PUWER, CDM, Asbestos, LPG, Excavations.
*/

(function(){
  // --- Utility: deterministic shuffle (seeded) ---
  function xmur3(str){ let h=1779033703^str.length; for(let i=0;i<str.length;i++){ h=Math.imul(h^str.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return function(){ h=Math.imul(h^ (h>>>16), 2246822507); h=Math.imul(h^ (h>>>13), 3266489909); return (h^=h>>>16)>>>0; }; }
  function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15, t|1); t^=t+Math.imul(t^t>>>7, t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr, seed){
    const rnd = mulberry32(xmur3(String(seed))());
    const a = arr.slice();
    for (let i=a.length-1; i>0; i--){
      const j = Math.floor(rnd()* (i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  // --- Question helpers ---
  const mcq = (q, options, correctIndex, why) => ({ q, type:"mcq", options, answer:[correctIndex], why });
  const multi = (q, options, correctIndices, why) => ({ q, type:"multi", options, answer:correctIndices.slice().sort((a,b)=>a-b), why });

  // --- Health & Safety Bank (≈70 Qs) ---
  const HS_BANK = [
    // HASAWA / HSE / Duties
    mcq("Which Act places the primary duty for employee H&S on employers?", ["RIDDOR 1995","HASAWA 1974","CDM 1994","PUWER 1998"], 1, "HASAWA 1974 is the umbrella Act."),
    mcq("Who enforces HASAWA in workplaces?", ["Police","HSE inspectors","Local MP","DVSA"], 1, "HSE enforce via inspections and notices."),
    mcq("An employer with 5+ employees must have a written…", ["Risk register","H&S policy","Insurance waiver","Method statement only"], 1, "Written policy required at ≥5 staff."),
    mcq("A Prohibition Notice means…", ["Improve within 21 days","Work must stop immediately","Fine is automatic","Police investigation"], 1, "Work must cease until safe."),
    mcq("Improvement Notices are used to…", ["Stop work now","Request changes within a time period","Issue fines","Dismiss staff"], 1, "Time-bound rectification."),

    // RIDDOR
    mcq("Under RIDDOR, serious/fatal accidents must be reported to…", ["HSE","Council","Fire Service","Union"], 0, "RIDDOR reports go to HSE."),
    mcq("Absence over the reportable threshold must be notified within:", ["24 hours","10 days","30 days","End of month"], 1, "RIDDOR guidance specifies 10 days."),
    mcq("Which form was historically used for reportable injuries?", ["F2508","F279A","PAT110","COSHH-3"], 0, "Legacy RIDDOR reference."),

    // COSHH
    mcq("COSHH mainly controls…", ["Noise","Hazardous substances","Manual lifting","Electrical design"], 1, "COSHH = hazardous substances."),
    multi("COSHH requires employers to provide:", ["Info & instruction","Training","COSHH data sheets","Oven gloves"], [0,1,2], "Key COSHH duties."),
    mcq("Three main routes into the body:", ["Inhalation, absorption, ingestion","Injection, radiation, osmosis","Inhalation only","Absorption only"], 0, "Classic COSHH routes."),
    mcq("Which is an irritant example for plumbers?", ["Loft insulation fibres","Nitrogen","Helium","Dry air"], 0, "Fibres can irritate skin/eyes."),
    mcq("Toxic substance example:", ["Hydrogen sulphide","CO₂","Water vapour","Nitrogen"], 0, "H₂S is toxic."),

    // Work at Height / Scaffolds / Ladders
    mcq("Work at Height Regulations hierarchy: first preference is to…", ["Use nets","Use PPE","Avoid work at height","Use harness"], 2, "Avoid > prevent > mitigate."),
    mcq("Correct ladder ratio is:", ["1 out : 3 up","1 out : 4 up","2 out : 5 up","1 out : 1 up"], 1, "Approx 75° angle."),
    mcq("Ladders should be inspected:", ["Monthly","Before each use","Yearly","Never"], 1, "Pre-use checks every time."),
    mcq("Minimum width of a working platform on scaffold:", ["300 mm","450 mm","600 mm","900 mm"], 2, "Study pack states 600 mm."),
    mcq("Scaffolds should be checked at intervals not exceeding:", ["7 days","14 days","28 days","90 days"], 0, "Regular ≤7 days or after events."),
    mcq("Tower scaffolds should be tied in at about:", ["3 m","6 m","9 m","12 m"], 2, "Tie in ~9 m unless designed otherwise."),
    mcq("Who may erect scaffolding?", ["Any operative","Trained competent person","Site visitor","Client"], 1, "Only trained/competent erectors."),

    // Site Electricity / PAT / RCD
    mcq("Site portable tools should run at:", ["12 V","110 V","230 V","400 V"], 1, "110 V reduced risk on site."),
    mcq("110 V site colour code:", ["Blue","Red","Yellow","Black"], 2, "Yellow = 110 V."),
    mcq("Portable electrical equipment test frequency on site (typical):", ["Daily","Every 3 months","Yearly","Never"], 1, "Formerly ‘PAT’ every ~3 months (as taught)."),
    mcq("RCDs are designed to trip on:", ["Overvoltage","Overcurrent only","Earth leakage/current imbalance","High frequency"], 2, "Residual imbalance detection."),
    mcq("Before electrical work, plumbers must:", ["Switch off at spur only","Isolate safely & lock off","Remove neutral only","Use neon screwdriver"], 1, "Safe isolation is mandatory."),
    multi("Approved test devices include:", ["Neon screwdriver","Two-pole tester/Martindale","Proving unit","Volt stick only"], [1,2], "Use approved testers + proving unit."),

    // Manual Handling
    mcq("Manual handling assessments are required to:", ["Avoid all lifting","Evaluate the task and route","Tick a box","Delay work"], 1, "Plan route, assess risks."),
    mcq("Kinetic lifting emphasises:", ["Straight back, knees bent","Bent back, straight legs","Twist while lifting","Hold away from body"], 0, "Good posture, close to body."),

    // PPE
    mcq("On new build sites plumbers typically must wear:", ["Hard hat & safety boots","Flip flops","No PPE","Gloves only"], 0, "Basic mandatory PPE."),
    multi("Good practice PPE examples:", ["Goggles when chiselling/drilling","Dust masks with soot","Waterproof gloves in drainage","No gloves on solvents"], [0,1,2], "Match hazard to PPE."),
    mcq("Dermatitis risk increases with:", ["Solvent cements on skin","Clean water only","Cotton gloves","Fresh air"], 0, "Irritants lead to dermatitis."),

    // Fire safety / Extinguishers
    mcq("Fire triangle elements are heat, fuel and…", ["Nitrogen","Oxygen","Hydrogen","Carbon"], 1, "Remove one to control fire."),
    mcq("Best for electrical fires:", ["Water","Foam","CO₂ or Dry Powder","Wet chemical"], 2, "Avoid water on electrics."),
    mcq("Class B fires are:", ["Wood/paper","Flammable liquids","Cooking oils","Metals"], 1, "Liquids = Class B."),
    mcq("Never use water on:", ["Class A","Class B (oil)","Paper","Timber"], 1, "Water + oil = hazard."),
    mcq("Modern extinguishers are mainly:", ["Blue","Green","All red with small colour patch","All black"], 2, "EU standard red body + patch."),
    mcq("LPG on vans typically requires:", ["No extinguishers","1 Water","2 Dry Powder","Foam + water"], 2, "Two DP units recommended."),

    // First Aid
    mcq("Unconscious casualty breathing normally should be placed in:", ["Supine","Prone","Recovery position","Sitting"], 2, "Airway protection."),
    mcq("Eye contamination with chemical: first aid is to:", ["Cover with pad","Rinse with clean sterile water","Rub eye","Apply ointment"], 1, "Irrigate promptly."),
    mcq("Before helping a shock victim connected to live electrics:", ["Grab them quickly","Switch supply off / use non-conductive tool","Pour water","Wait 30 mins"], 1, "Make scene safe first."),

    // CDM / PUWER
    mcq("PUWER mainly covers:", ["Gas regs","Work equipment & guards","Water byelaws","Fire alarms"], 1, "Provision & Use of Work Equipment."),
    mcq("CDM seeks to improve H&S across:", ["Only maintenance","All stages: design to maintenance","Only construction phase","Only demolition"], 1, "Lifecycle approach."),

    // Asbestos
    mcq("Asbestos removal generally must be by:", ["Any trained plumber","Licensed contractor","Client","Painter"], 1, "Licensed removal except very minor work."),
    mcq("Asbestos waste handling:", ["Single bag","Double-bag, label, licensed disposal","Bin it","Burn it"], 1, "Strict containment & licensed site."),
    mcq("Houses pre-1980 may contain asbestos in:", ["Copper pipes","Guttering/flues/insulation","UPVC windows","Glass"], 1, "Common legacy materials."),
    mcq("After asbestos removal, who gives the ‘all clear’?", ["Client","Specialists via air sampling","Installer","Anyone"], 1, "Independent assessment."),

    // LPG
    mcq("LPG is:", ["Lighter than air","Heavier than air","Same as air","Non-flammable"], 1, "Accumulates low/into drains."),
    mcq("LPG cylinders should be stored:", ["Inside boiler room","Outside, upright, ventilated & secure","In loft","In trench"], 1, "External secure compound."),

    // Excavations & Confined spaces
    mcq("Sides of excavations > ~1.2 m in loose ground should be:", ["Unchecked","Supported or battered back","Filled with water","Ignored"], 1, "Prevent collapse."),
    mcq("Excavations should be inspected:", ["Monthly","Start of each day by a competent person","Never","Only after rain"], 1, "Daily pre-work checks."),
    mcq("Edge protection on deep excavations:", ["Not required","Guard rails needed","Tape is enough","None"], 1, "Prevent falls/ingress."),

    // Signs / Noise
    mcq("Noise upper action value typically around:", ["55 dB","65 dB","85 dB","105 dB"], 2, "Control of Noise at Work."),
    mcq("Which symbol indicates mandatory PPE?", ["Blue circular sign","Red circle bar","Yellow triangle","Green square"], 0, "Blue = mandatory."),
    mcq("Which symbol indicates prohibition?", ["Blue circle","Red circle with bar","Yellow triangle","Green square"], 1, "Red barred = prohibition."),

    // Electricity colours / Immersion wiring
    mcq("Post-2006 conductor colours (UK):", ["Red/Black","Brown/Blue","Blue/Yellow","Black/Green"], 1, "Brown live, blue neutral."),
    mcq("Immersion heater live should connect to:", ["Element directly","Thermostat then element","Neutral bar","Earth"], 1, "Live via stat control."),
    mcq("Earth conductor should be left:", ["Shortest","Same length","Longest","Removed"], 2, "So it disconnects last under strain."),

    // Safe isolation set
    multi("Safe isolation normally involves:", ["Prove tester on proving unit","Test supply dead","Lock-off & warning tag","Use neon screwdriver"], [0,1,2], "Prove–test–prove; lock & tag."),

    // Fire procedures
    mcq("On discovering a fire you should first:", ["Get tools","Raise the alarm and evacuate","Open windows","Hide"], 1, "Warn/evacuate per plan."),
    mcq("When calling the fire brigade give:", ["Your job title","Exact location and hazards","Your wage","Your lunch"], 1, "Location + hazards like LPG."),

    // Tools / Competence
    mcq("Who may change abrasive wheels on bench grinders?", ["Any operative","Only trained/competent persons","Visitor","Client"], 1, "Certification required."),
    mcq("Power tool guards should be:", ["Removed for better view","Left off for speed","Fitted and functional","Painted only"], 2, "Do not remove guards."),
    mcq("Battery tools are generally:", ["Most hazardous on site","Least hazardous on site","Illegal","Unreliable"], 1, "No trailing leads, lower shock risk."),
    mcq("Damaged cold chisel heads should be:", ["Ignored","Ground regularly","Painted","Bent"], 1, "Prevent flying splinters."),

    // First aid kit
    mcq("HSE guidance on first aid kits includes:", ["Adhesive dressings, not tablets","Tablets required","No dressings","Only gloves"], 0, "No medicines; basic dressings."),

    // Step ladders
    mcq("Top step on a typical stepladder:", ["Is fine to stand on","Should not be used unless designed for it","Always used","Only for tools"], 1, "Use platform models if needed."),

    // Water / Gas / Electrical (other regs awareness)
    mcq("Electrical installations standard referenced is:", ["BS 7671","BS 8212","BS 5950","BS EN 806"], 0, "IET Wiring Regs."),
    mcq("Gas safety regulations aim to prevent:", ["Dermatitis","CO poisoning","Noise exposure","UV burns"], 1, "CO hazards from appliances."),

    // Misc site welfare / CHSW regs
    mcq("Site welfare must include:", ["Toilets & drying facilities","Just parking","Cinema","Gym"], 0, "CHSW regs cover welfare."),

    // Fire classes extra
    mcq("Class D fires involve:", ["Metals","Liquids","Gases","Cooking oils"], 0, "Metal fires = Class D."),
    mcq("Cooking oil fires (Class F) best treated with:", ["Water","CO₂","Wet chemical","Dry leaves"], 2, "Wet chemical for deep-fat fryers.")
  ];

  // --- Build 10 mocks of 30 Q each, deterministically ---
  function buildMocks(bank, num=10, size=30, seedBase=6129){
    const mocks = [];
    for (let i=1; i<=num; i++){
      const seed = seedBase + i * 97;
      const sample = seededShuffle(bank, seed).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }

  const QUIZZES = { hs: buildMocks(HS_BANK, 10, 30) };

  // --- Integrate with existing app.html without editing its quiz engine ---
  // We intercept startQuiz(id): if we have prebuilt mocks for that id,
  // we ask which mock (1-10), load those 30 Qs and drive the existing renderQ().
  function installHook(){
    const have = (typeof window !== "undefined") && window;
    if (!have) return;

    // Only hook once
    if (window.__plumbwiseMockHooked) return;
    window.__plumbwiseMockHooked = true;

    const originalStart = window.startQuiz;
    const renderQ = window.renderQ;

    window.startQuiz = function(id){
      if (QUIZZES[id]){
        let n = prompt("Choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = QUIZZES[id][idx].map((q,i)=> ({...q, _id:`${id}_m${idx+1}_${i}`}) );
        // inject into the same structure the app expects
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${id.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      // fallback to existing behaviour
      if (typeof originalStart === "function") return originalStart(id);
    };

    // Optional: expose for debugging
    window.__QUIZZES = QUIZZES;
    window.__HS_BANK_LEN = HS_BANK.length;
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", installHook);
  } else {
    installHook();
  }
})();
