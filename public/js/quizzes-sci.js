/* PlumbWise – SCIENCE mock generator (10 mocks × 30 Qs)
   Sources: “Science Revision” (doc) + “Key Plumbing Principles” (slides).
   Topics: density/relative density, pressure (ρgh), specific heat capacity,
           heat transfer (conduction/convection/radiation), pH, hardness/scale,
           siphonage, capillarity, expansion, SI units, basic electrics for plumbers,
           corrosion (electrolytic/atmospheric), practical scenarios.
   (c) PlumbWise
*/

(function(){
  // --- deterministic shuffle (seeded) ---
  function xmur3(str){ let h=1779033703^str.length; for(let i=0;i<str.length;i++){ h=Math.imul(h^str.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return function(){ h=Math.imul(h^(h>>>16),2246822507); h=Math.imul(h^(h>>>13),3266489909); return (h^=h>>>16)>>>0; }; }
  function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr, seed){
    const rnd = mulberry32(xmur3(String(seed))());
    const a = arr.slice();
    for (let i=a.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  // --- helpers ---
  const mcq   = (q, options, correctIndex, why)   => ({ q, type:"mcq",  options, answer:[correctIndex], why });
  const multi = (q, options, correctIdxs, why)    => ({ q, type:"multi",options, answer:correctIdxs.slice().sort((a,b)=>a-b), why });
  const tf    = (q, isTrue, why)                  => mcq(q, ["False","True"], isTrue?1:0, why);

  // --- SCIENCE bank (built from your two files) ---
  const BANK = [
    // Density & relative density
    mcq("Relative density of water is:", ["0","1","10","100"], 1, "Water ≈ 1 by definition."), // :contentReference[oaicite:2]{index=2}
    mcq("Which has the greatest relative density?", ["Air","Aluminium (2.7)","Copper (8.9)","Class C oil (0.79)"], 2, "From the table in slides."), // :contentReference[oaicite:3]{index=3}
    tf ("Water becomes less dense as it is heated.", true, "Molecules move further apart as temp rises."), // :contentReference[oaicite:4]{index=4}
    mcq("A material lighter than water (RD<1) will:", ["Sink","Float","Explode","Dissolve"], 1, "RD<1 floats."), // :contentReference[oaicite:5]{index=5}

    // Pressure (ρgh) and intensity of pressure
    mcq("Intensity of pressure in kN/m² is given by:", ["Head × 9.81","Area × 9.81","Mass ÷ Area","Flow × 9.81"], 0, "IOP=head×9.81."), // :contentReference[oaicite:6]{index=6}
    mcq("Approximate rule: 1 bar ≈", ["1 m head","3 m head","10 m head","100 m head"], 2, "1 bar ≈ 10 m water head."), // :contentReference[oaicite:7]{index=7}
    mcq("At 5 m head, intensity of pressure is closest to:", ["9.81 kN/m²","24.5 kN/m²","49.05 kN/m²","98.1 kN/m²"], 2, "5 × 9.81 ≈ 49.05."), // :contentReference[oaicite:8]{index=8}
    mcq("Liquids exert pressure:", ["Downward only","Upwards only","Outwards only","Downwards & outwards"], 3, "Liquids act in all directions on surfaces."), // :contentReference[oaicite:9]{index=9}
    mcq("Which gives greatest pressure on joists if capacity equal?", ["Large base cistern","Small base cistern","Tall & wide","Shape doesn’t matter"], 1, "Smaller base area → greater pressure."), // :contentReference[oaicite:10]{index=10}

    // Specific heat capacity (SHC)
    mcq("Definition of specific heat capacity:", ["Heat to raise 1 kg by 1°C","Heat to boil 1 kg","Heat lost at 0°C","Pressure at 1 m head"], 0, "Standard definition."), // :contentReference[oaicite:11]{index=11}
    mcq("Water SHC used in notes:", ["0.385 kJ/kg°C","4.186 kJ/kg°C","0.125 kJ/kg°C","9.81 kJ/kg°C"], 1, "Given in both packs."), // :contentReference[oaicite:12]{index=12}
    mcq("SHC calc uses:", ["Pressure × area","SHC × mass × temperature rise","Mass ÷ area","Flow × time"], 1, "Q = c × m × ΔT."), // :contentReference[oaicite:13]{index=13}
    mcq("Heating 10 L water by 50°C requires ≈", ["2093 kJ","209 kJ","1046 kJ","93 kJ"], 0, "10 kg × 4.186 × 50 ≈ 2093 kJ."), // :contentReference[oaicite:14]{index=14}

    // Heat transfer
    mcq("Conduction is:", ["Heat through a solid","Heat via fluid movement","Heat in straight lines through a vacuum","Chemical heat only"], 0, "Conduction through solids."), // :contentReference[oaicite:15]{index=15}
    mcq("Convection currents occur because fluids:", ["Become more dense when heated","Become less dense when heated","Don’t change density","Freeze"], 1, "Heat ↓ density → rise."), // :contentReference[oaicite:16]{index=16}
    mcq("Radiation travels:", ["Only in air","Only in solids","In straight lines and through a vacuum","Only in water"], 2, "Radiation needs no medium."), // :contentReference[oaicite:17]{index=17}

    // pH and water hardness
    mcq("pH of pure water is:", ["3","7","10","14"], 1, "Neutral pH 7."), // :contentReference[oaicite:18]{index=18}
    mcq("Hard water forms limescale above about:", ["45°C","60°C","65°C","80°C"], 2, "Temporary hardness releases CO₂ ≥65°C → scale."), // :contentReference[oaicite:19]{index=19}
    mcq("Hardness measurement often shown as:", ["ppm CaCO₃","pH units","bar","Pa"], 0, "pp m CaCO₃."), // :contentReference[oaicite:20]{index=20}
    multi("Ways to treat hard water (from notes):", ["Base-exchange softener","Magnetic unit","Electrical unit","Galvanic unit"], [0,1,2,3], "All listed in notes."), // :contentReference[oaicite:21]{index=21}

    // Siphonage & capillarity
    mcq("Siphonage occurs when pressure in the crown is:", ["Equal to atmospheric","Above atmospheric","Below atmospheric","Zero Kelvin"], 2, "Lower than atmospheric starts siphon."), // :contentReference[oaicite:22]{index=22}
    tf ("Capillary action can occur both vertically and horizontally.", true, "Adhesion + cohesion between close surfaces."), // :contentReference[oaicite:23]{index=23}
    mcq("Anti-capillary groove is used to:", ["Increase adhesion","Encourage leaks","Prevent water tracking into building","Slow flow in pipes"], 2, "Stops water being drawn back."), // :contentReference[oaicite:24]{index=24}

    // Expansion
    mcq("Coefficient of linear expansion is highest for:", ["Steel (0.000011)","Copper (0.000016)","Lead (0.000029)","UPVC (0.00018)"], 3, "PVC expands the most."), // :contentReference[oaicite:25]{index=25}
    mcq("12 m UPVC, +11°C rise, expansion ≈", ["2.0 mm","12 mm","23.7 mm","60 mm"], 2, "12,000 × 11 × 0.00018 ≈ 23.7 mm."), // :contentReference[oaicite:26]{index=26}

    // Pipe resistance / hydraulics
    mcq("Fittings add equivalent length. Which adds most on 15 mm?", ["Pulled bend (0.3 m)","Elbow (0.5 m)","Tee (0.6 m)","Stop valve (4.0 m)"], 3, "From resistance table."), // :contentReference[oaicite:27]{index=27}
    mcq("Greatest pressure at outlet is mainly from:", ["Pipe size","Head height","Water temperature","Colour"], 1, "Head gives pressure, not size."), // :contentReference[oaicite:28]{index=28}

    // SI units & basic electrics for plumbers
    mcq("SI unit for pressure:", ["Bar","Pascal (Pa)","kN","mH₂O"], 1, "Pa = N/m²."), // :contentReference[oaicite:29]{index=29}
    mcq("1 Pa equals:", ["1 N/m","1 N/m²","1 kg/m²","9.81 N/m²"], 1, "Definition."), // :contentReference[oaicite:30]{index=30}
    mcq("Domestic mains described as:", ["230 V single-phase AC","110 V DC","12 V DC","400 V three-phase DC"], 0, "From packs."), // :contentReference[oaicite:31]{index=31}
    mcq("Fuse size for ~3 kW appliance @230 V:", ["3 A","5 A","10 A","13 A"], 3, "3000/230 ≈ 13 A."), // :contentReference[oaicite:32]{index=32}
    mcq("Ohm’s law triangle letters:", ["W A V","V I R","P Q R","A C D"], 1, "V over I R."), // :contentReference[oaicite:33]{index=33}
    mcq("Power triangle letters:", ["W A V","V I R","J N P","A B C"], 0, "Watts=Volts×Amps etc."), // :contentReference[oaicite:34]{index=34}

    // Corrosion
    mcq("Electrolytic corrosion occurs when dissimilar metals are joined with:", ["No fluid","An electrolyte","Paint","Tape"], 1, "Water in system acts as electrolyte."), // :contentReference[oaicite:35]{index=35}
    mcq("Sacrificial anode in cylinders is typically:", ["Zinc","Magnesium","Aluminium","Lead"], 1, "Magnesium used."), // :contentReference[oaicite:36]{index=36}
    mcq("Atmospheric corrosion of ferrous metals can be reduced by:", ["Leaving bare","Regular painting/lagging","More elbows","Smaller pipes"], 1, "Paint/lag as per notes."), // :contentReference[oaicite:37]{index=37}
    tf ("‘DZ’ on brass fitting stands for dezincification resistant.", true, "Marked on modern brass fittings."), // :contentReference[oaicite:38]{index=38}

    // Water classification / hardness recap
    mcq("Temporary hardness can be removed by:", ["Boiling","Magnets only","Electrolysis only","Painting pipes"], 0, "Boiling drives off CO₂."), // :contentReference[oaicite:39]{index=39}
    mcq("Soft water drawback mentioned:", ["Neutral pH","Acidic → can increase electrolytic corrosion","Alkaline scale","No effect"], 1, "Notes flag acidity issue."), // :contentReference[oaicite:40]{index=40}

    // Practical scenarios from workbook
    mcq("Guttering expansion over 8 m with 15°C rise, PVC 0.00018:", ["10.8 mm","21.6 mm","32.4 mm","54 mm"], 1, "8000×15×0.00018 ≈ 21.6 mm."), // :contentReference[oaicite:41]{index=41}
    mcq("Cylinder foam insulation purpose includes:", ["Decoration only","Reduce heat loss (Part L)","Stop corrosion only","Increase mass"], 1, "Efficiency + Part L note."), // :contentReference[oaicite:42]{index=42}
    mcq("LPG relative density (>1) means leaks:", ["Rise to ceiling","Sink to low points/drains","Stay mid-room","Evaporate instantly"], 1, "Heavier than air → low level risk."), // :contentReference[oaicite:43]{index=43}

    // More ρgh numericals / selections
    mcq("IOP at 3 m head ≈", ["19.62 kN/m²","24.71 kN/m²","29.43 kN/m²","39.24 kN/m²"], 2, "3×9.81."), // :contentReference[oaicite:44]{index=44}
    mcq("Total pressure = IOP ×", ["Head","Volume","Area","Mass"], 2, "As per slides example."), // :contentReference[oaicite:45]{index=45}

    // Metals & materials definitions
    mcq("A ferrous metal:", ["Contains iron and can rust","Never rusts","Is plastic","Floats on water"], 0, "Definition in notes."), // :contentReference[oaicite:46]{index=46}
    mcq("An alloy example used by plumbers:", ["Copper only","Brass (Cu+Zn)","Pure lead only","Tin only"], 1, "Brass: compression fittings etc."), // :contentReference[oaicite:47]{index=47}

    // Extra: signs & simple recall
    mcq("Atmospheric pressure at sea level (approx):", ["1 Pa","101.3 kPa","1 MPa","10 bar"], 1, "≈101.3 kPa."), // :contentReference[oaicite:48]{index=48}
    mcq("Best conductor listed:", ["Wood","Glass","Copper","Brick"], 2, "Thermal conductivity list."), // :contentReference[oaicite:49]{index=49}
  ];

  // Build 10 mocks × 30 Qs
  function buildMocks(bank, num=10, size=30, seedBase=7613){
    const mocks = [];
    for (let i=1;i<=num;i++){
      const sample = seededShuffle(bank, seedBase + i*101).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }
  const QUIZZES = { sci: buildMocks(BANK, 10, 30) };

  // Hook into app startQuiz (same pattern as other packs)
  function install(){
    if (window.__plumbwiseSciHooked) return;
    window.__plumbwiseSciHooked = true;

    const originalStart = window.startQuiz;
    const renderQ = window.renderQ;

    window.startQuiz = function(id){
      if (QUIZZES[id]){
        let n = prompt("Scientific Principles — choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = QUIZZES[id][idx].map((q,i)=> ({...q, _id:`${id}_m${idx+1}_${i}`}) );
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${id.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      if (typeof originalStart === "function") return originalStart(id);
    };

    // Expose for quick checks
    window.__SCI_BANK_LEN = BANK.length;
  }

  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
