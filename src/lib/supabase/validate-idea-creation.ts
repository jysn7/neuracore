import { createClient } from '@supabase/supabase-js'

async function validateIdeaCreation() {
    const supabase = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MzgyNDIsImV4cCI6MjAxMzAxNDI0Mn0.6D0B0OOVOpAVE5ZQT1-7D5YLeYPjyoLuSmmiFCZ9_ys'
    )

    console.log('🔍 Testing Idea Creation with Full Validation...\n')

    // Step 1: Sign in and get user
    console.log('Step 1: Authenticating...')
    const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email: process.env.SUPABASE_AUTH_EMAIL || '',
        password: process.env.SUPABASE_AUTH_PASSWORD || ''
    })

    if (signInError || !session) {
        console.error('❌ Authentication failed:', signInError?.message)
        return
    }

    console.log('✅ Successfully authenticated')
    console.log('User ID:', session.user.id)

    // Step 2: Test minimal valid idea creation
    console.log('\nStep 2: Testing minimal valid idea creation...')
    const { data: minimalIdea, error: minimalError } = await supabase
        .from('ideas')
        .insert({
            title: 'Test Minimal Idea',
            content: 'Minimal content for testing',
            category: 'Tech',
            author: session.user.id
        })
        .select()

    if (minimalError) {
        console.error('❌ Minimal idea creation failed:', minimalError)
        console.log('Error code:', minimalError.code)
        console.log('Error message:', minimalError.message)
        console.log('Error details:', minimalError.details)
    } else {
        console.log('✅ Minimal idea created successfully')
        console.log('Created idea:', minimalIdea)
    }

    // Step 3: Test full idea creation
    console.log('\nStep 3: Testing full idea creation...')
    const { data: fullIdea, error: fullError } = await supabase
        .from('ideas')
        .insert({
            title: 'Test Full Idea',
            content: 'Full content for testing',
            summary: 'Test summary',
            category: 'Tech',
            author: session.user.id,
            tags: ['test', 'validation'],
            created_at: new Date().toISOString()
        })
        .select()

    if (fullError) {
        console.error('❌ Full idea creation failed:', fullError)
        console.log('Error code:', fullError.code)
        console.log('Error message:', fullError.message)
        console.log('Error details:', fullError.details)
    } else {
        console.log('✅ Full idea created successfully')
        console.log('Created idea:', fullIdea)
    }

    // Step 4: Test invalid cases
    console.log('\nStep 4: Testing invalid cases...')

    // Test missing required fields
    const { error: missingFieldsError } = await supabase
        .from('ideas')
        .insert({
            title: 'Test Idea'
            // missing content, category, and author
        })

    if (missingFieldsError) {
        console.log('✅ Correctly rejected missing required fields')
        console.log('Error:', missingFieldsError.message)
    } else {
        console.error('❌ Failed to reject missing required fields')
    }

    // Test invalid author
    const { error: invalidAuthorError } = await supabase
        .from('ideas')
        .insert({
            title: 'Test Idea',
            content: 'Test content',
            category: 'Tech',
            author: '00000000-0000-0000-0000-000000000000'
        })

    if (invalidAuthorError) {
        console.log('✅ Correctly rejected invalid author')
        console.log('Error:', invalidAuthorError.message)
    } else {
        console.error('❌ Failed to reject invalid author')
    }

    console.log('\n📊 Validation Testing Complete!')
}

validateIdeaCreation().catch(console.error)