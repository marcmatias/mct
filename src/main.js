import { chart } from "./components/chart";
import { config } from "./components/config";
import { map } from "./components/map";
import { table } from "./components/table";

const App = {
  template: `
    <Config>
      <main class="main">
        <h1 style="margin:0px">Dashboard Contaminações Brasil</h1>
        <Map />
        <Table />
        <Chart />
      </main>
    </Config>
  `,
};

const app = Vue.createApp(App);
app.component("Map", map);
app.component("Config", config);
app.component("Table", table);
app.component("Chart", chart);
app.mount("#app");

