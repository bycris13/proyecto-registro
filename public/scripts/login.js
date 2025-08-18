// Conexión directa con Supabase usando la CDN
import { loginWithCredentials } from "../scripts/domain/useAuth.js";
const loginForm = document.getElementById('loginForm'); 
loginForm.addEventListener('submit', async (event) => { 
    event.preventDefault(); 
    const username = document.getElementById('usernameInput').value.trim(); 
    const password = document.getElementById('passwordInput').value.trim(); 
    
    // Consulta directa a la tabla usuarios 
    const {user , error} = await loginWithCredentials(username, password); 
    if (error || !user) { 
        alert('Nombre de usuario o contraseña incorrectos'); 
        return; 
    } 
    // Guardar sesión 
    localStorage.setItem('currentUser', user.nombre_usuario); 
    
    // Redirigir al formulario de visitantes 
    window.location.href = '/index.html'; 
});
