import $universities from '#data/enei/universities.json' with { type: 'json' }

export const universities = $universities.toSorted((a, b) => b.id.localeCompare(a.id))

export function getUniversityById(id: string) {
  return universities.find(({ id: universityId }) => universityId === id)
}
