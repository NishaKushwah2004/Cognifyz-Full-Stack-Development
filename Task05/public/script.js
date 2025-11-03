const form = document.getElementById("userForm");
const userList = document.getElementById("userList");
const spinner = document.getElementById("spinner");

// Function to show/hide spinner
function toggleSpinner(show) {
  spinner.style.display = show ? "block" : "none";
  userList.style.opacity = show ? "0.3" : "1";
}

// Load Users
async function loadUsers() {
  toggleSpinner(true); // Show spinner before fetching
  const res = await fetch("/api/users");
  const users = await res.json();

  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${user.name} (${user.email})
      <div>
        <button class="edit" onclick="editUser(${user.id})">✏️</button>
        <button class="delete" onclick="deleteUser(${user.id})">🗑️</button>
      </div>
    `;
    userList.appendChild(li);
  });

  toggleSpinner(false); // Hide spinner after data loads
}

// Add User
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  form.reset();
  loadUsers();
});

// Edit User
async function editUser(id) {
  const newName = prompt("Enter new name:");
  const newEmail = prompt("Enter new email:");
  if (newName && newEmail) {
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });
    loadUsers();
  }
}

// Delete User
async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    loadUsers();
  }
}

// Load on Start
loadUsers();
