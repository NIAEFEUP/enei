import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import drive from '@adonisjs/drive/services/main'

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
    
    await cv.moveToDisk(fileName)


    return response.ok({ message: 'File uploaded successfully', fileName })
  }

  public async delete({ response, auth }: HttpContext) {
    const user = auth.user as User
    if (!user) {
      return response.unauthorized('User not authenticated')
    }
    const fileName = `${user.id}_resume.pdf`
    const exists = await drive.use().exists(fileName)
    if(!exists){
      return response.notFound('File not found')
    }
    await drive.use().delete(fileName)
    return response.ok({ message: 'File deleted successfully' })
  }

  public async showName({ response, auth }: HttpContext) {
    const user = auth.user 
    if (!user) {
      return response.unauthorized('User not authenticated')
    }
    const fileName = `${user.id}_resume.pdf`
    const exists = await drive.use().exists(fileName)
    if(!exists){
      return response.notFound('File not found')
    }
    return response.ok({ fileName })

  }
}