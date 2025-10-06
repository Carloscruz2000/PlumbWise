/* PlumbWise – Subscription Gate for Mock Exams only
   - Requires your existing /api/checkout and /api/subscription-status endpoints
   - Keeps Revision/Resources open; blocks Mock Exams unless active
   - Works with your existing startQuiz(moduleId) function
*/

(function(){
  // ---------- helpers ----------
  function savedEmail(){ return localStorage.getItem("plumbwise_email") || ""; }
  function isActive(){ return localStorage.getItem("plumbwise_active")==="1"; }
  function setActive(email, active){
    if (active){
      localStorage.setItem("plumbwise_active", "1");
      if (email) localStorage.setItem("plumbwise_email", email);
    } else {
      localStorage.removeItem("plumbwise_active");
    }
    reflectAccessUI();
  }

  // Add / update a small access badge in header
  function ensureBadge(){
    const hdr = document.querySelector("header") || document.body;
    if (!hdr) return;
    let badge = document.getElementById("accessState");
    if (!badge){
      badge = document.createElement("span");
      badge.id = "accessState";
      badge.style.cssText = "margin-left:8px;padding:4px 8px;border-radius:8px;border:1px solid #27324f;background:#0d1730;color:#93c5fd;font-size:12px;vertical-align:middle";
      badge.textContent = "Access: Checking…";
      // try to place near your Subscribe button row if present
      const btnRow = hdr.querySelector("div") || hdr;
      btnRow.appendChild(badge);
    }
  }

  function reflectAccessUI(){
    ensureBadge();
    const badge = document.getElementById("accessState");
    if (badge) badge.textContent = isActive() ? "Access: Active" : "Access: Locked (Mocks)";
    // Hide a visible "Subscribe (£5.99/mo)" button if found and already active
    const subBtn = [...document.querySelectorAll("button, a.btn")].find(b => /subscribe/i.test(b?.textContent || ""));
    if (subBtn) subBtn.style.display = isActive() ? "none" : "";
  }

  // Prompt to subscribe, call your API, redirect to Stripe
  async function subscribeFlow(){
    const emailDefault = savedEmail() || "";
    const email = prompt("Enter your email to subscribe (£5.99/mo):", emailDefault);
    if (!email) return false;

    localStorage.setItem("plumbwise_email", email);

    try {
      const res = await fetch("/api/checkout", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(()=>({}));
      if (data && data.url){
        window.location = data.url; // Stripe Checkout
        return false;
      }
      alert("Checkout failed: " + (data?.error || "Unknown error"));
      return false;
    } catch (e){
      alert("Network error starting checkout.");
      return false;
    }
  }

  // Verify remotely (Stripe) if we have an email stored
  async function verifyRemote(){
    const email = savedEmail();
    if (!email) { reflectAccessUI(); return; }
    try{
      const res = await fetch("/api/subscription-status", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(()=>null);
      setActive(email, !!(data && data.active));
    }catch{
      // keep whatever local state we had
      reflectAccessUI();
    }
  }

  // Ensure paid access before allowing Mock Exams
  async function ensureActiveForMocks(){
    // If Stripe redirected back with session_id, the server should set active already
    const url = new URL(window.location.href);
    if (url.searchParams.has("session_id")){
      await verifyRemote(); // one more check to pull status
      url.searchParams.delete("session_id");
      history.replaceState({}, "", url.toString());
    }

    if (isActive()) return true;

    // Not active → try remote check one more time
    await verifyRemote();
    if (isActive()) return true;

    // Still inactive → start checkout
    const proceed = confirm("Mock Exams are for subscribers.\nSubscribe now?");
    if (!proceed) return false;
    await subscribeFlow();
    return false;
  }

  // ---------- gate only certain modules for Mock Exams ----------
  const GATED_MODULES = new Set(["hs","elec","sci","proc","cold","hot","ch","san","drn","comm","wr"]);

  function install(){
    reflectAccessUI();

    // If user returns from Stripe with success session_id, verify
    const hasSession = /[?&]session_id=/.test(location.search);
    if (hasSession) verifyRemote(); else {
      // Also re-verify on every fresh visit to keep badge accurate
      verifyRemote();
    }

    // Wrap startQuiz to gate Mock Exams
    const originalStart = window.startQuiz;
    window.startQuiz = async function(moduleId){
      if (GATED_MODULES.has(moduleId)){
        const ok = await ensureActiveForMocks();
        if (!ok) return;
      }
      if (typeof originalStart === "function") return originalStart(moduleId);
      console.warn("startQuiz not found");
    };

    // (Optional) If you created other direct Mock buttons that don’t call startQuiz,
    // harden all buttons named “Mock Exam”
    document.addEventListener("click", async (e)=>{
      const el = e.target.closest("button, a.btn");
      if (!el) return;
      if (/mock/i.test(el.textContent||"")){
        // Try to infer module from a sibling Revision button that calls revision('<id>')
        // or from data-module attr if you added it.
        const card = el.closest(".card");
        let mod = card?.querySelector("[onclick*=\"startQuiz('\"]")?.getAttribute("onclick");
        mod = mod ? (mod.match(/startQuiz\('([^']+)'\)/)||[])[1] : null;
        // Fallback: block anyway if mocks are gated globally
        if (!isActive()){
          e.preventDefault();
          e.stopPropagation();
          const ok = await ensureActiveForMocks();
          if (!ok) return;
          // if they subscribed, they can click again
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install);
  } else {
    install();
  }
})();
