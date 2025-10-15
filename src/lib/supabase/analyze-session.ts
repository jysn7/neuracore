import { createClient } from '@supabase/supabase-js'

async function analyzeSession() {
    const supabase = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MzgyNDIsImV4cCI6MjAxMzAxNDI0Mn0.6D0B0OOVOpAVE5ZQT1-7D5YLeYPjyoLuSmmiFCZ9_ys'
    )

    console.log('🔍 Analyzing Session State...\n')

    // Step 1: Check current session
    console.log('Step 1: Checking current session...')
    let { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
        console.error('❌ Session error:', sessionError.message)
        return
    }

    if (!session) {
        console.log('❌ No active session found')
        console.log('\nTrying to sign in...')
        
        // Try to sign in with stored credentials if you have them
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: process.env.SUPABASE_AUTH_EMAIL || 'your-email@example.com',
            password: process.env.SUPABASE_AUTH_PASSWORD || 'your-password'
        })

        if (signInError) {
            console.log('❌ Sign in failed:', signInError.message)
            return
        }

        if (!signInData.session) {
            console.log('❌ No session after sign in')
            return
        }

        console.log('✅ Successfully signed in')
        session = signInData.session
    }

    console.log('✅ Active session found!')
    console.log('Session details:')
    console.log('- User ID:', session.user.id)
    console.log('- Email:', session.user.email)
    console.log('- Role:', session.user.role)
    console.log('- Last sign in:', new Date(session.user.last_sign_in_at || '').toLocaleString())
    console.log('- Session expires:', new Date(session.expires_at! * 1000).toLocaleString())

    // Step 2: Check auth state
    console.log('\nStep 2: Checking auth state...')
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
        console.error('❌ User fetch error:', userError.message)
    } else if (user) {
        console.log('✅ User data matches session')
        console.log('User metadata:', user.user_metadata)
    }

    // Step 3: Check RLS policies
    console.log('\nStep 3: Testing RLS policies...')
    
    // Try to read profiles (public access)
    console.log('\nTesting profiles access:')
    const { error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
    
    if (profilesError) {
        console.log('❌ Cannot read profiles:', profilesError.message)
    } else {
        console.log('✅ Can read profiles')
    }

    // Try to read own profile
    console.log('\nTesting own profile access:')
    const { data: profile, error: ownProfileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
    
    if (ownProfileError) {
        console.log('❌ Cannot read own profile:', ownProfileError.message)
    } else {
        console.log('✅ Can read own profile')
        console.log('Profile data:', profile)
    }

    // Step 4: Verify authenticated status
    console.log('\nStep 4: Verifying authenticated status...')
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth event:', event)
        console.log('Session present:', !!session)
        if (session) {
            console.log('Session user:', session.user.email)
        }
    })

    // Wait a moment for the listener
    await new Promise(resolve => setTimeout(resolve, 1000))
    authListener.data.subscription.unsubscribe()

    console.log('\n📊 Session Analysis Complete!')
}

analyzeSession().catch(console.error)