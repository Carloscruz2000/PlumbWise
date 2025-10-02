/* PlumbWise – ELECTRICAL mock generator (10 mocks × 30 Qs)
   Sources: Electrics for Plumbers Revision (slides) + Electric Principles (doc).
   Topics: Part P, EAWR 1989, BS7671, consumer units, MCB ratings, RCDs,
           immersion/DP switches, bathrooms, colours, bonding, safe isolation, voltages, etc.
*/

(function(){
  // --- seeded shuffle (deterministic) ---
  function xmur3(str){ let h=1779033703^str.length; for(let i=0;i<str.length;i++){ h=Math.imul(h^str.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return function(){ h=Math.imul(h^(h>>>16),2246822507); h=Math.imul(h^(h>>>13),3266489909); return (h^=h>>>16)>>>0; }; }
  function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr, seed){
    const rnd = mulberry32(xmur3(String(seed))());
    const a = arr.slice();
    for (let i=a.length-1;i>0;i--){ const j = Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  // --- helpers ---
  const mcq  = (q, options, correctIndex, why)         => ({ q, type:"mcq",  options, answer:[correctIndex],            why });
  const multi= (q, options, correctIndices, why)       => ({ q, type:"multi",options, answer:correctIndices.sort((a,b)=>a-b), why });
  const tf   = (q, correctTrue, why)                   => mcq(q, ["False","True"], correctTrue?1:0, why);

  // --- ELECTRICAL question bank (built from your two files) ---
  const ELEC_BANK = [
    // Regulations & standards
    mcq("Which Building Regulations section covers electrical work in dwellings?", ["Part L","Part P","Part B","Part M"], 1, "Part P covers domestic electrical safety."), // :contentReference[oaicite:2]{index=2}
    mcq("Which regulations cover safety when working with electrical equipment?", ["EAWR 1989","RIDDOR","COSHH","PUWER"], 0, "Electricity at Work Regulations 1989."), // :contentReference[oaicite:3]{index=3}
    mcq("Design, installation & testing guidance is found in:", ["BS 6700","BS 7671","BS EN 806","BS 5950"], 1, "BS 7671 (IET Wiring Regulations)."), // :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5}

    // Consumer unit, circuits & ratings
    mcq("The main cut-out fuse provides:", ["RCD protection","Overcurrent protection for whole property","Surge protection","Isolation only"], 1, "Overcurrent protection device at intake."), // :contentReference[oaicite:6]{index=6}
    mcq("Typical MCB rating for a ring main is:", ["6 A","16 A","32 A","40 A"], 2, "Ring mains 32 A; lighting 6 A; immersion 16 A."), // :contentReference[oaicite:7]{index=7} :contentReference[oaicite:8]{index=8}
    mcq("A domestic lighting circuit commonly uses:", ["2.5 mm² T&E","1.5 mm² T&E","10 mm² T&E","4 mm² flex"], 1, "1.5 mm² twin & earth for lighting."), // :contentReference[oaicite:9]{index=9}
    mcq("An immersion heater circuit typically uses:", ["32 A MCB","16 A MCB","6 A MCB","40 A MCB"], 1, "Immersion ~16 A on dedicated circuit."), // :contentReference[oaicite:10]{index=10}
    mcq("Electric showers are commonly protected by:", ["6–10 A","16 A","32–40 A",">63 A"], 2, "High load; own circuit to CU."), // :contentReference[oaicite:11]{index=11}
    tf ("A radial circuit returns to the consumer unit like a ring.", false, "Radial runs out to the load; ring returns."), // :contentReference[oaicite:12]{index=12}

    // RCD & protection
    mcq("An RCD trips primarily on:", ["Overcurrent","Earth leakage/imbalance","Overvoltage","High frequency"], 1, "Residual current imbalance detection."), // :contentReference[oaicite:13]{index=13}

    // Switching / isolation
    mcq("Double-pole switches are commonly used for:", ["Boilers & showers","Table lamps","Low-voltage stats","Extractor grills only"], 0, "They break live and neutral for appliances."), // :contentReference[oaicite:14]{index=14}
    mcq("Bathroom shower/lighting isolation should be via:", ["Rocker plate switch","Ceiling pull-cord DP switch","13 A socket","Plug top only"], 1, "No 13 A sockets or rocker switches in bath/shower rooms."), // :contentReference[oaicite:15]{index=15}

    // Bathrooms / accessories
    tf ("13 A sockets are allowed in bathrooms and shower rooms.", false, "Not permitted per your notes; use pull-cord isolation."), // :contentReference[oaicite:16]{index=16}

    // Colours & identification
    mcq("Post-2005 UK colours for fixed wiring are:", ["Red/Black","Brown/Blue (+ G/Y earth)","Blue/Yellow","Black/Green"], 1, "Brown live, blue neutral; G/Y earth."), // :contentReference[oaicite:17]{index=17} :contentReference[oaicite:18]{index=18}

    // Voltages
    mcq("Standard domestic supply is:", ["230 V single-phase AC","110 V single-phase AC","400 V three-phase AC","230 V DC"], 0, "230 V AC single phase typical."), // :contentReference[oaicite:19]{index=19} :contentReference[oaicite:20]{index=20}
    mcq("Industrial plant often uses:", ["110 V single-phase","230 V DC","400–415 V three-phase","12 V DC"], 2, "Three-phase for larger loads."), // :contentReference[oaicite:21]{index=21}

    // Bonding (main & supplementary)
    mcq("Main equipotential bonding conductors are typically:", ["1.0 mm²","2.5 mm²","10 mm²","0.75 mm²"], 2, "Bond gas/water at entry back to MET."), // :contentReference[oaicite:22]{index=22}
    mcq("Supplementary bonding in bathrooms/kitchens is typically:", ["0.5–1 mm²","4–6 mm²","10–16 mm²",">25 mm²"], 1, "Cross-bond exposed metalwork in special locations."), // :contentReference[oaicite:23]{index=23}
    tf ("Plastic pipework requires main equipotential bonding.", false, "Plastic isn’t conductive; bonding targets metal services."), // :contentReference[oaicite:24]{index=24}

    // Safe isolation (sequence from notes)
    multi("Select the correct safe isolation steps:", [
      "Prove tester on proving unit",
      "Isolate & secure/lock-off",
      "Test supply dead",
      "Skip re-proving the tester"
    ], [0,1,2], "Prove–isolate–test dead; re-prove tester."), // :contentReference[oaicite:25]{index=25} :contentReference[oaicite:26]{index=26}

    // Cable care / routes / protection
    tf ("Buried cables should be protected in walls or run in safe zones.", true, "Use conduit/trunking or prescribed zones."), // :contentReference[oaicite:27]{index=27}
    tf ("Running cables under loft insulation can cause overheating.", true, "Derating/overheat risk noted."), // :contentReference[oaicite:28]{index=28}
    mcq("Metal back boxes set in walls should have:", ["Bare knock-outs","Rubber grommets","Paper tape","Nothing"], 1, "To protect cable at entries."), // :contentReference[oaicite:29]{index=29}

    // Plugs / spurs / ratings
    mcq("Max current for a standard UK 3-pin plug (BS1363) is:", ["3 A","5 A","10 A","13 A"], 3, "Up to 13 A with correct fuse."), // :contentReference[oaicite:30]{index=30}
    mcq("A boiler at 690 W on 230 V should be fused at:", ["13 A","5 A","3 A","1 A"], 2, "≈3 A fuse (W/V)."), // :contentReference[oaicite:31]{index=31}

    // Immersion / heat-resistant flex
    mcq("Immersion heaters typically use which flex?", ["PVC 0.75 mm²","Butyl heat-resistant flex (~1.5 mm²)","2.5 mm² HO7RN-F","Speaker flex"], 1, "Heat-resistant butyl flex for immersions."), // :contentReference[oaicite:32]{index=32}

    // Identification / components
    mcq("A double-pole pull-cord with neon indicator is used to:", ["Isolate TV aerial","Isolate shower/heater safely","Switch ring sockets","Dim lights"], 1, "DP isolation in bathrooms/showers."), // :contentReference[oaicite:33]{index=33}
    mcq("A switched fused spur with neon is commonly used to:", ["Protect a lighting rose","Isolate fixed appliances","Test RCDs","Supply cooker only"], 1, "Isolates & fuses fixed loads."), // :contentReference[oaicite:34]{index=34}

    // Testing & GS38 themes from notes
    tf ("Before connecting new circuits, testing with approved equipment is required.", true, "Per notes; comply with HSE guidance."), // :contentReference[oaicite:35]{index=35}
    tf ("Polarity tests help confirm conductors are in correct terminals.", true, "Use appropriate low-ohm checks per notes."), // :contentReference[oaicite:36]{index=36}

    // Earthing & earth length
    mcq("Which conductor is arranged to disconnect last under strain?", ["Neutral","Live","Earth (CPC)","None"], 2, "Leave earth longest so it remains connected."), // :contentReference[oaicite:37]{index=37}

    // Site supply knowledge
    mcq("Site tools are commonly stepped down to:", ["12 V","110 V","230 V DC","400 V"], 1, "Reduced shock risk via transformer."), // :contentReference[oaicite:38]{index=38}

    // Central heating wiring
    tf ("Controls in a typical heating wiring centre are generally wired in series logic.", true, "Per the slide notes."), // :contentReference[oaicite:39]{index=39}

    // Part P bathrooms & isolation recap
    tf ("Rocker light switches are acceptable in bathrooms per your notes.", false, "Use pull-cords; no plate switches in bath/shower rooms."), // :contentReference[oaicite:40]{index=40}

    // Bonding practice steps
    mcq("When fitting a BS 951 bonding clamp you should also:", ["Paint over it","Label the connection","Use cable ties","Ignore MET"], 1, "Label ‘Safety electrical connection – do not remove’.") // :contentReference[oaicite:41]{index=41}
  ];

  // Build 10 mocks x 30 Qs
  function buildMocks(bank, num=10, size=30, seedBase=2401){
    const mocks = [];
    for (let i=1;i<=num;i++){
      const sample = seededShuffle(bank, seedBase + i*1337).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }

  const QUIZZES = { elec: buildMocks(ELEC_BANK, 10, 30) };

  // Hook into app startQuiz just like HS pack
  function install(){
    if (window.__plumbwiseElecHooked) return;
    window.__plumbwiseElecHooked = true;

    const originalStart = window.startQuiz;
    const renderQ = window.renderQ; // global function in your app

    window.startQuiz = function(id){
      if (QUIZZES[id]){
        let n = prompt("Electrical — choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = QUIZZES[id][idx].map((q,i)=> ({...q, _id:`${id}_m${idx+1}_${i}`}) );
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${id.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      if (typeof originalStart === "function") return originalStart(id);
    };

    // expose for debug
    window.__ELEC_BANK_LEN = ELEC_BANK.length;
  }

  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
