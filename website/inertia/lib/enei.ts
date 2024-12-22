import previousEditions from '~/data/enei/editions.json'

export function getPreviousEditions() {
  return previousEditions.sort((a, b) => b.year - a.year)
}
