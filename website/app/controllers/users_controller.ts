import type { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'
import drive from "@adonisjs/drive/services/main"
import User from '#models/user'

export default class UsersController {
    
    async showCV({ inertia }: HttpContext) {
        return inertia.render('cv')
    }

    async storeCV({ request, response, auth }: HttpContext) {
        const user = auth.user
        const cv = request.file('cv')!
        user!.resume = await attachmentManager.createFromFile(cv)
        await user!.save()
        return response.ok({ message: 'CV uploaded' })
    }

    async deleteCV({ response, auth }: HttpContext) {
        const user = auth.user
        user!.resume = null
        await user!.save()
        return response.ok({ message: 'CV deleted' })
    }

    async showCVName({ response, auth }: HttpContext) {
        const user = auth.user 
        if( user!.resume === null) {
            return response.notFound('File not found')
          }
        const fileName = user!.resume.originalName
        
        return response.ok({ fileName })
    
      }
    
    async downloadCV({ response, auth }: HttpContext) {
        const userId = auth.user!.id
        const user = await User.find(userId);
        if (user!.resume === null) {
            return response.notFound('File not found')
        }

        const filePath = await user!.resume.path
        if(!filePath) {
            return response.notFound('File not found')
        }
        const file = await drive.use().getStream(filePath)

        response.type('application/pdf')
        response.header('Content-Disposition', `inline; filename="${user!.resume.originalName}"`)
        return response.stream(file)
    }


    async showAvatar({ inertia }: HttpContext) {
        return inertia.render('avatar')
    }
    async storeAvatar({ request, response, auth }: HttpContext) {
        if(!request.file('avatar')) {
            return response.badRequest('No file uploaded')
        }
        const user = auth.user
        const avatar = request.file('avatar', {
            size: '2mb',
            extnames: ['jpg', 'jpeg', 'png']
        })!
        user!.avatar = await attachmentManager.createFromFile(avatar)

        await user!.save()
        return response.ok({ message: 'Avatar uploaded' })
    }

    async deleteAvatar({ response, auth }: HttpContext) {
        const user = auth.user
        user!.avatar = null
        await user!.save()
        return response.ok({ message: 'Avatar deleted' })
    }

    async showAvatarName({ response, auth }: HttpContext) {
        const user = auth.user 
        
        if( user!.avatar === null) {
            return response.notFound('File not found')
          }
        const fileName = user!.avatar.originalName
        
        return response.ok({ fileName })
    
      }
    
    async downloadAvatar({ response, auth }: HttpContext) {
        const user = auth.user
        if (user!.avatar === null) {
            return response.notFound('File not found')
        }

        const filePath = await user!.avatar.path
        if(!filePath) {
            return response.notFound('File not found')
        }
        const file = await drive.use().getStream(filePath)

        response.type('image/jpeg')
        response.header('Content-Disposition', `inline; filename="${user!.avatar.originalName}"`)
        return response.stream(file)
    }
}