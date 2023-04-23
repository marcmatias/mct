import "./assets/css/style.css";

import { createApp, ref } from "vue/dist/vue.esm-bundler";
import { chart } from "./components/chart";
import { config } from "./components/config";
import { map } from "./components/map";
import { table } from "./components/table";
import { NTabs, NTabPane, NTab, NCard } from "naive-ui";

export default class Dashboard {
  constructor(api) {
    this.api = api;
    this.render();
  }

  render() {
    const self = this;
    const App = {
      components: { NTabs, NTabPane, NTab, NCard },
      setup() {
        const tab = ref("map");
        const handleUpdateValueTab = (tabName) => {
          tab.value = tabName;
          console.log(tab.value)
        };
        const handleUpdateValueTabBy = (tabName) => {
          console.log(tabName);
        };
        return { 
          tab,
          handleUpdateValueTab,
          handleUpdateValueTabBy
        };
      },
      template: `
        <Config>
          <main class="main">
            <n-tabs type="segment" @update:value="handleUpdateValueTab">
              <template #prefix>
                <h1 style="margin:0px; margin-right: 24px; color: #e96f5f">Vacinas</h1>
                <n-tabs type="line" @update:value="handleUpdateValueTabBy">
                  <n-tab name="bySick" tab="Por doença" />
                  <n-tab name="byImmunizing" tab="Imunizante" />
                </n-tabs>
              </template>
              <n-tab name="map" tab="Mapa" />
              <n-tab name="chart" tab="Gráfico"/>
              <n-tab name="table" tab="Tabela"/>
            </n-tabs>
            <n-card>
              <template v-if="tab === 'map'">
                <Map api='${self.api}' />
              </template>
              <template v-else-if="tab === 'chart'">
                <Chart api='${self.api}'/>
              </template>
              <template v-else>
                <Table api='${self.api}' />
              </template>
            </n-card>
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
