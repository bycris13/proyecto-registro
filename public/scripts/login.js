const loginForm = document.getElementById('loginForm'); 

loginForm.addEventListener('submit', async (event) => { 
    event.preventDefault(); 
    
    const username = document.getElementById('usernameInput').value.trim(); 
    const password = document.getElementById('passwordInput').value.trim(); 
    
    const { user, error } = await window.loginWithCredentials(username, password); 
    
    if (error || !user) { 
        alert('Nombre de usuario o contraseña incorrectos'); 
        return; 
    }
    
    localStorage.setItem('currentUser', user.nombre_usuario); 
    
    // Redirigir al formulario de visitantes
    window.location.href = 'pages/visitantes.html';
});