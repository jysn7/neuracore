import { createClient } from '@supabase/supabase-js'

async function analyzeTables() {
    const supabase = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb250ZHJ1dXZ0b2ZyeWpjYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODkzNDUsImV4cCI6MjA3NDA2NTM0NX0.2gbtvGAUnHMLs47lHRNeCRW6MT0-cUJh2_4wMvlbf-4'
    )

    console.log('📊 Database Analysis Report\n')

    // Analyze profiles table
    console.log('👥 Profiles Table:')
    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
    
    if (profilesError) {
        console.log('Error fetching profiles:', profilesError.message)
    } else {
        const roleCount = profiles.reduce((acc, profile) => {
            acc[profile.role] = (acc[profile.role] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        console.log('User distribution by role:')
        Object.entries(roleCount).forEach(([role, count]) => {
            console.log(`- ${role}: ${count} users`)
        })
    }

    // Analyze ideas table
    console.log('\n💡 Ideas Table:')
    const { data: ideas, error: ideasError } = await supabase
        .from('ideas')
        .select('*')
    
    if (ideasError) {
        console.log('Error fetching ideas:', ideasError.message)
    } else {
        const categoryCount = ideas.reduce((acc, idea) => {
            acc[idea.category] = (acc[idea.category] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        console.log('Ideas distribution by category:')
        Object.entries(categoryCount).forEach(([category, count]) => {
            console.log(`- ${category}: ${count} ideas`)
        })

        // Calculate engagement metrics
        console.log('\n📈 Engagement Metrics:')
        if (ideas.length > 0) {
            const totalLikes = ideas.reduce((sum, idea) => sum + (idea.likes || 0), 0)
            const totalComments = ideas.reduce((sum, idea) => sum + (idea.comments_count || 0), 0)
            const totalViews = ideas.reduce((sum, idea) => sum + (idea.view_count || 0), 0)
            const avgLikes = totalLikes / ideas.length
            const avgComments = totalComments / ideas.length
            const avgViews = totalViews / ideas.length

            console.log(`Total Ideas: ${ideas.length}`)
            console.log(`Average Likes per Idea: ${avgLikes.toFixed(2)}`)
            console.log(`Average Comments per Idea: ${avgComments.toFixed(2)}`)
            console.log(`Average Views per Idea: ${avgViews.toFixed(2)}`)
        } else {
            console.log('No ideas found in the database')
        }
    }

    // Analyze achievements
    console.log('\n🏆 Achievements:')
    const { data: achievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('points', { ascending: false })
    
    if (achievementsError) {
        console.log('Error fetching achievements:', achievementsError.message)
    } else {
        console.log('Available achievements:')
        achievements.forEach(achievement => {
            console.log(`- ${achievement.name} (${achievement.points} points)`)
        })
    }

    // Most active users
    if (profiles && ideas) {
        console.log('\n🌟 Most Active Users:')
        const userIdeas = ideas.reduce((acc, idea) => {
            acc[idea.author] = (acc[idea.author] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const topUsers = Object.entries(userIdeas)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 5)

        console.log('Top 5 users by number of ideas:')
        for (const [userId, ideaCount] of topUsers) {
            const user = profiles.find(p => p.id === userId)
            console.log(`- ${user?.username || 'Unknown'}: ${ideaCount} ideas`)
        }
    }

    console.log('\n📝 Analysis Complete!')
}

analyzeTables().catch(console.error)