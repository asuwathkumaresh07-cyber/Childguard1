// 🌐 Website Blocking Management
document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("block-form");
  const table = document.getElementById("blocked-sites-table");
  const parentId = localStorage.getItem("parent_id");

  const { data: children } = await supabase
    .from("children")
    .select("child_id")
    .eq("parent_id", parentId);

  const childId = children[0]?.child_id;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const site = document.getElementById("site-url").value.trim();
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(site)) {
      alert("Enter a valid website URL");
      return;
    }

    await supabase
      .from("website_management")
      .insert([{ child_id: childId, website_url: site, is_blocked: true }]);
    loadSites();
  });

  async function loadSites() {
    const { data } = await supabase
      .from("website_management")
      .select("website_id, website_url, access_attempts, is_blocked")
      .eq("child_id", childId);

    table.innerHTML = `
      <tr><th>Website</th><th>Attempts</th><th>Status</th></tr>
      ${data
        .map(
          (s) => `
        <tr>
          <td>${s.website_url}</td>
          <td>${s.access_attempts}</td>
          <td>${s.is_blocked ? "Blocked" : "Allowed"}</td>
        </tr>`
        )
        .join("")}
    `;
  }
  loadSites();
});
