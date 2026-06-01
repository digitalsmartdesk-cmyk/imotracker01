export interface Question {
  id: number
  text: string
  type: 'emoji-scale' | 'single-choice' | 'multi-select' | 'scale' | 'frequency' | 'open-text'
  options?: string[]
  domain: string
}

export interface TopicMeta {
  id: string
  name: string
  description: string
  ageMin: number
  ageMax: number
  questionCount: number
  estimatedMinutes: number
  isFree: boolean
  parentQuestion: string
  creditCost: number
}

export const TOPICS: TopicMeta[] = [
  {
    id: 'emotional-awareness',
    name: 'Emotional Awareness',
    description: "Does my child understand and name their own emotions?",
    ageMin: 7, ageMax: 15,
    questionCount: 15, estimatedMinutes: 5,
    isFree: true, parentQuestion: "Does my child understand their own emotions?",
    creditCost: 0,
  },
  {
    id: 'emotional-regulation',
    name: 'Emotional Regulation',
    description: "Can my child manage their emotional reactions effectively?",
    ageMin: 7, ageMax: 15,
    questionCount: 18, estimatedMinutes: 6,
    isFree: false, parentQuestion: "Can my child manage their feelings?",
    creditCost: 1,
  },
  {
    id: 'stress-resilience',
    name: 'Stress & Resilience',
    description: "How does my child handle pressure and bounce back from setbacks?",
    ageMin: 8, ageMax: 15,
    questionCount: 18, estimatedMinutes: 6,
    isFree: false, parentQuestion: "How does my child handle pressure?",
    creditCost: 1,
  },
  {
    id: 'empathy-social',
    name: 'Empathy & Social Sense',
    description: "Does my child understand and care about others' feelings?",
    ageMin: 7, ageMax: 15,
    questionCount: 16, estimatedMinutes: 5,
    isFree: false, parentQuestion: "Does my child empathize with others?",
    creditCost: 1,
  },
  {
    id: 'relationships-trust',
    name: 'Relationships & Trust',
    description: "How does my child build and maintain meaningful relationships?",
    ageMin: 7, ageMax: 15,
    questionCount: 17, estimatedMinutes: 6,
    isFree: false, parentQuestion: "Does my child form healthy relationships?",
    creditCost: 1,
  },
  {
    id: 'self-perception',
    name: 'Self-Perception',
    description: "How does my child see themselves — strengths, values, identity?",
    ageMin: 7, ageMax: 15,
    questionCount: 16, estimatedMinutes: 5,
    isFree: false, parentQuestion: "How does my child see themselves?",
    creditCost: 1,
  },
  {
    id: 'identity-authenticity',
    name: 'Identity & Authenticity',
    description: "Is my child developing a confident, authentic sense of self?",
    ageMin: 10, ageMax: 15,
    questionCount: 20, estimatedMinutes: 7,
    isFree: false, parentQuestion: "Is my child developing a confident self?",
    creditCost: 1,
  },
  {
    id: 'meaning-purpose',
    name: 'Meaning & Purpose',
    description: "Does my child have a sense of purpose and what matters to them?",
    ageMin: 10, ageMax: 15,
    questionCount: 15, estimatedMinutes: 5,
    isFree: false, parentQuestion: "Does my child have a sense of purpose?",
    creditCost: 1,
  },
]

