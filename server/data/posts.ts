import { v4 as uuid } from 'uuid'

const samplePosts = [
  {
    title: 'The Rise of AI in Everyday Life',
    body: 'Artificial Intelligence is transforming the way we live and work, from smart assistants to automated vehicles.',
  },
  {
    title: '10 Tips for Healthy Eating',
    body: 'Eating healthy doesn’t have to be hard. Learn how to plan meals, snack smart, and enjoy nutritious foods every day.',
  },
  {
    title: 'Traveling on a Budget',
    body: 'Discover how to see the world without breaking the bank. Tips on affordable flights, accommodations, and activities.',
  },
  {
    title: 'Learning JavaScript Fast',
    body: 'JavaScript is the backbone of web development. Learn tips and tricks to speed up your learning and build projects.',
  },
  {
    title: 'Meditation for Beginners',
    body: 'Start your meditation journey with simple steps to reduce stress, increase focus, and improve your mental health.',
  },
  {
    title: 'Top 5 Books to Read This Year',
    body: 'A curated list of must-read books across different genres, from fiction to self-help and science.',
  },
  {
    title: 'The Benefits of Morning Exercise',
    body: 'Exercising in the morning boosts energy, improves mood, and sets a positive tone for the day.',
  },
  {
    title: 'How to Start a Blog',
    body: 'Learn the essentials of creating your own blog, choosing a niche, and attracting readers online.',
  },
  {
    title: 'Understanding Climate Change',
    body: 'Climate change affects every part of our planet. Learn its causes, impacts, and what we can do to help.',
  },
  {
    title: 'Cooking Simple Meals at Home',
    body: 'Delicious and easy recipes you can make at home with minimal ingredients and effort.',
  },
  {
    title: 'Photography Tips for Beginners',
    body: 'Capture amazing photos with these essential tips for lighting, composition, and editing.',
  },
  {
    title: 'The Power of Daily Journaling',
    body: 'Journaling can boost creativity, reduce stress, and help you track your personal growth.',
  },
  {
    title: 'Building a Personal Brand Online',
    body: 'Tips to create a strong online presence, showcase your skills, and connect with opportunities.',
  },
  {
    title: 'Home Workout Routines',
    body: 'Effective exercises you can do at home with little to no equipment to stay fit and active.',
  },
  {
    title: 'Mastering Time Management',
    body: 'Learn strategies to prioritize tasks, reduce distractions, and make the most of your day.',
  },
  {
    title: 'The Science of Sleep',
    body: 'Understand the importance of sleep and how to improve sleep quality for better health and productivity.',
  },
  {
    title: 'Exploring Local Cuisines',
    body: 'Discover the unique flavors and dishes from different cultures around your city or country.',
  },
  {
    title: 'Tips for Stress-Free Studying',
    body: 'Improve your focus, retention, and exam performance with these effective study habits.',
  },
  {
    title: 'Gardening for Beginners',
    body: 'Start your own garden with easy tips for plants, soil, and caring for your green space.',
  },
  {
    title: 'How to Save Money Efficiently',
    body: 'Practical ways to save money, budget effectively, and reach your financial goals.',
  },
  {
    title: 'Understanding Cryptocurrency',
    body: 'Learn the basics of cryptocurrencies, blockchain technology, and how to invest wisely.',
  },
  {
    title: 'DIY Home Improvement Projects',
    body: 'Simple and fun projects to upgrade your home without hiring a professional.',
  },
  {
    title: 'The Art of Mindfulness',
    body: 'Techniques to live in the moment, reduce anxiety, and enjoy life more fully.',
  },
  {
    title: 'Best Apps for Productivity',
    body: 'A list of apps that help you stay organized, focused, and efficient in your daily life.',
  },
  {
    title: 'Tips for Effective Communication',
    body: 'Learn how to express yourself clearly, listen actively, and build better relationships.',
  },
  {
    title: 'The History of the Internet',
    body: 'A brief look at how the internet evolved and shaped modern communication and culture.',
  },
  {
    title: 'Beginner’s Guide to Yoga',
    body: 'Step-by-step guide to starting yoga, including basic poses and breathing techniques.',
  },
  {
    title: 'Exploring Space: A New Era',
    body: 'Recent advances in space exploration and what they mean for humanity’s future.',
  },
  {
    title: 'Simple Coding Projects',
    body: 'Hands-on projects for beginners to practice programming and build confidence.',
  },
  {
    title: 'The Joy of Reading Daily',
    body: 'How reading every day improves your knowledge, focus, and mental well-being.',
  },
  {
    title: 'Tips for a Successful Career',
    body: 'Advice on goal-setting, networking, and developing skills for long-term career growth.',
  },
]

export const posts = samplePosts.map((post) => ({
  id: uuid(),
  title: post.title,
  body: post.body,
}))
