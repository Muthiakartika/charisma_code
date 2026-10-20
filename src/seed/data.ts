/**
 * Starting content for the CMS.
 *
 *  - Facts, testimonials, clients and projects come from the existing website.
 *  - Testimonials are verbatim excerpts of public Google reviews ("…" marks a shortened part).
 *  - New marketing copy is a proposal and is marked "Needs client review" in the CMS.
 */
import type { SeedImageKey } from './media'

export const categories = [
  { slug: 'team-building', title: 'Team Building', order: 1 },
  { slug: 'corporate-events', title: 'Corporate Events', order: 2 },
  { slug: 'communication', title: 'Communication', order: 3 },
  { slug: 'workshops', title: 'Workshops', order: 4 },
  { slug: 'weddings', title: 'Weddings', order: 5 },
  { slug: 'kids-programs', title: 'Kids Programs', order: 6 },
  { slug: 'founder-updates', title: 'Founder Updates', order: 7 },
]

export const services: Array<{
  key: string
  title: string
  priority: number
  audience: 'corporate' | 'celebrations' | 'youth' | 'creative'
  summary: string
  image: SeedImageKey
  pageSlug: string
}> = [
  {
    key: 'team-building',
    title: 'Corporate Team Building',
    priority: 1,
    audience: 'corporate',
    summary:
      'Team building that is genuinely fun and built around your objectives, your people and your group size. Never games for the sake of games.',
    image: 'festiveTeamSelfie',
    pageSlug: 'corporate-team-building',
  },
  {
    key: 'corporate-emcee',
    title: 'Corporate Emcee',
    priority: 2,
    audience: 'corporate',
    summary:
      'Guaranteed fun from a bilingual English and Mandarin host with over 15 years on stage, for conferences, launches, award nights and celebrations.',
    image: 'founderHeadshot',
    pageSlug: 'corporate-emcee',
  },
  {
    key: 'dinner-and-dance',
    title: 'Dinner & Dance Emcee',
    priority: 3,
    audience: 'corporate',
    summary: 'High-energy D&D hosting with games, lucky draws and a programme that keeps the whole night moving.',
    image: 'eveningPartyCrowd',
    pageSlug: 'dinner-and-dance-emcee',
  },
  {
    key: 'corporate-workshops',
    title: 'Corporate Workshops',
    priority: 4,
    audience: 'corporate',
    summary: 'Interactive, facilitated workshops on communication, collaboration and team dynamics.',
    image: 'tvStudio',
    pageSlug: 'corporate-workshops',
  },
  {
    key: 'communication-coaching',
    title: 'Communication Coaching',
    priority: 5,
    audience: 'corporate',
    summary: 'Public speaking, presentation and stage presence coaching for individuals and corporate teams.',
    image: 'founderWhiteShirt',
    pageSlug: 'communication-coaching',
  },
  {
    key: 'wedding-emcee',
    title: 'Wedding Emcee',
    priority: 6,
    audience: 'celebrations',
    summary: 'Warm, bilingual wedding hosting with live singing and guest interaction, planned around your story.',
    image: 'weddingSheraton',
    pageSlug: 'wedding-emcee',
  },
  {
    key: 'kids-youth',
    title: 'Kids & Youth Programs',
    priority: 7,
    audience: 'youth',
    summary: 'Confidence, communication and creative workshops for schools, camps and young people.',
    image: 'marisStellaClass',
    pageSlug: 'kids-youth-programs',
  },
  {
    key: 'creative-campaigns',
    title: 'Creative Campaigns',
    priority: 8,
    audience: 'creative',
    summary: 'Campaign and content strategy, creator engagement and launch events for brands.',
    image: 'somaLaughing',
    pageSlug: 'creative-campaigns',
  },
  {
    key: 'event-support',
    title: 'Event Support',
    priority: 9,
    audience: 'creative',
    summary: 'One point of contact for trusted vendors: sound, photography, videography, venues, performers and crew.',
    image: 'costumePerformers',
    pageSlug: 'event-support',
  },
]

