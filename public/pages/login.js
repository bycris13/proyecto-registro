// public/pages/login.js
// Conexión directa con Supabase usando la CDN
const supabaseUrl = 'https://zwzvlwjkcrqjbxkybkhz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3enZsd2prY3JxamJ4a3lia2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MTE2NjAsImV4cCI6MjA2OTQ4NzY2MH0.4UbFOQphsQ9mZ4C0CmQP2kgNW0BXiHOslUeP7niZgYE';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  // Consulta directa a la tabla usuarios
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('nombre_usuario', username)
    .eq('contraseña', password)
    .single();

  console.log('Supabase response:', { data, error });
  if (error || !data) {
    alert('Nombre de usuario o contraseña incorrectos');
    return;
  }

  // Guardar sesión
  localStorage.setItem('currentUser', data.nombre_usuario);

  // Redirigir al formulario de visitantes
  window.location.href = '/index.html';
});
