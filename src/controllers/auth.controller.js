import { AuthService } from 'services';
import Response from 'helpers/response';
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
      logger.info(`User ${user.email} has been created`);
      return Response.success(res, { docs: user }, 201);
    } catch (error) {
      logger.error('Error in register', error, req.body);
      return Response.error(res, error);
    }
  }

  async login(req, res) {
    try {
      const docs = await this.service.signIn(req.body);
      logger.info(`User ${req.body.email} has been logged in`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error('Error in login', error, req.body);
      return Response.error(res, error);
    }
  }

  async logout(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const docs = await this.service.logout(idOAuth);
      logger.info(`User with idOauth ${idOAuth} has been logged out`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error('Error in logout', error, req.body);
      return Response.error(res, error);
    }
  }

  async confirmEmail(req, res) {
    try {
      const docs = await this.service.confirmEmail(req.params.confirmToken);
      logger.info(`Confirm email with token ${req.params.confirmToken}`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error('Error in confirm email', error, req.body);
      return Response.error(res, error);
    }
  }

  async refreshToken(req, res) {
    try {
      const docs = await this.service.refreshToken(req.body.refreshToken);
      logger.info(`Refresh token with req ${req.body}`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error('Error in refresh token', error, req.body);
      return Response.error(res, error);
    }
  }

  async getMe(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const docs = await this.service.getMe(idOAuth);
      logger.info(`User ${docs.email} has been get me`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error('Error in get me', error, req.body);
      return Response.error(res, error);
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const docs = await this.service.forgotPassword(email);
      logger.info(`Forgot password with req ${req.body}`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error('Error in forgot password', error, req.body);
      return Response.error(res, error);
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, verifyCode } = req.body;
      const docs = await this.service.verifyCode({ email, verifyCode });
      logger.info(`Verify code with req ${req.body}`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error('Error in verify code', error, req.body);
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
      logger.info(`User ${email} has been reset password`);
      return Response.success(res, { docs });
    } catch (error) {
      logger.error('Error in reset password', error, req.body);
      return Response.error(res, error);
    }
  }
}

export default new AuthController(AuthService);
