// ⚙️ Settings Page - Profile + Logout
document.addEventListener("DOMContentLoaded", async () => {
  const parentId = localStorage.getItem("parent_id");
  const { data } = await supabase
    .from("parents")
    .select("parent_name, email, created_at")
    .eq("parent_id", parentId)
    .single();

  document.getElementById("profile-name").textContent = data.parent_name;
  document.getElementById("profile-email").textContent = data.email;
  document.getElementById("profile-date").textContent = new Date(
    data.created_at
  ).toLocaleDateString();

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
  });
});
