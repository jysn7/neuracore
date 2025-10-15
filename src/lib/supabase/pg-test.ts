import { Client } from 'pg'
import { env } from 'process'

async function testReadOnlyAccess() {
    const client = new Client({
        connectionString: `postgres://claude_user:${process.env.SUPABASE_CLAUDE_KEY}@db.kmontdruuvtofryjcaxf.supabase.co:5432/postgres?sslmode=require`,
        ssl: true
    })

    try {
        await client.connect()
        console.log('Connected successfully!')

        // Test 1: SELECT (should work)
        console.log('\nTest 1: Testing SELECT...')
        const selectResult = await client.query('SELECT * FROM ideas LIMIT 1')
        console.log('✅ SELECT test succeeded:', selectResult.rows.length, 'rows')

        // Test 2: INSERT (should fail)
        console.log('\nTest 2: Testing INSERT prevention...')
        try {
            await client.query(`
                INSERT INTO ideas (title, summary, content, category, author)
                VALUES ($1, $2, $3, $4, $5)
            `, ['Test', 'Test Summary', 'Test Content', 'test', '123'])
            console.log('❌ INSERT prevention failed - was able to insert!')
        } catch (error) {
            if (error instanceof Error) {
                console.log('✅ INSERT prevention working:', error.message)
            }
        }

        // Test 3: UPDATE (should fail)
        console.log('\nTest 3: Testing UPDATE prevention...')
        try {
            await client.query('UPDATE ideas SET title = $1 WHERE id = $2', ['Test', '123'])
            console.log('❌ UPDATE prevention failed - was able to update!')
        } catch (error) {
            if (error instanceof Error) {
                console.log('✅ UPDATE prevention working:', error.message)
            }
        }

        // Test 4: DELETE (should fail)
        console.log('\nTest 4: Testing DELETE prevention...')
        try {
            await client.query('DELETE FROM ideas WHERE id = $1', ['123'])
            console.log('❌ DELETE prevention failed - was able to delete!')
        } catch (error) {
            if (error instanceof Error) {
                console.log('✅ DELETE prevention working:', error.message)
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error('Test failed:', error.message)
        }
    } finally {
        await client.end()
        console.log('\nTest completed!')
    }
}

testReadOnlyAccess()