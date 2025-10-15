import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with read-only access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function analyzeTableStructure() {
  console.log('Analyzing ideas table structure...\n')

  try {
    // Test basic select to verify public access
    console.log('Testing public read access...')
    const { data: ideas, error: selectError } = await supabase
      .from('ideas')
      .select('*')
      .limit(1)

    if (selectError) {
      console.error('Error accessing ideas table:', selectError.message)
    } else {
      console.log('✓ Public read access working')
      console.log('Sample data structure:', ideas?.[0] ? Object.keys(ideas[0]) : 'No records found')
    }

    // Test columns metadata
    console.log('\nFetching column metadata...')
    const { data: columns, error: metadataError } = await supabase
      .rpc('get_column_metadata', { table_name: 'ideas' })

    if (metadataError) {
      console.error('Error fetching metadata:', metadataError.message)
      console.log('\nTrying alternative metadata query...')
      
      // Fallback to simple select for structure analysis
      const { data: sample, error: sampleError } = await supabase
        .from('ideas')
        .select('*')
        .limit(1)

      if (sampleError) {
        console.error('Error fetching sample:', sampleError.message)
      } else if (sample && sample.length > 0) {
        const structure = Object.entries(sample[0]).map(([key, value]) => ({
          column_name: key,
          data_type: Array.isArray(value) ? 'array' : typeof value,
          nullable: value === null ? 'YES' : 'NO'
        }))
        console.log('\nColumn Structure:')
        console.table(structure)
      }
    } else {
      console.log('\nColumn Structure:')
      console.table(columns)
    }

    // Test RLS policies through behavior
    console.log('\nTesting RLS policies through behavior...')
    
    // Test anonymous read
    const { error: anonReadError } = await supabase
      .from('ideas')
      .select('id')
      .limit(1)
    console.log('Anonymous read:', anonReadError ? '❌ Blocked' : '✓ Allowed')

    // Test anonymous write (should fail)
    const { error: anonWriteError } = await supabase
      .from('ideas')
      .insert([{ 
        title: 'Test Idea',
        content: 'Test Content',
        category: 'Test'
      }])
    console.log('Anonymous write:', anonWriteError ? '✓ Blocked (Expected)' : '❌ Allowed (Unexpected!)')

  } catch (error) {
    console.error('Analysis failed:', error)
  }
}

// Run the analysis
analyzeTableStructure()