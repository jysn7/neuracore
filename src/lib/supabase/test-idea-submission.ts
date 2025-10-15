import { createClient } from '@supabase/supabase-js'

// Initialize both client and server-side Supabase instances
const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function testIdeaSubmission() {
  console.log('Testing idea submission with RLS...\n')

  try {
    // 1. Try client-side submission (should be blocked by RLS)
    console.log('1. Testing client-side submission:')
    const clientResult = await clientSupabase
      .from('ideas')
      .insert([{
        title: 'Test Idea',
        content: 'Test Content',
        category: 'General',
        author: 'some-user-id'
      }])

    console.log('Client-side result:', 
      clientResult.error ? 
      `✓ Blocked by RLS (Expected) - ${clientResult.error.message}` : 
      '❌ RLS Bypass Detected!')

    // 2. Try authenticated submission
    console.log('\n2. Testing authenticated submission:')
    const { data: { user } } = await clientSupabase.auth.getUser()
    
    if (user) {
      const authResult = await clientSupabase
        .from('ideas')
        .insert([{
          title: 'Test Idea',
          content: 'Test Content',
          category: 'General',
          author: user.id
        }])

      console.log('Authenticated result:', 
        authResult.error ? 
        `❌ Blocked unexpectedly - ${authResult.error.message}` : 
        '✓ Allowed (Expected)')

      // Clean up if succeeded
      if (!authResult.error && authResult.data) {
        await clientSupabase
          .from('ideas')
          .delete()
          .eq('title', 'Test Idea')
      }
    } else {
      console.log('No authenticated user available')
    }

    // 3. Check current RLS configuration
    console.log('\n3. Current RLS Configuration:')
    const { data: policies } = await clientSupabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'ideas')

    if (policies) {
      policies.forEach(policy => {
        console.log(`\nPolicy: ${policy.policyname}`)
        console.log(`Operation: ${policy.cmd}`)
        console.log(`Check: ${policy.qual || policy.with_check}`)
      })
    } else {
      console.log('Unable to fetch RLS policies')
    }

  } catch (error) {
    console.error('Test failed:', error)
  }
}

// Run the tests
testIdeaSubmission()
  .catch(console.error)