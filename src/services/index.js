const healthCheckService = () => ({
  ok: true,
  service: 'control_laps_api',
  status: 'healthy',
});

module.exports = {
  healthCheckService,
};
