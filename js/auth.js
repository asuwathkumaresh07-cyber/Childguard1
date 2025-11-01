// 🔐 Login & Register Logic
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const { data, error } = await supabase
        .from("parents")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (data) {
        localStorage.setItem("parent_id", data.parent_id);
        window.location.href = "dashboard/home.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  // Register
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const { error } = await supabase.from("parents").insert([
        { parent_name: name, email: email, password: password },
      ]);

      if (!error) {
        alert("Account created successfully!");
        window.location.href = "index.html";
      } else {
        alert("Error registering. Try again.");
      }
    });
  }

  // 👁️ Password Toggle
  document.querySelectorAll(".eye").forEach((icon) => {
    icon.addEventListener("click", () => {
      const input = icon.previousElementSibling;
      input.type = input.type === "password" ? "text" : "password";
      icon.textContent = input.type === "password" ? "👁️" : "🙈";
    });
  });
});
