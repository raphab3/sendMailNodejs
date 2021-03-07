import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    console.log(request.file)

    const userWithoutPassword = {
      id: user.id,
      name: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  }
}
