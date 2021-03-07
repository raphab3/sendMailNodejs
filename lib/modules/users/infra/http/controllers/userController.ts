import CreateUserService from '@modules/users/services/usersCreate.service';
import DeleteUserService from '@modules/users/services/usersDelete.service';
import UserFindService from '@modules/users/services/usersFind.service';
import UserFindByIdService from '@modules/users/services/usersFindById.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
export default class UserController {



  public async index(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserFindService)
    // Paginação skip => numero da página, take => quantos por página
    let { skip, take }: any = request.query
    skip = parseInt(skip)
    take = parseInt(take)
    const user: any = await userService.execute({ skip, take })
    let total = 0
    user.forEach(() => {
      total++
    });
    return response.status(200).json({ data: user, total: total })
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const userFind = container.resolve(UserFindByIdService)
    const user = await userFind.execute({ id })
    console.log("USER => ", user)
    return response.status(200).json(user)
  }

  public async create(request: Request, response: Response): Promise<Response> {

    const { username, email, password } = request.body
    console.log("CREATE USER => ", { username, email, password });

    const createUser = container.resolve(CreateUserService)



    const user = await createUser.execute({ username, email, password })

    console.log("CREATE USER SERVICE => ", user);

    return response.status(200).json({ data: user })
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body
    const deleteUser = container.resolve(DeleteUserService)
    await deleteUser.execute({ id })

    return response.status(204).json({ msg: "User delete success" })
  }
}
