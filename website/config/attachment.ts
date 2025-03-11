import { defineConfig } from '@jrmc/adonis-attachment'
import type { InferConverters } from '@jrmc/adonis-attachment/types/config'
import sharp from 'sharp'

const attachmentConfig = defineConfig({
  converters: {
    thumbnail: {
      converter: () => import('@jrmc/adonis-attachment/converters/image_converter'),
      options: {
        format: 'png',
        resize: {
          width: 200,
          height: 200,
          fit: sharp.fit.cover,
          position: 'center'
        },
      }
    },
    
  }
})

export default attachmentConfig

declare module '@jrmc/adonis-attachment' {
  interface AttachmentVariants extends InferConverters<typeof attachmentConfig> {}
}