import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import drive from '@adonisjs/drive/services/main'
import FileService from '#services/file_service'
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
    cv.fileName = fileName

    await FileService.upload(cv, './uploads/cvs/')

    return response.ok({ message: 'File uploaded successfully', fileName })
  }

  public async delete({ response, auth }: HttpContext) {
    const user = auth.user as User
    if (!user) {
      return response.unauthorized('User not authenticated')
    }
    const fileName = `${user.id}_resume.pdf`
    const exists = await drive.use().exists('./uploads/cvs/' + fileName)
    if (!exists) {
      return response.notFound('File not found')
    }
    await FileService.delete(fileName, './uploads/cvs/')
    return response.ok({ message: 'File deleted successfully' })
  }

  public async showName({ response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized('User not authenticated')
    }
    const fileName = `${user.id}_resume.pdf`
    const exists = await FileService.exists(fileName, './uploads/cvs/')
    if (!exists) {
      return response.notFound('File not found')
    }
    return response.ok({ fileName })
  }
}
