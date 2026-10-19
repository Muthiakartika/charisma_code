/**
 * Line art inside the "Colour block" hero's block of colour (desktop only), in three choices.
 * Drawn tone on tone: thin lines in a slightly deeper shade of the block colour, so they read
 * as a soft sketch behind the photos rather than an illustration (see .panel-art in
 * hero-options.css). The colours follow the colour previews. Decorative only (aria-hidden).
 */

export const lineArts = [
  { slug: 'spotlight', name: 'Spotlight' },
  { slug: 'curtain', name: 'Stage curtain' },
  { slug: 'skyline', name: 'Singapore skyline' },
  { slug: 'none', name: 'None' },
] as const

export type LineArtSlug = (typeof lineArts)[number]['slug']

export const toLineArt = (value: string | string[] | undefined): LineArtSlug =>
  lineArts.find((art) => art.slug === value)?.slug ?? lineArts[0].slug

const svgProps = {
  'aria-hidden': true,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** A four-point sparkle, 32 units across, centred on 0,0 */
const SPARKLE = 'M0 -16C1.6 -5 5 -1.6 16 0C5 1.6 1.6 5 0 16C-1.6 5 -5 1.6 -16 0C-5 -1.6 -1.6 -5 0 -16Z'

/** A stage spotlight hanging from a pipe, its dotted rays aimed at the host's photo, with a little sparkle */
function Spotlight() {
  const sparkles = [
    { x: 250, y: 432, scale: 1.5 },
    { x: 298, y: 492, scale: 0.7 },
    { x: 208, y: 552, scale: 1 },
  ]
  return (
    <svg
      {...svgProps}
      viewBox="0 0 320 660"
      preserveAspectRatio="xMidYMin meet"
      className="panel-art absolute right-[5%] top-0 h-full w-[300px] overflow-visible"
    >
      <defs>
        {/* The dotted rays fade out toward the photo (coordinates of the lamp, before rotation) */}
        <linearGradient id="panel-art-ray" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="-470" y2="0">
          <stop offset="0" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Pipe from the rigging above, and the cable looping back up to it */}
      <path d="M210 -20V84" />
      <path d="M286 150C322 120 300 46 214 40" />

      {/* The lamp swings in on its clamp and settles */}
      <g className="panel-art__swing">
        <g transform="translate(210 92) scale(1.3)" strokeWidth={1}>
          <rect x="-10" y="-8" width="20" height="14" rx="3" />
          <rect x="-4" y="6" width="8" height="52" rx="3" className="fill-action" />
          <g transform="translate(0 60) rotate(-18)">
            {/* Two dotted rays fanning out toward the photo */}
            <g stroke="url(#panel-art-ray)" strokeDasharray="1 8">
              <path d="M-80 -26L-470 -142" />
              <path d="M-80 26L-470 142" />
            </g>
            {/* Barn doors, body, front ring, lens, rear cap, cooling fins and pivot */}
            <path d="M-60 -42L-92 -66L-97 -59L-65 -37" className="fill-action" />
            <path d="M-60 42L-92 66L-97 59L-65 37" className="fill-action" />
            <rect x="-50" y="-34" width="100" height="68" rx="12" className="fill-action" />
            <rect x="-64" y="-42" width="16" height="84" rx="5" className="fill-action" />
            <path d="M-64 -30Q-77 0 -64 30" />
            <rect x="50" y="-24" width="12" height="48" rx="4" className="fill-action" />
            <path d="M10 -22V22M22 -22V22M34 -22V22" />
            <circle r="7" className="fill-action" />
          </g>
        </g>
      </g>

      <path d="M262 330c16 -12 34 -2 28 14s2 28 20 26M182 470l10 -9M306 584l-8 -11M168 406l11 3" />
      {sparkles.map((sparkle) => (
        <path
          key={`${sparkle.x}-${sparkle.y}`}
          d={SPARKLE}
          transform={`translate(${sparkle.x} ${sparkle.y}) scale(${sparkle.scale})`}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

/** Fold lines of the gathered drape: where each starts at the top, meets the tie-back, and ends at the floor */
const folds = [
  { top: 6, tie: 168, bottom: 96 },
  { top: 40, tie: 176, bottom: 122 },
  { top: 72, tie: 184, bottom: 146 },
  { top: 102, tie: 190, bottom: 168 },
  { top: 132, tie: 196, bottom: 186 },
  { top: 162, tie: 202, bottom: 202 },
  { top: 192, tie: 208, bottom: 216 },
]

/** A theatre curtain: swagged valance along the top, and a drape gathered with a tie-back on the right */
function Curtain() {
  return (
    <>
      {/* The valance repeats across the whole width of the block (a mask tile, see .panel-art__valance) */}
      <span aria-hidden className="panel-art panel-art__valance absolute inset-x-0 top-0 h-16" />
      <svg
        {...svgProps}
        viewBox="0 0 220 660"
        preserveAspectRatio="none"
        className="panel-art absolute right-0 top-0 h-full w-[200px]"
      >
        {folds.map((fold) => (
          <path
            key={fold.top}
            d={`M${fold.top} 0C${fold.top} 170 ${fold.tie - 14} 330 ${fold.tie} 400C${fold.tie + 4} 470 ${fold.bottom} 560 ${fold.bottom} 660`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* Tie-back rope and tassel */}
        <path d="M160 394C176 380 214 384 222 398C214 412 176 414 160 404Z" vectorEffect="non-scaling-stroke" />
        <path d="M172 410C170 426 168 438 166 452M160 452H172L170 476H162Z" vectorEffect="non-scaling-stroke" />
      </svg>
    </>
  )
}

/** Singapore along the bay: city blocks, Supertrees, the Esplanade, the Flyer and Marina Bay Sands */
function Skyline() {
  const spokes = Array.from({ length: 12 }, (_, index) => (index * Math.PI) / 6)
  return (
    <svg
      {...svgProps}
      viewBox="0 96 720 204"
      preserveAspectRatio="xMaxYMax meet"
      className="panel-art absolute bottom-0 right-0 w-[125%] max-w-[1000px]"
    >
      {/* City blocks */}
      <path d="M0 270V196H34V270M40 270V164H66V270M72 270V208H104V270" />
      <path d="M48 180H58M48 196H58M48 212H58M8 212H26M8 228H26M80 224H96M80 240H96" />
      {/* Supertrees: a canopy on a tapering lattice trunk */}
      <path d="M128 168Q150 184 172 168M146 176L140 270M154 176L160 270M146 176L158 214L142 252M154 176L142 214L158 252" />
      <path d="M168 204Q186 216 204 204M183 211L178 270M189 211L194 270M183 211L192 240L180 270M189 211L180 240" />
      {/* Esplanade: two spiky domes */}
      <path d="M212 270C212 226 266 226 266 270M258 270C260 234 310 234 312 270" />
      <path d="M222 244L216 238M234 234L232 226M248 232L250 224M260 240L266 234M268 246L264 240M280 238L280 230M294 240L298 233M304 250L310 246" />
      {/* Singapore Flyer: wheel, spokes, capsules and the A-frame legs */}
      <circle cx="398" cy="178" r="64" />
      <circle cx="398" cy="178" r="5" />
      {spokes.map((angle) => (
        <g key={angle}>
          <path d={`M${398 + 5 * Math.cos(angle)} ${178 + 5 * Math.sin(angle)}L${398 + 64 * Math.cos(angle)} ${178 + 64 * Math.sin(angle)}`} />
          <circle cx={398 + 70 * Math.cos(angle)} cy={178 + 70 * Math.sin(angle)} r="3.5" />
        </g>
      ))}
      <path d="M398 178L372 270M398 178L424 270M356 270V256H440V270" />
      {/* Marina Bay Sands: three towers under the boat-shaped SkyPark */}
      <path d="M510 270L516 136H544L540 270M564 270L568 136H596L594 270M618 270L620 136H648L648 270" />
      <path d="M530 150V258M582 150V258M634 150V258" />
      <path d="M500 136H662L690 124L686 132L664 136M500 136C500 130 504 126 512 126H662" />
      {/* The bay */}
      <path d="M0 270H720M30 284H90M140 290H220M300 284H340M380 292H470M520 284H600M640 290H700" />
    </svg>
  )
}

/** The chosen line art, inside the block of colour */
export function PanelLineArt({ art }: { art: LineArtSlug }) {
  if (art === 'spotlight') return <Spotlight />
  if (art === 'curtain') return <Curtain />
  if (art === 'skyline') return <Skyline />
  return null
}
