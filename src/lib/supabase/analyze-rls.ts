import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function analyzeRLSConfiguration() {
  console.log('Analyzing RLS Configuration...\n')

  try {
    // 1. Check RLS Status for all tables
    console.log('1. Table RLS Status:')
    const { data: rlsStatus, error: rlsError } = await supabase
      .from('pg_class')
      .select('relname, relrowsecurity')
      .in('relkind', ['r'])  // regular tables only
      .eq('relnamespace', 'public')

    if (rlsError) {
      console.error('Error checking RLS status:', rlsError.message)
    } else {
      rlsStatus?.forEach(table => {
        console.log(`${table.relname}: ${table.relrowsecurity ? '✓ RLS Enabled' : '❌ RLS Disabled'}`)
      })
    }

    // 2. List all policies
    console.log('\n2. Current RLS Policies:')
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('schemaname', 'public')

    if (policiesError) {
      console.error('Error fetching policies:', policiesError.message)
    } else {
      policies?.forEach(policy => {
        console.log(`\nTable: ${policy.tablename}`)
        console.log(`Policy: ${policy.policyname}`)
        console.log(`Operation: ${policy.cmd}`)
        console.log(`Using: ${policy.qual || 'N/A'}`)
        console.log(`With Check: ${policy.with_check || 'N/A'}`)
      })
    }

    // 3. Test Public Access
    console.log('\n3. Testing Public Access:')
    const tables = ['ideas', 'comments', 'profiles']
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      console.log(`${table}: ${error ? '❌ Blocked' : '✓ Accessible'}`)
    }

    // 4. Test Anonymous Write Operations
    console.log('\n4. Testing Anonymous Write Protection:')
    const writeTests = [
      { table: 'ideas', operation: 'insert' },
      { table: 'comments', operation: 'insert' },
      { table: 'profiles', operation: 'update' }
    ]

    for (const test of writeTests) {
      const { error } = await supabase
        .from(test.table)
        .insert([{ dummy: 'test' }])
      
      console.log(`${test.table} ${test.operation}: ${error ? '✓ Protected' : '❌ Vulnerable'}`)
    }

    // 5. Policy Coverage Analysis
    console.log('\n5. Policy Coverage Analysis:')
    const requiredPolicies = {
      'ideas': ['select', 'insert', 'update', 'delete'],
      'comments': ['select', 'insert', 'update', 'delete'],
      'profiles': ['select', 'update']
    }

    if (policies) {
      Object.entries(requiredPolicies).forEach(([table, operations]) => {
        console.log(`\n${table}:`)
        operations.forEach(op => {
          const hasPolicy = policies.some(p => 
            p.tablename === table && 
            p.cmd.toLowerCase().includes(op.toLowerCase())
          )
          console.log(`${op}: ${hasPolicy ? '✓ Policy exists' : '❌ Missing policy'}`)
        })
      })
    }

  } catch (error) {
    console.error('Analysis failed:', error)
  }
}

// Run the analysis
analyzeRLSConfiguration()
  .then(() => console.log('\nAnalysis complete'))
  .catch(console.error)