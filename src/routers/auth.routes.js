import express from 'express';
import { authController } from 'controllers';
import { ValidatorBody, ValidatorParams } from 'validations';
import AuthMiddleware from 'middlewares/auth';

const router = express.Router();

router.post('/register', ValidatorBody('register'), authController.register);

router.post('/login', ValidatorBody('login'), authController.login);

router.get('/logout', AuthMiddleware.isRequired, authController.logout);

router.post(
  '/refresh-token',
  ValidatorBody('refreshToken'),
  authController.refreshToken
);

router.get(
  '/confirm-email/:confirmToken',
  ValidatorParams('confirmToken'),
  authController.confirmEmail
);

router.get('/me', AuthMiddleware.isRequired, authController.getMe);

router.post(
  '/forgot-password',
  ValidatorBody('emailExists'),
  authController.forgotPassword
);

router.post(
  '/verify-code',
  ValidatorBody('verifyCode'),
  authController.verifyCode
);

router.post(
  '/reset-password',
  ValidatorBody('resetPassword'),
  authController.resetPassword
);

export default router;
