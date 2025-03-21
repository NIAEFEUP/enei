import drive from '@adonisjs/drive/services/main'
import { MultipartFile } from '@adonisjs/core/bodyparser'

export default class FileService {
  static async upload(file: MultipartFile, directory: string) {
    await file.moveToDisk(directory + file.fileName)
  }

  static async delete(fileName: string, directory: string) {
    await drive.use().delete(directory + fileName)
  }

  static async exists(fileName: string, directory: string) {
    return await drive.use().exists(directory + fileName)
  }
}
