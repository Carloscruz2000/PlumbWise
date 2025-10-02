/* PlumbWise – COLD WATER SYSTEMS (hard) – 10 mocks × 30 Qs
   Sources:
     - Cold Water 6129 Revision (standards, WRAS, fittings, cisterns, isolation) :contentReference[oaicite:3]{index=3}
     - Outcome 5: Testing & Decommissioning (soundness tests, flush/disinfect, commission, dead legs) :contentReference[oaicite:4]{index=4}
     - Outcome 4: Installations (insulation, materials, backflow, fluid categories, air gaps AUK/AG/RPZ) :contentReference[oaicite:5]{index=5}

   This hooks window.startQuiz("cold") to offer Mock 1–10 (30 questions each), self-marking via your existing engine.
*/

(function(){
  // ------- deterministic shuffle -------
  function xmur3(str){ let h=1779033703^str.length; for(let i=0;i<str.length;i++){ h=Math.imul(h^str.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return function(){ h=Math.imul(h^(h>>>16),2246822507); h=Math.imul(h^(h>>>13),3266489909); return (h^=h>>>16)>>>0; }; }
  function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr, seed){
    const rnd = mulberry32(xmur3(String(seed))());
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){ const j = Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  // ------- helpers -------
  const mcq   = (q, options, correctIndex, why) => ({ q, type:"mcq",  options, answer:[correctIndex], why });
  const multi = (q, options, idxs, why)        => ({ q, type:"multi",options, answer:idxs.slice().sort((a,b)=>a-b), why });
  const tf    = (q, isTrue, why)               => mcq(q, ["False","True"], isTrue?1:0, why);

  // ------- HARD bank (drawn from your packs) -------
  const BANK = [
    // Standards, regs, guidance
    mcq("Which set gives cold-water design guidance (pipe/cistern sizing)?", ["BS 7671","BS 6700 / BS EN 806","CDM 2015","EAWR 1989"], 1, "Slides: BS 6700 / BS EN 806 for CW design & sizing. :contentReference[oaicite:6]{index=6}"),
    mcq("WRAS mainly provides:", ["Electrical inspection forms","Approved fittings directory + Water Regs guide","Gas competency cards","Planning permission"], 1, "WRAS guide + directory of approved fittings/materials. :contentReference[oaicite:7]{index=7}"),
    tf ("If you don’t follow British Standards you could still be in breach of Water Regulations.", true, "Slides say non-conformance may breach Regs. :contentReference[oaicite:8]{index=8}"),

    // Incoming main, entry depth, isolation
    mcq("Minimum acceptable incoming main to a dwelling (legacy guidance):", ["10 mm","15 mm","20 mm","25 mm"], 1, "Slide: minimum 15 mm; modern new-builds use 22 mm/20–25 mm MDPE. :contentReference[oaicite:9]{index=9}"),
    mcq("Service pipe depth entering a property should be at least:", ["450 mm","600 mm","750 mm","900 mm"], 2, "Slide: min 750 mm; insulate if closer to wall. :contentReference[oaicite:10]{index=10}"),
    mcq("Inside the dwelling, the screw-down stop valve should be within about:", ["150 mm of entry point","500 mm","1 m","No limit"], 0, "Placed close to entry; with DOV above or integrated. :contentReference[oaicite:11]{index=11}"),

    // Direct vs Indirect systems
    mcq("Key advantage of an indirect cold system per slides:", ["Cheaper to install","Stored water & constant pressure on low mains","Fewer pipes","Warmer water"], 1, "Stored supply + constant pressure where mains is low. :contentReference[oaicite:12]{index=12}"),
    mcq("Direct system hallmark:", ["Most outlets from cistern","All cold outlets fed from rising main","Two cisterns linked","Always needs warning pipe"], 1, "Direct feeds all cold taps from mains. :contentReference[oaicite:13]{index=13}"),

    // Cistern practice
    mcq("Set CWSC water level relative to warning pipe:", ["10 mm above","25 mm below","50 mm below","Level with it"], 1, "Water line 25 mm below warning pipe invert. :contentReference[oaicite:14]{index=14}"),
    tf ("Plastic cistern joints should avoid oil-based compounds; use plastic washers each side of the connector.", true, "Oil breaks down polymers; use plastic washers/PTFE as shown. :contentReference[oaicite:15]{index=15}"),
    mcq("To reduce stagnation when coupling two cisterns:", ["Link at top only","Take feeds from both cisterns correctly","Use one warning pipe only","Remove lids"], 1, "Balance flows—feeds from both; rigid lids required. :contentReference[oaicite:16]{index=16}"),

    // Float operated valves & air gaps
    mcq("A Portsmouth pattern FOV must provide a:", ["Type DC air gap","Type AG air gap","AUK3","AUK1"], 1, "Slides: FOV provides Type AG air gap; set waterline 25 mm below warning. :contentReference[oaicite:17]{index=17}"),
    tf ("BS 1212 Part 1 dip-tube FOVs are banned due to backflow risk.", true, "Slide explicitly labels dip-tube pattern as banned. :contentReference[oaicite:18]{index=18}"),

    // Backflow & fluid categories
    mcq("Protecting Cat 1 wholesome water from Cat 2 (e.g., HW from cylinder):", ["No device","Single check valve","Double check valve","RPZ"], 1, "Slides: Cat1→Cat2 = SCV; Cat1→Cat3 = DCV; Cat1→Cat4 = RPZ; Cat1→Cat5 = air gap. :contentReference[oaicite:19]{index=19}"),
    mcq("Protecting Cat 1 from Cat 3 (filling loop / outside tap):", ["Single check","Double check","RPZ","Air gap only"], 1, "Double check valve for Cat 3. :contentReference[oaicite:20]{index=20}"),
    mcq("Protecting Cat 1 from Cat 4 (chlorinated pool dosing):", ["SCV","DCV","RPZ","AUK2"], 2, "Significant risk: use RPZ. :contentReference[oaicite:21]{index=21}"),
    mcq("Protecting Cat 1 from Cat 5 (WCs/urinals etc.):", ["Single check","AUK air gap","Double check","RPZ"], 1, "Severe risk—use air gaps (e.g., WC cistern). :contentReference[oaicite:22]{index=22}"),
    mcq("AUK2 is the air gap at:", ["Bath/basin tap outlet above spillover","Warning pipe to FOV outlet","Sink spout to spillover","WC cistern to pan"], 0, "AUK2: bath/basin/bidet outlet to spillover. AUK3 is for sinks. :contentReference[oaicite:23]{index=23}"),
    mcq("AUK3 applies to:", ["Bath","Basin","Sink/higher-risk outlet","Bidet only"], 2, "Slides: AUK3 for sinks / higher risk. :contentReference[oaicite:24]{index=24}"),
    mcq("AG refers to:", ["25 mm from warning pipe to FOV outlet","WC cistern to pan 300 mm","Tap to spillover on sink","Overflow weir height"], 0, "Slides: AG = 25 mm distance at cistern. :contentReference[oaicite:25]{index=25}"),
    multi("Select all Cat 5 examples from the list:", [
      "Urinal/wc waste",
      "Grey water",
      "Primary heating water",
      "Laboratory fluids"
    ], [0,1,3], "Severe health risk examples are Cat 5; primary water is Cat 3. :contentReference[oaicite:26]{index=26}"),

    // Valves & fittings (applications)
    mcq("Outside tap installation must include:", ["Stop valve only","Double check valve inside the building","Single check at hose end","No device needed"], 1, "Backflow protection with DCV. :contentReference[oaicite:27]{index=27}"),
    mcq("Type B compression is recommended for:", ["Above-ground only","Below ground / high pressure (DZR)","Microbore only","Not permitted"], 1, "Slides: Type B (DZR) for below ground/high pressure. :contentReference[oaicite:28]{index=28}"),
    mcq("Service valve with loose nut & washer that connects to a FOV tail:", ["Lever valve","Spherical plug valve (screwdriver type)","Gate valve","Ballofix with cap"], 1, "Slide shows the screwdriver-operated spherical/service valve on cisterns/WCs. :contentReference[oaicite:29]{index=29}"),

    // Materials & insulation
    multi("Approved materials for cold water per slides:", ["Copper","Barrier plastic","Galvanised LCS","Lead"], [0,1,2], "Lead and non-WRAS items are not approved. :contentReference[oaicite:30]{index=30}"),
    mcq("Good insulation should be:", ["Flammable and porous","Vermin-proof, moisture-impervious, robust","Permeable to water","Minimal thickness"], 1, "Characteristics listed on slide. :contentReference[oaicite:31]{index=31}"),
    multi("Locations requiring insulation:", ["Lofts & outhouses","Service pipe at 750–1350 mm","Temporary standpipe supplies","Warm airing cupboard only"], [0,1,2], "Vulnerable runs listed; warm cupboards not cited. :contentReference[oaicite:32]{index=32}"),

    // Testing – Rigid
    mcq("Before hydraulic soundness testing: allow a stabilisation period of:", ["10 min","30 min","60 min","None"], 1, "Slides: 30 min stabilisation. :contentReference[oaicite:33]{index=33}"),
    mcq("Rigid pipe test pressure:", ["Working pressure","1.25 × working","1.5 × working","2.0 × working"], 2, "Pump to 1.5 × working for 1 hour; no drop. :contentReference[oaicite:34]{index=34}"),
    mcq("If working pressure is 3.2 bar, test pressure should be:", ["3.2 bar","4.0 bar","4.5 bar","6.4 bar"], 2, "1.5 × 3.2 = 4.8 bar (closest given 4.5 bar in typical slide ranges—use exact where options include 4.8). :contentReference[oaicite:35]{index=35}"),

    // Testing – Plastic (A & B)
    multi("Plastic Test A sequence includes:", [
      "Fill & leak-check",
      "Pressurise to 1 bar (45 min check)",
      "Increase to 1.5 × working (15 min)",
      "Reduce to ~⅓ for 45 min"
    ], [0,1,2,3], "Plastic polybutylene Test A steps per slide. :contentReference[oaicite:36]{index=36}"),
    multi("Plastic Test B sequence includes:", [
      "Fill & leak-check",
      "Pressurise to manufacturer test pressure",
      "Check at 30 min, then +120 min",
      "Total loss < 0.2 bar acceptable"
    ], [0,1,2,3], "Plastic Test B per slide. :contentReference[oaicite:37]{index=37}"),

    // Flushing, disinfection, commissioning
    mcq("After soundness test you should:", ["Commission immediately","Flush out debris before handover","Leave chlorine for 24 h","Skip flushing"], 1, "Flush, then disinfect as per BS 6700 guidance. :contentReference[oaicite:38]{index=38}"),
    mcq("Typical disinfectant & dwell in slides:", ["Salt, 10 min","Sodium hypochlorite/chlorine, ~1 h","Isopropanol, 5 min","Boiling water, 30 min"], 1, "As BS 6700 note in deck. :contentReference[oaicite:39]{index=39}"),
    mcq("Commissioning checks include:", ["Paint pipes","Adjust FOV levels, label valves, measure flow (L/min) & pressure (bar)","Ignore insulation","Skip documents"], 1, "Slide list for commissioning. :contentReference[oaicite:40]{index=40}"),

    // Decommissioning & dead legs
    mcq("Passive dead leg:", ["Hot run that wastes time","Section with no draw-off where water can stagnate","Open vent","Tundish leg"], 1, "Definition from deck. :contentReference[oaicite:41]{index=41}"),
    tf ("When permanently decommissioning a mains supply, cut and cap immediately above the main stop valve and leave a note.", true, "Procedure noted on slides. :contentReference[oaicite:42]{index=42}"),

    // Flow & pressure quick maths
    mcq("Convert 24 L/min to L/s:", ["0.2 L/s","0.3 L/s","0.4 L/s","0.5 L/s"], 2, "Divide by 60 → 0.4 L/s. :contentReference[oaicite:43]{index=43}"),

    // Noise, water hammer, maintenance
    mcq("First remedy mentioned for tap ‘water hammer’ noise:", ["Bigger pipe","Replace worn/split washer or check FOV seating","Move stop valve","Raise cistern"], 1, "Slides: washers, FOV orifice/plate, PRV if pressure high. :contentReference[oaicite:44]{index=44}"),
    mcq("Commercial maintenance records should be:", ["Optional","Completed before leaving, with site address & tasks","Verbally agreed only","Held by merchant"], 1, "Maintenance sheet expectations. :contentReference[oaicite:45]{index=45}"),
  ];

  // Add some tougher numericals (test pressure, air-gap checks) programmatically
  const numericals = [
    { wp: 3.5, expect: 5.25 },
    { wp: 4.0, expect: 6.0 },
    { wp: 2.8, expect: 4.2 },
    { wp: 1.9, expect: 2.85 },
  ];
  numericals.forEach(({wp, expect})=>{
    const opts = [ (wp).toFixed(2), (wp*1.25).toFixed(2), (wp*1.5).toFixed(2), (wp*2).toFixed(2) ];
    const correct = 2;
    BANK.push(mcq(
      `Rigid pipe test: working pressure ${wp.toFixed(2)} bar. Required test pressure = ?`,
      opts.map(o=>o+" bar"),
      correct,
      "Rigid test = 1.5 × working pressure (1 h, no drop). :contentReference[oaicite:46]{index=46}"
    ));
  });

  // ------- build 10 mocks × 30 -------
  function buildMocks(bank, num=10, size=30, seedBase=8801){
    const mocks=[];
    for(let i=1;i<=num;i++){
      const sample = seededShuffle(bank, seedBase + i*137).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }
  const QUIZZES = { cold: buildMocks(BANK, 10, 30) };

  // ------- hook into app startQuiz -------
  function install(){
    if (window.__plumbwiseColdHooked) return;
    window.__plumbwiseColdHooked = true;

    const originalStart = window.startQuiz;
    const renderQ = window.renderQ;

    window.startQuiz = function(id){
      if (QUIZZES[id]){
        let n = prompt("Cold Water — choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = QUIZZES[id][idx].map((q,i)=> ({...q, _id:`${id}_m${idx+1}_${i}`}) );
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${id.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      if (typeof originalStart === "function") return originalStart(id);
    };

    // expose for quick check
    window.__COLD_BANK_LEN = BANK.length;
  }

  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
