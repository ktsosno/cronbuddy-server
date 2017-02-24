/**
  * Directive for deleting a cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action) {
    return response.send({
      message: 'Insufficient parameters passed for delete',
      success: false,
    });
  }

  const didRemove = tab.remove({ command: payload.action });
  if (!didRemove) {
    return response.send({
      message: 'Failed to remove cron job',
      success: false,
    });
  }

  return tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Cron job successfully deleted',
        success: true,
      });
    } else {
      response.send({
        message: 'Error deleting cron job',
        success: false,
        trace: err,
      });
    }
  });
};