/** Public Google reviews shown on the old website (verbatim excerpts). */
export const testimonials = [
  {
    key: 'alphonsus-ang',
    authorName: 'Alphonsus Ang',
    authorRole: 'Luncheon event',
    category: 'general',
    quote:
      'Thank you for your hard work and effort behind the song, the track making, the script, the yum seng and the improv especially when we gave you very little to work with and such a hard crowd and space.',
  },
  {
    key: 'sheena-mulani',
    authorName: 'Sheena Mulani',
    authorRole: 'Charity event for a client',
    category: 'corporate-events',
    quote:
      'De Zhong was not only professional, but I really like his personality and the way he engages with the audience. Highly recommend!',
  },
  {
    key: 'ra-dl',
    authorName: 'RA DL',
    authorRole: 'Event host',
    category: 'general',
    quote:
      "Very impressed with De zhongs' ability to improvise on the spot and draw the crowds attention. Literally saved the day with his emceeing!!",
  },
  {
    key: 'jaz-hang',
    authorName: 'Jaz Hang',
    authorRole: 'Pool party',
    category: 'general',
    quote:
      'He blended into our culture and style very quickly, and his high energy and flexibility played a key role in the event’s success.',
  },
  {
    key: 'grace-lim',
    authorName: 'Grace Lim',
    authorRole: 'Wedding',
    category: 'weddings',
    quote:
      'His experience as an emcee definitely helped take the load off us during our planning … we simply provided him with our outline and he was able to execute whatever we wanted smoothly.',
  },
  {
    key: 'missionyesido',
    authorName: 'missionyesido',
    authorRole: 'Wedding',
    category: 'weddings',
    quote:
      'What really stood out was the effort he put in before the wedding; multiple sessions to go through the event flow, brainstorm ideas, and give us valuable advice.',
  },
  {
    key: 'yeo-xiao-yu-zenna',
    authorName: 'Yeo Xiao Yu Zenna',
    authorRole: 'Wedding',
    category: 'weddings',
    quote:
      'When our big day comes, he really shine & thoroughly engages our guests. we received feedback also that De Zhong is really good!',
  },
  {
    key: 'jeff-png',
    authorName: 'Jeff Png',
    authorRole: 'Wedding',
    category: 'weddings',
    quote:
      'He made our wedding atmosphere more active and lively. And also he knows very well on how to keep the crowd engaged.',
  },
] as const

/** "Partners we worked with" on the old website. Relationship and logo permission need confirmation. */
export const clients = [
  'Youth Olympic Games',
  'Singapore Sports Council',
  "People's Association",
  'Singtel',
  'Samsung',
  'MediaCorp',
  'SuperSports Arena',
  'OCBC',
  'Maybank',
  'HSBC',
  'AVIVA',
  'Singapore Street Festival',
  'Book Council SG',
  'Marriott Vacation Club',
  'Singapore Food Show',
  'Smeg',
  'Dolce & Gabbana',
  'SMARTIES APAC',
  'FairPrice Xtra',
  'Carlsberg',
  'Shopee',
  'Lazada',
  'Alpecin',
  'Cocoa Trees',
  'Marigold',
  'Energizer',
  'Monkey Shoulder',
  'The Smart Local',
  'Titan Digital Media',
  'StarHub',
  'Sentosa',
  'Kaboodle',
  'Hyundai',
  'Nirvana Memorial Garden',
]

