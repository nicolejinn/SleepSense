import { ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationBaseStrategy, AuthenticationResult, AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';
import { NotAuthenticated } from '@feathersjs/errors';

declare module './declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

class ApiKeyStrategy extends AuthenticationBaseStrategy {
  app: Application;

  constructor(app: Application) {
    super();
    this.app = app;
  }

  async authenticate(authentication: AuthenticationResult) {
    const { token } = authentication;

    const config = this.app.get("authentication").apiKey;

    const match = config.allowedKeys.includes(token);
    if (!match) throw new NotAuthenticated("Incorrect API Key");

    return {
      apiKey: true,
    };
  }
}

export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('apiKey', new ApiKeyStrategy(app));

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
