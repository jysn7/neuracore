import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  'https://kmontdruuvtofryjcaxf.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

async function readTableSchema() {
  try {
    // Get table structure
    const { data: columns, error: columnsError } = await supabase
      .from('ideas')
      .select('*')
      .limit(0)

    if (columnsError) {
      console.error('Error reading columns:', columnsError)
    } else {
      console.log('Table structure:', columns)
    }

    // Get RLS policies
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_policies', { table_name: 'ideas' })

    if (policiesError) {
      console.error('Error reading policies:', policiesError)
    } else {
      console.log('RLS Policies:', policies)
    }

  } catch (error) {
    console.error('Error:', error)
  }
}

readTableSchema()