/** Proposed team-building formats — to be confirmed with De Zhong. */
export const teamBuildingPrograms = [
  {
    title: 'Facilitated team challenge',
    summary:
      'A hosted series of collaborative challenges built around one or two clear objectives, such as cross-team trust or communication. Each round is debriefed so the lessons carry back to work.',
    highlights: ['Objectives agreed before anything is designed', 'Mix of thinking, creative and active challenges', 'Debrief after every round'],
  },
  {
    title: 'Team bonding at your company event',
    summary:
      'Interactive games and group activities woven into your dinner and dance, offsite or anniversary, led by a professional host so the energy carries through the whole programme.',
    highlights: ['Table games and stage segments', 'Designed for mixed ages and languages', 'Hosted from start to finish'],
  },
  {
    title: 'Workshop and activity hybrid',
    summary:
      'A facilitated communication or collaboration workshop combined with hands-on activities, so new skills are practised together, not just discussed.',
    highlights: ['Short, practical learning segments', 'Activities that apply each idea', 'Takeaways your team can use on Monday'],
  },
  {
    title: 'Leadership offsite programme',
    summary:
      'Facilitated sessions, team activities and hosting across a leadership retreat or offsite agenda, coordinated as one programme.',
    highlights: ['Planned around your offsite agenda', 'Facilitation and hosting in one team', 'Vendors coordinated through our network'],
  },
]

export const teamBuildingFaqs = [
  {
    question: 'How is your team building different from a standard activity package?',
    answer:
      'We start with your objectives, not an activity list. After a short conversation about your people, group size, venue and budget, we design the session around the outcome you want.\n\nEvery activity is facilitated and debriefed, so the experience connects back to how your team works.',
  },
  {
    question: 'What group sizes do you work with?',
    answer:
      'Programmes are planned around your headcount, from a single department to a company-wide event. Share your expected numbers in the enquiry form and we will recommend a format that keeps everyone involved.',
  },
  {
    question: 'Can sessions be run in English and Mandarin?',
    answer:
      'Yes. Our founder, De Zhong, facilitates and hosts in both English and Mandarin, which helps mixed-language teams take part comfortably.',
  },
  {
    question: 'Where do sessions take place?',
    answer:
      'Sessions can take place at your office, a hotel or event venue, or another location that suits your programme. If you still need a venue, we can recommend options through our partner network.',
  },
  {
    question: 'How far in advance should we enquire?',
    answer:
      'As early as you can, especially for year-end and festive periods when dates fill up quickly. Share your preferred dates in the enquiry form and we will confirm availability.',
  },
  {
    question: 'Will we receive a proposal and quotation?',
    answer:
      'Yes. Once we understand your objectives and requirements, we prepare a tailored proposal with a recommended programme and a quotation.',
  },
]

export const founderUpdates = [
  {
    title: 'Hosting for Caregiving Welfare Association',
    description:
      'Emceeing a community event that supports seniors and caregivers. Happiness is seeing every happy face in the room, however long the day.',
    date: '2026-09-24',
    image: 'cwaEvent' as SeedImageKey,
    link: '/insights/every-moment-on-stage-is-a-moment-well-lived',
  },
  {
    title: 'An updated 2026 portfolio',
    description: 'Years of hosting, performing, teaching and creating, now gathered in one updated portfolio and résumé.',
    date: '2026-09-26',
    image: 'founderWhiteShirt' as SeedImageKey,
    link: '/insights/meet-chia-de-zhong-my-updated-2026-portfolio-resume-16-years-of-hosting-performing-creating',
  },
  {
    title: 'Wedding emcee and live singer at Sheraton Towers',
    description: 'An afternoon celebration for Pao and Zhi Qin, with hosting, live songs and a room full of smiles.',
    date: '2026-01-18',
    image: 'weddingSheraton' as SeedImageKey,
    link: '/insights/wedding-emceeing-and-singing-at-sheraton-towers',
  },
  {
    title: 'Invited to the 28th COMPASS Awards Presentation',
    description: 'Grateful to attend again, celebrating the people who keep Singapore’s music scene alive.',
    date: '2025-09-29',
    image: 'compassAwards' as SeedImageKey,
    link: '/insights/honoured-to-be-invited-to-the-28th-compass-awards-presentation-2025',
  },
  {
    title: 'Featured on MediaCorp Channel 8',
    description: 'Sharing the ups, downs and choices of building a freelance career in a segment about self-employed life.',
    date: '2025-09-23',
    image: 'mediacorpInterview' as SeedImageKey,
    link: '/insights/mediacorp-channel-8-interview-segment',
  },
]

