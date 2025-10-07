/* public/js/subscription-gate.js */
(function(){
  function savedEmail(){ return localStorage.getItem("plumbwise_email") || ""; }
  function isActive(){ return localStorage.getItem("plumbwise_active")==="1"; }
  function setActive(email, active){
    if (active){
      localStorage.setItem("plumbwise_active","1");
      if (email) localStorage.setItem("plumbwise_email", email);
    } else {
      localStorage.removeItem("plumbwise_active");
    }
    reflectAccessUI();
  }

  function ensureBadge(){
    const hdr = document.querySelector("header") || document.body;
    let badge = document.getElementById("accessState");
    if (!badge){
      badge = document.createElement("span");
      badge.id = "accessState";
      badge.style.cssText = "margin-left:8px;padding:4px 8px;border-radius:8px;border:1px solid #27324f;background:#0d1730;color:#93c5fd;font-size:12px";
      badge.textContent = "Access: Checking…";
      const row = hdr.querySelector("div") || hdr;
      row.appendChild(badge);
    }
  }

  function reflectAccessUI(){
    ensureBadge();
    const badge = document.getElementById("accessState");
    if (badge) badge.textContent = isActive() ? "Access: Active" : "Access: Locked (Mocks)";

    // Hide Subscribe + Trial buttons when active
    const buttons = [...document.querySelectorAll("button, a.btn")];
    const subBtn  = buttons.find(b => /subscribe/i.test(b?.textContent || ""));
    const trialBtn= document.getElementById("trialBtn");
    if (subBtn)  subBtn.style.display  = isActive() ? "none" : "";
    if (trialBtn) trialBtn.style.display = isActive() ? "none" : "";
  }

  async function verifyRemote(){
    const email = savedEmail();
    if (!email) { reflectAccessUI(); return; }
    try {
      const res = await fetch("/api/subscription-status", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(()=>null);
      setActive(email, !!data?.active); // true for trialing or active
    } catch {
      reflectAccessUI();
    }
  }

  async function subscribeFlow(promptText){
    const email = prompt(promptText || "Enter your email:", savedEmail());
    if (!email) return false;
    localStorage.setItem("plumbwise_email", email.trim().toLowerCase());
    try {
      const res = await fetch("/api/checkout", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email: localStorage.getItem("plumbwise_email") })
      });
      const data = await res.json().catch(()=>({}));
      if (data?.url) { window.location = data.url; return false; }
      alert("Checkout failed: " + (data?.error || "Unknown error"));
      return false;
    } catch {
      alert("Network error starting checkout.");
      return false;
    }
  }

  async function ensureActiveForMocks(){
    const url = new URL(window.location.href);
    if (url.searchParams.has("session_id")){
      await verifyRemote();               // flip to active on return from Stripe
      url.searchParams.delete("session_id");
      history.replaceState({}, "", url.toString());
    }
    if (isActive()) return true;
    await verifyRemote();
    if (isActive()) return true;

    const ok = confirm("Mock Exams are for subscribers. Start your 1-day free trial (card required)?");
    if (!ok) return false;
    await subscribeFlow("Enter your email for a 1-day free trial (card required):");
    return false;
  }

  const GATED_MODULES = new Set(["hs","elec","sci","proc","cold","hot","ch","san","drn","comm","wr"]);

  function install(){
    reflectAccessUI();
    verifyRemote();

    const originalStart = window.startQuiz;
    window.startQuiz = async function(moduleId){
      if (GATED_MODULES.has(moduleId)){
        const ok = await ensureActiveForMocks();
        if (!ok) return;
      }
      if (typeof originalStart === "function") return originalStart(moduleId);
    };

    // Harden any “Mock” button clicks even if not wired to startQuiz
    document.addEventListener("click", async (e)=>{
      const el = e.target.closest("button, a.btn");
      if (!el) return;
      if (/mock/i.test(el.textContent||"") && !isActive()){
        e.preventDefault();
        e.stopPropagation();
        await ensureActiveForMocks();
      }
    });

    // EXPOSE: Start Trial for HTML button
    window.plumbwiseStartTrial = () =>
      subscribeFlow("Enter your email for a 1-day free trial (card required):");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();
