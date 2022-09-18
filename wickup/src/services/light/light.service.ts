// Initializes the `light` service on path `/light`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Light } from './light.class';
import hooks from './light.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'light': Light & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/light', new Light(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('light');

  service.hooks(hooks);
}
