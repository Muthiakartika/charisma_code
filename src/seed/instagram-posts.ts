/**
 * Starting content for the Instagram strip: the 9 newest posts on @deprinceofzhong
 * (pinned posts excluded), taken from the public profile on 12 Oct 2026.
 * The reel covers live in src/seed/instagram/. When the Instagram API is connected,
 * new posts are synced into the same collection automatically.
 *
 * ⚠️ Several of these are personal posts (home, gym, dental clinic). They are shown
 * because the client asked for the latest posts; hide any of them in the CMS
 * (Content → Instagram Posts → untick "Show on website").
 */
export const instagramPosts = [
  { code: 'DeWtUavzjK7', postedAt: '2026-10-11', alt: 'De Zhong smiling at the camera in a red T-shirt' },
  { code: 'DeRLRfUzdyR', postedAt: '2026-10-09', alt: 'De Zhong filming a video at home' },
  { code: 'DeMYUztTZvV', postedAt: '2026-10-07', alt: 'De Zhong with a smiling dental nurse at a dental clinic' },
  { code: 'DeJgeLPTstx', postedAt: '2026-10-06', alt: 'De Zhong wearing boxing gloves at the gym' },
  { code: 'DeG29Rhylwo', postedAt: '2026-10-05', alt: 'De Zhong taking a selfie with a woman at home' },
  { code: 'Dd046CHTRSd', postedAt: '2026-09-28', alt: 'De Zhong and a woman in a red shirt filming a selfie video' },
  { code: 'DdyOAVkxe23', postedAt: '2026-09-27', alt: 'De Zhong taking a mirror selfie at the gym' },
  { code: 'DdvU1WuxKDD', postedAt: '2026-09-25', alt: 'De Zhong smiling in a white shirt' },
  {
    code: 'Ddq-VlETFpi',
    postedAt: '2026-09-24',
    alt: 'De Zhong hosting Caregiving Week for the Caregiving Welfare Association',
  },
] as const
