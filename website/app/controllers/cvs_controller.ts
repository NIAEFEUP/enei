import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import app from '@adonisjs/core/services/app'

export default class CvUploadController {
  public async upload({ request, auth, response }: HttpContext) {
    const user = auth.user as User
    const cv = request.file('cv', {
      extnames: ['pdf'],
      size: '10mb',
    })

    if (!cv) {
      return response.badRequest('No file uploaded')
    }

    if (!user) {
      return response.unauthorized('User not authenticated')
    }

    const fileName = `${user.id}_resume.pdf`
    
    await cv.move(app.makePath('storage/uploads'), {
      name: fileName,
      overwrite: true,
    })

    return response.ok({ message: 'File uploaded successfully', fileName })
  }
}