module.exports = function sendResponse(res, { status = 200, success = true, data, message }) {
  res.status(status).json({
    success,
    message,
    data,
  });
};