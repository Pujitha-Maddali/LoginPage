const formTitle = document.getElementById('form-title');
const toggleLink = document.getElementById('toggle-link');
const emailGroup = document.getElementById('email-group');
const form = document.getElementById('form');
const messageBox = document.getElementById('message');

let isLogin = true;

// Function to show message
function showMessage(msg, type = "success") {
  messageBox.textContent = msg;
  messageBox.className = `message-box ${type}`;
  messageBox.style.display = "block";
}

// Toggle Login/Signup
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isLogin = !isLogin;

  formTitle.textContent = isLogin ? 'Login' : 'Sign Up';
  toggleLink.textContent = isLogin ? 'Sign up' : 'Login';
  document.querySelector('.toggle-text').childNodes[0].textContent =
    isLogin ? "Don’t have an account? " : "Already have an account? ";
  emailGroup.style.display = isLogin ? 'none' : 'block';
  form.reset();
  messageBox.style.display = "none";
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!username || !password || (!isLogin && !email)) {
    showMessage("Please fill all fields.", "error");
    return;
  }

  if (isLogin) {
    // Login
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      showMessage(`Welcome, ${username}! Redirecting...`, "success");
      setTimeout(() => {
        window.location.href = "https://pujitha-maddali.github.io/BankSystem/index.html";
      }, 1500);
    } else {
      showMessage("Invalid username or password.", "error");
    }
  } else {
    // Signup
    if (localStorage.getItem(username)) {
      showMessage("Username already exists!", "error");
    } else {
      const userData = { username, email, password };
      localStorage.setItem(username, JSON.stringify(userData));
      showMessage("Signup successful! You can now log in.", "success");

      // Switch to login view
      isLogin = true;
      formTitle.textContent = 'Login';
      toggleLink.textContent = 'Sign up';
      emailGroup.style.display = 'none';
      document.querySelector('.toggle-text').childNodes[0].textContent =
        "Don’t have an account? ";
      form.reset();
    }
  }
});
