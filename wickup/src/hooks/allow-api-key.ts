// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

export default (): Hook => {
  return async (context: HookContext) => {
    const { params, app } = context;

    const headerField = app.get("authentication").apiKey.header;
    const token = params.headers ? params.headers[headerField] : null;

    if (token && params.provider && !params.authentication) {
      context.params = {
        ...params,
        authentication: {
          strategy: "apiKey",
          token,
        },
      };
    }

    return context;
  };
};
