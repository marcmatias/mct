import { NCard } from "naive-ui";
import { chart as Chart } from "./chart";
import { map as Map } from "./map";
import { table as Table } from "./table";
import { subSelect as SubSelect } from "./sub-select";
import { subButtons as SubButtons } from "./sub-buttons";
import { yearSlider as YearSlider } from "./year-slider";

export const mainCard = {
  components:  {
    NCard,
    Chart,
    Map,
    Table,
    SubSelect,
    SubButtons,
    YearSlider
  },
  props: {
    tab: {
      type: String,
      required: true
    },
    api: {
      type: String,
      required: true
    },
  },
  template: `
    <n-card style="border: #D8D8D8 1px solid">
      <SubSelect :api='api' />
      <h2 style="margin: 0px; font-weight: 700">Cobertura Vacinal de Poliomielite, Brasil, Janeiro de 2023</h2>
      <h3 style="margin-top: 5px; font-weight: 400">Cobertura vacinal estimada de BCG, considerando população-alvo</h3>
      <section>
        <template v-if="tab === 'map'">
          <Map :api='api' />
        </template>
        <template v-else-if="tab === 'chart'">
          <Chart :api='api'/>
        </template>
        <template v-else>
          <Table :api='api' />
        </template>
      </section>
      <YearSlider />
      <SubButtons />
    </n-card>
  `,
}
