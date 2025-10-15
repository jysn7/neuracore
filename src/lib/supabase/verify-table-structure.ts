import { createClient } from '@supabase/supabase-js'

async function verifyAndFixTableStructure() {
    const supabase = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MzgyNDIsImV4cCI6MjAxMzAxNDI0Mn0.6D0B0OOVOpAVE5ZQT1-7D5YLeYPjyoLuSmmiFCZ9_ys'
    )

    console.log('🔍 Verifying ideas table structure...\n')

    // Step 1: Sign in as admin
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

    // Step 2: Check current table structure
    console.log('\nStep 2: Checking current table structure...')
    const { data: structureData, error: structureError } = await supabase
        .rpc('get_table_definition', { table_name: 'ideas' })

    if (structureError) {
        console.error('❌ Failed to get table structure:', structureError.message)
    } else {
        console.log('Current table structure:', structureData)
    }

    // Step 3: Verify required columns
    console.log('\nStep 3: Verifying required columns...')
    const { data: columns, error: columnsError } = await supabase
        .from('ideas')
        .select()
        .limit(1)

    if (columnsError) {
        console.error('❌ Failed to query table:', columnsError.message)
    } else {
        const columnNames = columns.length > 0 ? Object.keys(columns[0]) : []
        console.log('Available columns:', columnNames)

        // Check required columns
        const requiredColumns = ['author', 'title', 'content', 'category', 'created_at']
        const missingColumns = requiredColumns.filter(col => !columnNames.includes(col))

        if (missingColumns.length > 0) {
            console.error('❌ Missing required columns:', missingColumns)
        } else {
            console.log('✅ All required columns present')
        }
    }

    // Step 4: Test column constraints
    console.log('\nStep 4: Testing column constraints...')
    
    // Test 1: Try to insert without author
    const { error: noAuthorError } = await supabase
        .from('ideas')
        .insert({ title: 'Test', content: 'Test', category: 'Tech' })

    if (noAuthorError) {
        console.log('✅ Author constraint working (cannot insert without author)')
    } else {
        console.error('❌ Author constraint failed (allowed insert without author)')
    }

    // Test 2: Try to insert without title
    const { error: noTitleError } = await supabase
        .from('ideas')
        .insert({ author: signInData.user?.id, content: 'Test', category: 'Tech' })

    if (noTitleError) {
        console.log('✅ Title constraint working (cannot insert without title)')
    } else {
        console.error('❌ Title constraint failed (allowed insert without title)')
    }

    // Test 3: Try to insert with invalid author UUID
    const { error: invalidAuthorError } = await supabase
        .from('ideas')
        .insert({ 
            author: '00000000-0000-0000-0000-000000000000',
            title: 'Test',
            content: 'Test',
            category: 'Tech'
        })

    if (invalidAuthorError) {
        console.log('✅ Author foreign key constraint working (cannot insert invalid UUID)')
    } else {
        console.error('❌ Author foreign key constraint failed (allowed invalid UUID)')
    }

    // Step 5: Verify RLS policies
    console.log('\nStep 5: Verifying RLS policies...')
    const { data: policies, error: policiesError } = await supabase
        .rpc('get_table_policies', { table_name: 'ideas' })

    if (policiesError) {
        console.error('❌ Failed to get policies:', policiesError.message)
    } else {
        console.log('Current policies:', policies)
    }

    console.log('\n📊 Table Structure Analysis Complete!')
}

verifyAndFixTableStructure().catch(console.error)