import { AuthService } from 'services';
import Response from 'helpers/response';
import logger from 'configs/winston.config';
import loggerFormat from 'helpers/logFormat';

class AuthController {
  constructor(service) {
    this.service = service;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getMe = this.getMe.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async register(req, res) {
    try {
      const user = await this.service.signUp(req.body);

      logger.info(`Request router [register]: ${loggerFormat(req, 200)}`);
      return Response.success(res, { docs: user }, 201);
    } catch (error) {
      logger.error(
        `Error in request [register]: ${loggerFormat(
          req,
          400
        )} \n Error: ${error}`
      );
      return Response.error(res, error);
    }
  }

  async login(req, res) {
    try {
      const docs = await this.service.signIn(req.body);

      logger.info(`Request router [login]: ${loggerFormat(req, 200)}`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [login]: ${loggerFormat(req, 400)} \n Error: ${error}`
      );
      return Response.error(res, error);
    }
  }

  async logout(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const docs = await this.service.logout(idOAuth);

      logger.info(`Request router [logout]: ${loggerFormat(req, 200)}`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [logout]: ${loggerFormat(
          req,
          400
        )} \n Error: ${error}`
      );
      return Response.error(res, error);
    }
  }

  async confirmEmail(req, res) {
    try {
      const docs = await this.service.confirmEmail(req.params.confirmToken);
      logger.info(`Request router [confirmEmail]: ${loggerFormat(req, 200)}`);

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [confirmEmail]: ${loggerFormat(
          req,
          400
        )} \n Error: ${error}`
      );
      return Response.error(res, error);
    }
  }

  async refreshToken(req, res) {
    try {
      const docs = await this.service.refreshToken(req.body.refreshToken);
      logger.info(`Request router [refreshToken]: ${loggerFormat(req, 200)}`);

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [refreshToken]: ${loggerFormat(
          req,
          400
        )} \n Error: ${error}`
      );
      return Response.error(res, error);
    }
  }

  async getMe(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const docs = await this.service.getMe(idOAuth);

      logger.info(`Request router [getMe]: ${loggerFormat(req, 200)}`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [getMe]: ${loggerFormat(req, 400)} \n Error: ${error}`
      );

      return Response.error(res, error);
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const docs = await this.service.forgotPassword(email);

      logger.info(`Request router [forgotPassword]: ${loggerFormat(req, 200)}`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [forgotPassword]: ${loggerFormat(
          req,
          400
        )} \n Error: ${error}`
      );
      return Response.error(res, error);
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, verifyCode } = req.body;
      const docs = await this.service.verifyCode({ email, verifyCode });
      logger.info(`Request router [verifyCode]: ${loggerFormat(req, 200)}`);

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [verifyCode]: ${loggerFormat(
          req,
          400
        )} \n Error: ${error}`
      );
      return Response.error(res, error);
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, verifyCode, password } = req.body;
      const docs = await this.service.resetPassword({
        email,
        verifyCode,
        password,
      });
      logger.info(`Request router [resetPassword]: ${loggerFormat(req, 200)}`);

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [resetPassword]: ${loggerFormat(
          req,
          400
        )} \n Error: ${error}`
      );
      return Response.error(res, error);
    }
  }
}

export default new AuthController(AuthService);
