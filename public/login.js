document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  // Verificar si ya hay una sesión activa
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    // Redirigir según el tipo de usuario
    if (currentUser === 'Admin') {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'index.html';
    }
    return;
  }
  
  // Usuarios predefinidos
  const users = [
    { username: 'superAdmin', password: 'Admin' },
    { username: 'Admin', password: 'Admin' }
  ];
  
  // Manejo del envío del formulario
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!username || !password) {
      showAlert('Por favor, complete todos los campos', 'error');
      return;
    }
    
    if (authenticateUser(username, password)) {
      if (rememberMe) {
        localStorage.setItem('rememberedUser', username);
      } else {
        localStorage.removeItem('rememberedUser');
      }
      
      // Guardar usuario actual en localStorage
      localStorage.setItem('currentUser', username);
      
      showAlert('Inicio de sesión exitoso', 'success');
      
      setTimeout(() => {
        // Redirigir según el tipo de usuario
        if (username === 'Admin') {
          window.location.href = 'dashboard.html';
        } else {
          window.location.href = 'index.html';
        }
      }, 1500);
    } else {
      showAlert('Nombre de usuario o contraseña incorrectos', 'error');
    }
  });
  
  
  // Cargar usuario recordado si existe
  const rememberedUser = localStorage.getItem('rememberedUser');
  if (rememberedUser) {
    document.getElementById('usernameInput').value = rememberedUser;
    document.getElementById('rememberMe').checked = true;
  }
  
  // Función para mostrar alertas
  function showAlert(message, type) {
    // Eliminar alertas previas
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    // Crear nueva alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    alertDiv.textContent = message;
    
    // Insertar alerta antes del enlace de contraseña olvidada
    const form = document.getElementById('loginForm');
    form.appendChild(alertDiv);
    
    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
  
  // Función de autenticación con usuarios predefinidos
  function authenticateUser(username, password) {
    return users.some(user => 
      user.username === username && user.password === password
    );
  }
});