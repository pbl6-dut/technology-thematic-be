import app from 'index';
import logger from 'configs/winston.config';
// eslint-disable-next-line import/extensions

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}`);
});
