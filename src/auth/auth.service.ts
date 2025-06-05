import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserLoginRepo } from 'src/users/models/interface/user-repo.interface';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserLoginRepo')
    private readonly userLoginRepository: IUserLoginRepo,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const users = await this.userLoginRepository.find({ login: login });
    if (!users.data?.length) {
      throw new UnauthorizedException('Login ou senha inválidos!');
    }
    const user = users.data[0];

    const passwordValid = await bcrypt.compare(
      password,
      users.data[0].password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Login ou senha inválidos!');
    }
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: User, remember: boolean) {
    const payload = {
      id: user.id,
      name: user.name,
      permissions: user.permissionLevel,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.generateRefreshToken(user, remember),
    };
  }

  private generateRefreshToken(user: User, remember: boolean) {
    const payload = { id: user.id };
    const daysToExpiry = remember ? '360d' : '30d';
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      expiresIn: daysToExpiry,
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    });

    if (!decoded) {
      throw new UnauthorizedException('Token de refresh inválido ou expirado');
    }

    const user = await this.userLoginRepository.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const payload = {
      id: user.id,
      name: user.name,
      permissions: user.permissionLevel,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
