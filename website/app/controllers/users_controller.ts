import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { UserService } from '#services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {} 

    async showCV({ inertia }: HttpContext) {
        return inertia.render('cv')
    }

    async storeCV({ request, response, auth }: HttpContext) {
        const user = auth.user
        const cv = request.file('cv')!
        await this.userService.storeCV(user!, cv)
        return response.ok({ message: 'CV uploaded' })
    }

    async deleteCV({ response, auth }: HttpContext) {
        const user = auth.user
        await this.userService.deleteCV(user!)
        return response.ok({ message: 'CV deleted' })
    }

    async showCVName({ response, auth }: HttpContext) {
        const user = auth.user 
        if( user!.resume === null) {
            return response.notFound('File not found')
          }
        const fileName = await this.userService.getCVName(user!)
        if (!fileName) {
            return response.notFound('File not found')
        }
        return response.ok({ fileName })
    
      }
    
    async downloadCV({ response, auth }: HttpContext) {
        const userId = auth.user!.id
        const user = await User.find(userId);
        const userCV = await this.userService.getCV(user!)
        if (!userCV) {
            return response.notFound('File not found')
        }
        const { file, fileName } = userCV
        
        response.type('application/pdf')
        response.header('Content-Disposition', `inline; filename="${fileName}"`)
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
        await this.userService.storeAvatar(user!, avatar)
        return response.ok({ message: 'Avatar uploaded' })
    }

    async deleteAvatar({ response, auth }: HttpContext) {
        const user = auth.user
        await this.userService.deleteAvatar(user!)
        return response.ok({ message: 'Avatar deleted' })
    }

    async showAvatarName({ response, auth }: HttpContext) {
        const user = auth.user 
        
        if( user!.avatar === null) {
            return response.notFound('File not found')
          }
        const fileName = await this.userService.getAvatarName(user!)
        
        return response.ok({ fileName })
    
      }
    
    async downloadAvatar({ response, auth }: HttpContext) {
        const user = auth.user
        const userAvatar = await this.userService.getAvatar(user!)
        if (!userAvatar) {
            return response.notFound('File not found')
        }
        const { file, fileName } = userAvatar

        response.type('image/jpeg')
        response.header('Content-Disposition', `inline; filename="${fileName}"`)
        return response.stream(file)
    }
}