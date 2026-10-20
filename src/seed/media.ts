/**
 * Photos imported from the existing WordPress website (all real photos of The Charisma Code).
 * Photos marked `needsReplacement` are temporary until better, more relevant photos are
 * supplied — e.g. there are no corporate team-building photos on the old website yet.
 */
import type { ImageSpec } from './helpers'

const WP = 'https://www.thecharismacode.co/wp-content/uploads'

/** The file name a seeded photo gets in the Media collection (and in .seed-cache/). */
export const seedFileName = (url: string) => decodeURIComponent(url.split('/').pop() ?? 'file').replace(/[^\w.-]+/g, '-')

export const seedImages = {
  founderHeadshot: {
    url: `${WP}/2026/09/Headshot-1152x1536.jpg`,
    alt: 'Portrait of Chia De Zhong, founder of The Charisma Code, in a navy suit',
  },
  founderBowTie: {
    url: `${WP}/2025/08/C2244A25-98E5-4B7F-8FBD-C955C0597B14-1229x1536.jpeg`,
    alt: 'De Zhong in a blue suit and bow tie, ready to host an evening event',
  },
  founderWhiteShirt: {
    url: `${WP}/2025/07/D9F50603-6847-4170-BFB9-CA4E526B2BF8-1024x1536.jpeg`,
    alt: 'Portrait of De Zhong smiling in a white shirt',
  },
  largeGroupCarnival: {
    url: `${WP}/2026/02/E757A0BA-6BC9-4198-A11D-327451183D5E-1152x1536.jpg`,
    alt: 'De Zhong hosting with a microphone in front of a large group gathered for a group photo',
    needsReplacement: true,
    focal: { x: 42, y: 40 },
  },
  corporateChristmasBallroom: {
    url: `${WP}/2025/12/WhatsApp-Image-2025-12-21-at-6.54.00-PM-1536x1152.jpeg`,
    alt: 'Guests at the Lectrix Engineering Christmas celebration in the InterContinental Singapore lobby lounge',
  },
  eveningPartyCrowd: {
    url: `${WP}/2026/02/3CA72E1F-67D6-4A2F-8F1B-F2654153AB03-1152x1536.jpg`,
    alt: 'De Zhong with a microphone leading a cheering crowd at an evening celebration',
    needsReplacement: true,
    focal: { x: 45, y: 40 },
  },
  communityEventCrowd: {
    url: `${WP}/2026/02/DD8A0DBD-9CD6-418A-97E5-DD8B411067EB-1152x1536.jpg`,
    alt: 'De Zhong hosting a community celebration with families cheering behind him',
    needsReplacement: true,
    focal: { x: 50, y: 42 },
  },
  festiveTeamSelfie: {
    url: `${WP}/2026/02/851754D5-52AA-4558-AFE2-2A9FEEC2AC83-1152x1536.jpg`,
    alt: 'De Zhong in a Christmas hat taking a selfie with event guests',
    needsReplacement: true,
    focal: { x: 45, y: 45 },
  },
  somaLaughing: {
    url: `${WP}/2025/08/D287A8A5-BA1A-4BF1-89C6-C40F403BAE70-1536x1024.jpeg`,
    alt: 'De Zhong laughing with a guest at the SOMA Fragrances brand launch',
  },
  somaGroup: {
    url: `${WP}/2025/07/DGSH9603-1536x1024.jpg`,
    alt: 'Invited talents and guests posing together at the SOMA Fragrances launch',
  },
  somaGuests: {
    url: `${WP}/2025/07/DGSH9469-1536x1024.jpg`,
    alt: 'Guests sharing a moment at the SOMA Fragrances launch event',
  },
  somaProducts: {
    url: `${WP}/2026/02/45D610BE-37FB-46C2-AAA0-546529A6477C-1536x1024.jpeg`,
    alt: 'De Zhong presenting at the SOMA Fragrances launch with guests',
  },
  weddingSheraton: {
    url: `${WP}/2026/02/photo_2026-02-01-17.23.59-1-1152x1536.jpeg`,
    alt: 'Wedding emcee De Zhong taking a selfie with the couple at their banquet at Sheraton Towers Singapore',
  },
  weddingSelfie: {
    url: `${WP}/2025/10/photo_2025-10-19-00.38.20.jpeg`,
    alt: 'De Zhong with a bride and groom at their wedding banquet',
  },
  weddingSinging: {
    url: `${WP}/2025/10/photo_2025-10-19-00.37.05.jpeg`,
    alt: 'De Zhong singing on stage beside the couple at a wedding reception',
  },
  weddingStage: {
    url: `${WP}/2025/10/photo_2025-10-19-00.38.24.jpeg`,
    alt: 'Couple on stage with De Zhong hosting a wedding segment',
  },
  weddingTuxedo: {
    url: `${WP}/2026/02/121C8571-34A0-4036-9E70-7BCE72077F0D-1152x1536.jpg`,
    alt: 'De Zhong in a tuxedo holding a bridal bouquet at a wedding venue',
  },
  princessParty: {
    url: `${WP}/2025/09/photo_2025-09-19-18.52.17.jpeg`,
    alt: 'De Zhong with the princess performers at a princess-themed birthday party',
  },
  kidsPartyHosting: {
    url: `${WP}/2025/08/ser-01.webp`,
    alt: 'De Zhong hosting games at a children’s party',
  },
  marisStellaClass: {
    url: `${WP}/2025/07/152A0CA7-EBFA-4441-9F32-B3D7D81BFD2E-1229x1536.jpeg`,
    alt: 'Maris Stella High School videography class with De Zhong (students’ faces blurred)',
  },
  cwaEvent: {
    url: `${WP}/2026/09/photo_2026-09-24_21-33-30-e1790257000713-1536x1296.jpg`,
    alt: 'De Zhong hosting a Caregiving Welfare Association community event',
  },
  compassAwards: {
    url: `${WP}/2025/09/photo_2025-09-29-19.53.21-1536x1024.jpeg`,
    alt: 'De Zhong at the 28th COMPASS Awards Presentation 2025',
  },
  mediacorpInterview: {
    url: `${WP}/2025/09/photo_2025-09-19-19.03.18.jpeg`,
    alt: 'De Zhong being interviewed for a MediaCorp Channel 8 segment',
  },
  banyanDnd: {
    url: `${WP}/2025/11/Screenshot-2025-11-25-at-6.55.46-PM-scaled-e1764068669956-1536x1148.png`,
    alt: 'De Zhong hosting The Banyan Group’s Dinner & Dance at Mandai Rainforest Resort',
    needsReplacement: true,
  },
  costumePerformers: {
    url: `${WP}/2025/12/IMG_0671-1-1536x862.jpg`,
    alt: 'Costumed performers and De Zhong at a themed event',
  },
  costumeGroup: {
    url: `${WP}/2025/12/DSC_7186-1024x1536.jpg`,
    alt: 'Group of costumed performers posing at a themed celebration',
  },
  tvStudio: {
    url: `${WP}/2026/02/CB6066F3-8F18-4969-8636-A7493DF4FEA5-1536x864.jpg`,
    alt: 'De Zhong speaking on a television programme',
  },
} satisfies Record<string, ImageSpec>

export type SeedImageKey = keyof typeof seedImages
