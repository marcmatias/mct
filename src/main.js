import "./assets/css/style.css";

import { createApp, ref } from "vue/dist/vue.esm-bundler";
import { config as Config } from "./components/config";
import { mainCard as MainCard } from "./components/main-card";
import { NTabs, NTabPane, NTab } from "naive-ui";

export default class Dashboard {
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
        const handleUpdateValueTab = (tabName) => {
          tab.value = tabName;
        };
        const handleUpdateValueTabBy = (tabName) => {
          console.log(tabName);
        };
        return {
          tab,
          api: self.api,
          handleUpdateValueTab,
          handleUpdateValueTabBy
        };
      },
      template: `
        <Config>
          <main class="main">
            <section class="main-header">
              <h1 style="margin:0px; color: #e96f5f">Vacinas</h1>
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
              <MainCard :tab="tab" :api='api' />
            </div>
          </main>
        </Config>
      `,
    };

    const app = createApp(App);
    app.mount("#app");
  }
}
