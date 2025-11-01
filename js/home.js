// 🏠 Home Page - Add Child + VPN Toggle + Summary
document.addEventListener("DOMContentLoaded", async () => {
  const vpnBtn = document.getElementById("vpn-toggle");
  const statusText = document.getElementById("vpn-status");

  let vpnOn = false;
  
  // VPN toggle logic with SVG status icons
  vpnBtn.addEventListener("click", () => {
    vpnOn = !vpnOn;
    vpnBtn.textContent = vpnOn ? "Turn OFF VPN" : "Turn ON VPN";
    vpnBtn.style.backgroundColor = vpnOn ? "#4a90e2" : "#ccc";

    statusText.innerHTML = vpnOn
      ? `
      VPN Status:
      <svg xmlns="http://www.w3.org/2000/svg" fill="#007BFF" viewBox="0 0 24 24" width="28" height="28" style="vertical-align: middle; margin-left: 6px; filter: drop-shadow(0 0 4px #007BFF);">
        <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z"/>
        <path fill="#fff" d="M10.8 13.6 8.4 11.2l-.8.8 3.2 3.2 6-6-.8-.8Z"/>
      </svg>
      `
      : `
      VPN Status:
      <svg xmlns="http://www.w3.org/2000/svg" fill="#1E90FF" viewBox="0 0 24 24" width="28" height="28" style="vertical-align: middle; margin-left: 6px;">
        <circle cx="12" cy="12" r="10" fill="#1E90FF"/>
        <path fill="#fff" d="M7 7l10 10M7 17L17 7" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      </svg>
      `;
  });
  const addChildForm = document.getElementById("add-child-form");
  const parentId = localStorage.getItem("parent_id");

  addChildForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("child-name").value;
    const device = document.getElementById("device-id").value;

    await supabase.from("children").insert([
      { parent_id: parentId, child_name: name, device_id: device },
    ]);
    alert("Child added successfully!");
    addChildForm.reset();
  });

  // Summary Stats
  const { data: timeData } = await supabase
    .from("time_management")
    .select("time_used_minutes");
  const { data: blockedData } = await supabase
    .from("website_management")
    .select("website_id", { count: "exact" });

  document.getElementById("summary-time").textContent =
    timeData?.reduce((acc, t) => acc + t.time_used_minutes, 0) + " mins";
  document.getElementById("summary-blocked").textContent =
    blockedData?.length || 0;
});