export const FREE_QUESTIONS: Question[] = [
  { id: 1, text: "When you think about today, how do you feel overall?", type: 'emoji-scale', domain: 'Emotional Awareness' },
  { id: 2, text: "When something makes you sad, what do you usually do?", type: 'single-choice', domain: 'Emotional Awareness',
    options: ["Talk to someone I trust", "Keep it to myself", "Cry or let it out", "Try to forget about it", "Do something I enjoy"] },
  { id: 3, text: "How often do you feel happy at school?", type: 'scale', domain: 'Emotional Awareness' },
  { id: 4, text: "Which feelings do you sometimes feel? (Pick all that fit)", type: 'multi-select', domain: 'Emotional Awareness',
    options: ["Happy 😊", "Worried 😰", "Excited 🤩", "Lonely 😔", "Angry 😤", "Proud 🥹", "Bored 😑", "Loved ❤️"] },
  { id: 5, text: "When you feel angry or upset, what helps you feel better?", type: 'single-choice', domain: 'Emotional Awareness',
    options: ["Breathing slowly", "Talking to someone", "Being alone for a bit", "Playing or moving around", "Listening to music"] },
  { id: 6, text: "What makes you feel really happy? (Pick up to 3)", type: 'multi-select', domain: 'Emotional Awareness',
    options: ["Playing with friends", "Time with family", "Creative things (art, music, writing)", "Sports or outdoor activities", "Learning new things", "Animals or nature", "Games and screens"] },
  { id: 7, text: "How easy is it for you to say how you're feeling to someone you trust?", type: 'single-choice', domain: 'Emotional Awareness',
    options: ["Very easy — I share all the time", "Pretty easy", "Sometimes easy, sometimes hard", "Usually hard", "Very hard — I keep it inside"] },
  { id: 8, text: "When a friend is upset, you usually:", type: 'single-choice', domain: 'Emotional Awareness',
    options: ["Try to cheer them up", "Listen and stay close", "Give them space", "Tell a grown-up", "Feel unsure what to do"] },
  { id: 9, text: "How do you feel about going to sleep most nights?", type: 'single-choice', domain: 'Emotional Awareness',
    options: ["I sleep well and feel rested", "I'm a bit worried sometimes but okay", "I often have worries at bedtime", "I find it hard to relax", "I love bedtime!"] },
  { id: 10, text: "Is there anything you'd like to share about how you've been feeling lately? (Optional)", type: 'open-text', domain: 'Emotional Awareness' },
]

