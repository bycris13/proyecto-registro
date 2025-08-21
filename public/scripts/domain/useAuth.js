async function loginWithCredentials(username, password) {
  const { data, error } = await window.supabaseClient
    .from('usuarios')
    .select('*')
    .eq('nombre_usuario', username)
    .eq('contraseña', password)
    .single();

  if (error || !data) {
    return { error };
  }
  return { user: data };
}

window.loginWithCredentials = loginWithCredentials;