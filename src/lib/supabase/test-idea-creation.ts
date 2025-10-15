import { createClient } from '@supabase/supabase-js'

async function testIdeaCreation() {
    // Create a client with the service role key for admin operations
    const adminClient = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzQ0MzM1NiwiZXhwIjoyMDEzMDE5MzU2fQ.dFLsC5S6TKEp-VFmVoGOc6nVxgKu0UZhZNuS5DGfKB4'
    )

    // Create a client with the anon key for regular user operations
    const userClient = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MzgyNDIsImV4cCI6MjAxMzAxNDI0Mn0.6D0B0OOVOpAVE5ZQT1-7D5YLeYPjyoLuSmmiFCZ9_ys'
    )

    console.log('🔍 Testing Idea Creation...\n')

    // Step 1: Create a test user
    console.log('Step 1: Creating test user...')
    const email = `test${Date.now()}@example.com`
    const password = 'testPassword123'
    
    const { data: signUpData, error: signUpError } = await adminClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: 'testuser',
                full_name: 'Test User'
            }
        }
    })

    if (signUpError) {
        console.error('❌ Failed to create user:', signUpError.message)
        return
    }
    
    console.log('✅ Test user created')
    console.log('User ID:', signUpData.user?.id)

    // Step 2: Try to create an idea
    console.log('\nStep 2: Attempting to create an idea...')
    const { error: ideaError } = await userClient
        .from('ideas')
        .insert({
            title: 'Test Idea',
            summary: 'This is a test idea',
            content: 'Test content for the idea',
            category: 'Test',
            author: signUpData.user?.id,
            tags: ['test']
        })

    if (ideaError) {
        console.error('❌ Failed to create idea:', ideaError.message)
        console.log('\nDebug info:')
        console.log('- User authenticated:', !!signUpData.user)
        console.log('- User ID available:', !!signUpData.user?.id)
        console.log('- Error code:', ideaError.code)
        console.log('- Full error:', ideaError)
    } else {
        console.log('✅ Idea created successfully!')
    }

    // Step 3: Try to read the ideas to verify
    console.log('\nStep 3: Verifying idea creation...')
    const { data: ideas, error: readError } = await userClient
        .from('ideas')
        .select('*')
        .eq('author', signUpData.user?.id)

    if (readError) {
        console.error('❌ Failed to read ideas:', readError.message)
    } else {
        console.log('Found ideas:', ideas.length)
        console.log('Ideas:', JSON.stringify(ideas, null, 2))
    }
}

testIdeaCreation().catch(console.error)