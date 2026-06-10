// AUTO-GENERATED verbatim from India design handoff. Do not paraphrase question text.

export type IndiaQType = 'scale' | 'freq' | 'single' | 'multi' | 'agree' | 'open'

export interface IndiaQuestion {
  domain: string
  kind: string
  age: string | null
  type: IndiaQType
  text: string
  help?: string
  lo?: string
  hi?: string
  statement?: string
  placeholder?: string
  options?: string[]
}

export interface IndiaAssessmentMeta {
  letter: string
  slug: string
  id: string
  name: string
  eyebrow: string
  tagline: string
  parentQ: string
  short: string
  icon: string
  tile: string
  why: string
  minutes: number
  questionCount: number
  storageKey: string
}

export const FREQ_OPTS = ["Never", "Rarely", "Sometimes", "Often", "Almost always"] as const

export const INDIA_QUESTIONS: Record<string, IndiaQuestion[]> = {
  "a": [
    {
      "domain": "Peer Awareness",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How much do you think about what your classmates or friends think of you?",
      "lo": "Not much — I rarely think about it",
      "hi": "A great deal — I think about it almost all the time"
    },
    {
      "domain": "Comparison Frequency",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often do you compare yourself to your classmates — marks, looks, sports, popularity?"
    },
    {
      "domain": "Comparison Feeling",
      "kind": "Multi Choice",
      "age": null,
      "type": "single",
      "text": "When you compare yourself to classmates who are doing better than you, how does it usually make you feel?",
      "help": "Pick the one that feels most true.",
      "options": [
        "Motivated — I want to do better too",
        "Sad or discouraged — I feel I'm not good enough",
        "Jealous or resentful",
        "Indifferent — it doesn't really affect me",
        "Ashamed — especially in front of family",
        "A mix of motivated and bad at the same time"
      ]
    },
    {
      "domain": "Rank & Marks Pressure",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How much pressure do you feel because of your class rank or exam marks?",
      "lo": "Very little — marks don't stress me much",
      "hi": "Extreme — marks feel like the most important thing in my life"
    },
    {
      "domain": "Behaviour Change for Peers",
      "kind": "Scenario",
      "age": null,
      "type": "single",
      "text": "Your friend group starts liking something you personally don't enjoy. What do you usually do?",
      "options": [
        "Pretend to like it so I fit in",
        "Stay honest — I say I'm not into it",
        "Try it genuinely to see if I like it",
        "Go quiet and avoid the topic",
        "Feel left out and wish I liked it too"
      ]
    },
    {
      "domain": "Standing Up to Peers",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How easy is it for you to say no or disagree with your friend group?",
      "lo": "Very hard — I almost always go along with the group",
      "hi": "Very easy — I'm comfortable disagreeing"
    },
    {
      "domain": "Social Media Comparison",
      "kind": "Scale",
      "age": "Ages 10+",
      "type": "scale",
      "text": "How much does what you see others posting online — Instagram, WhatsApp, YouTube — make you feel bad about yourself?",
      "lo": "Not at all — it doesn't affect me",
      "hi": "A lot — I often feel my life is worse than others'"
    },
    {
      "domain": "Copying Behaviour",
      "kind": "Frequency",
      "age": "Ages 9+",
      "type": "freq",
      "text": "How often do you copy what others are doing — buying similar things, doing the same activities — just to fit in?"
    },
    {
      "domain": "Friend Group Acceptance",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How accepted and included do you feel within your main friend group?",
      "lo": "Very excluded — I often feel like an outsider",
      "hi": "Very included — I feel completely accepted"
    },
    {
      "domain": "Teasing & Mockery",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often do classmates make fun of you — about marks, looks, interests, or your family?"
    },
    {
      "domain": "Response to Being Mocked",
      "kind": "Scenario",
      "age": null,
      "type": "single",
      "text": "Someone at school makes fun of you in front of others. What do you usually do?",
      "options": [
        "Laugh it off and move on",
        "Say something back confidently",
        "Go quiet and feel upset inside",
        "Cry or feel very hurt",
        "Tell a teacher or parent",
        "Make fun of them back"
      ]
    },
    {
      "domain": "Competition Feeling",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How do you feel about competition with classmates — in marks, sports, or activities?",
      "lo": "I hate competition — it makes me very anxious",
      "hi": "I love competition — it motivates me completely"
    },
    {
      "domain": "Parent-Peer Comparison",
      "kind": "Frequency",
      "age": "Ages 9+",
      "type": "freq",
      "text": "How often do your parents compare you to other children — relatives, neighbours, classmates?"
    },
    {
      "domain": "Self-Worth & Others' Success",
      "kind": "Agree / Disagree",
      "age": "Ages 10+",
      "type": "agree",
      "text": "Respond to this statement:",
      "statement": "When my classmate does better than me in something, it makes me feel worse about myself.",
      "options": [
        "Strongly disagree",
        "Disagree",
        "Neither agree nor disagree",
        "Agree",
        "Strongly agree"
      ]
    },
    {
      "domain": "Peer Values Alignment",
      "kind": "Scale",
      "age": "Ages 10+",
      "type": "scale",
      "text": "How similar are your values and opinions to those of your friend group?",
      "lo": "Very different — I often feel I don't fit in",
      "hi": "Very similar — we think and feel the same way about most things"
    },
    {
      "domain": "Peer Pressure Reflection",
      "kind": "Open",
      "age": "Ages 9+",
      "type": "open",
      "text": "Write about one time when you did something you didn't really want to do because of what friends or classmates expected.",
      "help": "Write as much or as little as you like — there's no wrong answer. Max 3 sentences.",
      "placeholder": "It happened when…"
    }
  ],
  "b": [
    {
      "domain": "Home Safety Feeling",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How safe and relaxed do you feel at home — like you can be yourself without worry?",
      "lo": "Very unsafe — home feels tense or stressful",
      "hi": "Very safe — home is where I feel most relaxed"
    },
    {
      "domain": "Parental Expectations",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How high do you feel your parents' expectations are for you — in studies, behaviour, and life?",
      "lo": "Very low — my parents don't expect much",
      "hi": "Extremely high — I feel I can never meet their expectations"
    },
    {
      "domain": "Marks Pressure from Parents",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How much pressure do you feel from your parents specifically about your marks and school performance?",
      "lo": "Very little — they're relaxed about marks",
      "hi": "Extreme — marks are almost the only thing that matters to them"
    },
    {
      "domain": "Comparison by Parents",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often do your parents compare you to other children — a cousin, neighbour, or classmate — to pressure you?"
    },
    {
      "domain": "Talking to Parents",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How easy is it for you to talk to your parents about things that are bothering you?",
      "lo": "Very hard — I can't really talk to them",
      "hi": "Very easy — I tell them almost everything"
    },
    {
      "domain": "Feeling Understood",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How well do your parents understand how you really feel and what you are going through?",
      "lo": "Not at all — they don't understand me",
      "hi": "Completely — they really get me"
    },
    {
      "domain": "Sharing Failures",
      "kind": "Scenario",
      "age": null,
      "type": "single",
      "text": "You fail a test or do badly in something. How do you feel about telling your parents?",
      "options": [
        "Fine — they will support me and help me improve",
        "Nervous — they will be disappointed but it'll be okay",
        "Very scared — they will be very angry or upset",
        "I hide it from them as long as possible",
        "I tell them a different version of what happened",
        "I feel sick with worry before telling them"
      ]
    },
    {
      "domain": "Fear of Disappointing Parents",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How afraid are you of disappointing your parents?",
      "lo": "Not afraid — they accept me as I am",
      "hi": "Extremely afraid — I feel I always have to prove myself"
    },
    {
      "domain": "Decisions & Choices",
      "kind": "Scale",
      "age": "Ages 10+",
      "type": "scale",
      "text": "How much say do you have in decisions about your own life — what to study, how to spend time, what hobbies to pursue?",
      "lo": "No say at all — parents decide everything",
      "hi": "Full say — I make my own choices"
    },
    {
      "domain": "Career Pressure",
      "kind": "Scale",
      "age": "Ages 10+",
      "type": "scale",
      "text": "How much pressure do you feel from your parents about what you should become when you grow up?",
      "lo": "No pressure — they support whatever I choose",
      "hi": "Immense pressure — the path is already decided for me"
    },
    {
      "domain": "Appreciation at Home",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often do your parents acknowledge or appreciate you for who you are — not just what you achieve?"
    },
    {
      "domain": "Anger at Home",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often is there shouting, anger, or tension at home that makes you feel upset or scared?"
    },
    {
      "domain": "Physical Punishment",
      "kind": "Multi Choice",
      "age": null,
      "type": "single",
      "text": "If you make a mistake at home, what usually happens?",
      "options": [
        "We talk about it calmly",
        "I get scolded verbally",
        "I get silent treatment for a while",
        "My privileges are taken away",
        "I get hit or physically punished",
        "Nothing usually happens",
        "It depends on what the mistake was"
      ]
    },
    {
      "domain": "Sibling Comparison",
      "kind": "Frequency",
      "age": "Ages 9+",
      "type": "freq",
      "text": "How often are you compared to a brother or sister in a way that makes you feel worse about yourself?"
    },
    {
      "domain": "Parent Interest in Child Life",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How interested are your parents in your actual life — your friendships, feelings, interests, and daily experiences?",
      "lo": "Not interested at all — they only care about marks",
      "hi": "Very interested — they know my friends and what I care about"
    },
    {
      "domain": "Expressing Opinions at Home",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How comfortable are you sharing your own opinion or disagreeing with your parents?",
      "lo": "Very uncomfortable — I never disagree with them",
      "hi": "Very comfortable — I can express any view"
    },
    {
      "domain": "Support During Failure",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "When you fail or struggle, how supported do you feel by your parents?",
      "lo": "Not supported at all — they make it worse",
      "hi": "Completely supported — they help me back up"
    },
    {
      "domain": "Parental Relationship Reflection",
      "kind": "Open",
      "age": "Ages 9+",
      "type": "open",
      "text": "If you could change one thing about how your parents treat you or talk to you, what would it be?",
      "placeholder": "I wish they would…"
    }
  ],
  "c": [
    {
      "domain": "School Safety Feeling",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How safe do you feel at school — physically and emotionally?",
      "lo": "Very unsafe — school feels threatening or scary",
      "hi": "Very safe — school is a comfortable, secure place"
    },
    {
      "domain": "School Enjoyment",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How much do you enjoy going to school?",
      "lo": "I dread going — I wish I didn't have to go",
      "hi": "I love going — school is one of my favourite places"
    },
    {
      "domain": "Teacher Relationship",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How supported and respected do you feel by your teachers?",
      "lo": "Not at all — teachers make me feel bad or ignored",
      "hi": "Very much — my teachers are encouraging and fair"
    },
    {
      "domain": "Favourite Teacher",
      "kind": "Open",
      "age": null,
      "type": "open",
      "text": "Describe one teacher you really like or respect — what makes them good?",
      "placeholder": "What I like most about them is…"
    },
    {
      "domain": "Classroom Participation",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How comfortable do you feel raising your hand, asking questions, or sharing your answer in class?",
      "lo": "Very uncomfortable — I never speak up in class",
      "hi": "Very comfortable — I participate freely"
    },
    {
      "domain": "Fear of Wrong Answers",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How afraid are you of giving a wrong answer in class — of being laughed at or scolded?",
      "lo": "Not afraid at all — mistakes feel okay",
      "hi": "Extremely afraid — I avoid speaking to avoid being wrong"
    },
    {
      "domain": "School Workload",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How does the amount of homework, tuition, and schoolwork make you feel?",
      "lo": "Fine — it's manageable",
      "hi": "Overwhelmed — I can never keep up with everything"
    },
    {
      "domain": "Exam Stress",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How stressed do you feel around exam time?",
      "lo": "Barely stressed — exams don't bother me much",
      "hi": "Extremely stressed — exam time is the worst part of my year"
    },
    {
      "domain": "School Belonging",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How much do you feel you belong at your school — like it is your place, your community?",
      "lo": "Not at all — I feel like an outsider at school",
      "hi": "Completely — school feels like my community"
    },
    {
      "domain": "Bullying Experience",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often are you treated badly, left out, or bullied at school — by classmates or seniors?"
    },
    {
      "domain": "Fairness of School Rules",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How fair do you think the rules and systems at your school are?",
      "lo": "Very unfair — the rules feel unjust or one-sided",
      "hi": "Very fair — I think the school system treats everyone fairly"
    },
    {
      "domain": "Punishments at School",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often are you punished or scolded at school in a way that feels humiliating or unfair?"
    },
    {
      "domain": "Freedom to Be Curious",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How free do you feel to ask unusual questions, explore ideas, or think differently in class?",
      "lo": "Not free at all — I just follow what I am told",
      "hi": "Very free — my teachers encourage original thinking"
    },
    {
      "domain": "School Friends",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How connected do you feel to your friends at school?",
      "lo": "Very disconnected — I have no real friends at school",
      "hi": "Very connected — school is where my best friendships are"
    },
    {
      "domain": "Non-Academic Activities",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How much opportunity do you have at school to explore things beyond marks — sports, arts, creativity, or other interests?",
      "lo": "None — school is only about academics",
      "hi": "A great deal — my school values many different things"
    },
    {
      "domain": "Where I Feel Most Myself",
      "kind": "Multi Choice",
      "age": "Ages 9+",
      "type": "single",
      "text": "Where do you feel most like yourself — most comfortable and free to be you?",
      "options": [
        "At home",
        "At school",
        "With friends outside school",
        "Nowhere really — I don't fully feel myself anywhere",
        "It depends on the day"
      ]
    },
    {
      "domain": "School Reflection",
      "kind": "Open",
      "age": "Ages 9+",
      "type": "open",
      "text": "What is one thing about your school you would change to make it better for children?",
      "placeholder": "I would change…"
    }
  ],
  "d": [
    {
      "domain": "Voice at Home — Overall",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "Overall, how much do you feel your opinions and feelings matter to your parents?",
      "lo": "Not at all — what I feel doesn't matter to them",
      "hi": "A great deal — my parents really listen and value my views"
    },
    {
      "domain": "Voice at School — Overall",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "Overall, how much do you feel your opinions and feelings matter to your teachers?",
      "lo": "Not at all — teachers don't care what I think",
      "hi": "A great deal — teachers genuinely listen to me"
    },
    {
      "domain": "Asking for Help at Home",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "When you are struggling with something — emotionally or at school — how easy is it to ask your parents for help?",
      "lo": "Very hard — I deal with everything alone",
      "hi": "Very easy — I ask for help and always get it"
    },
    {
      "domain": "Asking for Help at School",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "When you don't understand something in class, how easy is it to tell the teacher and ask for help?",
      "lo": "Very hard — I never ask, even when I'm lost",
      "hi": "Very easy — I always ask when I need help"
    },
    {
      "domain": "Disagreeing with Parents",
      "kind": "Scenario",
      "age": null,
      "type": "single",
      "text": "Your parents make a decision you strongly disagree with — about school, activities, or something personal. What do you do?",
      "options": [
        "Say what I think directly and explain my view",
        "Try to bring it up carefully at a better moment",
        "Stay quiet — disagreeing isn't safe or useful",
        "Tell someone else (a friend, a sibling) instead",
        "Feel very upset but say nothing",
        "Accept it — parents know best"
      ]
    },
    {
      "domain": "Disagreeing with Teachers",
      "kind": "Scenario",
      "age": "Ages 9+",
      "type": "single",
      "text": "A teacher says something you believe is wrong or unfair. What do you do?",
      "options": [
        "Politely say what I think",
        "Think about it but stay quiet in case I get in trouble",
        "Stay completely silent — you don't challenge teachers",
        "Talk to a friend about it later",
        "Tell my parents",
        "Write it in my diary or keep it to myself"
      ]
    },
    {
      "domain": "Feeling Taken Seriously",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "When you tell your parents something important to you, how often do they really listen and take it seriously?",
      "lo": "Almost never — they dismiss or minimise what I say",
      "hi": "Almost always — they treat my concerns as genuinely important"
    },
    {
      "domain": "Emotional Expression at Home",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How comfortable are you showing your real feelings — sadness, fear, frustration — to your parents?",
      "lo": "Very uncomfortable — I hide my feelings at home",
      "hi": "Very comfortable — I can express any feeling at home"
    },
    {
      "domain": "Being Interrupted or Dismissed",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often do adults — parents or teachers — interrupt you, ignore you, or dismiss what you say?"
    },
    {
      "domain": "Saying No to Adults",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How comfortable are you saying no or setting a boundary with an adult — a parent, teacher, or relative?",
      "lo": "Very uncomfortable — I can never say no to adults",
      "hi": "Very comfortable — I can say no respectfully when I need to"
    },
    {
      "domain": "Voice in Family Decisions",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How much say do you have in family decisions that affect you?",
      "lo": "No say — decisions are made without asking me",
      "hi": "Equal say — my opinion is always considered"
    },
    {
      "domain": "Complaint Channel at School",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "If something unfair or wrong happens at school, how confident are you that you could tell someone and it would be addressed?",
      "lo": "Not at all — there's no point in complaining",
      "hi": "Very confident — someone would listen and help"
    },
    {
      "domain": "Impact of Speaking Up",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "When you do speak up — share your opinion or raise a concern — how often does it actually make a difference?",
      "lo": "Never — speaking up changes nothing",
      "hi": "Almost always — my voice has real impact"
    },
    {
      "domain": "Silenced Topics",
      "kind": "Multi Select",
      "age": "Ages 9+",
      "type": "multi",
      "text": "Are there topics you feel you simply cannot talk about at home?",
      "help": "Pick all that apply.",
      "options": [
        "Marks and school performance",
        "Friendships and social life",
        "Things that upset or scare me",
        "My opinions about family decisions",
        "Things that happened at school",
        "Feelings about my future",
        "Feelings about a specific family member",
        "There is nothing I can't talk about"
      ]
    },
    {
      "domain": "Safe Person",
      "kind": "Multi Choice",
      "age": null,
      "type": "single",
      "text": "Is there at least one adult in your life — at home or at school — who you feel completely safe talking to about anything?",
      "options": [
        "Yes — more than one person",
        "Yes — one person",
        "Sort of — but not about everything",
        "No — not really anyone"
      ]
    },
    {
      "domain": "Voice Reflection",
      "kind": "Open",
      "age": "Ages 9+",
      "type": "open",
      "text": "Is there something important about how you feel or what you think that you wish your parents or teachers understood about you?",
      "placeholder": "I wish they knew that…"
    }
  ],
  "e": [
    {
      "domain": "Favourite Subject",
      "kind": "Multi Select",
      "age": null,
      "type": "multi",
      "text": "Which school subjects do you genuinely enjoy — that you would read about even if there was no exam?",
      "help": "Pick all that apply.",
      "options": [
        "Mathematics",
        "Science (Physics, Chemistry, Biology)",
        "Languages (Hindi, English, or other)",
        "History / Social Studies / Geography",
        "Arts (Drawing, Music, Dance, Drama)",
        "Computer Science / Technology",
        "Sports / Physical Education",
        "None — I don't enjoy any subject"
      ]
    },
    {
      "domain": "Most Rewarded Subject",
      "kind": "Multi Select",
      "age": null,
      "type": "multi",
      "text": "Which subjects do your parents and teachers seem most happy when you do well in?",
      "help": "Pick all that apply.",
      "options": [
        "Mathematics",
        "Science (Physics, Chemistry, Biology)",
        "Languages (Hindi, English, or other)",
        "History / Social Studies / Geography",
        "Arts (Drawing, Music, Dance, Drama)",
        "Computer Science / Technology",
        "Sports / Physical Education",
        "They seem equally happy about all subjects",
        "They mainly care about overall rank, not specific subjects"
      ]
    },
    {
      "domain": "Interest-Reward Gap Feeling",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How much do you feel that what you love to learn is different from what adults want you to be good at?",
      "lo": "No difference — what I love is what they value",
      "hi": "Very different — what I love is ignored or not taken seriously"
    },
    {
      "domain": "Arts & Creativity Value",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How much do your parents value creative subjects like art, music, dance, drama, or writing?",
      "lo": "Not at all — creative subjects are seen as a waste of time",
      "hi": "A great deal — creativity is genuinely valued at home"
    },
    {
      "domain": "Learning Joy",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How often do you feel genuinely excited or curious when learning something at school?",
      "lo": "Almost never — school learning doesn't excite me",
      "hi": "Almost always — I'm curious and engaged in school"
    },
    {
      "domain": "Forced Subject Feeling",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How much do you feel you are being pushed to study subjects you don't enjoy because of pressure from parents or school?",
      "lo": "Not at all — I study what I like",
      "hi": "Completely — I spend most of my time on subjects I don't enjoy"
    },
    {
      "domain": "Dream Learning",
      "kind": "Open",
      "age": null,
      "type": "open",
      "text": "If you could spend one full day learning anything you wanted — with no exams and no pressure — what would you choose to learn about?",
      "placeholder": "I would love to learn about…"
    },
    {
      "domain": "Hidden Talent",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "Do you have a skill or talent that you feel is not recognised or valued by your parents or school?",
      "lo": "No — my talents are well recognised",
      "hi": "Yes — I have abilities that nobody at home or school seems to notice"
    },
    {
      "domain": "Marks vs Learning",
      "kind": "Agree / Disagree",
      "age": "Ages 9+",
      "type": "agree",
      "text": "Respond to this statement:",
      "statement": "I am more focused on getting good marks than on actually understanding or enjoying what I learn.",
      "options": [
        "Strongly disagree",
        "Disagree",
        "Neither agree nor disagree",
        "Agree",
        "Strongly agree"
      ]
    },
    {
      "domain": "Tuition Load",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How much of your time outside school is taken up by tuitions, extra classes, or coaching?",
      "lo": "None — no tuitions",
      "hi": "Almost all my free time — I have very little time for anything else"
    },
    {
      "domain": "Hobby Time",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How much time do you have for hobbies or activities you personally enjoy — outside of schoolwork and tuitions?",
      "lo": "Almost none — free time barely exists",
      "hi": "Lots — I have plenty of time for things I love"
    },
    {
      "domain": "Future Career Dream",
      "kind": "Open",
      "age": "Ages 10+",
      "type": "open",
      "text": "What would you love to be or do when you grow up — what YOU actually want, not what anyone else wants for you?",
      "placeholder": "When I grow up I want to…"
    },
    {
      "domain": "Parents' Career Expectation",
      "kind": "Open",
      "age": "Ages 10+",
      "type": "open",
      "text": "What do your parents want you to become when you grow up?",
      "placeholder": "My parents want me to become…"
    },
    {
      "domain": "Learning Style vs Teaching Style",
      "kind": "Scale",
      "age": "Ages 9+",
      "type": "scale",
      "text": "How well does the way your teachers teach match the way you actually learn best?",
      "lo": "Very poorly — the way I'm taught doesn't work for me",
      "hi": "Very well — I learn exactly the way I need to"
    },
    {
      "domain": "Reward for Non-Academic Skills",
      "kind": "Scale",
      "age": null,
      "type": "scale",
      "text": "How often are you recognised or praised at home for non-academic skills — kindness, creativity, leadership, sport?",
      "lo": "Never — only marks get noticed",
      "hi": "Frequently — my whole self is appreciated"
    },
    {
      "domain": "Boredom at School",
      "kind": "Frequency",
      "age": null,
      "type": "freq",
      "text": "How often do you feel bored at school — like what is being taught has nothing to do with you or your interests?"
    },
    {
      "domain": "Interest-Reward Reflection",
      "kind": "Open",
      "age": "Ages 10+",
      "type": "open",
      "text": "Is there something you are really good at or passionate about that you wish your parents or teachers paid more attention to?",
      "placeholder": "I wish they noticed that I'm good at…"
    }
  ]
}

