import { Id, Params } from "@feathersjs/feathers";
import { Service, MemoryServiceOptions } from "feathers-memory";
import { Application } from "../../declarations";
import { v3, discovery, api as hueApi } from "node-hue-api";
const LightState = v3.lightStates.LightState;
let api: any = null;

const USERNAME = "Tj82AK95xQja2JcAtZuTKlPMhPF7bOj7VZFvAYfi";
const LIGHT_ID = 1;

type Data = {
  on?: boolean;
  hue?: number;
  sat?: number;
  bri?: number;
};

export class Light extends Service {
  state: any = new LightState().on().bri(100);

  constructor(options: Partial<MemoryServiceOptions>, app: Application) {
    super(options);

    discovery
      .mdnsSearch()
      .then(async (searchResults) => {
        if (searchResults.length === 0) throw "No search results";

        const host = searchResults[0].ipaddress!;
        api = await hueApi.createLocal(host).connect(USERNAME);
        console.log("API connected");
        api.lights.setLightState(LIGHT_ID, this.state);

        const initialState = await api.lights.getLightState(LIGHT_ID);
        this.state = new LightState().populate(initialState);
        api.lights.setLightState(LIGHT_ID, this.state);
      })
      .catch((e) => console.error(e));
  }

  async get(id: Id, params?: Params | undefined): Promise<any> {
    return this.state.getPayload();
  }

  async create(data: Data, params?: Params) {
    if (!api) throw "API not connected yet";

    if (data.on !== undefined) data.on ? this.state.on() : this.state.off();
    if (data.bri !== undefined) this.state.bri(data.bri);
    if (data.hue !== undefined) this.state.hue(data.hue);
    if (data.sat !== undefined) this.state.sat(data.sat);

    api.lights.setLightState(LIGHT_ID, this.state);
    return this.state.getPayload();
  }
}
