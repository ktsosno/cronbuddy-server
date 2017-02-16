module.exports = (tab, response, payload) => {
  if (!payload.action) {
    response.send({
      error: 'Insufficient parameters passed for delete'
    })
  }

  tab.remove({ command: payload.action });

  tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Cron job successfully deleted'
      });
    } else {
      response.send({
        error: 'Error deleting cron job'
      });
    }
  });
};
