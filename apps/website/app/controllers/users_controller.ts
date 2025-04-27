import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import { UserService } from "#services/user_service";

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async storeCV({ request, response, auth }: HttpContext) {
    const user = auth.user;
    const cv = request.file("cv", {
      extnames: ["pdf"],
      size: "10mb",
    })!;
    if (cv.hasErrors) return response.badRequest(cv.errors.at(0)?.message);
    await this.userService.storeCV(user!, cv);
    return response.ok({ message: "CV uploaded" });
  }

  async showCVName({ response, auth }: HttpContext) {
    const user = auth.user;
    if (user!.resume === null) {
      return response.notFound("File not found");
    }
    const fileName = await this.userService.getCVName(user!);
    if (!fileName) {
      return response.notFound("File not found");
    }
    return response.ok({ fileName });
  }

  async showAvatar({ response, auth }: HttpContext) {
    const user = auth.user;

    if (user!.avatar === null) {
      return response.notFound("File not found");
    }
    const userAvatar = await this.userService.getAvatar(user!);

    if (!userAvatar) {
      return response.notFound("File not found");
    }
    const { file, fileName, mimeType } = userAvatar;

    response.header("Content-Type", mimeType);
    response.header("Content-Disposition", `inline; filename="${fileName}"`);

    try {
      return await response.stream(file);
    } catch (error) {
      console.log(error);
      return response.notFound("File not found");
    }
  }

  async storeAvatar({ request, response, auth }: HttpContext) {
    if (!request.file("avatar")) {
      return response.badRequest("No file uploaded");
    }
    const user = auth.user;
    const avatar = request.file("avatar", {
      size: "2mb",
      extnames: ["jpg", "jpeg", "png"],
    })!;

    // If an image is uploaded with an extname error, the whole website crashes
    if (avatar.hasErrors) return response.badRequest(avatar.errors.at(0)?.message);

    await this.userService.storeAvatar(user!, avatar);
    return response.ok({ message: "Avatar uploaded" });
  }

  async deleteAvatar({ response, auth }: HttpContext) {
    const user = auth.user;
    await this.userService.deleteAvatar(user!);
    return response.ok({ message: "Avatar deleted" });
  }

  async showAvatarName({ response, auth }: HttpContext) {
    const user = auth.user;

    if (user!.avatar === null) {
      return response.notFound("File not found");
    }
    const fileName = await this.userService.getAvatarName(user!);

    return response.ok({ fileName });
  }

  async downloadAvatar({ response, auth }: HttpContext) {
    const user = auth.user;
    const userAvatar = await this.userService.getAvatar(user!);
    if (!userAvatar) {
      return response.notFound("File not found");
    }
    const { file, fileName } = userAvatar;

    response.type("image/jpeg");
    response.header("Content-Disposition", `inline; filename="${fileName}"`);
    return response.stream(file);
  }
}
