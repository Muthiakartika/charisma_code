/**
 * Choices used by the website forms AND by the CMS collections, so both always match.
 * The English labels are shown in the CMS; website labels come from src/i18n/dictionaries.ts.
 */

export const groupSizeOptions = [
  { value: 'under-20', label: 'Under 20 people' },
  { value: '20-50', label: '20 to 50 people' },
  { value: '51-100', label: '51 to 100 people' },
  { value: '101-300', label: '101 to 300 people' },
  { value: '300-plus', label: 'More than 300 people' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const

// Budget brackets help the team prepare a suitable proposal. They are not prices.
export const budgetOptions = [
  { value: 'under-2k', label: 'Under S$2,000' },
  { value: '2k-5k', label: 'S$2,000 to S$5,000' },
  { value: '5k-10k', label: 'S$5,000 to S$10,000' },
  { value: '10k-plus', label: 'Above S$10,000' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const

export const enquiryStatusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal-sent', label: 'Proposal sent' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'not-a-fit', label: 'Not a fit' },
  { value: 'spam', label: 'Spam' },
] as const

export const freelancerRoleOptions = [
  { value: 'facilitator', label: 'Facilitator' },
  { value: 'coach', label: 'Coach' },
  { value: 'emcee', label: 'Emcee' },
  { value: 'host', label: 'Host' },
  { value: 'performer', label: 'Performer' },
  { value: 'singer', label: 'Singer' },
  { value: 'event-crew', label: 'Event crew' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'videographer', label: 'Videographer' },
  { value: 'sound-crew', label: 'Sound crew' },
  { value: 'creative-partner', label: 'Creative partner' },
  { value: 'partner-vendor', label: 'Partner vendor' },
  { value: 'fringe-activity', label: 'Fringe activity provider' },
  { value: 'other', label: 'Other' },
] as const

export const experienceOptions = [
  { value: 'under-1', label: 'Less than 1 year' },
  { value: '1-3', label: '1 to 3 years' },
  { value: '3-5', label: '3 to 5 years' },
  { value: '5-10', label: '5 to 10 years' },
  { value: '10-plus', label: 'More than 10 years' },
] as const

export const availabilityOptions = [
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekday-evenings', label: 'Weekday evenings' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'short-notice', label: 'Short-notice jobs' },
] as const

export const applicationStatusOptions = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
] as const

/** How the visitor found the website — used for monthly enquiry reports. */
export const channelOptions = [
  { value: 'organic-search', label: 'Organic search' },
  { value: 'paid', label: 'Paid ads' },
  { value: 'social', label: 'Social media' },
  { value: 'referral', label: 'Other website' },
  { value: 'email', label: 'Email' },
  { value: 'direct', label: 'Direct / unknown' },
] as const

type Option = { readonly value: string; readonly label: string }
export const toSelectOptions = (options: readonly Option[]) =>
  options.map(({ value, label }) => ({ value, label }))
export const optionValues = (options: readonly Option[]) => options.map((option) => option.value)
