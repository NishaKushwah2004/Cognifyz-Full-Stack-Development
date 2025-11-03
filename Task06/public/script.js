// public/js/script.js

async function postForm(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Register handling
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(registerForm).entries());
    const r = await postForm('/api/auth/register', formData);
    alert(r.message || JSON.stringify(r));
    if (r.userId) window.location = '/login';
  });
}

// Login handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm).entries());
    const res = await postForm('/api/auth/login', data);
    if (res.user) {
      window.location = '/dashboard';
    } else {
      alert(res.message || 'Login failed');
    }
  });
}

// Dashboard: create entry, fetch entries
const entryForm = document.getElementById('entryForm');
if (entryForm) {
  entryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(entryForm).entries());
    const res = await postForm('/api/forms', data);
    if (res.entry) {
      location.reload();
    } else alert(res.message || 'Error');
  });

  // fetch entries
  (async () => {
    const r = await fetch('/api/forms');
    const json = await r.json();
    const list = document.getElementById('entriesList');
    if (json.entries) {
      json.entries.forEach(e => {
        const li = document.createElement('li');
        li.textContent = `${e.title} — ${new Date(e.createdAt).toLocaleString()}`;
        list.appendChild(li);
      });
    }
  })();
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await postForm('/api/auth/logout', {});
    window.location = '/';
  });
}
