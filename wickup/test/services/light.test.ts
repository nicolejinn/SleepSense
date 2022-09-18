import app from '../../src/app';

describe('\'light\' service', () => {
  it('registered the service', () => {
    const service = app.service('light');
    expect(service).toBeTruthy();
  });
});
