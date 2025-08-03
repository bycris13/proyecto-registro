import { supabase } from '../data/supabaseClient.js';

export async function loginWithCredentials(username, password) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('nombre_usuario', username)
    .eq('contraseña', password)
    .single();

  if (error) return { error };
  return { user: data };
}
