import type { HttpContext } from "@adonisjs/core/http";
import User from "#models/user";
import drive from "@adonisjs/drive/services/main";
import FileService from "#services/file_service";
import { normalize } from "node:path";
import app from "@adonisjs/core/services/app";

const cvDocumentName = (slug: string): string => {
  return `${slug}_resume.pdf`;
};

export default class CvUploadController {
  public async upload({ request, auth, response }: HttpContext) {
    // Has middleware.auth() so this should not be a problem
    const user: User = auth.user!;
    if (!user) {
      return response.unauthorized("User not authenticated");
    }
    await user!.load("participantProfile");

    if (!user?.participantProfile) return response.redirect().toRoute("pages:signup");

    const cv = request.file("cv", {
      extnames: ["pdf"],
      size: "10mb",
    });

    if (!cv) {
      return response.badRequest("No file uploaded");
    }

    if (!user) {
      return response.unauthorized("User not authenticated");
    }

    const fileName = cvDocumentName(user.participantProfile.slug);
    cv.fileName = fileName;

    await FileService.upload(cv, "./uploads/cvs/");

    return response.ok({ message: "File uploaded successfully", fileName });
  }

  public async delete({ response, auth }: HttpContext) {
    // Has middleware.auth() so this should not be a problem
    const user: User = auth.user!;
    if (!user) {
      return response.unauthorized("User not authenticated");
    }
    await user!.load("participantProfile");

    if (!user?.participantProfile) return response.redirect().toRoute("pages:signup");

    const fileName = cvDocumentName(user.participantProfile.slug);
    const exists = await drive.use().exists("./uploads/cvs/" + fileName);
    if (!exists) {
      return response.notFound("File not found");
    }
    await FileService.delete(fileName, "./uploads/cvs/");
    return response.ok({ message: "File deleted successfully" });
  }

  public async showName({ response, auth }: HttpContext) {
    // Has middleware.auth() so this should not be a problem
    const user: User = auth.user!;
    if (!user) {
      return response.unauthorized("User not authenticated");
    }
    await user!.load("participantProfile");

    if (!user?.participantProfile) return response.redirect().toRoute("pages:signup");

    const fileName = cvDocumentName(user.participantProfile.slug);
    const exists = await FileService.exists(fileName, "./uploads/cvs/");
    if (!exists) {
      return response.notFound("File not found");
    }
    return response.ok({ fileName });
  }

  public async show({ response, params }: HttpContext) {
    const { slug } = params;

    const filePath = cvDocumentName(slug);
    const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
    const normalizedPath = normalize(filePath);
    if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
      return response.badRequest("Malformed path");
    }
    const absolutePath = app.makePath("storage/uploads/cvs", normalizedPath);
    return response.download(absolutePath);
  }
}