export const projects: Array<{
  slug: string
  title: string
  category: 'team-building' | 'corporate-events' | 'dinner-and-dance' | 'weddings' | 'kids-youth' | 'campaigns'
  clientName?: string
  venue?: string
  eventDate: string
  summary: string
  objective?: string
  solution?: string
  execution?: string
  outcomes?: string
  cover: SeedImageKey
  gallery?: SeedImageKey[]
  videoUrl?: string
  testimonialKey?: string
  featured?: boolean
  legacyUrl?: string
}> = [
  {
    slug: 'lectrix-engineering-christmas-celebration',
    title: 'A family-inclusive Christmas celebration for Lectrix Engineering',
    category: 'corporate-events',
    clientName: 'Lectrix Engineering',
    venue: 'InterContinental Singapore',
    eventDate: '2025-12-01',
    summary:
      'Event planning, hosting and live singer-pianist entertainment for a multicultural team, their families and friends.',
    objective:
      'Lectrix Engineering wanted a year-end Christmas celebration that brought employees, families and friends together. The team included colleagues from South Asia and South East Asia alongside local Singaporean families of all ages, so everyone needed to feel included.',
    solution:
      'De Zhong took on three roles: event planner, corporate host and live singer-pianist. The language on stage and the pacing of the programme were planned so that no one felt left out, and the Christmas trivia was written to be fun and accessible for every culture in the room.',
    execution:
      'At InterContinental Singapore in Bugis, the evening moved from a welcome into an interactive Christmas trivia game that sparked table conversations and friendly competition. Christmas songs were performed live on the piano within the flow of the programme, and the night closed with a lively lucky draw.',
    outcomes:
      'One person held the planning, the audience dynamics and the on-stage execution together, which kept communication simple for the client and gave guests a warm, polished celebration.',
    cover: 'corporateChristmasBallroom',
    gallery: ['festiveTeamSelfie', 'communityEventCrowd', 'eveningPartyCrowd'],
    featured: true,
    legacyUrl: '/inside-a-corporate-christmas-party-at-intercontinental-singapore-emcee-live-music-engagement/',
  },
  {
    slug: 'the-banyan-group-dinner-and-dance',
    title: 'The Banyan Group Dinner & Dance at Mandai Rainforest Resort',
    category: 'dinner-and-dance',
    clientName: 'The Banyan Group',
    venue: 'Mandai Rainforest Resort',
    eventDate: '2025-11-01',
    summary: 'Hosting a full D&D programme of dinner, speeches, games, performances and lucky draws.',
    objective:
      'A long evening programme for a lively, close-knit organisation, with dinner, speeches, games, performances and lucky draws to hold together.',
    solution:
      'De Zhong read the room before the programme began and opened with a bold, playful style that suited the crowd. Instead of peaking early, the energy was built progressively, segment by segment.',
    execution:
      'Every table took part in the games and activities. Throughout the night De Zhong thanked the team, acknowledged their milestones and celebrated colleagues, keeping the atmosphere warm as well as energetic.',
    outcomes:
      'By the middle of the night the whole room was cheering and responding without hesitation, and the evening ended even stronger than it started.',
    cover: 'banyanDnd',
    videoUrl: 'https://youtu.be/uIiigFk9yzY',
    featured: true,
    legacyUrl: '/how-i-maintain-high-energy-on-stage-hosting-the-banyan-groups-dd-at-mandai-rainforest-resort/',
  },
  {
    slug: 'soma-fragrances-brand-launch',
    title: 'Talent and influencer coordination for the SOMA Fragrances launch',
    category: 'campaigns',
    clientName: 'SOMA Fragrances',
    eventDate: '2025-08-01',
    summary:
      'Three paid influencers and more than 20 invited talents, coordinated across a media launch, in-store visits and gift packages.',
    objective:
      'SOMA needed the right voices at its brand launch: creators and talents who reflected the brand’s bold, modern spirit, present at the right moments.',
    solution:
      'We secured three paid influencers, invited more than 20 talents and acted as the bridge between SOMA and its community. We also worked with the team on brand image and strategy so the campaign stayed consistent with SOMA’s identity.',
    execution:
      'Talents were coordinated across the media launch event, in-store visits and the delivery of special SOMA gift packages, so everyone showed up where they needed to be.',
    outcomes:
      'A launch where a carefully chosen group of people came together to embody the brand’s story.',
    cover: 'somaLaughing',
    gallery: ['somaGroup', 'somaGuests', 'somaProducts'],
    featured: true,
    legacyUrl: '/hello-world/',
  },
  {
    slug: 'wedding-at-sheraton-towers',
    title: 'Wedding emcee and live singer at Sheraton Towers Singapore',
    category: 'weddings',
    venue: 'Sheraton Towers Singapore',
    eventDate: '2026-01-18',
    summary: 'Bilingual hosting and live singing for an afternoon wedding celebration.',
    execution:
      'De Zhong hosted the afternoon celebration and performed live songs, working closely with the hotel’s AV and wedding service teams to keep transitions smooth and the programme on time.',
    outcomes: 'An afternoon full of laughter, emotional moments and happy guests.',
    cover: 'weddingSheraton',
    gallery: ['weddingSelfie', 'weddingSinging', 'weddingStage'],
    legacyUrl: '/wedding-emceeing-and-singing-at-sheraton-towers/',
  },
  {
    slug: 'videography-programme-maris-stella-high-school',
    title: 'Videography programme at Maris Stella High School',
    category: 'kids-youth',
    clientName: 'Maris Stella High School',
    eventDate: '2025-07-01',
    summary: 'Eleven two-hour sessions that ended with a student-made Teacher’s Day appreciation video.',
    objective: 'Teach students the building blocks of videography and help them discover the joy of expression through film.',
    execution:
      'Over 11 sessions, students explored camera shots and angles, green-screen techniques and storytelling frameworks, then planned, shot and edited their own final project.',
    outcomes: 'The class produced a heartfelt Teacher’s Day appreciation video, dedicated to the teachers who guide them every day.',
    cover: 'marisStellaClass',
    legacyUrl: '/capturing-stories-teaching-videography-at-maris-stella-high-school/',
  },
  {
    slug: 'caregiving-welfare-association-community-event',
    title: 'Community event for Caregiving Welfare Association',
    category: 'corporate-events',
    clientName: 'Caregiving Welfare Association',
    eventDate: '2026-09-01',
    summary: 'Hosting a community event for a charity that supports seniors and caregivers in Singapore.',
    execution:
      'De Zhong guided guests through the programme, introduced speakers and activities, and made sure everyone felt welcomed and included.',
    cover: 'cwaEvent',
    videoUrl: 'https://youtu.be/OSz2OrNO_jg',
    legacyUrl: '/every-moment-on-stage-is-a-moment-well-lived-%e2%9d%a4%ef%b8%8f/',
  },
  {
    slug: 'princess-birthday-party',
    title: 'A princess birthday party with two storybook guests',
    category: 'kids-youth',
    eventDate: '2025-09-13',
    summary: 'Sourcing and coordinating princess performers for a birthday afternoon of games, songs and a coronation.',
    execution:
      'We procured two princess performers who led the children through games, songs, dances and a coronation ceremony that made every little guest feel like royalty.',
    cover: 'princessParty',
    legacyUrl: '/procuring-princesses-for-a-princess-birthday-party/',
  },
]
