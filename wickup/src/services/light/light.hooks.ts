import authenticate from '@feathersjs/authentication/lib/hooks/authenticate';
import allowApiKey from '../../hooks/allow-api-key';

export default {
  before: {
    all: [allowApiKey(), authenticate("apiKey")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

