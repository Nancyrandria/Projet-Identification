const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//Regle Regex de controle pour les champs email et mot de passe
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

// Utilisation du SHA-256 pour securise mdp
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Récupérer les utilisateurs via localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Sauvegarder les utilisateurs via localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

//INSCRIPTION
document.querySelector("#registerBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const nom = registerNom.value.trim();
  const prenom = registerPrenom.value.trim();
  const email = registerEmail.value.trim();
  const password = registerPassword.value;
  const confirm = registerConfirm.value;

  if (!nom || !prenom || !email || !password || !confirm) {
    showMessage("registerMessage", "Tous les champs sont obligatoires", "error");
    return;
  }

  if (!emailRegex.test(email)) {
    showMessage("registerMessage", "Adresse email invalide", "error");
    return;
  }

  if (!passwordRegex.test(password)) {
    showMessage("registerMessage", "Mot de passe faible (8 caractères, 1 majuscule, 1 chiffre)", "error");
    return;
  }

  if (password !== confirm) {
    showMessage("registerMessage", "Les mots de passe ne correspondent pas", "error");
    return;
  }

  const users = getUsers();

  const emailExiste = users.find(u => u.email === email);
  if (emailExiste) {
    showMessage("registerMessage", "Cet email est déjà utilisé", "error");
    return;
  }

  const hashedPassword = await hashPassword(password);

  users.push({
    email: email,
    password: hashedPassword
  });

  saveUsers(users);

  showMessage("registerMessage", "Inscription réussie", "success");
  container.classList.remove("sign-up-mode");
});

//CONNEXION
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 5000;

document.querySelector("#loginBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  const lockUntil = localStorage.getItem("lockUntil");
  if (lockUntil && Date.now() < lockUntil) {
    showMessage("loginMessage","Trop de tentatives. Veuillez réessayer plus tard", "error");
    return;
  }

  if (!email || !password) {
    showMessage("loginMessage", "Veuillez remplir tous les champs", "error");
    return;
  }

  if (!emailRegex.test(email)) {
    showMessage("loginMessage", "Email invalide", "error");
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.email === email);

  const hashedPassword = await hashPassword(password);

  if (user && hashedPassword === user.password) {
    localStorage.removeItem("loginAttempts");
    localStorage.removeItem("lockUntil");
    localStorage.setItem("connectedUser", email);

    showMessage("loginMessage", "Vous êtes bien connecté", "success");
  } else {
    let attempts = Number(localStorage.getItem("loginAttempts")) || 0;
    attempts++;
    localStorage.setItem("loginAttempts", attempts);

    if (attempts >= MAX_ATTEMPTS) {
      localStorage.setItem("lockUntil", Date.now() + LOCK_TIME);
      showMessage("loginMessage", "Trop de tentatives. Veuillez réessayer plus tard", "error");
    } else {
      showMessage("loginMessage", "Erreur de connexion. Veuillez réessayer", "error");
    }
  }
});

//BOUTONS RÉINITIALISER
document.querySelectorAll('button[type="reset"], input[type="reset"]').forEach(btn => {
  btn.addEventListener("click", () => {

    // Effacer les messages
    const loginMsg = document.getElementById("loginMessage");
    const registerMsg = document.getElementById("registerMessage");

    if (loginMsg) {
      loginMsg.textContent = "";
      loginMsg.className = "message";
    }

    if (registerMsg) {
      registerMsg.textContent = "";
      registerMsg.className = "message";
    }
  });
});

function showMessage(elementId, text, type) {
  const messageEl = document.getElementById(elementId);
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  messageEl.style.display = "flex";

  // Disparition automatique après 10 secondes (5000 ms)
  setTimeout(() => {
    messageEl.textContent = "";
    messageEl.className = "message";
    messageEl.style.display = "none";
  }, 5000);
}