export const PREMIUM_QUESTIONS: Record<string, Question[]> = {
  'emotional-regulation': [
    { id: 1, text: "When something upsets you, how long does it usually take to feel better?", type: 'single-choice', domain: 'Emotional Regulation',
      options: ["A few minutes", "About an hour", "Most of the day", "A few days", "It depends on what happened"] },
    { id: 2, text: "Imagine a friend cancels plans at the last minute. Your first reaction is usually to:", type: 'single-choice', domain: 'Emotional Regulation',
      options: ["Feel disappointed but understand", "Get frustrated and show it", "Feel hurt but say nothing", "Find something else to do", "Ask them what happened"] },
    { id: 3, text: "How often do you feel like your emotions are 'too big' to control?", type: 'frequency', domain: 'Emotional Regulation',
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"] },
    { id: 4, text: "When you feel really overwhelmed, which of these do you do? (Pick all that apply)", type: 'multi-select', domain: 'Emotional Regulation',
      options: ["Take deep breaths", "Walk away from the situation", "Talk to someone", "Cry", "Shut down / go quiet", "Get angry", "Write or draw how I feel"] },
    { id: 5, text: "How good are you at staying calm when things don't go your way?", type: 'scale', domain: 'Emotional Regulation' },
    { id: 6, text: "When you're really excited or happy, you usually:", type: 'single-choice', domain: 'Emotional Regulation',
      options: ["Share it with everyone right away", "Feel it inside but stay quiet", "Want to celebrate with one person", "Get carried away and struggle to focus", "Feel happy but try to stay calm"] },
    { id: 7, text: "If you make a mistake in front of others, how do you feel?", type: 'single-choice', domain: 'Emotional Regulation',
      options: ["A bit embarrassed but I get over it quickly", "Very embarrassed for a long time", "Fine — everyone makes mistakes", "Angry at myself", "Anxious about what others think"] },
    { id: 8, text: "When you're in a bad mood, how much does it affect the people around you?", type: 'frequency', domain: 'Emotional Regulation',
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"] },
    { id: 9, text: "You had a really hard day. Which best describes what happens next?", type: 'single-choice', domain: 'Emotional Regulation',
      options: ["I talk about it and feel better", "I push it down and keep going", "I need time alone before I'm okay", "It ruins my whole evening", "I do something comforting and move on"] },
    { id: 10, text: "How often do you take slow, deep breaths when you're stressed?", type: 'frequency', domain: 'Emotional Regulation',
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"] },
    { id: 11, text: "When you feel jealous of someone, you usually:", type: 'single-choice', domain: 'Emotional Regulation',
      options: ["Acknowledge it and move on", "Feel guilty and try to hide it", "Act out or say something unkind", "Talk to someone about it", "Remind myself of what I'm good at"] },
    { id: 12, text: "How well can you tell what kind of mood you're in before reacting?", type: 'scale', domain: 'Emotional Regulation' },
    { id: 13, text: "If something frightens you, your usual response is:", type: 'single-choice', domain: 'Emotional Regulation',
      options: ["Face it with help", "Avoid it completely", "Talk about it to feel better", "Freeze up", "Push through even if scared"] },
    { id: 14, text: "How often do you feel proud of how you handled a tough situation?", type: 'frequency', domain: 'Emotional Regulation',
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"] },
    { id: 15, text: "When you're bored, what do you usually feel?", type: 'single-choice', domain: 'Emotional Regulation',
      options: ["Relaxed — I enjoy downtime", "Restless and uncomfortable", "Sad or a bit low", "Creative — I start imagining things", "Irritable and need to do something right away"] },
    { id: 16, text: "How easy is it for you to ask for help when you're struggling emotionally?", type: 'scale', domain: 'Emotional Regulation' },
    { id: 17, text: "Which emotions are hardest for you to manage? (Pick up to 2)", type: 'multi-select', domain: 'Emotional Regulation',
      options: ["Anger", "Sadness", "Fear", "Jealousy", "Embarrassment", "Excitement", "Frustration"] },
    { id: 18, text: "Is there anything else you want to share about how you handle your feelings?", type: 'open-text', domain: 'Emotional Regulation' },
  ],
}

// Generate placeholder questions for topics without full content
function generateQuestions(topicId: string, count: number, domain: string): Question[] {
  const baseQuestions: Question[] = [
    { id: 1, text: `How do you feel about yourself most of the time?`, type: 'emoji-scale', domain },
    { id: 2, text: `When things get difficult, what do you usually do?`, type: 'single-choice', domain,
      options: ["Ask for help", "Try harder on my own", "Take a break", "Give up", "Talk to a friend"] },
    { id: 3, text: `How often do you feel confident in yourself?`, type: 'frequency', domain,
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"] },
    { id: 4, text: `Which of these feel true about you? (Pick all that apply)`, type: 'multi-select', domain,
      options: ["I care about others", "I have good ideas", "I work hard", "I make friends easily", "I'm creative", "I try my best"] },
    { id: 5, text: `On a scale of 1-5, how happy are you with who you are right now?`, type: 'scale', domain },
  ]
  const qs = [...baseQuestions]
  for (let i = 6; i <= count; i++) {
    qs.push({ id: i, text: `Question ${i} about ${domain.toLowerCase()}...`, type: i % 3 === 0 ? 'frequency' : 'single-choice', domain,
      options: i % 3 === 0 ? ["Never", "Rarely", "Sometimes", "Often", "Almost always"] :
        ["Option A", "Option B", "Option C", "Option D"] })
  }
  return qs.slice(0, count)
}

// Fill in remaining topics
;['stress-resilience', 'empathy-social', 'relationships-trust', 'self-perception', 'identity-authenticity', 'meaning-purpose'].forEach(id => {
  const topic = TOPICS.find(t => t.id === id)!
  const domainName = topic.name
  PREMIUM_QUESTIONS[id] = generateQuestions(id, topic.questionCount, domainName)
})

export function getTopicQuestions(topicId: string): Question[] {
  if (topicId === 'emotional-awareness') return FREE_QUESTIONS
  return PREMIUM_QUESTIONS[topicId] || []
}

export function getTopic(id: string): TopicMeta | undefined {
  return TOPICS.find(t => t.id === id)
}
