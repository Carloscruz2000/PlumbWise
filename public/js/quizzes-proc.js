/* PlumbWise – COMMON PLUMBING PROCESSES (hard) – 10 mocks × 30 Qs
   Source: "Common Plumbing Processes – Level 2 6129 Revision". (Your slides)
   Topics: BS 8000/6700, contract docs, pipe bending math, copper/LCS grades,
           clip spacing, hydraulic benders (spring-back), jointing (Type A/B, capillary),
           solvent/fusion welding, drawing symbols, tools, paperwork, works programme,
           joist notching & drilling (Part A), fixings/tiles, site roles, customer care,
           WRAS/Water Regs cert, decommissioning/disinfection, maintenance/PPM, Part P.
   (c) PlumbWise – deterministic mocks that plug into your existing quiz engine.
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

  // ---------- bank (HARD) ----------
  const BANK = [
    // Standards & specs
    mcq("Which British Standard covers workmanship on building sites (16 parts)?", ["BS 6700","BS 8000","BS EN 806","BS 5950"], 1, "Slides note BS 8000 workmanship sections. :contentReference[oaicite:1]{index=1}"),
    mcq("BS 6700 (as taught in slides) gives guidance on:", ["Gas flue sizing only","Soundness test, clip spacings, hot & cold supplies","Structural steelwork","Electrical inspection"], 1, "BS 6700: water systems + clip distances. :contentReference[oaicite:2]{index=2}"),
    mcq("A variation order typically comes from:", ["Client’s neighbour","Clerk of Works","Installer","Building Control"], 1, "VOs issued by Clerk of Works per notes. :contentReference[oaicite:3]{index=3}"),

    // Pipe bending maths – quarter circumference addition
    mcq("Exact extra length to add for a neat 90° bend of radius R is:", ["R×π","(π/2)×R","(π/4)×R","2πR"], 1, "Quarter of circumference: (π/2)R. :contentReference[oaicite:4]{index=4}"),
    mcq("You need 500 mm then a 90° of R=60 mm then 600 mm. Total cut length:", ["1100.0 mm","1194.2 mm","1160.0 mm","1240.0 mm"], 1, "500+600+(π/2×60)=1100+94.2=1194.2 mm. :contentReference[oaicite:5]{index=5}"),
    mcq("For A=700 mm, B=600 mm, R=90 mm, total length is:", ["1413.0 mm","1441.3 mm","1490.0 mm","1520.3 mm"], 1, "1300 + (π/2×90)=1300+141.3=1441.3 mm. :contentReference[oaicite:6]{index=6}"),
    mcq("Why does a formed bend appear to ‘gain’ length?", ["Work hardening","A–B–C path > A–C straight line","Elastic memory","Tooling slack"], 1, "Arc adds path length vs straight chord. :contentReference[oaicite:7]{index=7}"),

    // Copper grades
    mcq("Old ‘Table X’ copper roughly maps to:", ["R290","R250","R220","R200"], 1, "Table X → R250 everyday above-ground bendable. :contentReference[oaicite:8]{index=8}"),
    mcq("Which is soft coiled copper used for microbore/oil lines?", ["Table Z (R290)","Table W (R220)","Table X (R250)","Table Y (R250/R220) straight"], 1, "Table W soft coil. :contentReference[oaicite:9]{index=9}"),
    mcq("Table Z (R290) is described as:", ["Hard thin-wall non-bendable (export)","Everyday thin-wall bendable","Soft coil only","Below-ground only"], 0, "Slide: hard tempered thin wall, non bendable. :contentReference[oaicite:10]{index=10}"),

    // Clip spacings (BS 6700 table on slide)
    mcq("BS 6700 clip spacing (horizontal) for 15 mm copper:", ["0.6 m","1.2 m","1.8 m","2.4 m"], 1, "15 mm: 1.2 m horiz / 1.8 m vert. :contentReference[oaicite:11]{index=11}"),
    mcq("BS 6700 clip spacing (vertical) for 22 mm copper:", ["1.2 m","1.8 m","2.4 m","3.0 m"], 2, "22 mm: 1.8 m horiz / 2.4 m vert. :contentReference[oaicite:12]{index=12}"),
    mcq("BS 6700 clip spacing (horizontal) for 28 mm copper:", ["1.2 m","1.8 m","2.4 m","3.0 m"], 1, "28 mm: 1.8 m horiz / 2.4 m vert. :contentReference[oaicite:13]{index=13}"),

    // Benders & spring-back
    mcq("When using a hydraulic bender for LCS, a ‘square bend’ should be pulled to about:", ["88°","90°","95°","100°"], 2, "Over-bend ~5° to allow spring-back. :contentReference[oaicite:14]{index=14}"),
    mcq("Tripod/hand bender tip from slides:", ["Under-pull and flex forward","Over-pull slightly then ease back to angle","Strike with hammer to free","Use oil on copper"], 1, "Slight over-pull then back to exact. :contentReference[oaicite:15]{index=15}"),

    // LCS pipe practice
    mcq("Colour for heavy gauge LCS per slides:", ["Blue","Red","Brown","Green"], 1, "Red=heavy, Blue=medium, Brown=light. :contentReference[oaicite:16]{index=16}"),
    mcq("Before using a hydraulic LCS bender, check:", ["Water level","Oil level in reservoir","Gas charge","Nothing"], 1, "Avoid seal damage; oil level. :contentReference[oaicite:17]{index=17}"),
    mcq("Threading LCS may be done by:", ["Only bench machine","Hand or powered handheld/floor machine","Lathe only","Die-less press"], 1, "Slides list multiple threading methods. :contentReference[oaicite:18]{index=18}"),

    // Jointing & fittings
    mcq("Type A compression fittings (slides):", ["Below ground OK","Above ground only","Gas only","Unvented only"], 1, "Type A above ground; Type B (DZR) for below/high pressure. :contentReference[oaicite:19]{index=19}"),
    mcq("Type B compression is suitable for:", ["Only visible pipework","High pressure/below ground (DZR)","Microbore only","Not permitted"], 1, "DZR Type B below ground/high pressure. :contentReference[oaicite:20]{index=20}"),
    multi("Capillary soldering good practice includes:", [
      "De-burr tube before fluxing",
      "Use solder mat to protect fabric",
      "Heat the solder not the fitting",
      "End-feed needs added solder"
    ], [0,1,3], "Heat fitting, not solder; end-feed needs solder. :contentReference[oaicite:21]{index=21}"),
    mcq("Solder-ring fittings per slide carry roughly:", ["Same solder as end-feed","3–5× the amount needed","No solder—just flux","Lead solder only"], 1, "Slides: 3–5× in ring fittings. :contentReference[oaicite:22]{index=22}"),
    mcq("Blue MDPE to copper is joined via:", ["Solder elbow","Push-fit without insert","Compression with copper insert","Solvent weld"], 2, "Compression + copper insert per slide. :contentReference[oaicite:23]{index=23}"),

    // Plastics & welding
    multi("Plastic jointing types listed:", ["Mechanical","Solvent welding","Fusion welding","Sweating"], [0,1,2], "Three families shown. :contentReference[oaicite:24]{index=24}"),

    // Drawing symbols (recognition – conceptual rather than image)
    mcq("A symbol with triangle ‘direction of flow’ is used to indicate:", ["Pipe at high level","Flow direction","Hose union","Strainer"], 1, "From symbol sheet. :contentReference[oaicite:25]{index=25}"),
    mcq("A small ‘T’ in circle symbol (per sheet) typically denotes:", ["Drain-off valve","Thermostatic valve","Draw-off point (tap)","Gas meter"], 2, "Tap/draw-off symbol list. :contentReference[oaicite:26]{index=26}"),

    // Tools
    mcq("Which tool is used to undo taps and connectors in tight spots?", ["Stilsons","Hocked basin spanner","Club hammer","Junior hacksaw"], 1, "Named in tools table. :contentReference[oaicite:27]{index=27}"),
    mcq("Immersion heater removal tool:", ["Strap wrench","Immersion heater spanner","Box spanner 22 mm","Pipe slice"], 1, "Explicit in tools list. :contentReference[oaicite:28]{index=28}"),

    // Paperwork & site process
    mcq("Delivery advice note purpose:", ["Quotation","Confirms materials delivered type/number","Invoice request","Timesheet"], 1, "Slides define paperwork terms. :contentReference[oaicite:29]{index=29}"),
    mcq("A monthly summary from the merchant is a:", ["Statement","Requisition","Order","Receipt"], 0, "Statement per slides. :contentReference[oaicite:30]{index=30}"),
    mcq("Progress/sequence chart on site is called:", ["Gantt","Works programme","RAMS","CDM plan"], 1, "Works programme term used repeatedly. :contentReference[oaicite:31]{index=31}"),

    // Joists – Part A rules
    mcq("Max hole diameter in joist per slide rule:", ["D/8","D/4 (cap 250 mm)","D/3","D/2"], 1, "Holes on centre line up to D/4 (≤250 mm). :contentReference[oaicite:32]{index=32}"),
    mcq("Max notch depth allowed is:", ["D/10","D/8","D/6","D/4"], 1, "Notch depth ≤ D/8; notch zone 0.07–0.25×span. :contentReference[oaicite:33]{index=33}"),
    mcq("Notchable zone along the span is between:", ["0–0.07 S","0.07 S to 0.25 S","0.25 S to 0.5 S","Anywhere"], 1, "Minimum zone 0.07 S; maximum 0.25 S. :contentReference[oaicite:34]{index=34}"),

    // Fixings, tiles, drilling
    mcq("Drilling tiles best practice includes:", ["Use hammer on","Adhesive tape to start, drill OFF hammer","Push rawl plug flush with tile","No need to check for cables"], 1, "Tape for bite, off-hammer; set plug beyond tile. :contentReference[oaicite:35]{index=35}"),
    mcq("Before drilling any wall the slide advises:", ["Check for voids only","Use cable/pipe tracer","Aim for mortar only","Use largest bit first"], 1, "Tracer for hidden services. :contentReference[oaicite:36]{index=36}"),

    // Roles
    mcq("Who ensures drawings meet regs on health, safety & conservation?", ["Architect","Building Control Officer","Quantity Surveyor","Main contractor"], 1, "BCO responsibility stated. :contentReference[oaicite:37]{index=37}"),

    // Customer care / working in properties
    mcq("When replacing components in a dwelling you should first:", ["Replace and inform later","Seek customer approval","Only ask site manager","Do it at end of day"], 1, "Customer approval highlighted. :contentReference[oaicite:38]{index=38}"),
    mcq("On multi-property outside stop-valve shutdowns:", ["No notice needed","Notify all affected dwellings in advance","Notify only landlord","Tape a note to valve"], 1, "Advance notice per slide. :contentReference[oaicite:39]{index=39}"),

    // Benchmark & handover
    mcq("Part L update introduced full ‘Benchmark’ commissioning &:", ["No documents left","Leave all user/operating instructions with customer","Engineer keeps instructions","Only gas safe cert"], 1, "Explicitly stated on slides. :contentReference[oaicite:40]{index=40}"),

    // Maintenance & PPM
    mcq("PPM schedules are designed chiefly to:", ["Create emergency work","Avoid breakdowns by planning maintenance","Replace all parts annually","Reduce paperwork"], 1, "PPM = planned preventative maintenance. :contentReference[oaicite:41]{index=41}"),
    mcq("For showers/macerators/valves the slides say always refer to:", ["BS 8000 only","Manufacturer’s instructions","WRAS directory only","Merchant"], 1, "Install/maintenance by MIs. :contentReference[oaicite:42]{index=42}"),

    // Decommissioning/Disinfection
    mcq("Before disinfecting a water system consult:", ["HSE only","COSHH data sheet + manufacturer’s instructions","Architect","QS"], 1, "Slides: COSHH + MI before disinfection. :contentReference[oaicite:43]{index=43}"),
    mcq("Before discharging disinfectant to sewer the plumber should:", ["Ask neighbour","Inform local water undertaker","Call fire brigade","Do nothing"], 1, "Notify undertaker per slides. :contentReference[oaicite:44]{index=44}"),

    // Water Regs & WRAS
    mcq("On completion of cold water system by approved contractor you hand over:", ["Gas safety cert","Water Regulations completion certificate","CDM F10","EICR"], 1, "Water Regs certificate noted. :contentReference[oaicite:45]{index=45}"),
    mcq("WRAS provides:", ["Electrical guidance","Approved directory of fittings & materials","Boiler benchmarking","G3 only"], 1, "Slides explicitly mention WRAS directory. :contentReference[oaicite:46]{index=46}"),

    // Part P ‘Notifiable?’ (list from slide)
    multi("Notifiable work examples from the slide table include:", [
      "Complete rewire / new installation",
      "Consumer unit change",
      "New shower circuit",
      "Replacing a light fitting"
    ], [0,1,2], "Rewire, CU change, new shower circuit are notifiable; replacing a light fitting is not. :contentReference[oaicite:47]{index=47}"),

    // Sleeving & below ground
    mcq("Pipes passing through masonry should be:", ["Painted only","Sleeved (copper or LCS)","Lagged only","Left bare"], 1, "Sleeving requirement on slide. :contentReference[oaicite:48]{index=48}"),
  ];

  // extra HARD numericals (randomised variants)
  // Generate several computation variants to increase difficulty
  function addNumericalVariants(){
    const radii = [45, 60, 75, 90]; // mm
    const pairs  = [
      [350, 480],[420, 630],[515, 585],[600, 700]
    ];
    pairs.forEach(([A,B], idx)=>{
      const R = radii[idx % radii.length];
      const extra = Math.round((Math.PI/2 * R) * 10)/10; // one decimal
      const total = Math.round((A+B + (Math.PI/2*R)) * 10)/10;
      BANK.push(mcq(
        `Cut length for A=${A} mm, B=${B} mm, R=${R} mm (90°):`,
        [
          `${(A+B).toFixed(1)} mm`,
          `${(A+B+R).toFixed(1)} mm`,
          `${total.toFixed(1)} mm`,
          `${(A+B+2*R).toFixed(1)} mm`
        ],
        2,
        `Add (π/2)R = ${extra} mm to A+B = ${A+B} → ${total} mm. :contentReference[oaicite:49]{index=49}`
      ));
    });
  }
  addNumericalVariants();

  // ---------- build mocks ----------
  function buildMocks(bank, num=10, size=30, seedBase=5129){
    const mocks=[];
    for (let i=1;i<=num;i++){
      const seed = seedBase + i*173;
      const sample = seededShuffle(bank, seed).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }
  const QUIZZES = { proc: buildMocks(BANK, 10, 30) };

  // ---------- hook into existing startQuiz ----------
  function install(){
    if (window.__plumbwiseProcHooked) return;
    window.__plumbwiseProcHooked = true;

    const originalStart = window.startQuiz;
    const renderQ = window.renderQ;

    window.startQuiz = function(id){
      if (QUIZZES[id]){
        let n = prompt("Common Plumbing Processes — choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = QUIZZES[id][idx].map((q,i)=> ({...q, _id:`${id}_m${idx+1}_${i}`}) );
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${id.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      if (typeof originalStart === "function") return originalStart(id);
    };

    // expose for quick checks
    window.__PROC_BANK_LEN = BANK.length;
  }

  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
