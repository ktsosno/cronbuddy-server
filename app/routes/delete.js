/**
  * Directive for deleting a cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action) {
    response.send({
      error: 'Insufficient parameters passed for delete'
    })
  }

  const didRemove = tab.remove({ command: payload.action });
  if (!didRemove) {
    response.send({
      message: 'Failed to remove cron job'
    });
  }
  
  tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Cron job successfully deleted'
      });
    } else {
      response.send({
        error: 'Error deleting cron job',
        trace: err
      });
    }
  });
};
