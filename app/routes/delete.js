/**
  * Directive for deleting a cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action) {
    return response.send({
      error: 'Insufficient parameters passed for delete'
    })
  }

  const didRemove = tab.remove({ command: payload.action });
  if (!didRemove) {
    return response.send({
      message: 'Failed to remove cron job'
    });
  }

  tab.save((err) => {
    if (!err) {
      return response.send({
        message: 'Cron job successfully deleted'
      });
    } else {
      return response.send({
        error: 'Error deleting cron job',
        trace: err
      });
    }
  });
};
