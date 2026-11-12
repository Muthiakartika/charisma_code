import type { Locale } from '@/i18n/config'

/**
 * Small 4:3 flag shown next to each language in the language switcher.
 * Drawn in SVG rather than emoji, because Windows shows flag emoji as two letters ("GB").
 * English = United Kingdom, 中文 = China (the user's choice, 12 Nov 2026).
 */
export function LanguageFlag({ locale }: { locale: Locale }) {
  return (
    <span className="inline-flex h-[15px] w-5 shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(30,35,34,0.12)]">
      {locale === 'zh' ? <ChinaFlag /> : <UnitedKingdomFlag />}
    </span>
  )
}

function UnitedKingdomFlag() {
  return (
    <svg viewBox="0 0 640 480" aria-hidden="true" className="size-full">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path fill="#fff" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
      <path fill="#c8102e" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
      <path fill="#fff" d="M241 0v480h160V0zM0 160v160h640V160z" />
      <path fill="#c8102e" d="M0 193v96h640v-96zM273 0v480h96V0z" />
    </svg>
  )
}

/** On the official 30 × 20 grid, cropped to 4:3. Each small star points at the big one. */
function ChinaFlag() {
  return (
    <svg viewBox="0 0 26.667 20" aria-hidden="true" className="size-full">
      <path fill="#ee1c25" d="M0 0h26.667v20H0z" />
      <g fill="#ffde00">
        <polygon points="5,2 5.674,4.073 7.853,4.073 6.09,5.354 6.763,7.427 5,6.146 3.237,7.427 3.91,5.354 2.147,4.073 4.326,4.073" />
        <polygon points="9.143,2.514 9.62,1.966 9.246,1.343 9.914,1.628 10.391,1.08 10.328,1.803 10.996,2.088 10.288,2.251 10.224,2.975 9.851,2.352" />
        <polygon points="11.01,4.141 11.662,3.821 11.56,3.102 12.065,3.624 12.718,3.304 12.378,3.946 12.884,4.467 12.168,4.343 11.829,4.985 11.726,4.266" />
        <polygon points="11.038,6.725 11.765,6.699 11.964,6.001 12.213,6.683 12.939,6.657 12.367,7.105 12.616,7.787 12.014,7.382 11.442,7.83 11.641,7.131" />
        <polygon points="9.219,8.375 9.899,8.632 10.353,8.064 10.319,8.79 10.999,9.046 10.298,9.239 10.265,9.964 9.865,9.357 9.165,9.55 9.618,8.982" />
      </g>
    </svg>
  )
}
