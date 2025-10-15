import { env } from 'process'
import { en } from "zod/locales"

async function testReadOnlyAccess() {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1'
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }

    try {
        // Test 1: SELECT (should work)
        console.log('\nTest 1: Testing SELECT...')
        const selectResponse = await fetch(`${SUPABASE_URL}/ideas?select=*&limit=1`, {
            method: 'GET',
            headers
        })
        
        if (selectResponse.ok) {
            const data = await selectResponse.json()
            console.log('✅ SELECT test succeeded:', data.length, 'rows')
        } else {
            console.log('❌ SELECT test failed:', await selectResponse.text())
        }

        // Test 2: INSERT (should fail)
        console.log('\nTest 2: Testing INSERT prevention...')
        const insertResponse = await fetch(`${SUPABASE_URL}/ideas`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Test',
                summary: 'Test Summary',
                content: 'Test Content',
                category: 'test'
            })
        })
        
        if (!insertResponse.ok) {
            console.log('✅ INSERT prevention working:', await insertResponse.text())
        } else {
            console.log('❌ INSERT prevention failed - was able to insert!')
        }

        // Test 3: UPDATE (should fail)
        console.log('\nTest 3: Testing UPDATE prevention...')
        const updateResponse = await fetch(`${SUPABASE_URL}/ideas?id=eq.123`, {
            method: 'PATCH',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Updated Title' })
        })
        
        if (!updateResponse.ok) {
            console.log('✅ UPDATE prevention working:', await updateResponse.text())
        } else {
            console.log('❌ UPDATE prevention failed - was able to update!')
        }

        // Test 4: DELETE (should fail)
        console.log('\nTest 4: Testing DELETE prevention...')
        const deleteResponse = await fetch(`${SUPABASE_URL}/ideas?id=eq.123`, {
            method: 'DELETE',
            headers
        })
        
        if (!deleteResponse.ok) {
            console.log('✅ DELETE prevention working:', await deleteResponse.text())
        } else {
            console.log('❌ DELETE prevention failed - was able to delete!')
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error('Test failed:', error.message)
        }
    }
    
    console.log('\nTest completed!')
}

testReadOnlyAccess()