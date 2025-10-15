import { Client } from 'pg'

async function testDirectCreation() {
    const client = new Client({
        connectionString: 'postgres://postgres:kmontdruuvtofryjcaxf@db.kmontdruuvtofryjcaxf.supabase.co:5432/postgres',
        ssl: {
            rejectUnauthorized: false
        }
    })

    try {
        await client.connect()
        console.log('Connected to database')

        // Try to create an idea directly
        const result = await client.query(`
            INSERT INTO public.ideas (
                title, 
                summary, 
                content, 
                category, 
                author, 
                tags
            ) VALUES (
                'Test Idea',
                'Test Summary',
                'Test Content',
                'Test Category',
                'test-author',
                ARRAY['test']
            ) RETURNING *;
        `)

        console.log('Creation result:', result.rows[0])

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message)
        }
    } finally {
        await client.end()
    }
}

testDirectCreation().catch(console.error)