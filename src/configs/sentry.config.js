import * as Sentry from '@sentry/node';
// eslint-disable-next-line no-unused-vars
import * as Tracing from '@sentry/tracing';

export default class ErrorTracking {
  static init() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
    });
  }
  // eslint-disable-next-line lines-between-class-members
  static captureException(error) {
    Sentry.captureException(error);
  }
}
