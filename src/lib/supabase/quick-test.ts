import { createClient } from '@supabase/supabase-js'

// Create a test client with environment variables (for testing only)
const testClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_CLAUDE_KEY!, // The password we set for claude_user
    {
        auth: {
            persistSession: false
        },
        db: {
            schema: 'public'
        }
    }
)

async function testReadOnlyAccess() {
    console.log('Testing read-only access...\n')

    try {
        // Test 1: Read Access
        console.log('Test 1: Reading ideas...')
        const { data: ideas, error: readError } = await testClient
            .from('ideas')
            .select('title, summary')
            .limit(1)
        
        if (readError) {
            console.log('❌ Read test failed:', readError.message)
        } else {
            console.log('✅ Read test succeeded!')
            console.log('Sample data:', ideas)
        }

        // Test 2: Write Access (should fail)
        console.log('\nTest 2: Testing write prevention...')
        const { error: writeError } = await testClient
            .from('ideas')
            .insert([{ 
                title: 'Test', 
                summary: 'Should fail',
                content: 'Test',
                category: 'test'
            }])
        
        if (writeError) {
            console.log('✅ Write prevention working:', writeError.message)
        } else {
            console.log('❌ Write prevention failed - was able to insert data!')
        }

    } catch (error) {
        console.error('Test failed:', error)
    }
}

testReadOnlyAccess()