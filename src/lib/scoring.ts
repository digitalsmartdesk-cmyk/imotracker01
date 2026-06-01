export interface DomainScore {
  domain: string
  score: number // 1-5
  label: string
  interpretation: string
}

export interface ReportInsights {
  strengths: string[]
  growthAreas: string[]
  conversationStarters: string[]
  activities: string[]
  overallNarrative: string
  childFriendlySummary: string
}

const DOMAIN_LABELS: Record<string, string[]> = {
  'Emotional Awareness': ['Very Low', 'Developing', 'Building', 'Strong', 'Exceptional'],
  'Emotional Regulation': ['Needs Support', 'Developing', 'Progressing', 'Well Regulated', 'Exceptional'],
  'Stress & Resilience': ['Needs Support', 'Building', 'Progressing', 'Resilient', 'Highly Resilient'],
  'Empathy & Social Sense': ['Emerging', 'Developing', 'Growing', 'Empathetic', 'Deeply Empathetic'],
  'Relationships & Trust': ['Emerging', 'Developing', 'Building', 'Strong', 'Exceptional'],
  'Self-Perception': ['Needs Nurturing', 'Developing', 'Growing', 'Positive', 'Strong'],
  'Identity & Authenticity': ['Exploring', 'Discovering', 'Developing', 'Confident', 'Authentic'],
  'Meaning & Purpose': ['Exploring', 'Discovering', 'Developing', 'Clear', 'Purposeful'],
}

// Score answers for a completed test
export function scoreAnswers(answers: Record<string, string | string[]>, questions: { id: number; type: string; domain: string }[]): DomainScore[] {
  const domainScores: Record<string, number[]> = {}

  questions.forEach(q => {
    const answer = answers[q.id]
    if (!answer) return
    const domain = q.domain
    if (!domainScores[domain]) domainScores[domain] = []

    let score = 3 // default mid
    if (q.type === 'emoji-scale' || q.type === 'scale') {
      score = typeof answer === 'string' ? parseInt(answer) || 3 : 3
    } else if (q.type === 'frequency') {
      const freq = ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always']
      score = (Array.isArray(answer) ? freq.indexOf(answer[0]) : freq.indexOf(answer as string)) + 1 || 3
    } else {
      score = 3 // base score for qualitative
    }
    domainScores[domain].push(Math.min(5, Math.max(1, score)))
  })

  return Object.entries(domainScores).map(([domain, scores]) => {
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 3
    const labels = DOMAIN_LABELS[domain] || ['Very Low', 'Low', 'Moderate', 'Strong', 'Exceptional']
    return {
      domain,
      score: avg,
      label: labels[avg - 1] || 'Developing',
      interpretation: interpretScore(domain, avg),
    }
  })
}

function interpretScore(domain: string, score: number): string {
  if (score >= 4) return `Your child shows strong capacity in ${domain.toLowerCase()}, which is a wonderful foundation for emotional wellbeing.`
  if (score === 3) return `Your child is developing age-appropriately in ${domain.toLowerCase()}. Some gentle support in this area can help them grow further.`
  return `This area offers the most opportunity for growth. With patient, consistent support, your child can build stronger ${domain.toLowerCase()} skills.`
}

export function getOverallLabel(avgScore: number): string {
  if (avgScore >= 4) return 'Strong'
  if (avgScore >= 3) return 'Developing Well'
  return 'Needs Support'
}

export function generateInsights(domainScores: DomainScore[], childName: string): ReportInsights {
  const sorted = [...domainScores].sort((a, b) => b.score - a.score)
  const strengths = sorted.slice(0, 2).map(d => d.domain)
  const growthAreas = sorted.slice(-1).map(d => d.domain)

  return {
    strengths,
    growthAreas,
    conversationStarters: [
      `"What's one thing that made you feel really good this week, ${childName}?"`,
      `"Is there anything that's been worrying you lately? We can talk about it together."`,
      `"What does it feel like when you're really happy? Where do you feel it in your body?"`,
    ],
    activities: [
      "Feelings journal — write or draw one feeling per day",
      "Emotion check-in at dinner — everyone shares their 'rose and thorn'",
      "Create a 'calm-down kit' with things that help when upset",
      "Read books together that feature characters working through feelings",
    ],
    overallNarrative: `${childName} shows age-appropriate emotional development with particular strengths in ${strengths.join(' and ')}. ${growthAreas.length > 0 ? `There is an opportunity to provide gentle support in ${growthAreas[0]}.` : ''} Overall, ${childName} is on a healthy emotional growth trajectory.`,
    childFriendlySummary: `You did an amazing job sharing your feelings today! You're really good at noticing how you feel, and that's a superpower. Everyone is still growing, and that's okay — that's what makes life interesting!`,
  }
}
