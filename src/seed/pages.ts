/**
 * Page layouts (page-builder blocks) for the seed.
 * All new copy is a proposal for client review. No invented numbers, prices or claims.
 */
import type { SeedImageKey } from './media'

export type SeedIds = {
  media: Record<SeedImageKey, number>
  pages: Record<string, number>
  services: Record<string, number>
  testimonials: Record<string, number>
  projects: Record<string, number>
  faqs: number[]
}

type Link = { label: string; type: 'page' | 'custom'; page?: number; url?: string }

export function buildPages(ids: SeedIds) {
  const page = (label: string, slug: string): Link => ({ label, type: 'page', page: ids.pages[slug] })
  const url = (label: string, href: string): Link => ({ label, type: 'custom', url: href })
  const img = (key: SeedImageKey) => ids.media[key]
  const letsTalk = page("Let's Talk", 'contact')

  const enquiry = (serviceKey: string, heading: string, intro: string) => ({
    blockType: 'enquiryForm',
    anchorId: 'enquire',
    heading,
    intro,
    defaultService: ids.services[serviceKey],
    nextSteps: [
      { text: 'We read your brief and may call to understand your objectives.' },
      { text: 'We recommend a format and send a tailored proposal and quotation.' },
      { text: 'We refine the plan together until it fits your event.' },
    ],
  })

  const closingCta = (heading: string, text: string) => ({
    blockType: 'cta',
    heading,
    text,
    primaryButton: letsTalk,
    showContactDetails: true,
    style: 'spark',
  })

  return [
    // ── Homepage ───────────────────────────────────────────────────────────
    {
      slug: 'home',
      title: 'Home',
      theme: 'corporate',
      meta: {
        title: 'Corporate Team Building & Bilingual Emcee Singapore | The Charisma Code',
        description:
          'Singapore experiential studio for corporate team building, bilingual emceeing, workshops and celebrations, designed around your people and objectives.',
        image: img('largeGroupCarnival'),
      },
      layout: [
        {
          // Light, with the crowd photos stepping out of a block of brand colour and a stage
          // spotlight drawn behind them. (Before 2026-10-19 this was the dark 'stage' layout.)
          blockType: 'hero',
          variant: 'colourBlock',
          lineArt: 'spotlight',
          heading: 'We get *the whole room* involved.',
          // Text only reads "me + team" (2026-10-20); layout, photos and line art unchanged
          subheading:
            'Corporate team building, emceeing and workshops in Singapore, led by bilingual emcee Chia De Zhong and his team.',
          primaryButton: page('See team building', 'corporate-team-building'),
          secondaryButton: letsTalk,
          images: [img('communityEventCrowd'), img('festiveTeamSelfie')],
          highlights: [{ text: 'Hosted in English & 中文' }, { text: 'Founder-led team' }, { text: 'Based in Singapore' }],
        },
        { blockType: 'clientLogos', heading: 'Brands and organisations we have *worked with*.', tone: 'tinted' },
        {
          // What "The Charisma Code" means (client asked for this, 2026-10-20). Draft for De Zhong's approval.
          blockType: 'statement',
          eyebrow: 'What is The Charisma Code?',
          heading: 'Charisma is not a gift. It is a *code* anyone can learn.',
          body:
            'De Zhong has spent over 15 years on stage as an emcee, singer, pianist and actor, and more than five years in classrooms helping people speak with confidence. The Charisma Code is what both taught him: how to read a room, make every person feel included and give them the confidence to join in.\n\nIt is how we host every event, design every programme and coach every speaker. We bring the spark. You shine.',
          roles: [{ text: 'Emcee' }, { text: 'Singer' }, { text: 'Pianist' }, { text: 'Actor' }, { text: 'Charisma coach' }],
          languages: 'Hosted in *English & 中文*',
          button: page('Explore communication coaching', 'communication-coaching'),
        },
        {
          blockType: 'textImage',
          heading: 'Team building that is *fun with a purpose*.',
          body:
            'Not games for the sake of games. Every session starts with a conversation about your people: what you want them to feel, practise or talk about after the session.\n\nFrom there our team designs and facilitates a programme for your group size, venue and budget, and hosts it with the same energy De Zhong brings to stages across Singapore.',
          points: [
            { text: 'Genuinely fun, never generic' },
            { text: 'Designed around your objectives' },
            { text: 'Facilitated in English and 中文' },
            { text: 'Debriefed so it carries back to work' },
          ],
          image: img('largeGroupCarnival'),
          imagePosition: 'left',
          imageShape: 'landscape',
          button: url('How it works', '/corporate-team-building#approach'),
          tone: 'light',
        },
        {
          blockType: 'serviceCards',
          heading: 'Ways we can work together',
          intro: 'Every engagement is shaped around the occasion, the audience and what you want people to take away.',
          layout: 'priority',
        },
        {
          blockType: 'processSteps',
          heading: 'Our *tailored* approach',
          intro: 'No two groups are the same, so no two programmes are either. This is how we plan every engagement.',
          steps: [
            { title: 'Your objectives', text: 'What should change, or be celebrated, because of this event? We start with the outcome you want.' },
            { title: 'Your people', text: 'Who will be in the room: their roles, languages, energy and how well they already know each other.' },
            { title: 'Format and flow', text: 'We design the activities, programme and timing around your group size, venue and schedule.' },
            { title: 'Budget and logistics', text: 'We recommend options that fit your budget, and coordinate trusted vendors when you need them.' },
            { title: 'Delivery and debrief', text: 'We host and facilitate on the day, and connect the experience back to your goals.' },
          ],
          tone: 'tinted',
        },
        {
          blockType: 'featuredProjects',
          heading: 'Recent work',
          category: 'all',
          limit: 3,
          button: page('See all our work', 'our-work'),
        },
        {
          blockType: 'founderIntro',
          // "Me + my partners/team", not only "me" (client, 2026-10-20)
          heading: 'Founder-led. *Crew-delivered.*',
          body:
            'The Charisma Code was founded by Chia De Zhong (谢德忠), a bilingual English and Mandarin emcee, singer-pianist, actor and educator. He has hosted and performed for over 15 years, from the inaugural Singapore Youth Olympic Games in 2010 to corporate dinners, weddings and community celebrations.\n\nToday De Zhong leads a crew of facilitators, hosts, performers and event partners he trusts. You get his personal attention from the first call, and a team on the day that knows exactly what you want to achieve.',
          // On stage, microphone in hand: the persona clients book, not a studio portrait.
          portrait: img('eveningPartyCrowd'),
          quote: 'Trust me on this: We Bring the Spark, You Shine.',
          credentials: [
            { text: 'Bilingual emcee in English and Mandarin' },
            { text: 'Host at the Singapore Youth Olympic Games 2010' },
            { text: 'Performed at Esplanade Studio and Drama Centre Theatre' },
            { text: 'Corporate Communications, Singapore Management University' },
          ],
          button: page('Meet De Zhong and the crew', 'about'),
          mood: 'stage',
        },
        {
          blockType: 'testimonials',
          heading: 'What clients say',
          source: 'manual',
          testimonials: [ids.testimonials['sheena-mulani'], ids.testimonials['alphonsus-ang'], ids.testimonials['ra-dl']],
        },
        {
          blockType: 'founderUpdates',
          heading: 'Behind the scenes',
          intro: 'Recent events, performances and projects from De Zhong and the crew.',
          source: 'instagram',
          limit: 6,
          instagramLabel: 'Follow @deprinceofzhong',
        },
        closingCta(
          "Let's plan something *your people* will remember.",
          'Tell us about your objectives, date and group size, and we will come back with ideas and a proposal.',
        ),
      ],
    },

    // ── Corporate Team Building (priority #1) ──────────────────────────────
    // Order follows how an HR buyer decides: what it is, proof, why it works,
    // objectives, formats and group size, process, past work, questions, proposal.
    {
      slug: 'corporate-team-building',
      title: 'Corporate Team Building',
      theme: 'corporate',
      meta: {
        title: 'Corporate Team Building Singapore | Facilitated & Tailored | The Charisma Code',
        description:
          'Corporate team building in Singapore designed around your objectives, people, group size and budget. Bilingual facilitation in English and Mandarin.',
        image: img('largeGroupCarnival'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'split',
          // Core promise (client, 2026-10-20): fun that also delivers on the organisation's objectives
          heading: "Corporate team building that's *genuinely fun*, and actually works.",
          subheading:
            'Not games for the sake of games. Every activity ties back to what your organisation wants from the session, planned around your people, group size and budget, and delivered by our facilitation team.',
          primaryButton: url('Request a proposal', '/corporate-team-building#enquire'),
          secondaryButton: url('See how it works', '/corporate-team-building#approach'),
          images: [img('communityEventCrowd'), img('corporateChristmasBallroom')],
          highlights: [{ text: 'Facilitated in English & 中文' }, { text: 'Fun, with a purpose' }],
        },
        {
          // Proof straight after the promise: who we have worked with, and one client in their own words.
          blockType: 'clientLogos',
          heading: 'Brands and organisations we have worked with',
          display: 'static',
          limit: 12,
          testimonial: ids.testimonials['jaz-hang'],
          tone: 'tinted',
        },
        {
          blockType: 'textImage',
          heading: 'Fun on the day. *Still useful* on Monday.',
          body:
            'Games for the sake of games can be fun on the day and forgotten by Monday. When every activity ties back to a real objective, such as helping a new team trust each other or getting departments talking, the laughter becomes a shared experience your people keep referring back to.\n\nFacilitation is more than running games. It is reading the room and guiding a group toward an outcome, so everyone takes part, whatever their role or language.',
          points: [
            { text: 'We read the room and adjust in real time' },
            { text: 'Everyone takes part, whatever their role' },
            { text: 'Facilitated in English and Mandarin' },
            { text: 'Every segment is debriefed back to work' },
          ],
          image: img('largeGroupCarnival'),
          imagePosition: 'left',
          imageShape: 'landscape',
          tone: 'dark',
        },
        {
          blockType: 'featureGrid',
          heading: 'Objectives we design around',
          intro: 'Tell us what you want to achieve. These are some of the goals organisations bring to us.',
          items: [
            { title: 'Stronger collaboration', text: 'Help teams and departments work together more naturally, through activities that need real coordination.' },
            { title: 'Better communication', text: 'Practise listening, clarity and speaking up in a setting where it feels safe to try.' },
            { title: 'Onboarding and integration', text: 'Help new hires, merged teams or regional colleagues get to know each other quickly.' },
            { title: 'Recognition and morale', text: 'Celebrate a milestone or a demanding year in a way that feels personal, not routine.' },
            { title: 'Inclusion across languages', text: 'Bilingual facilitation in English and Mandarin so mixed-language teams can take part fully.' },
            { title: 'Leadership presence', text: 'Give managers practice in leading, motivating and communicating in front of a group.' },
          ],
          style: 'list',
          columns: '3',
          tone: 'light',
        },
        {
          blockType: 'programCards',
          heading: 'Programme formats',
          intro: 'Starting points we adapt for every client. Your final programme is designed around your brief.',
          service: ids.services['team-building'],
        },
        {
          blockType: 'featureGrid',
          heading: 'Planned for your *group size*',
          intro: 'We shape the format, space and facilitation team around your headcount. Share your expected numbers in the enquiry form.',
          items: [
            { title: 'Under 20', text: 'Close-knit formats with more conversation and reflection, ideal for leadership teams and project groups.' },
            { title: '20 to 100', text: 'Group challenges with friendly competition between teams, balanced so everyone stays involved.' },
            { title: 'Over 100', text: 'Large-group formats with a host on stage, team activities on the floor and a clear run of show.' },
          ],
          style: 'strip',
          columns: '3',
          tone: 'tinted',
        },
        {
          blockType: 'processSteps',
          anchorId: 'approach',
          heading: 'How we customise *your programme*',
          intro: 'A clear, collaborative process from the first call to the final debrief.',
          steps: [
            { title: 'Discovery call', text: 'We learn about your objectives, your people, group size, venue, date and budget.' },
            { title: 'Proposal', text: 'You receive a recommended format, an outline of the programme and a quotation.' },
            { title: 'Design and planning', text: 'We refine activities, timings and logistics with you, and coordinate any vendors needed.' },
            { title: 'Facilitation on the day', text: 'We host and facilitate the session, adapting to the room as it happens.' },
            { title: 'Debrief', text: 'We close with a debrief that connects the experience back to your goals.' },
          ],
          tone: 'dark',
        },
        {
          blockType: 'featuredProjects',
          heading: 'Recent corporate work',
          projects: [
            ids.projects['lectrix-engineering-christmas-celebration'],
            ids.projects['the-banyan-group-dinner-and-dance'],
            ids.projects['caregiving-welfare-association-community-event'],
          ],
          limit: 3,
          button: page('See all our work', 'our-work'),
        },
        {
          blockType: 'faq',
          heading: 'Team building questions',
          service: ids.services['team-building'],
        },
        enquiry(
          'team-building',
          'Request a team building *proposal*',
          'Tell us about your team and what you would like to achieve. The more we know, the more useful our first proposal will be.',
        ),
      ],
    },

    // ── Corporate Emcee ────────────────────────────────────────────────────
    {
      slug: 'corporate-emcee',
      title: 'Corporate Emcee',
      theme: 'corporate',
      meta: {
        title: 'Corporate Emcee Singapore | Bilingual English & Mandarin Host',
        description:
          'Professional bilingual corporate emcee in Singapore for conferences, launches, award nights and company celebrations. Hosted by Chia De Zhong.',
        image: img('founderHeadshot'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'split',
          // Core promise (client, 2026-10-20): guaranteed fun from someone with real years in the industry
          heading: 'A corporate emcee who *guarantees the fun*.',
          subheading:
            'Confident, charismatic hosting in English and 中文, backed by over 15 years on stage. For conferences, launches, award nights and company celebrations across Singapore.',
          primaryButton: url('Check availability', '/corporate-emcee#enquire'),
          secondaryButton: url('Watch the hosting reel', '/corporate-emcee#reel'),
          images: [img('founderHeadshot'), img('corporateChristmasBallroom')],
          highlights: [{ text: 'Over 15 years on stage' }, { text: 'Hosted in English & 中文' }],
        },
        {
          blockType: 'textImage',
          heading: 'More than reading a script',
          body:
            'A corporate emcee holds your programme together: introducing leaders and guests correctly, keeping to time, handling the unexpected, and keeping the audience with you from the first welcome to the final thank-you.\n\nDe Zhong brings over 15 years of hosting and performing, a background in corporate communications and the ability to move naturally between English and Mandarin.',
          points: [
            { text: 'Programme and script review with your team' },
            { text: 'Bilingual hosting in English and Mandarin' },
            { text: 'Calm handling of delays and changes' },
            { text: 'Optional live singing and piano' },
          ],
          image: img('tvStudio'),
          imagePosition: 'right',
          imageShape: 'landscape',
          tone: 'light',
        },
        {
          blockType: 'featureGrid',
          heading: 'Events we host',
          items: [
            { title: 'Conferences and seminars', text: 'Clear introductions, smooth transitions and audience Q&A that stays on time.' },
            { title: 'Product and brand launches', text: 'Energy and clarity for media, partners and customers.' },
            { title: 'Award ceremonies', text: 'Building anticipation for every winner and keeping a long list moving.' },
            { title: 'Appreciation and annual dinners', text: 'A warm, professional host for your most important evening of the year.' },
            { title: 'Roadshows and activations', text: 'Drawing in passers-by and turning them into participants.' },
            { title: 'Community and charity events', text: 'Welcoming every guest and bringing attention to your cause.' },
          ],
          style: 'cards',
          columns: '3',
          tone: 'tinted',
        },
        {
          blockType: 'video',
          anchorId: 'reel',
          heading: 'Hosting reel',
          youtubeUrl: 'https://youtu.be/Wo9XVBQohEg',
          caption: "Chia De Zhong's hosting reel (2023).",
          tone: 'light',
        },
        { blockType: 'clientLogos', heading: 'Brands and organisations we have *worked with*.', tone: 'light' },
        {
          blockType: 'testimonials',
          heading: 'What clients say',
          source: 'manual',
          testimonials: [ids.testimonials['ra-dl'], ids.testimonials['sheena-mulani'], ids.testimonials['jaz-hang']],
        },
        enquiry('corporate-emcee', "Check De Zhong's *availability*", 'Share your event date, venue and programme, and we will confirm availability and next steps.'),
      ],
    },

    // ── Dinner & Dance Emcee ──────────────────────────────────────────────
    {
      slug: 'dinner-and-dance-emcee',
      title: 'Dinner & Dance Emcee',
      theme: 'corporate',
      meta: {
        title: 'Dinner and Dance Emcee Singapore | D&D Host with Games & Lucky Draws',
        description:
          'D&D emcee in Singapore for corporate dinners and year-end parties: bilingual hosting, audience games, lucky draws and a programme that keeps the night moving.',
        image: img('eveningPartyCrowd'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'split',
          heading: 'A Dinner & Dance emcee for nights your team *talks about*.',
          subheading:
            'Year-end parties and annual D&Ds hosted with games, lucky draws, bilingual banter and a programme that keeps the energy up.',
          primaryButton: url('Check your D&D date', '/dinner-and-dance-emcee#enquire'),
          secondaryButton: url('See a D&D we hosted', '/our-work/the-banyan-group-dinner-and-dance'),
          images: [img('eveningPartyCrowd'), img('banyanDnd')],
        },
        {
          blockType: 'textImage',
          heading: 'A D&D is a long night. *Pacing* is everything.',
          body:
            'Dinner, speeches, performances, games and lucky draws can run for hours. A good D&D emcee warms up the room early, builds the energy gradually and saves the biggest moments for when the crowd is ready.\n\nThat is how De Zhong hosted The Banyan Group’s Dinner & Dance at Mandai Rainforest Resort, and how he approaches every company celebration.',
          image: img('banyanDnd'),
          imagePosition: 'right',
          imageShape: 'landscape',
          tone: 'light',
        },
        {
          blockType: 'processSteps',
          heading: 'The flow of a great D&D night',
          steps: [
            { title: 'Arrival and warm-up', text: 'Welcoming guests and reading the crowd before the programme starts.' },
            { title: 'Opening and speeches', text: 'A confident welcome and smooth introductions for management and guests.' },
            { title: 'Games and audience interaction', text: 'Table games, trivia and stage segments designed for your crowd.' },
            { title: 'Performances and lucky draws', text: 'Turning every draw into a moment of anticipation.' },
            { title: 'A strong finish', text: 'Closing the night on a high, and on time.' },
          ],
          tone: 'tinted',
        },
        {
          blockType: 'featureGrid',
          heading: 'What we bring to your D&D',
          items: [
            { title: 'Bilingual hosting', text: 'English and Mandarin, so every table feels included.' },
            { title: 'Interactive games and trivia', text: 'Designed for your audience, from quiet tables to the loudest department.' },
            { title: 'Lucky draw hosting', text: 'Keeping excitement high from the first prize to the grand draw.' },
            { title: 'Live singing and piano', text: 'An optional musical segment woven into the programme.' },
          ],
          style: 'checklist',
          columns: '2',
          tone: 'light',
        },
        {
          blockType: 'video',
          heading: 'Highlights from The Banyan Group D&D',
          youtubeUrl: 'https://youtu.be/uIiigFk9yzY',
          tone: 'dark',
        },
        {
          blockType: 'testimonials',
          heading: 'What clients say',
          source: 'manual',
          testimonials: [ids.testimonials['alphonsus-ang'], ids.testimonials['jaz-hang']],
        },
        enquiry('dinner-and-dance', 'Plan your *D&D*', 'Share your date, venue, headcount and the mood you want for the night.'),
      ],
    },

    // ── Corporate Workshops ──────────────────────────────────────────────
    {
      slug: 'corporate-workshops',
      title: 'Corporate Workshops',
      theme: 'corporate',
      meta: {
        title: 'Corporate Workshops Singapore | Communication & Team Workshops',
        description:
          'Facilitated corporate workshops in Singapore on communication, collaboration, team dynamics and employee engagement, designed for your team.',
        image: img('communityEventCrowd'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'split',
          heading: 'Corporate workshops people *actually take part in*.',
          subheading: 'Facilitated workshops on communication, collaboration and team dynamics, designed for your team and delivered with energy.',
          primaryButton: url('Discuss a workshop', '/corporate-workshops#enquire'),
          images: [img('communityEventCrowd'), img('founderHeadshot')],
        },
        {
          blockType: 'featureGrid',
          heading: 'Workshop topics',
          intro: 'Each workshop is adapted to your objectives, industry and audience.',
          items: [
            { title: 'Communication skills', text: 'Speaking with clarity, listening well and adapting to different audiences.' },
            { title: 'Collaboration and team dynamics', text: 'Understanding how your team works together, and how to work together better.' },
            { title: 'Presentation and public speaking', text: 'Structure, voice and presence for presentations that land.' },
            { title: 'Employee engagement', text: 'Interactive sessions that bring energy and connection back into the team.' },
          ],
          style: 'list',
          columns: '2',
          tone: 'light',
        },
        {
          blockType: 'textImage',
          heading: 'Professional, practical facilitation',
          body:
            'Workshops are led by De Zhong and trusted facilitators from our network. Drawing on years of stage and classroom experience, sessions are practical: participants try, receive feedback and try again.\n\nWe can run a single session, a series, or combine a workshop with team activities so ideas are practised together.',
          image: img('tvStudio'),
          imagePosition: 'left',
          imageShape: 'landscape',
          tone: 'tinted',
        },
        {
          blockType: 'featuredProjects',
          heading: 'Case studies',
          projects: [ids.projects['videography-programme-maris-stella-high-school']],
          limit: 1,
        },
        enquiry('corporate-workshops', 'Plan a *workshop*', 'Tell us about your team, your objectives and the format you have in mind.'),
      ],
    },

    // ── Communication Coaching ────────────────────────────────────────────
    {
      slug: 'communication-coaching',
      title: 'Communication Coaching',
      theme: 'corporate',
      meta: {
        title: 'Communication Coaching Singapore | Public Speaking & Stage Presence',
        description:
          'Public speaking, presentation skills and stage presence coaching in Singapore for individuals and corporate teams, from a professional emcee and educator.',
        image: img('founderHeadshot'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'simple',
          heading: 'Communication coaching for confident *speakers and leaders*.',
          subheading:
            'Public speaking, presentation skills and stage presence coaching for individuals and corporate teams, from a professional emcee and educator.',
          primaryButton: url('Book a consultation', '/communication-coaching#enquire'),
        },
        {
          blockType: 'featureGrid',
          heading: 'What we coach',
          items: [
            { title: 'Public speaking', text: 'Structuring a talk and delivering it with confidence.' },
            { title: 'Confidence', text: 'Managing nerves and showing up as yourself.' },
            { title: 'Presentation skills', text: 'Slides, story and voice working together.' },
            { title: 'Stage presence', text: 'Body language, eye contact and owning the space.' },
            { title: 'Everyday communication', text: 'Clarity and connection in meetings, pitches and interviews.' },
            { title: 'Hosting and emceeing', text: 'Practical techniques from a professional emcee.' },
          ],
          style: 'cards',
          columns: '3',
          tone: 'light',
        },
        {
          blockType: 'textImage',
          heading: 'Individual and corporate coaching',
          body:
            'One-to-one coaching is tailored to your goal, whether that is a keynote, a pitch or an interview. Corporate sessions help teams present clearly and speak up with confidence.\n\nCoaching draws on De Zhong’s experience as an emcee, actor and trainer, and on his belief that charisma is a skill anyone can develop.',
          image: img('founderWhiteShirt'),
          imagePosition: 'right',
          imageShape: 'portrait',
          tone: 'tinted',
        },
        enquiry('communication-coaching', 'Start with a *conversation*', 'Tell us what you are preparing for and how you would like to grow as a speaker.'),
      ],
    },

    // ── Wedding Emcee (warm theme) ────────────────────────────────────────
    {
      slug: 'wedding-emcee',
      title: 'Wedding Emcee',
      theme: 'wedding',
      meta: {
        title: 'Wedding Emcee Singapore | Bilingual Host & Live Singer',
        description:
          'Bilingual English and Mandarin wedding emcee in Singapore with live singing, guest interaction and careful planning around your story.',
        image: img('weddingSheraton'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'split',
          heading: 'A wedding emcee who makes your guests *feel at home*.',
          subheading: 'Warm, bilingual hosting in English and Mandarin, with live singing and games planned around your story.',
          primaryButton: url('Check availability', '/wedding-emcee#enquire'),
          secondaryButton: url('Watch a wedding', '/wedding-emcee#wedding-video'),
          images: [img('weddingSheraton'), img('weddingSelfie'), img('weddingTuxedo')],
        },
        {
          blockType: 'textImage',
          heading: 'Your day, *your story*.',
          body:
            'Every couple is different. Before the wedding, De Zhong meets you to go through the flow, brainstorm ideas and understand the families and friends who will be in the room.\n\nOn the day, he keeps the programme on time and the atmosphere lively, so you can be present for every moment.',
          points: [
            { text: 'English and Mandarin hosting' },
            { text: 'Live singing and piano' },
            { text: 'Interactive games for guests' },
            { text: 'Coordination with your venue team' },
          ],
          image: img('weddingSinging'),
          imagePosition: 'right',
          imageShape: 'landscape',
          tone: 'light',
        },
        {
          blockType: 'video',
          anchorId: 'wedding-video',
          heading: 'Wedding emcee and singer in action',
          youtubeUrl: 'https://youtu.be/ANC2fV9moMw',
          tone: 'tinted',
        },
        {
          blockType: 'testimonials',
          heading: 'From our couples',
          source: 'category',
          category: 'weddings',
          limit: 3,
        },
        {
          blockType: 'gallery',
          heading: 'Wedding moments',
          images: [img('weddingSheraton'), img('weddingStage'), img('weddingSelfie'), img('weddingTuxedo'), img('weddingSinging')],
          layout: 'mosaic',
        },
        enquiry('wedding-emcee', 'Tell us about your *wedding*', 'Share your date, venue and the kind of celebration you are dreaming of.'),
      ],
    },

    // ── Kids & Youth (playful theme) ──────────────────────────────────────
    {
      slug: 'kids-youth-programs',
      title: 'Kids & Youth Programs',
      theme: 'kids',
      meta: {
        title: 'Kids & Youth Programmes Singapore | Confidence & Public Speaking',
        description:
          'Confidence, public speaking and creative workshops for schools, camps and youth groups in Singapore, plus playful team building for kids.',
        image: img('marisStellaClass'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'split',
          heading: 'Programmes where young people find *their voice*.',
          subheading:
            'Confidence, communication and creative workshops for schools, camps and youth groups, plus playful team building for kids.',
          primaryButton: url('Plan a school programme', '/kids-youth-programs#enquire'),
          images: [img('kidsPartyHosting'), img('marisStellaClass')],
        },
        {
          blockType: 'featureGrid',
          heading: 'What we teach',
          items: [
            { title: 'Public speaking and confidence', text: 'Speaking up, presenting and believing in your ideas.' },
            { title: 'Acting and drama', text: 'Expression, teamwork and imagination through performance.' },
            { title: 'Videography and storytelling', text: 'Camera skills and stories worth telling.' },
            { title: 'Creative writing', text: 'Finding words for ideas, feelings and stories.' },
            { title: 'Interview skills', text: 'Preparing for school and scholarship interviews with confidence.' },
            { title: 'Kids team building', text: 'Games and challenges that teach cooperation through play.' },
          ],
          style: 'cards',
          columns: '3',
          tone: 'light',
        },
        {
          blockType: 'textImage',
          heading: 'Capturing stories at Maris Stella High School',
          body:
            'Over 11 two-hour sessions, students learned camera shots and angles, green-screen techniques and storytelling, then produced a Teacher’s Day appreciation video as their final project.',
          image: img('marisStellaClass'),
          imagePosition: 'left',
          imageShape: 'portrait',
          button: url('Read the full story', '/insights/capturing-stories-teaching-videography-at-maris-stella-high-school'),
          tone: 'tinted',
        },
        {
          blockType: 'featureGrid',
          heading: 'Programme formats',
          items: [
            { title: 'Multi-day camp', text: 'An immersive programme building confidence, creativity and communication through hands-on activities.' },
            { title: 'Modular school programme', text: 'A series of sessions for school groups, focused on public speaking, presence and self-expression.' },
            { title: 'One-to-one masterclass', text: 'Personal coaching for confidence, presentation skills and stage presence.' },
          ],
          style: 'list',
          columns: '3',
          tone: 'light',
        },
        {
          blockType: 'video',
          heading: 'Children’s games, party hosting and science magic',
          youtubeUrl: 'https://youtu.be/4FZJoAGRiRU',
          tone: 'light',
        },
        enquiry('kids-youth', 'Plan a programme for *young people*', 'Tell us about your school or group, the age range and what you would like participants to gain.'),
      ],
    },

    // ── Creative Campaigns ───────────────────────────────────────────────
    {
      slug: 'creative-campaigns',
      title: 'Creative Campaigns',
      theme: 'corporate',
      meta: {
        title: 'Creative Campaigns & Content Strategy Singapore | The Charisma Code',
        description: 'Campaign and content strategy, creator engagement and launch events for brands in Singapore.',
        image: img('somaLaughing'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'simple',
          heading: 'Creative campaigns that bring brands *closer to people*.',
          subheading: 'Campaign and content strategy, creator engagement and launch events, delivered as one joined-up plan.',
          primaryButton: url('Discuss a campaign', '/creative-campaigns#enquire'),
        },
        {
          blockType: 'featureGrid',
          heading: 'What we do',
          items: [
            { title: 'Campaign strategy', text: 'Defining the message, audience and moments that matter.' },
            { title: 'Content strategy', text: 'Planning content that fits your brand and your channels.' },
            { title: 'Content creation', text: 'Short-form video and storytelling with personality.' },
            { title: 'Brand engagement', text: 'Creators and talents who reflect your brand.' },
            { title: 'Creative concepts', text: 'Ideas for launches, activations and campaigns.' },
            { title: 'Campaign execution', text: 'Coordinating people, places and timelines on the ground.' },
          ],
          style: 'list',
          columns: '3',
          tone: 'light',
        },
        {
          blockType: 'textImage',
          heading: 'Case study: SOMA Fragrances launch',
          body:
            'For SOMA’s brand launch, we secured three paid influencers and more than 20 invited talents, and coordinated their appearances across the media launch, in-store visits and gift packages, while keeping the campaign consistent with SOMA’s bold, modern identity.',
          image: img('somaLaughing'),
          imagePosition: 'right',
          imageShape: 'landscape',
          button: url('View the project', '/our-work/soma-fragrances-brand-launch'),
          tone: 'tinted',
        },
        enquiry('creative-campaigns', 'Talk to us about your *campaign*', 'Share your brand, your goals and your timeline.'),
      ],
    },

    // ── Event Support ─────────────────────────────────────────────────────
    {
      slug: 'event-support',
      title: 'Event Support',
      theme: 'corporate',
      meta: {
        title: 'Event Support Singapore | Sound, Photography, Videography & Performers',
        description:
          'One point of contact for trusted event vendors in Singapore: sound and AV, photography, videography, venues, performers and event crew.',
        image: img('costumePerformers'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'simple',
          heading: 'Event support with *one point of contact*.',
          subheading: 'Sound, photography, videography, venues, performers and crew from a trusted vendor network, coordinated for you.',
          primaryButton: url('Tell us what you need', '/event-support#enquire'),
        },
        {
          blockType: 'featureGrid',
          heading: 'Our trusted vendor network',
          items: [
            { title: 'Sound and AV', text: 'Sound systems and technical support suited to your venue and programme.' },
            { title: 'Photography', text: 'Photographers who capture the moments your team will want to share.' },
            { title: 'Videography', text: 'Highlight videos and coverage for internal and social channels.' },
            { title: 'Venues', text: 'Recommendations and rental options that fit your headcount and budget.' },
            { title: 'Performers', text: 'Singers, character performers and fringe activities for your guests.' },
            { title: 'Event crew', text: 'Extra hands to keep registration, logistics and timing on track.' },
          ],
          style: 'cards',
          columns: '3',
          tone: 'light',
        },
        {
          blockType: 'textImage',
          heading: 'Why one point of contact helps',
          body:
            'Coordinating several vendors takes time and leaves room for gaps. When one team understands your whole event, from the run of show to the sound check, details are less likely to slip and you have one person to call.\n\nWe work with partners we trust and brief them on your objectives, so everyone on the day is working toward the same result.',
          image: img('costumeGroup'),
          imagePosition: 'left',
          imageShape: 'portrait',
          tone: 'tinted',
        },
        enquiry('event-support', 'What does your event *need*?', 'List the services you are looking for, with your date and venue if you have them.'),
      ],
    },

    // ── Services overview (keeps the old /services URL) ───────────────────
    {
      slug: 'services',
      title: 'Services',
      theme: 'corporate',
      meta: {
        title: 'Services | Team Building, Emcee, Workshops & Events Singapore',
        description:
          'Corporate team building, bilingual corporate and D&D emceeing, workshops, coaching, weddings, youth programmes, campaigns and event support in Singapore.',
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'simple',
          heading: 'Everything we do, *designed around your people*.',
          subheading: 'Corporate experiences first, with celebrations, youth programmes and creative work built on the same care.',
        },
        { blockType: 'serviceCards', heading: 'Our services', layout: 'grid' },
        closingCta('Not sure which service fits?', 'Tell us about your event and we will recommend the right format.'),
      ],
    },

    // ── Our Work ─────────────────────────────────────────────────────────
    {
      slug: 'our-work',
      title: 'Our Work',
      theme: 'corporate',
      meta: {
        title: 'Our Work | Corporate Events, D&D, Weddings & Campaigns',
        description:
          'Selected projects by The Charisma Code: corporate celebrations, dinner and dance hosting, weddings, youth programmes and brand campaigns in Singapore.',
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'simple',
          heading: 'Our *work*',
          subheading: 'Corporate celebrations, team experiences, weddings, youth programmes and brand campaigns.',
        },
        { blockType: 'projectArchive', showFilters: true },
        {
          blockType: 'testimonials',
          heading: 'What clients say',
          source: 'category',
          category: 'all',
          limit: 3,
        },
        closingCta('Planning something *similar*?', 'Tell us about your people, your objectives and your date.'),
      ],
    },

    // ── About ────────────────────────────────────────────────────────────
    {
      slug: 'about',
      title: 'About',
      theme: 'corporate',
      meta: {
        title: 'About The Charisma Code | Founded by Emcee Chia De Zhong',
        description:
          'The story behind The Charisma Code, a Singapore experiential and events studio founded by bilingual emcee, performer and educator Chia De Zhong.',
        image: img('founderHeadshot'),
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'split',
          heading: 'The story behind *the stage*.',
          subheading:
            'A boutique experiential and events studio, founded by bilingual emcee, performer and educator Chia De Zhong and delivered by a crew he trusts.',
          images: [img('founderHeadshot'), img('corporateChristmasBallroom')],
        },
        {
          blockType: 'founderIntro',
          heading: 'Meet Chia De Zhong *谢德忠*',
          body:
            'De Zhong is a Singapore-based bilingual emcee, singer, actor, content creator and educator, and a Corporate Communications graduate of Singapore Management University.\n\nOne of his earliest professional milestones was hosting at the inaugural Singapore Youth Olympic Games in 2010. Since then he has hosted corporate dinners and dances, award ceremonies, weddings, product launches, roadshows and community events, and performed at venues including the Esplanade Studio and Drama Centre Theatre.\n\nWith more than five years of teaching and training experience, he also helps children, teenagers and adults build confidence through communication and performance.',
          portrait: img('founderWhiteShirt'),
          quote: 'The Charisma Code: where charisma becomes a skill.',
          credentials: [
            { text: 'Finalist, SAFRA’s The Ultimate Talent' },
            { text: 'Finalist, UFM100.3’s The Wedding Singer' },
            { text: 'Featured on MediaCorp Channel 8' },
            { text: 'Trainer with Zenitant, Edublitz and Aktivate' },
          ],
          mood: 'stage',
        },
        {
          blockType: 'featureGrid',
          heading: 'What we believe',
          items: [
            { title: 'Charisma can be learned', text: 'It is not reserved for natural extroverts. It is about communicating, connecting and expressing yourself authentically.' },
            { title: 'People first', text: 'Every programme starts with the people in the room, never with a template.' },
            { title: 'Founder-led, crew-delivered', text: 'De Zhong’s personal care from the first call, with a trusted crew that delivers on the day.' },
          ],
          style: 'list',
          columns: '3',
          tone: 'light',
        },
        {
          blockType: 'textImage',
          heading: 'The *crew* behind the spark',
          body:
            'The Charisma Code is more than one person. De Zhong works with a crew of facilitators, hosts and performers, and brings in trusted partners for fringe activities, sound systems, venue rental, photography and videography when your event needs them.\n\nYou deal with one point of contact; the crew takes care of the rest.',
          image: img('somaGroup'),
          imagePosition: 'right',
          imageShape: 'landscape',
          button: page('Explore event support', 'event-support'),
          tone: 'tinted',
        },
        {
          blockType: 'video',
          heading: 'De Zhong in action',
          youtubeUrl: 'https://youtu.be/Wo9XVBQohEg',
          caption: 'Hosting reel (2023).',
          tone: 'light',
        },
        closingCta("Let's create something *memorable*.", 'Tell us about your event and we will come back with ideas.'),
      ],
    },

    // ── Insights ─────────────────────────────────────────────────────────
    {
      slug: 'insights',
      title: 'Insights',
      theme: 'corporate',
      meta: {
        title: 'Insights | Team Building, Events & Communication Articles',
        description:
          'Articles on team building, corporate events, communication, workshops and weddings, plus updates from behind the scenes at The Charisma Code.',
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'simple',
          heading: '*Insights*',
          subheading: 'Ideas and stories on team building, corporate events, communication and celebrations, from behind the scenes at The Charisma Code.',
        },
        { blockType: 'postArchive', limit: 24, showCategoryLinks: true },
      ],
    },

    // ── Contact ──────────────────────────────────────────────────────────
    {
      slug: 'contact',
      title: 'Contact',
      theme: 'corporate',
      meta: {
        title: 'Contact The Charisma Code | Enquire About Your Event',
        description:
          'Enquire about corporate team building, emceeing, workshops or your celebration in Singapore. Call, WhatsApp or send us your event details.',
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'simple',
          heading: "Let's *talk*.",
          subheading:
            'Team building, emceeing, workshops or a celebration: share a few details and we will come back with ideas and a proposal.',
        },
        {
          blockType: 'enquiryForm',
          anchorId: 'enquire',
          heading: 'Send an enquiry',
          intro: 'The more you share about your objectives, audience and date, the more useful our reply will be.',
          nextSteps: [
            { text: 'We read your enquiry and may call to understand your objectives.' },
            { text: 'We recommend a format and send a tailored proposal.' },
            { text: 'We refine the plan together until it fits.' },
          ],
        },
      ],
    },

    // ── Work With Us ─────────────────────────────────────────────────────
    {
      slug: 'work-with-us',
      title: 'Work With Us',
      theme: 'corporate',
      meta: {
        title: 'Work With Us | Freelance Facilitators, Emcees & Event Crew Singapore',
        description:
          'Join The Charisma Code’s freelance network of facilitators, emcees, performers, singers, crew, photographers, videographers and creative partners in Singapore.',
      },
      layout: [
        {
          blockType: 'hero',
          variant: 'simple',
          heading: 'Work with *The Charisma Code*.',
          subheading:
            'We collaborate with freelance facilitators, emcees, performers, crew and creatives across Singapore. If you love making events better, we would like to hear from you.',
          primaryButton: url('Apply now', '/work-with-us#apply'),
        },
        {
          blockType: 'featureGrid',
          heading: 'Who we work with',
          items: [
            { title: 'Facilitators, emcees and hosts', text: 'People who can hold a room, include everyone and keep a programme on time.' },
            { title: 'Performers and singers', text: 'Live acts and character performers who love an audience.' },
            { title: 'Event and sound crew', text: 'Reliable hands for logistics, setup and technical support.' },
            { title: 'Photographers and videographers', text: 'Storytellers who capture real moments, not just poses.' },
            { title: 'Creative partners', text: 'Designers, writers and content creators for campaigns and events.' },
          ],
          style: 'checklist',
          columns: '2',
          tone: 'light',
        },
        {
          blockType: 'applicationForm',
          anchorId: 'apply',
          heading: 'Apply as a freelancer',
          intro:
            'Your application is reviewed by our team and kept private. We will contact you when there is a project that suits your skills.',
        },
      ],
    },
  ]
}
