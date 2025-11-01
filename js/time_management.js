// ⏰ Time Management
document.addEventListener("DOMContentLoaded", async () => {
  const timeForm = document.getElementById("time-form");
  const chartCtx = document.getElementById("time-chart").getContext("2d");

  const parentId = localStorage.getItem("parent_id");
  const { data: children } = await supabase
    .from("children")
    .select("child_id, child_name")
    .eq("parent_id", parentId);

  // Insert time limit
  timeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const childId = document.getElementById("child-select").value;
    const limit = parseFloat(document.getElementById("time-limit").value) * 60;

    await supabase.from("time_management").insert([
      { child_id: childId, daily_limit_minutes: limit },
    ]);

    alert("Time limit set!");
  });

  // Chart - Daily Usage
  const { data } = await supabase
    .from("time_management")
    .select("date_set, time_used_minutes")
    .order("date_set", { ascending: true });

  new Chart(chartCtx, {
    type: "line",
    data: {
      labels: data.map((d) => d.date_set),
      datasets: [
        {
          label: "Daily Screen Time (mins)",
          data: data.map((d) => d.time_used_minutes),
          borderColor: "#4a90e2",
          fill: true,
          backgroundColor: "rgba(74, 144, 226, 0.1)",
          tension: 0.3,
        },
      ],
    },
    options: {
      animations: {
        tension: { duration: 1000, easing: "easeInOutSine", from: 0.3, to: 0.5 },
      },
      responsive: true,
      plugins: { legend: { display: false } },
    },
  });
});
