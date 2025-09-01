import request from 'supertest';

describe('Gateway Health Check', () => {
  const gatewayHost = process.env.GATEWAY_HOST || 'gateway';
  const gatewayPort = process.env.GATEWAY_PORT || 3000;
  const server = request(`http://${gatewayHost}:${gatewayPort}`);

  it('should return 200', async () => {
    const response = await server.get('/health');
    expect(response.status).toBe(200);
  });
});
