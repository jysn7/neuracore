import https from 'https'

const SUPABASE_URL = 'https://kmontdruuvtofryjcaxf.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyODQ4NzgsImV4cCI6MjAxMjg2MDg3OH0.N6KFNn7kqC4LjXpFjq8Ig8mxtqa1c1NAMK1q7B9fQGg'

async function makeRequest(path: string, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(`${SUPABASE_URL}${path}`, {
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`
      },
      ...options
    }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          resolve(data)
        }
      })
    })

    req.on('error', reject)
    req.end()
  })
}

async function analyzeSchema() {
  try {
    console.log('Analyzing table structure...\n')

    // Test reading ideas table
    const ideas = await makeRequest('/rest/v1/ideas?select=*&limit=1')
    console.log('Table Structure (from sample):', 
      Array.isArray(ideas) && ideas.length > 0 
        ? Object.keys(ideas[0]).join(', ') 
        : 'No records found'
    )

    // Test RLS with anonymous access
    const publicRead = await makeRequest('/rest/v1/ideas?select=id&limit=1')
    console.log('\nPublic read access:', 
      Array.isArray(publicRead) ? 'Allowed' : 'Blocked'
    )

    // Try to write (should fail due to RLS)
    try {
      await makeRequest('/rest/v1/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Test',
          content: 'Test content',
          category: 'Test'
        })
      })
      console.log('Anonymous write: Unexpectedly allowed!')
    } catch (e) {
      console.log('Anonymous write: Blocked (Expected)')
    }

  } catch (error) {
    console.error('Analysis failed:', error)
  }
}

analyzeSchema()