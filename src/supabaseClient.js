import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dtlyachecmqvcrwbxtbp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0bHlhY2hlY21xdmNyd2J4dGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5Mzk5MzIsImV4cCI6MjA0OTUxNTkzMn0.-lEmx8Md03NrrXvUfER3OetWgtu5OEKpklz-YNS37eI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
