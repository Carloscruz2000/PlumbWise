/* PlumbWise – COMMUNICATIONS / EFFECTIVE WORKING RELATIONSHIPS & EMPLOYMENT RIGHTS (hard)
   Module id: "comm"
   Produces: 10 deterministic mocks × 30 questions each (self-marking) and hooks your startQuiz("comm").

   Topics (UK-focused, stable syllabus items):
     - Site roles & responsibilities: Client, Architect, Main Contractor, Site Manager, Clerk of Works, QS
     - Construction/installation documents: drawings/specs, method statements, RAMS, permits, delivery notes, statements
     - Professional communication: toolbox talks, emails, RFIs, variation requests, site diaries, benchmarking/handovers
     - Teamwork & conflict handling: active listening, DESC model, escalation paths, safeguarding, customer care
     - Employment Rights & Responsibilities: basic rights, contracts, payslips, SSP, maternity/paternity/adoption basics
     - Equality, Diversity & Inclusion: Equality Act 2010 protected characteristics, harassment/victimisation concepts
     - Working Time Regulations: 48 h average, 5.6 weeks’ leave, 20-min break ≥6 h, daily/weekly rest, young workers
     - GDPR/data basics at work: data minimisation, confidentiality, secure handling of customer info/photos
     - ACAS code: disciplinary & grievance principles (informal → formal, investigate, hearing, appeal)
     - Health & safety duties (at work, non-gas-specific): employer/employee responsibilities, PPE, reporting lines

   NOTE: This pack avoids time-sensitive pay rates, and uses widely taught constants (e.g., 5.6 weeks’ leave, 48h avg).

   (c) PlumbWise
*/

