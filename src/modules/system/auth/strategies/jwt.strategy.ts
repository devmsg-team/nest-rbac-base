import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConfig } from 'src/config/auth.config';
import { ReqUserDto } from 'src/common/dto/reqUser.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, user: ReqUserDto) {
    const token = (request.headers as any).authorization.slice(7);
    await this.authService.checkToken(user, token);
    return user;
  }
}
