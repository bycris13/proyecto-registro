import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zwzvlwjkcrqjbxkybkhz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3enZsd2prY3JxamJ4a3lia2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MTE2NjAsImV4cCI6MjA2OTQ4NzY2MH0.4UbFOQphsQ9mZ4C0CmQP2kgNW0BXiHOslUeP7niZgYE';

export const supabase = createClient(supabaseUrl, supabaseKey);
