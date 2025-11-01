// 📊 Reports Page - Website Usage Per Day
document.addEventListener("DOMContentLoaded", async () => {
  const ctx = document.getElementById("report-chart").getContext("2d");

  const { data } = await supabase
    .from("activity_logs")
    .select("timestamp, activity_type")
    .order("timestamp", { ascending: true });

  const dailyData = {};
  data.forEach((log) => {
    const day = new Date(log.timestamp).toLocaleDateString();
    dailyData[day] = (dailyData[day] || 0) + 1;
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(dailyData),
      datasets: [
        {
          label: "Daily Website Usage",
          data: Object.values(dailyData),
          backgroundColor: "#4a90e2",
        },
      ],
    },
    options: {
      animation: { duration: 1200, easing: "easeInOutQuart" },
      responsive: true,
    },
  });
});
