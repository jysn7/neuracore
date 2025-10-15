import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface ColumnInfo {
  column_name: string
  data_type: string
  is_nullable: string
  column_default?: string
}

interface PolicyInfo {
  policyname: string
  permissive: string
  cmd: string
  roles: string[]
  qual: string
  with_check: string
}

export async function verifyColumns(): Promise<ColumnInfo[]> {
  const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type, is_nullable, column_default')
    .eq('table_schema', 'public')
    .eq('table_name', 'ideas')

  if (error) throw error
  return data
}

export async function verifyRLSEnabled(): Promise<boolean> {
  const { data, error } = await supabase
    .from('pg_class')
    .select('relrowsecurity')
    .eq('relname', 'ideas')
    .single()

  if (error) throw error
  return data.relrowsecurity
}

export async function verifyPolicies(): Promise<PolicyInfo[]> {
  const { data, error } = await supabase
    .from('pg_policies')
    .select('*')
    .eq('tablename', 'ideas')
    .eq('schemaname', 'public')

  if (error) throw error
  return data
}

export async function testSelectPolicy() {
  return await supabase.from('ideas').select('*').limit(1)
}

export async function testInsertPolicy(userId: string) {
  const testIdea = {
    author: userId,
    title: 'Test Idea',
    content: 'Test Content',
    category: 'Test'
  }

  return await supabase.from('ideas').insert([testIdea])
}

export async function runAllVerifications() {
  try {
    console.log('Verifying table columns...')
    const columns = await verifyColumns()
    console.log('Columns:', columns)

    console.log('\nVerifying RLS status...')
    const rlsEnabled = await verifyRLSEnabled()
    console.log('RLS Enabled:', rlsEnabled)

    console.log('\nVerifying policies...')
    const policies = await verifyPolicies()
    console.log('Policies:', policies)

    console.log('\nTesting select policy...')
    const selectTest = await testSelectPolicy()
    console.log('Select test result:', selectTest)

    console.log('\nVerification complete')
  } catch (error) {
    console.error('Verification failed:', error)
  }
}