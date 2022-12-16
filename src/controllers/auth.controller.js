import { AuthService } from 'services';
import Response from 'helpers/response';
import LoggerFormat from 'helpers/logFormat';
import logger from 'configs/winston.config';

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

      logger.info(
        `Request router [register]: ${LoggerFormat.request(req, 200)}`
      );
      logger.info(
        `Reponse router [register]: ${LoggerFormat.responseSuccess(
          res,
          { docs: user },
          201
        )}`
      );

      return Response.success(res, { docs: user }, 201);
    } catch (error) {
      logger.error(
        `Error in request [register]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [register]: ${LoggerFormat.responseError(res, error)}`
      );

      return Response.error(res, error);
    }
  }

  async login(req, res) {
    try {
      const docs = await this.service.signIn(req.body);

      logger.info(`Request router [login]: ${LoggerFormat.request(req, 200)}`);
      logger.info(
        `Reponse router [login]: ${LoggerFormat.responseSuccess(
          res,
          { docs },
          201
        )}`
      );

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [login]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [login]: ${LoggerFormat.responseError(res, error)}`
      );

      return Response.error(res, error);
    }
  }

  async logout(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const docs = await this.service.logout(idOAuth);

      logger.info(`Request router [logout]: ${LoggerFormat.request(req, 200)}`);
      logger.info(
        `Reponse router [login]: ${LoggerFormat.responseSuccess(res, { docs })}`
      );

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [logout]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [logout]: ${LoggerFormat.responseError(res, error)}`
      );

      return Response.error(res, error);
    }
  }

  async confirmEmail(req, res) {
    try {
      const docs = await this.service.confirmEmail(req.params.confirmToken);
      logger.info(
        `Request router [confirmEmail]: ${LoggerFormat.request(req, 200)}`
      );
      logger.info(
        `Reponse router [confirmEmail]: ${LoggerFormat.responseSuccess(res, {
          docs,
        })}`
      );

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [confirmEmail]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [confirmEmail]: ${LoggerFormat.responseError(
          res,
          error
        )}`
      );

      return Response.error(res, error);
    }
  }

  async refreshToken(req, res) {
    try {
      const docs = await this.service.refreshToken(req.body.refreshToken);
      logger.info(
        `Request router [refreshToken]: ${LoggerFormat.request(req, 200)}`
      );
      logger.info(
        `Reponse router [refreshToken]: ${LoggerFormat.responseSuccess(res, {
          docs,
        })}`
      );

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [refreshToken]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [refreshToken]: ${LoggerFormat.responseError(
          res,
          error
        )}`
      );

      return Response.error(res, error);
    }
  }

  async getMe(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const docs = await this.service.getMe(idOAuth);

      logger.info(`Request router [getMe]: ${LoggerFormat.request(req, 200)}`);
      logger.info(
        `Reponse router [getMe]: ${LoggerFormat.responseSuccess(res, {
          docs,
        })}`
      );

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [getMe]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [getMe]: ${LoggerFormat.responseError(res, error)}`
      );

      return Response.error(res, error);
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const docs = await this.service.forgotPassword(email);

      logger.info(
        `Request router [forgotPassword]: ${LoggerFormat.request(req, 200)}`
      );
      logger.info(
        `Reponse router [forgotPassword]: ${LoggerFormat.responseSuccess(res, {
          docs,
        })}`
      );

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [forgotPassword]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [forgotPassword]: ${LoggerFormat.responseError(
          res,
          error
        )}`
      );

      return Response.error(res, error);
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, verifyCode } = req.body;
      const docs = await this.service.verifyCode({ email, verifyCode });
      logger.info(
        `Request router [verifyCode]: ${LoggerFormat.request(req, 200)}`
      );
      logger.info(
        `Reponse router [verifyCode]: ${LoggerFormat.responseSuccess(res, {
          docs,
        })}`
      );

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [verifyCode]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [verifyCode]: ${LoggerFormat.responseError(res, error)}`
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
      logger.info(
        `Request router [resetPassword]: ${LoggerFormat.request(req, 200)}`
      );
      logger.info(
        `Reponse router [resetPassword]: ${LoggerFormat.responseSuccess(res, {
          docs,
        })}`
      );

      return Response.success(res, { docs });
    } catch (error) {
      logger.error(
        `Error in request [resetPassword]: ${LoggerFormat.request(
          req,
          400
        )} \n Error: ${error}`
      );
      logger.error(
        `Reponse router [resetPassword]: ${LoggerFormat.responseError(
          res,
          error
        )}`
      );

      return Response.error(res, error);
    }
  }
}

export default new AuthController(AuthService);
