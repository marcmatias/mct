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
            <section style="display:flex; justify-content:space-between">
              <div style="display: flex; align-items: center; gap: 32px">
                <h1 style="margin:0px; color: #e96f5f">Vacinas</h1>
                <n-tabs type="line" @update:value="handleUpdateValueTabBy">
                  <n-tab name="bySick" tab="Por doença" />
                  <n-tab name="byImmunizing" tab="Imunizante" />
                </n-tabs>
              </div>
              <div style="display: flex;  align-items: center; gap: 14px">
                <span>exibir como</span>
                <n-tabs :value="tab" type="segment" @update:value="handleUpdateValueTab">
                  <n-tab name="map" tab="Mapa" />
                  <n-tab name="chart" tab="Gráfico"/>
                  <n-tab name="table" tab="Tabela"/>
                </n-tabs>
              </div>
            </section>
            <MainCard :tab="tab" :api='api' />
          </main>
        </Config>
      `,
    };

    const app = createApp(App);
    app.mount("#app");
  }
}
