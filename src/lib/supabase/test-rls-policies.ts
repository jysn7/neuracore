import { createClient } from '@supabase/supabase-js'

async function testRLSPolicies() {
    const supabase = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MzgyNDIsImV4cCI6MjAxMzAxNDI0Mn0.6D0B0OOVOpAVE5ZQT1-7D5YLeYPjyoLuSmmiFCZ9_ys'
    )

    console.log('🔍 Testing RLS Policies...\n')

    // Step 1: Sign in
    console.log('Step 1: Signing in...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: process.env.SUPABASE_AUTH_EMAIL || '',
        password: process.env.SUPABASE_AUTH_PASSWORD || ''
    })

    if (signInError) {
        console.error('❌ Sign in failed:', signInError.message)
        return
    }

    console.log('✅ Successfully signed in')
    const userId = signInData.user?.id
    console.log('User ID:', userId)

    // Step 2: Test SELECT permission
    console.log('\nStep 2: Testing SELECT permission...')
    const { data: ideas, error: selectError } = await supabase
        .from('ideas')
        .select('*')
        .limit(1)

    if (selectError) {
        console.error('❌ SELECT permission denied:', selectError.message)
        console.log('RLS Policy might be blocking SELECT')
    } else {
        console.log('✅ SELECT permission granted')
        console.log('Found ideas:', ideas.length)
    }

    // Step 3: Test INSERT permission with minimum data
    console.log('\nStep 3: Testing INSERT permission...')
    const { data: insertData, error: insertError } = await supabase
        .from('ideas')
        .insert({
            title: 'RLS Test Idea',
            content: 'Testing RLS policies',
            author: userId,
            category: 'Tech',
            summary: 'RLS test summary'
        })
        .select()

    if (insertError) {
        console.error('❌ INSERT permission denied:', insertError.message)
        console.log('RLS Policy might be blocking INSERT')
        console.log('Error details:', insertError)
    } else {
        console.log('✅ INSERT permission granted')
        console.log('Inserted idea:', insertData)
    }

    // Step 4: Test INSERT without author
    console.log('\nStep 4: Testing INSERT without author...')
    const { error: insertWithoutAuthorError } = await supabase
        .from('ideas')
        .insert({
            title: 'RLS Test Idea',
            content: 'Testing RLS policies',
            category: 'Tech',
            summary: 'RLS test summary'
        })

    if (insertWithoutAuthorError) {
        console.log('✅ Expected error received when inserting without author:', insertWithoutAuthorError.message)
    } else {
        console.error('❌ Insert without author was allowed - this might be a security issue')
    }

    // Step 5: Test table structure
    console.log('\nStep 5: Checking table structure...')
    const { data: tableInfo, error: tableError } = await supabase
        .rpc('get_table_info', { table_name: 'ideas' })

    if (tableError) {
        console.error('❌ Could not fetch table information:', tableError.message)
    } else {
        console.log('Table structure:', tableInfo)
    }

    console.log('\n📊 RLS Policy Analysis Complete!')
}

testRLSPolicies().catch(console.error)