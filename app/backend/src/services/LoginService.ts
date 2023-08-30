import { compareSync } from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import IUserModel from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import JWT from '../utils/JWT';

export default class LoginService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(email: string, password: string): Promise<ServiceResponse<string>> {
    const user = await this.userModel.findByEmail(email);

    if (!user || !compareSync(password, user.password)) {
      return { status: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
    }

    const { password: _password, ...userWithoutPassword } = user;
    const token = JWT.sign(userWithoutPassword);

    return { status: 'SUCCESSFUL', data: token };
  }
}
