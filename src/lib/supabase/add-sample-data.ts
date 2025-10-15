import { createClient } from '@supabase/supabase-js'

async function addSampleData() {
    const supabase = createClient(
        'https://kmontdruuvtofryjcaxf.supabase.co',
        'sbp_2d6b798a304f35ccc4d15def1bc17b1a8769b621'
    )

    console.log('🌱 Adding sample data...\n')

    // Add achievements first
    console.log('Adding achievements...')
    const achievements = [
        { name: 'First Idea', description: 'Published your first idea', points: 100, icon_url: '🎯' },
        { name: 'Rising Star', description: 'Get 10 likes on a single idea', points: 200, icon_url: '⭐' },
        { name: 'Thought Leader', description: 'Publish 5 ideas', points: 300, icon_url: '🏆' },
        { name: 'Community Builder', description: 'Leave 10 comments', points: 150, icon_url: '🤝' },
        { name: 'Viral Thinker', description: 'Get 100 views on a single idea', points: 400, icon_url: '🚀' }
    ]

    for (const achievement of achievements) {
        const { error } = await supabase.from('achievements').insert(achievement)
        if (error) console.error(`Error adding achievement ${achievement.name}:`, error.message)
    }

    // Create sample users
    console.log('Adding users...')
    const users = [
        { id: 'user1', username: 'innovator', full_name: 'Sarah Innovation', role: 'user', bio: 'Always thinking outside the box' },
        { id: 'user2', username: 'techgeek', full_name: 'Mike Tech', role: 'user', bio: 'Passionate about emerging technologies' },
        { id: 'user3', username: 'creativemind', full_name: 'Emily Creative', role: 'user', bio: 'Turning ideas into reality' },
        { id: 'admin1', username: 'admin_jane', full_name: 'Jane Admin', role: 'admin', bio: 'Platform administrator' },
        { id: 'mod1', username: 'mod_john', full_name: 'John Moderator', role: 'moderator', bio: 'Community moderator' }
    ]

    for (const user of users) {
        const { error } = await supabase.from('profiles').insert(user)
        if (error) console.error(`Error adding user ${user.username}:`, error.message)
    }

    // Add sample ideas
    console.log('Adding ideas...')
    const ideas = [
        {
            author: 'user1',
            title: 'AI-Powered Urban Planning',
            summary: 'Using artificial intelligence to optimize city development',
            content: 'Detailed exploration of how AI can revolutionize urban planning...',
            category: 'Technology',
            tags: ['AI', 'urban-development', 'smart-cities']
        },
        {
            author: 'user2',
            title: 'Sustainable Energy Solutions',
            summary: 'Innovative approaches to renewable energy storage',
            content: 'In-depth analysis of next-generation battery technologies...',
            category: 'Environment',
            tags: ['renewable-energy', 'sustainability', 'innovation']
        },
        {
            author: 'user3',
            title: 'Future of Remote Work',
            summary: 'Reimagining workplace collaboration in the digital age',
            content: 'Comprehensive study of remote work technologies and methodologies...',
            category: 'Business',
            tags: ['remote-work', 'collaboration', 'future-of-work']
        },
        {
            author: 'user1',
            title: 'Healthcare AI Diagnostics',
            summary: 'AI-driven medical diagnosis and treatment planning',
            content: 'Exploring the potential of AI in healthcare diagnostics...',
            category: 'Healthcare',
            tags: ['healthcare', 'AI', 'medical-tech']
        }
    ]

    for (const idea of ideas) {
        const { data, error } = await supabase.from('ideas').insert(idea).select()
        if (error) {
            console.error(`Error adding idea ${idea.title}:`, error.message)
        } else if (data) {
            // Add some likes to the ideas
            const numLikes = Math.floor(Math.random() * 15) + 5 // 5-20 likes per idea
            const likers = users.filter(u => u.id !== idea.author).slice(0, numLikes)
            
            for (const liker of likers) {
                await supabase.from('idea_likes').insert({
                    idea_id: data[0].id,
                    user_id: liker.id
                })
            }

            // Update the likes count
            await supabase.from('ideas').update({ likes: numLikes }).eq('id', data[0].id)

            // Add some comments
            const comments = [
                { author: users[0].id, content: 'This is a fascinating perspective!' },
                { author: users[1].id, content: 'Great analysis, would love to see more details.' },
                { author: users[2].id, content: 'Very innovative thinking!' }
            ].filter(c => c.author !== idea.author)

            for (const comment of comments) {
                const { error: commentError } = await supabase.from('comments').insert({
                    idea_id: data[0].id,
                    author: comment.author,
                    content: comment.content
                })
                if (commentError) console.error('Error adding comment:', commentError.message)
            }

            // Update comments count and add some views
            await supabase.from('ideas').update({ 
                comments_count: comments.length,
                view_count: Math.floor(Math.random() * 100) + 50 // 50-150 views
            }).eq('id', data[0].id)
        }
    }

    // Add some user achievements
    console.log('Adding user achievements...')
    const userAchievements = [
        { user_id: 'user1', achievement_id: 1 }, // First Idea
        { user_id: 'user1', achievement_id: 2 }, // Rising Star
        { user_id: 'user2', achievement_id: 1 }, // First Idea
        { user_id: 'user3', achievement_id: 1 }, // First Idea
        { user_id: 'user3', achievement_id: 4 }  // Community Builder
    ]

    for (const ua of userAchievements) {
        const { error } = await supabase.from('user_achievements').insert(ua)
        if (error) console.error('Error adding user achievement:', error.message)
    }

    console.log('\n✅ Sample data added successfully!')
    console.log('\nAdded:')
    console.log('- 5 users (3 regular users, 1 admin, 1 moderator)')
    console.log('- 4 ideas with tags')
    console.log('- Random likes and comments on each idea')
    console.log('- 5 achievements')
    console.log('- User achievement assignments')
}

addSampleData().catch(console.error)