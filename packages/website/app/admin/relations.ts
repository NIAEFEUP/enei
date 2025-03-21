import {
  owningRelationSettingsFeature,
  targetRelationSettingsFeature,
  type ManyToManyRelationOptions,
  type OneToManyRelationOptions,
  type RelationsFeatureOptions,
} from '@adminjs/relations'
import componentLoader from './component_loader.js'

export const owningRelationFeature = (
  relations: RelationsFeatureOptions<
    | (Omit<OneToManyRelationOptions, 'type'> & { type: 'one-to-many' })
    | (Omit<ManyToManyRelationOptions, 'type'> & { type: 'many-to-many' })
  >
) =>
  owningRelationSettingsFeature({
    componentLoader,
    licenseKey: '',
    relations: relations as RelationsFeatureOptions,
  })

export const targetRelationFeature = targetRelationSettingsFeature
