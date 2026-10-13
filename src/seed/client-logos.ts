/**
 * Client logos used on the "Brands and organisations we have worked with" strip.
 *
 * The files in src/seed/logos/ were prepared on 12 Oct 2026 from the sources below:
 * official logo files (Wikimedia Commons / Wikipedia or the organisation's own website),
 * or the logo the client had already uploaded to the old WordPress site.
 * Each file was turned into a one-colour silhouette (transparent PNG), which the website
 * recolours to match the section. These are trademarks of their owners.
 *
 * ⚠️ The client list and permission to show each logo still need De Zhong's confirmation
 * (docs/04-konfirmasi-klien.md #3). Every client stays "needs confirmation" in the CMS.
 */
export const clientLogos: Record<string, { file: string; source: string }> = {
  'Youth Olympic Games': {
    file: 'client-logo-youth-olympic-games.png',
    source: 'https://en.wikipedia.org/wiki/File:Singapore_Youth_Olympics_2010.svg',
  },
  'Singapore Sports Council': {
    file: 'client-logo-singapore-sports-council.png',
    source: 'Old website upload (wp-content/uploads/2025/08/9F949F68-…jpeg)',
  },
  "People's Association": {
    file: 'client-logo-peoples-association.png',
    source: 'https://www.pa.gov.sg (official PA logo PNG)',
  },
  Singtel: { file: 'client-logo-singtel.png', source: 'https://commons.wikimedia.org/wiki/File:Singtel_logo.svg' },
  Samsung: { file: 'client-logo-samsung.png', source: 'https://commons.wikimedia.org/wiki/File:Samsung_wordmark.svg' },
  MediaCorp: {
    file: 'client-logo-mediacorp.png',
    source: 'https://commons.wikimedia.org/wiki/File:MediaCorp_logo_December_2015.svg',
  },
  'SuperSports Arena': {
    file: 'client-logo-supersports-arena.png',
    source: 'Old website upload (wp-content/uploads/2025/08/138978F1-…jpeg)',
  },
  OCBC: { file: 'client-logo-ocbc.png', source: 'https://commons.wikimedia.org/wiki/File:Logo-ocbc.svg' },
  Maybank: { file: 'client-logo-maybank.png', source: 'https://en.wikipedia.org/wiki/File:Maybank_logo.svg' },
  HSBC: { file: 'client-logo-hsbc.png', source: 'https://commons.wikimedia.org/wiki/File:HSBC_logo_(2018).svg' },
  AVIVA: { file: 'client-logo-aviva.png', source: 'https://www.aviva.com (official logo SVG)' },
  'Singapore Street Festival': {
    file: 'client-logo-singapore-street-festival.png',
    source: 'https://singaporestreetfestival.com (2025 logo)',
  },
  'Book Council SG': { file: 'client-logo-book-council-sg.png', source: 'https://www.bookcouncil.sg (2023 logo)' },
  'Marriott Vacation Club': {
    file: 'client-logo-marriott-vacation-club.png',
    source: 'https://www.marriottvacationclub.asia (official logo)',
  },
  'Singapore Food Show': {
    file: 'client-logo-singapore-food-show.png',
    source: 'Old website upload (wp-content/uploads/2025/08/2A95E243-…jpeg)',
  },
  Smeg: { file: 'client-logo-smeg.png', source: 'https://commons.wikimedia.org/wiki/File:Smeg_logo.svg' },
  'Dolce & Gabbana': {
    file: 'client-logo-dolce-gabbana.png',
    source: 'https://commons.wikimedia.org/wiki/File:Dolce_%26_Gabbana_-_logo_(Italy,_1985-).svg',
  },
  'SMARTIES APAC': {
    file: 'client-logo-smarties-apac.png',
    source: 'Old website upload (MMA SMARTIES logo, wp-content/uploads/2025/08/7C5C7E92-…jpeg)',
  },
  'FairPrice Xtra': { file: 'client-logo-fairprice-xtra.png', source: 'https://www.fairpricegroup.com.sg (official logo)' },
  Carlsberg: { file: 'client-logo-carlsberg.png', source: 'https://www.carlsbergsingapore.com.sg (official logo)' },
  Shopee: { file: 'client-logo-shopee.png', source: 'https://commons.wikimedia.org/wiki/File:Shopee.svg' },
  Lazada: { file: 'client-logo-lazada.png', source: 'https://commons.wikimedia.org/wiki/File:Lazada_(2019).svg' },
  Alpecin: { file: 'client-logo-alpecin.png', source: 'https://www.alpecin.com (official logo SVG)' },
  'Cocoa Trees': { file: 'client-logo-cocoa-trees.png', source: 'https://www.thecocoatrees.com (official logo)' },
  Marigold: { file: 'client-logo-marigold.png', source: 'https://marigold.com.sg (official logo)' },
  Energizer: { file: 'client-logo-energizer.png', source: 'https://commons.wikimedia.org/wiki/File:Energizer_logo.svg' },
  'Monkey Shoulder': { file: 'client-logo-monkey-shoulder.png', source: 'https://www.monkeyshoulder.com (official logo)' },
  'The Smart Local': { file: 'client-logo-the-smart-local.png', source: 'https://thesmartlocal.com (official logo)' },
  'Titan Digital Media': {
    file: 'client-logo-titan-digital-media.png',
    source: 'Old website upload (wp-content/uploads/2025/08/CBE1C9BD-…webp)',
  },
  StarHub: { file: 'client-logo-starhub.png', source: 'https://en.wikipedia.org/wiki/File:StarHub_(2021).svg' },
  Sentosa: { file: 'client-logo-sentosa.png', source: 'https://en.wikipedia.org/wiki/File:Sentosa_development_corp_logo.png' },
  Kaboodle: { file: 'client-logo-kaboodle.png', source: 'https://www.kaboodle.com.sg (official logo)' },
  Hyundai: { file: 'client-logo-hyundai.png', source: 'https://commons.wikimedia.org/wiki/File:Hyundai_logo.svg' },
  'Nirvana Memorial Garden': {
    file: 'client-logo-nirvana-memorial-garden.png',
    source: 'https://www.nirvana.com.my (official logo)',
  },
}
