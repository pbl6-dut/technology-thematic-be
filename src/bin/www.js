import app from 'index';
import logger from 'configs/winston.config';
// eslint-disable-next-line import/extensions
import registerWithEureka from 'technology_thematic_lib/helpers/eurekaHelper.js';

app.set('port', process.env.PORT || 3000);
registerWithEureka('node-service', process.env.PORT);

app.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}`);
});
