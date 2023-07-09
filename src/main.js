import "./assets/css/style.css";

import { createApp, ref } from "vue/dist/vue.esm-bundler";
import { config as Config } from "./components/config";
import { mainCard as MainCard } from "./components/main-card";
import { NTabs, NTabPane, NTab } from "naive-ui";


export default class MCT {
  constructor(api) {
    this.api = api;
    this.render();
  }

  render() {
    const self = this;
    const App = {
      components: { NTabs, NTabPane, NTab, Config, MainCard },
      setup() {
        const tab = ref("map");
        const tabBy = ref("bySick");
        const mainTitle = ref("Cobertura Vacinal de Poliomielite, Brasil, Janeiro de 2023");

        const handleUpdateValueTabBy = (tabByName) => {
          tabBy.value = tabByName;
        };
        const handleUpdateValueTab = (tabName) => {
          tab.value = tabName;
        };
        return {
          tab,
          tabBy,
          mainTitle,
          api: self.api,
          handleUpdateValueTab,
          handleUpdateValueTabBy
        };
      },
      template: `
        <Config>
          <main class="main">
            <section class="main-header">
              <h1 style="margin:0px; color: #e96f5f">VacinasBR</h1>
              <div style="display:flex; gap: 32px; overflow: auto">
                <n-tabs type="segment" @update:value="handleUpdateValueTabBy">
                  <n-tab name="bySick" tab="Por doença" />
                  <n-tab name="byImmunizing" tab="Imunizante" />
                </n-tabs>
                <n-tabs :value="tab" type="segment" @update:value="handleUpdateValueTab">
                  <n-tab name="map" tab="Mapa" />
                  <n-tab name="chart" tab="Gráfico"/>
                  <n-tab name="table" tab="Tabela"/>
                </n-tabs>
              </div>
            </section>
            <div>
              <MainCard :api="api" :main-title="mainTitle" :tab-by="tabBy" :tab="tab" />
            </div>
          </main>
        </Config>
      `,
    };

    const app = createApp(App);
    app.mount("#app");
  }
}
