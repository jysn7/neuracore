import { createClient } from '@supabase/supabase-js'

async function signInAndTest() {
    const supabase = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MzgyNDIsImV4cCI6MjAxMzAxNDI0Mn0.6D0B0OOVOpAVE5ZQT1-7D5YLeYPjyoLuSmmiFCZ9_ys'
    )

    console.log('🔑 Testing Auth and Idea Creation Flow...\n')

    // Step 1: Sign in
    console.log('Step 1: Signing in...')
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'your-email@example.com',  // Replace with your email
        password: 'your-password'         // Replace with your password
    })

    if (error) {
        console.error('❌ Sign in failed:', error.message)
        return
    }

    console.log('✅ Sign in successful!')
    console.log('User ID:', data.user?.id)

    // Step 2: Verify profile exists
    console.log('\nStep 2: Checking profile...')
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user?.id)
        .single()

    if (profileError) {
        console.error('❌ Profile check failed:', profileError.message)
    } else if (!profile) {
        console.log('❌ No profile found. Creating one...')
        const { error: createProfileError } = await supabase
            .from('profiles')
            .insert({
                id: data.user?.id,
                username: 'testuser',
                full_name: 'Test User',
                role: 'user'
            })
        
        if (createProfileError) {
            console.error('❌ Failed to create profile:', createProfileError.message)
            return
        }
        console.log('✅ Profile created successfully!')
    } else {
        console.log('✅ Profile exists:', profile)
    }

    // Step 3: Try to create an idea
    console.log('\nStep 3: Creating idea...')
    const { error: ideaError } = await supabase
        .from('ideas')
        .insert({
            title: 'Test Idea',
            summary: 'This is a test idea',
            content: 'Full content of the test idea',
            category: 'Test',
            author: data.user?.id,
            tags: ['test']
        })

    if (ideaError) {
        console.error('❌ Failed to create idea:', ideaError.message)
        console.log('\nDebug info:')
        console.log('- Error code:', ideaError.code)
        console.log('- Error details:', ideaError.details)
        console.log('- Error hint:', ideaError.hint)
    } else {
        console.log('✅ Idea created successfully!')
    }

    // Step 4: List user's ideas
    console.log('\nStep 4: Listing your ideas...')
    const { data: ideas, error: listError } = await supabase
        .from('ideas')
        .select('*')
        .eq('author', data.user?.id)

    if (listError) {
        console.error('❌ Failed to list ideas:', listError.message)
    } else {
        console.log(`Found ${ideas.length} ideas:`)
        console.log(JSON.stringify(ideas, null, 2))
    }
}

signInAndTest().catch(console.error)