(function(){
  // ---------- deterministic shuffle ----------
  function xmur3(str){ let h=1779033703^str.length; for(let i=0;i<str.length;i++){ h=Math.imul(h^str.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return function(){ h=Math.imul(h^(h>>>16),2246822507); h=Math.imul(h^(h>>>13),3266489909); return (h^=h>>>16)>>>0; }; }
  function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
  function seededShuffle(arr, seed){
    const rnd = mulberry32(xmur3(String(seed))());
    const a = arr.slice();
    for (let i=a.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  // ---------- helpers ----------
  const mcq   = (q, options, correctIndex, why) => ({ q, type:"mcq",  options, answer:[correctIndex], why });
  const multi = (q, options, idxs, why)        => ({ q, type:"multi",options, answer:idxs.slice().sort((a,b)=>a-b), why });
  const tf    = (q, isTrue, why)               => mcq(q, ["False","True"], isTrue?1:0, why);

  // =====================================================================
  // COMMUNICATIONS / EWR BANK (HARD)  — ~90 Qs (mocks take 30 each)
  // =====================================================================
  const BANK = [
    // Site roles & responsibilities
    mcq("Who is primarily responsible for day-to-day site coordination and safety briefings?", ["Client","Architect","Site Manager","Quantity Surveyor"], 2, "Site Manager runs daily coordination and toolbox talks."),
    mcq("A Clerk of Works mainly:", ["Designs the system","Checks workmanship against drawings/specs","Writes the O&M manual","Prices variations"], 1, "CoW inspects quality vs specification."),
    mcq("Quantity Surveyor’s main function:", ["Measure/price work, valuations, variations","Daily supervision","Design approvals","Health surveillance"], 0, "QS deals with cost and measurement."),
    mcq("Building Control Officer (BCO) on domestic work:", ["Approves planning consent","Checks compliance with Building Regulations","Issues gas safe certs","Acts as client’s designer"], 1, "BCO checks compliance with Building Regs."),

    // Documents & drawings
    mcq("RAMS stands for:", ["Risk Assessment & Method Statement","Regulations And Mandatory Standards","Risk Avoidance & Management Scheme","Report And Maintenance Schedule"], 0, "Common safety planning document set."),
    mcq("A method statement should primarily describe:", ["Programme dates only","How to do the work safely and correctly step-by-step","Who pays for materials","Tender exclusions"], 1, "It is the ‘how’ document aligned to the risk assessment."),
    mcq("A delivery advice note is used to:", ["Request quotation","Confirm goods delivered type/quantity","Create invoice automatically","Replace a statement"], 1, "Proof of materials delivered."),
    mcq("A monthly statement from the merchant:", ["Is a warranty","Lists transactions/balances for the period","Is a delivery note","Is a drawing"], 1, "Reconciles deliveries/invoices."),
    mcq("RFI on site means:", ["Request For Information to clarify drawings/specs","Report For Incident","Ready For Inspection","Return For Invoice"], 0, "Use RFIs to resolve ambiguities."),
    mcq("Benchmark/Commissioning log at handover is important because:", ["Replaces all instructions","Proves no defects will occur","Demonstrates tests/settings and supports warranty/Part L compliance","Covers only electrical tests"], 2, "It documents set-up and compliance."),

    // Professional communication & customer care
    mcq("Best first step when a client disputes work scope on site:", ["Argue on the spot","Stop work immediately without notice","Calmly review the contract/spec and raise an RFI/variation in writing","Ignore and carry on"], 2, "Keep it professional and documented."),
    multi("Good email practice to avoid disputes:", [
      "Use clear subject, reference drawing/room",
      "Confirm agreed changes in writing",
      "Avoid attaching photos",
      "Summarise decisions and next steps"
    ], [0,1,3], "Clarity + written confirmation + action points."),
    mcq("A site diary should record:", ["Only start/finish times","Progress, workforce, deliveries, instructions, issues, photos","Nothing if it’s a small job","Client’s personal data"], 1, "A clear factual record protects everyone."),
    mcq("DESC model in conflict stands for:", ["Describe, Express, Specify, Consequences","Decide, Explain, Solve, Close","Describe, Examine, Solve, Check","Define, Engage, Support, Conclude"], 0, "Useful framework for assertive communication."),

    // Equality, Diversity & Inclusion (Equality Act 2010)
    mcq("A protected characteristic under the Equality Act 2010 includes:", ["Hair colour","Political party","Religion or belief","Driving status"], 2, "Religion or belief is protected; hair colour/politics are not listed."),
    multi("Harassment involves unwanted conduct related to PC that:", [
      "Violates someone’s dignity",
      "Creates an intimidating/hostile environment",
      "Is always physical only",
      "Can be a single serious incident"
    ], [0,1,3], "Can be verbal/non-verbal; single serious act may be enough."),
    tf ("Victimisation occurs when someone is treated badly for making/supporting a complaint of discrimination.", true, "That treatment is unlawful."),

    // Employment basics (contracts, pay, payslip)
    mcq("A written statement/contract should usually include:", ["Only job title","Pay, hours, holiday entitlement, notice period","Holiday only","Company logo"], 1, "Core particulars are required."),
    mcq("A payslip must show:", ["Bonus only","Total pay and deductions","Manager’s signature","Only net pay"], 1, "Gross, deductions, and net must be visible."),
    mcq("Zero-hours contract means:", ["No employment rights","No guaranteed hours but statutory rights still apply","Guaranteed 48 hours","Self-employed only"], 1, "Basic statutory rights still apply."),

    // Working Time Regulations (WTR) (stable teaching points)
    mcq("Average weekly working time limit (adult, unless opted-out):", ["40 hours","42 hours","48 hours","60 hours"], 2, "48 h average limit over reference period."),
    mcq("Statutory annual leave for a full-time worker in the UK is:", ["4.0 weeks","5.0 weeks","5.6 weeks","6.0 weeks"], 2, "5.6 weeks includes bank holidays as employer chooses."),
    mcq("Minimum uninterrupted rest break during a shift ≥6 hours:", ["10 minutes","15 minutes","20 minutes","30 minutes"], 2, "At least 20 minutes continuous."),
    mcq("Minimum daily rest (adult worker) between working days:", ["8 hours","10 hours","11 hours","12 hours"], 2, "11 hours continuous rest."),
    mcq("Minimum weekly rest (adult worker):", ["12 hours","24 hours","24 hours plus daily rest","48 hours mandatory"], 1, "At least 24 hours or 48 hours per fortnight."),

    // Family-friendly & sickness (high-level, non-rate)
    mcq("Statutory Sick Pay (SSP) is:", ["An optional benefit only","A statutory payment if eligibility met","Paid only by government directly","A bonus scheme"], 1, "Employers pay SSP where criteria are met."),
    mcq("Maternity leave entitlement (framework):", ["26 weeks only","52 weeks total (Ordinary + Additional)","12 weeks","Only unpaid"], 1, "Employees may take up to 52 weeks in total."),

    // Data protection at work (practical GDPR basics)
    multi("Good practice when handling customer data/photos:", [
      "Get consent or ensure a lawful basis",
      "Only keep what you need (minimisation)",
      "Share freely on social media",
      "Secure storage and controlled sharing"
    ], [0,1,3], "Minimise, secure, and respect lawful basis."),
    mcq("Accidentally emailing customer details to the wrong recipient:", ["Ignore it","Recall email and report per policy (possible breach)","Print it and file","Delete from sent items only"], 1, "Follow breach/incident process."),

    // ACAS discipline & grievance (principles)
    mcq("First step encouraged by the ACAS Code before a formal disciplinary:", ["Immediate dismissal","Informal discussion where appropriate","Police report","Public notice"], 1, "Try to resolve informally where suitable."),
    multi("A fair disciplinary process usually includes:", [
      "Investigation",
      "Written invite with evidence",
      "Hearing with right to be accompanied",
      "Appeal stage"
    ], [0,1,2,3], "Those are core ACAS stages."),
    mcq("A grievance is:", ["Employer complaint against supplier","Employee raising workplace concern/complaint","Customer feedback","Legal claim only"], 1, "Handled under a grievance procedure."),

    // Health & safety responsibilities (at work, non-gas specific)
    mcq("Employees must:", ["Provide PPE to employer","Take reasonable care for own/others’ safety and follow training","Write the method statement","Act as Principal Designer"], 1, "Follow training/procedures, use PPE correctly."),
    mcq("If you spot a serious H&S risk:", ["Carry on to hit program","Report immediately to your supervisor/site manager","Post it on social media","Tell no one"], 1, "Escalate promptly through the correct channel."),

    // Professional standards & ethics
    mcq("Good professional behaviour when entering a customer’s home:", ["No ID needed","Wear muddy boots","Show ID, explain work, protect surfaces, be polite","Ask to use their tools"], 2, "Professionalism builds trust."),
    tf ("You should refuse to work if a task would breach safety rules or you are not competent for it.", true, "Raise it with your supervisor; competence and safety first."),
    mcq("If a colleague makes discriminatory jokes on site:", ["Ignore to keep peace","Join in","Challenge appropriately or escalate per policy","Film it and post online"], 2, "Follow dignity at work policy."),

    // Variations, changes & records
    mcq("A variation order (VO) authorises:", ["Any change without record","Work scope/time/cost changes approved and documented","Payment withholding","Holiday change"], 1, "Proceed only when authorised."),
    mcq("Best way to evidence hidden work (e.g., within walls):", ["Memory only","Verbal update","Before/after dated photos plus notes","Invoice alone"], 2, "Photos + notes protect everyone."),
    mcq("When a manufacturer’s instruction conflicts with a generic guide:", ["Ignore MI","Follow MI where it’s the authority for that product","Flip a coin","Ask merchant to decide"], 1, "MI usually governs that product’s install/commissioning."),

    // Safeguarding/customer vulnerability (professional practice)
    mcq("Customer appears vulnerable/distressed during visit:", ["Rush the job","Ignore it","Follow company safeguarding guidance; be patient and professional","Cancel job permanently"], 2, "Follow safeguarding and be respectful."),

    // Pay & deductions basics (no rates)
    mcq("Unlawful deduction from wages means:", ["Any tax deduction","Any pension deduction","Deduction not required by law or agreed in writing","Student loan deduction"], 2, "Must be lawful and agreed or required."),
    mcq("A ‘protected disclosure’ (whistleblowing) concerns:", ["Personal gossip","Personal grievance about pay only","Public interest disclosure on wrongdoing (e.g., safety, legal breach)","Holiday booking"], 2, "Protected under whistleblowing law where criteria met."),

    // Communication channels & records
    multi("Which should you keep as project records?", [
      "Site diary entries",
      "Key emails/variations approvals",
      "Test/commissioning sheets",
      "Personal social media posts"
    ], [0,1,2], "Keep formal records, not personal social media."),
    mcq("Toolbox talks are for:", ["Weekly payroll","Short, focused safety/quality briefings","Design approvals","Customer complaints"], 1, "Regular short briefings on key risks/controls."),
    mcq("Clear handover to the occupant should include:", ["No paperwork","O&M/MI, controls explanation, contacts, user safety info","Only building regs","Only photos"], 1, "Good handover reduces callbacks and risks."),

    // Escalation & chain of command
    mcq("If drawings conflict with site conditions:", ["Guess the intent","Install anyway","Raise RFI with photos/notes via the site manager","Ignore and proceed"], 2, "Don’t assume—seek instruction with evidence."),
    mcq("Who normally signs off a variation on site?", ["Any operative","Site Manager/Contract Administrator per contract","Merchant","Neighbour"], 1, "Follow the contract’s authority chain."),

    // Ethics & confidentiality
    tf ("You must not share customer contact details or door codes outside the job requirement.", true, "Confidentiality & data minimisation apply."),
    mcq("Before sharing job photos publicly you should:", ["Always post for marketing","Check consent/policy and remove personal data","Add GPS tags","Include invoices"], 1, "Respect privacy & policy."),

    // Young workers basics (WTR)
    mcq("Young workers (under 18) generally have:", ["Same rest as adults","Less rest entitlement","Stronger rest protections (e.g., longer breaks/rest)","No protections"], 2, "Young workers have additional protections."),
    mcq("If your average hours exceed 48 without an opt-out:", ["It’s fine","Compliant automatically","Likely non-compliant with WTR","Only a tax issue"], 2, "Requires an opt-out and safeguards."),

    // More ACAS/discipline scenarios
    mcq("You receive an investigation invite for alleged misconduct. You should:", ["Refuse to attend","Attend, read evidence, prepare response, you may be accompanied","Record secretly and share online","Ignore it"], 1, "Fair process: investigation → hearing → appeal."),
    mcq("In a grievance, if not resolved informally:", ["Don’t write anything","Submit formal written grievance following policy","Go public online","Phone ACAS only"], 1, "Follow the company procedure first."),

    // Practical comms numericals (scheduling/leave)
    mcq("Full-time annual leave 5.6 weeks. For a 5-day worker, that equals:", ["20 days","25 days","28 days","31 days"], 2, "5.6 × 5 = 28 days (incl. bank hols at employer’s choice)."),
    mcq("A 9-hour shift qualifies you for at least:", ["10-min break","20-min uninterrupted break","30-min paid meal","Two 20-min breaks by law"], 1, "≥6 h → ≥20-min continuous break."),

    // Professional boundaries & refusals
    mcq("Customer insists on unsafe method to ‘save time’. You should:", ["Agree for reviews","Refuse and explain safely; propose compliant alternative; escalate if needed","Let them sign a waiver","Proceed then report later"], 1, "Safety and compliance first."),

    // Extra scenarios to deepen the bank
    multi("Good meeting minutes should capture:", [
      "Attendees/date",
      "Decisions/approvals",
      "Actions with owners/dates",
      "Private opinions"
    ], [0,1,2], "Stick to facts, decisions, actions."),
    mcq("‘Plain English’ in customer comms means:", ["Legal jargon","Short, clear sentences and avoid technical terms where possible","Only emojis","No headings"], 1, "Clarity reduces disputes."),
    mcq("If you are asked to sign that work is compliant but you aren’t competent to assess it:", ["Sign anyway","Refuse and escalate to competent person/manager","Ask mate to sign","Leave site"], 1, "Don’t sign beyond competence."),
    tf ("Keeping copies of permits, isolation certificates, and test sheets protects you and the client.", true, "Good records matter."),
    mcq("A reasonable adjustment under equality law aims to:", ["Treat everyone identically","Remove barriers for disabled workers/customers","Lower quality standards","Avoid recruitment"], 1, "Make work/services accessible."),
    mcq("Bullying is:", ["Strong management","Offensive, intimidating, malicious or insulting behaviour/abuse of power that undermines/demeans","Only physical","Always illegal"], 1, "Address via policy and escalation."),
    mcq("A safe escalation path for on-site issues is typically:", ["Social media → police","Colleague → supervisor/site manager → contract admin/client rep","Customer → merchant → QS","Skip to CEO"], 1, "Follow the chain of command."),

    // Add a few programmatic variants below…
  ];

  // Programmatic scenario variants (10 more) to increase difficulty/variety
  const breakScenarios = [
    {hours:6.0,  expect:"20-min uninterrupted break"}, // threshold
    {hours:9.5,  expect:"20-min uninterrupted break"},
    {hours:12.0, expect:"20-min uninterrupted break"},
  ];
  breakScenarios.forEach(({hours, expect})=>{
    BANK.push(mcq(
      `On a ${hours.toFixed(1)}-hour shift (adult), the minimum legal rest break during the shift is:`,
      ["No break required", "10-minute rest", "20-min uninterrupted break", "Two paid 20-min breaks"],
      2,
      "Working Time Regs: ≥6 h → ≥20-minute continuous break (contract may offer more)."
    ));
  });

  const leaveScenarios = [4, 4.5, 5, 5.5, 6]; // days/week
  leaveScenarios.forEach(days=>{
    const total = (5.6*days).toFixed(1).replace(/\.0$/, "");
    BANK.push(mcq(
      `Annual leave for a ${days}-day-per-week worker (statutory 5.6 weeks) equals:`,
      [`${(days*4.0).toFixed(1).replace(/\.0$/,"")} days`, `${(days*5.0).toFixed(1).replace(/\.0$/,"")} days`, `${total} days`, `${(days*6.0).toFixed(1).replace(/\.0$/,"")} days`],
      2,
      "Basic entitlement = 5.6 × days worked per week."
    ));
  });

  // =====================================================================
  // BUILD 10 MOCKS × 30 Qs
  // =====================================================================
  function buildMocks(bank, num=10, size=30, seedBase=77101){
    const mocks=[];
    for (let i=1;i<=num;i++){
      const sample = seededShuffle(bank, seedBase + i*187).slice(0, Math.min(size, bank.length));
      mocks.push(sample);
    }
    return mocks;
  }
  const QUIZZES = { comm: buildMocks(BANK, 10, 30) };

  // =====================================================================
  // HOOK INTO YOUR APP
  // =====================================================================
  function install(){
    if (window.__plumbwiseCommHooked) return;
    window.__plumbwiseCommHooked = true;

    const originalStart = window.startQuiz;
    const renderQ = window.renderQ;

    window.startQuiz = function(id){
      if (QUIZZES[id]){
        let n = prompt("Communications / EWR — choose Mock 1–10:", "1");
        const idx = Math.max(1, Math.min(10, parseInt(n||"1",10))) - 1;
        const qs = QUIZZES[id][idx].map((q,i)=> ({...q, _id:`${id}_m${idx+1}_${i}`}) );
        window._q = { idx:0, order:[...qs.keys()], pool:qs, answers:{}, title:`${id.toUpperCase()} — Mock ${idx+1}` };
        if (typeof renderQ === "function") renderQ();
        return;
      }
      if (typeof originalStart === "function") return originalStart(id);
    };

    // quick sanity
    window.__COMM_BANK_LEN = BANK.length;  // e.g., ~90
  }

  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