export const INDIA_ASSESSMENTS: IndiaAssessmentMeta[] = [
  {
    "letter": "A",
    "slug": "a",
    "id": "peer-pressure",
    "name": "Peer Pressure & Comparison",
    "eyebrow": "Assessment A · India Context Series",
    "tagline": "How much is your child's self-worth, choices, and behaviour shaped by classmates — their marks, opinions, and expectations?",
    "parentQ": "How much is peer pressure shaping my child's self-worth, choices, and behaviour?",
    "short": "How much is my child shaped by peers?",
    "icon": "🏫",
    "tile": "#D4763B",
    "why": "Competitive school culture, rank-based evaluation, and tight peer groups make comparison and peer pressure particularly intense. This assessment tracks how much a child's choices and sense of self are driven by peers rather than their own values.",
    "minutes": 5,
    "questionCount": 16,
    "storageKey": "imotracker.assessment-a.v1"
  },
  {
    "letter": "B",
    "slug": "b",
    "id": "parental-pressure",
    "name": "Parental Pressure & Communication",
    "eyebrow": "Assessment B · India Context Series",
    "tagline": "Does your child feel heard, supported, and safely connected at home — or pressured, compared, and misunderstood?",
    "parentQ": "Does my child feel heard and supported at home — or pressured and misunderstood?",
    "short": "Does my child feel heard at home?",
    "icon": "🏠",
    "tile": "#2C5F5D",
    "why": "High academic expectations, family honour, and hierarchical parent-child relationships create a specific pressure landscape. This assessment tracks whether home is experienced as a safe base or a source of stress — and whether parents and children are genuinely connecting.",
    "minutes": 6,
    "questionCount": 18,
    "storageKey": "imotracker.assessment-b.v1"
  },
  {
    "letter": "C",
    "slug": "c",
    "id": "school-environment",
    "name": "School Environment & Comfort",
    "eyebrow": "Assessment C · India Context Series",
    "tagline": "Does your child feel safe, engaged, and valued at school — or stressed, invisible, and reluctant to be there?",
    "parentQ": "Does my child feel safe and engaged at school?",
    "short": "Does my child feel safe at school?",
    "icon": "🏫",
    "tile": "#1E3A5F",
    "why": "Schools are often the most competitive, stressful environment a child experiences. Classroom dynamics, teacher behaviour, exam culture, and institutional rigidity all shape how comfortable and engaged a child feels at school.",
    "minutes": 6,
    "questionCount": 17,
    "storageKey": "imotracker.assessment-c.v1"
  },
  {
    "letter": "D",
    "slug": "d",
    "id": "voice-being-heard",
    "name": "Voice — Being Heard",
    "eyebrow": "Assessment D · India Context Series",
    "tagline": "Can your child speak up, express what they truly think, and feel taken seriously by the adults in their life?",
    "parentQ": "Can my child speak up and feel taken seriously?",
    "short": "Can my child speak up?",
    "icon": "🗣️",
    "tile": "#8FA598",
    "why": "Hierarchical family and school cultures often prioritise obedience over children's voice. Children may learn early that disagreeing with parents or teachers is unsafe. This assessment tracks whether your child has a functional voice — the ability to express genuine thoughts and feel heard.",
    "minutes": 5,
    "questionCount": 16,
    "storageKey": "imotracker.assessment-d.v1"
  },
  {
    "letter": "E",
    "slug": "e",
    "id": "academic-interests",
    "name": "Academic Interests vs Rewards",
    "eyebrow": "Assessment E · India Context Series",
    "tagline": "What does your child genuinely love to learn — and does that match what they feel rewarded and valued for at home and school?",
    "parentQ": "Does what my child loves match what they're rewarded for?",
    "short": "What does my child truly love?",
    "icon": "📚",
    "tile": "#E8A598",
    "why": "The gap between what a child is intrinsically interested in and what the school-family system rewards is one of the most psychologically important dynamics in Indian child development. This assessment maps that gap — and its emotional effects.",
    "minutes": 6,
    "questionCount": 17,
    "storageKey": "imotracker.assessment-e.v1"
  }
]

export function getIndiaAssessment(slug: string): IndiaAssessmentMeta | undefined {
  return INDIA_ASSESSMENTS.find(a => a.slug === slug)
}
export function getIndiaQuestions(slug: string): IndiaQuestion[] {
  return INDIA_QUESTIONS[slug] || []
}
