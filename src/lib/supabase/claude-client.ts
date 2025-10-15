import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseClaudeKey = process.env.SUPABASE_CLAUDE_KEY! // Add this to your .env

export const claudeClient = createClient(supabaseUrl, supabaseClaudeKey, {
  auth: {
    persistSession: false // Since Claude doesn't need to maintain a session
  },
  db: {
    schema: 'public'
  }
})