import { createClient } from '@supabase/supabase-js'

async function testAuthenticatedIdeaCreation() {
    const supabase = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MzgyNDIsImV4cCI6MjAxMzAxNDI0Mn0.6D0B0OOVOpAVE5ZQT1-7D5YLeYPjyoLuSmmiFCZ9_ys'
    )

    console.log('🔍 Testing Authenticated Idea Creation...\n')

    // Step 1: Check current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
        console.error('❌ Session error:', sessionError.message)
        return
    }

    if (!session) {
        console.error('❌ No active session found. Please sign in first.')
        return
    }

    console.log('✅ User is authenticated')
    console.log('User ID:', session.user.id)

    // Step 2: Try to create an idea
    console.log('\nStep 2: Attempting to create an idea...')
    const { data: idea, error: ideaError } = await supabase
        .from('ideas')
        .insert({
            title: 'Test Idea',
            summary: 'This is a test idea summary',
            content: 'This is the full content of the test idea',
            category: 'Test',
            author: session.user.id,
            tags: ['test', 'debug']
        })
        .select()
        .single()

    if (ideaError) {
        console.error('❌ Failed to create idea:', ideaError.message)
        console.log('\nDebug info:')
        console.log('- Error code:', ideaError.code)
        console.log('- Error details:', ideaError.details)
        console.log('- Error hint:', ideaError.hint)
        
        // Check if user has a profile
        console.log('\nChecking user profile...')
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
        
        if (profileError) {
            console.log('❌ Could not fetch profile:', profileError.message)
        } else if (!profile) {
            console.log('❌ User profile does not exist. This is required for creating ideas.')
        } else {
            console.log('✅ User profile exists:', profile)
        }
    } else {
        console.log('✅ Idea created successfully!')
        console.log('Idea details:', idea)
    }

    // Step 3: Try to read the ideas to verify
    console.log('\nStep 3: Verifying idea creation...')
    const { data: ideas, error: readError } = await supabase
        .from('ideas')
        .select('*')
        .eq('author', session.user.id)

    if (readError) {
        console.error('❌ Failed to read ideas:', readError.message)
    } else {
        console.log(`Found ${ideas.length} ideas by user:`)
        console.log(JSON.stringify(ideas, null, 2))
    }
}

testAuthenticatedIdeaCreation().catch(console.error)
