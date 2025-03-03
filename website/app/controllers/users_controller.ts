import type { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'
import drive from "@adonisjs/drive/services/main"

export default class UsersController {
    
    async showCV({ inertia }: HttpContext) {
        return inertia.render('cv')
    }

    async storeCV({ request, response, auth }: HttpContext) {
        const user = auth.user
        if (!user) {
            return response.unauthorized('User not authenticated')
        }
        const cv = request.file('cv')!
        user.resume = await attachmentManager.createFromFile(cv)
        await user.save()
        return response.ok({ message: 'CV uploaded' })
    }

    async deleteCV({ response, auth }: HttpContext) {
        const user = auth.user
        if (!user) {
            return response.unauthorized('User not authenticated')
        }
        user.resume = null
        await user.save()
        return response.ok({ message: 'CV deleted' })
    }
    

    async showName({ response, auth }: HttpContext) {
        const user = auth.user 
        if (!user) {
          return response.unauthorized('User not authenticated')
        }
        
        if( user.resume === null) {
            return response.notFound('File not found')
          }
        const fileName = user.resume.originalName
        
        return response.ok({ fileName })
    
      }
    
        async downloadCV({ response, auth }: HttpContext) {
            const user = auth.user
            if (!user) {
                return response.unauthorized('User not authenticated')
            }

            if (user.resume === null) {
                return response.notFound('File not found')
            }

            const filePath = await user.resume.path
            if(!filePath) {
                return response.notFound('File not found')
            }
            const file = await drive.use().getStream(filePath)

            response.type('application/pdf')
            response.header('Content-Disposition', `inline; filename="${user.resume.originalName}"`)
            return response.stream(file)
        }

}