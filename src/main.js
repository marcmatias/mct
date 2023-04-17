import "./assets/css/style.css";
import { createApp } from "vue/dist/vue.esm-bundler";
import { chart } from "./components/chart";
import { config } from "./components/config";
import { map } from "./components/map";
import { table } from "./components/table";

export default class Dashboard {
  constructor(api) {
    this.api = api;
    this.render();
  }

  render() {
    const self = this;
    const App = {
      template: `
        <Config>
          <main class="main">
            <h1 style="margin:0px">Dashboard Contaminações Brasil</h1>
            <Map api='${self.api}' />
            <Table api='${self.api}' />
            <Chart api='${self.api}'/>
          </main>
        </Config>
      `,
    };

    const app = createApp(App);
    app.component("Map", map);
    app.component("Config", config);
    app.component("Table", table);
    app.component("Chart", chart);
    app.mount("#app");
  }
}
