import { httpCodes } from 'constants';

export default class LoggerFormat {
  static request(req, statusCode) {
    const contentLog = {
      payload: {
        method: req.method,
        headers: {
          host: req.hostname,
          accept: req.headers.accept,
        },
        body: req.body,
        params: req.params,
        query: req.query,
        endpoint: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        statusCode,
      },
    };

    return JSON.stringify(contentLog);
  }

  static responseSuccess(res, data, status = httpCodes.STATUS_OK) {
    res.status(status);
    let contentLog = {};

    if (data) {
      contentLog = {
        status: 'success',
        statusCode: status,
        data: data.docs,
        pagination: data.pagination,
      };

      return JSON.stringify(contentLog);
    }

    contentLog = {
      status: 'success',
      statusCode: status,
      data,
    };

    return JSON.stringify(contentLog);
  }

  static responseError(res, error, status = httpCodes.STATUS_BAD_REQUEST) {
    res.status(status);
    let contentLog = {};

    contentLog = {
      success: 'failed',
      statusCode: status,
      error: {
        message: error.message || null,
        code: error.code || httpCodes.STATUS_BAD_REQUEST,
        errors: error.errors || null,
      },
    };

    return JSON.stringify(contentLog);
  }
}
