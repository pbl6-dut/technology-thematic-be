const loggerFormat = (req, statusCode) => {
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
};

export default loggerFormat;
