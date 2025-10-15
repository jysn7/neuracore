import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function analyzeIdeaSubmissionRLS() {
  console.log('Analyzing idea submission RLS...\n')

  // Test 1: Anonymous submission (should fail)
  console.log('Test 1: Anonymous submission')
  const anonResult = await supabase
    .from('ideas')
    .insert([{
      title: 'Test Idea',
      content: 'Test Content',
      category: 'Test',
      author: '00000000-0000-0000-0000-000000000000' // dummy UUID
    }])
  
  console.log('Anonymous submission result:', 
    anonResult.error ? 
    `Blocked (Expected) - ${anonResult.error.message}` : 
    '❌ Unexpectedly allowed!')

  // Test 2: Authenticated submission without author
  console.log('\nTest 2: Authenticated submission without author')
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    console.log('No authenticated user available')
  } else {
    const noAuthorResult = await supabase
      .from('ideas')
      .insert([{
        title: 'Test Idea',
        content: 'Test Content',
        category: 'Test'
        // author field intentionally omitted
      }])
    
    console.log('Submission without author result:', 
      noAuthorResult.error ? 
      `Blocked (Expected) - ${noAuthorResult.error.message}` : 
      '❌ Unexpectedly allowed!')
  }

  // Test 3: Authenticated submission with wrong author
  console.log('\nTest 3: Authenticated submission with wrong author')
  if (user) {
    const wrongAuthorResult = await supabase
      .from('ideas')
      .insert([{
        title: 'Test Idea',
        content: 'Test Content',
        category: 'Test',
        author: '00000000-0000-0000-0000-000000000000' // wrong UUID
      }])
    
    console.log('Submission with wrong author result:', 
      wrongAuthorResult.error ? 
      `Blocked (Expected) - ${wrongAuthorResult.error.message}` : 
      '❌ Unexpectedly allowed!')
  }

  // Test 4: Authenticated submission with missing required fields
  console.log('\nTest 4: Authenticated submission with missing fields')
  if (user) {
    const missingFieldsResult = await supabase
      .from('ideas')
      .insert([{
        author: user.id,
        // title and category intentionally omitted
        content: 'Test Content'
      }])
    
    console.log('Submission with missing fields result:', 
      missingFieldsResult.error ? 
      `Blocked (Expected) - ${missingFieldsResult.error.message}` : 
      '❌ Unexpectedly allowed!')
  }

  // Test 5: Correct authenticated submission (should succeed)
  console.log('\nTest 5: Correct authenticated submission')
  if (user) {
    const correctResult = await supabase
      .from('ideas')
      .insert([{
        title: 'Test Idea',
        content: 'Test Content',
        category: 'Test',
        author: user.id
      }])
    
    console.log('Correct submission result:', 
      correctResult.error ? 
      `❌ Unexpectedly blocked - ${correctResult.error.message}` : 
      '✓ Allowed (Expected)')

    // Clean up test data if submission succeeded
    if (!correctResult.error && correctResult.data) {
      await supabase
        .from('ideas')
        .delete()
        .eq('title', 'Test Idea')
    }
  }

  console.log('\nRLS Policy Analysis:')
  const { data: policies } = await supabase
    .from('pg_policies')
    .select('*')
    .eq('tablename', 'ideas')

  console.log('Current policies:', policies || 'Unable to fetch policies')
}

// Run the analysis
analyzeIdeaSubmissionRLS()
  .catch(console.error)