import { NCard } from "naive-ui";
import { ref, computed, watch, onBeforeMount } from "vue/dist/vue.esm-bundler";
import { chart as Chart } from "./chart";
import { map as Map } from "./map/map";
import { table as Table } from "./table";
import { subSelect as SubSelect } from "./sub-select";
import { subButtons as SubButtons } from "./sub-buttons";
import { yearSlider as YearSlider } from "./map/year-slider";
import { mapRange as MapRange } from "./map/map-range";
import { DataFetcher } from "../data-fetcher";

export const mainCard = {
  components:  {
    NCard,
    Chart,
    Map,
    Table,
    SubSelect,
    SubButtons,
    YearSlider,
    MapRange
  },
  props: {
    api: {
      type: String,
      required: true
    },
    mainTitle: {
      type: String,
      required: true
    },
    tab: {
      type: String,
      required: true
    },
    tabBy: {
      type: String,
      required: true
    },
  },
  emits: ['mapChange'],
  setup(props) {
    const mapData = ref([]);
    const mainTitle = computed(() => props.mainTitle);

    const handleMapChange = (datasetValues) => {
      mapData.value = datasetValues;
    };

    const api = new DataFetcher(props.api);

    const form = ref({
        sick: null,
        sicks: [],
        type: null,
        types: [{ label: 'Cobertura Vacinal', value: 'Cobertura Vacinal' }],
        local: null,
        locals: [{ label: 'Estados', value: 'Estados' }],
        period: null,
        periods: null,
        granurality: null,
        granuralities: [{ label: 'Estados', value: 'Estados' }],
    });

    onBeforeMount(async () => {
      const sicks = await api.request("options");
      form.value.sicks = sicks.result.map(x => { return { label: x, value: x } })

      let locals = await api.request("statesAcronym");
      locals = Object.values(form.value.locals).map(x => x.acronym).sort();
      locals.unshift("BR");
      locals.value = locals.map((local) =>  { return { label: local, value: local } } );

      // TODO: How years range will work
    });

    watch(
      form.value,
      () => {
        // console.log(form.value)
      }
    )

    return {
      handleMapChange,
      mapData,
      mainTitle,
      form,
    };
  },
  template: `
    <n-card style="border: #D8D8D8 1px solid">
      <SubSelect
        :api="api"
        :tab="tab"
        :tab-by="tabBy" 
        v-model:form="form"
      />
      <h2 style="margin: 0px; font-weight: 700">
       {{ mainTitle }}
      </h2>
      <h3 style="margin-top: 5px; font-weight: 400">
        Cobertura vacinal estimada de BCG, considerando população-alvo
      </h3>
      <section>
        <template v-if="tab === 'map'">
          <div style="display: flex; gap: 12px">
            <MapRange :mapData="mapData" />
            <div style="width: 100%;">
              <Map
                :form="form"
                :api='api' @map-change="handleMapChange"
              />
              <YearSlider :form="form" />
            </div>
          </div>
        </template>
        <template v-else-if="tab === 'chart'">
          <Chart :api='api'/>
        </template>
        <template v-else>
          <Table :api='api' />
        </template>
      </section>
      <SubButtons />
    </n-card>
  `,
}
