import { UsersService, oAuthAccessTokenService } from 'services';
import logger from 'configs/winston.config';
import jwt from 'technology_thematic_lib';
import Response from '../helpers/response';
import { errors, infors } from '../constants';

export default class AuthMiddleware {
  static isRequired(req, res, next) {
    const tokenBearer = req.header('Authorization');

    if (!tokenBearer) {
      return Response.error(res, {
        message: errors.TOKEN_NOT_FOUND,
      });
    }

    const [type, token] = tokenBearer.split(' ');

    if (type !== 'Bearer') {
      return Response.error(res, {
        message: errors.TOKEN_INVALID,
      });
    }

    const decoded = jwt.verify(token);

    if (!decoded) {
      return Response.error(res, {
        message: errors.TOKEN_INVALID,
      });
    }

    req.jwt = decoded;
    return next();
  }

  static async isUser(req, res, next) {
    try {
      const { idOAuth } = req.jwt;

      const oAuth = await oAuthAccessTokenService.getOauthAccessTokenById(
        idOAuth
      );

      if (!oAuth) {
        throw new Error();
      }

      req.user = await UsersService.getUserById(oAuth.userId);
      logger.info(infors.AUTHORIZATION_SUCCESS.format(req.user.email));
      return next();
    } catch (error) {
      return Response.error(res, error);
    }
  }
}
