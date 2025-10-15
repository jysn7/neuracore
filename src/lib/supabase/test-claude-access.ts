import { claudeClient } from './claude-client'

async function testClaudeAccess() {
    console.log('Testing Claude read-only access...\n')

    // Test 1: Read Access
    console.log('Test 1: Reading ideas...')
    const { data: ideas, error: readError } = await claudeClient
        .from('ideas')
        .select('title, summary')
        .limit(1)
    console.log('Read result:', readError ? 'Failed ❌' : 'Success ✅')
    if (readError) console.error('Read error:', readError.message)
    else console.log('Sample data:', ideas)

    // Test 2: Write Access (should fail)
    console.log('\nTest 2: Attempting to insert (should fail)...')
    const { error: writeError } = await claudeClient
        .from('ideas')
        .insert([{ 
            title: 'Test Idea', 
            summary: 'This should fail',
            content: 'Test content',
            category: 'test'
        }])
    console.log('Write prevention:', writeError ? 'Working ✅' : 'Failed ❌')
    if (writeError) console.log('Expected error:', writeError.message)

    // Test 3: Update Access (should fail)
    console.log('\nTest 3: Attempting to update (should fail)...')
    const { error: updateError } = await claudeClient
        .from('ideas')
        .update({ title: 'Updated Title' })
        .eq('id', 'any-id')
    console.log('Update prevention:', updateError ? 'Working ✅' : 'Failed ❌')
    if (updateError) console.log('Expected error:', updateError.message)

    // Test 4: Delete Access (should fail)
    console.log('\nTest 4: Attempting to delete (should fail)...')
    const { error: deleteError } = await claudeClient
        .from('ideas')
        .delete()
        .eq('id', 'any-id')
    console.log('Delete prevention:', deleteError ? 'Working ✅' : 'Failed ❌')
    if (deleteError) console.log('Expected error:', deleteError.message)
}

// Run the tests
testClaudeAccess()
    .catch(console.error)
    .finally(() => console.log('\nTesting completed!'))