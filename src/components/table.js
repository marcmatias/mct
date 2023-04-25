import { DataFetcher } from "../data-fetcher";
import { ref, onMounted } from "vue/dist/vue.esm-bundler";
import { NButton, NDataTable, NSelect } from "naive-ui";

export const table = {
  components: {
    NButton,
    NDataTable,
    NSelect
  },
  props: {
    api: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const loading = ref(true);
    const api = new DataFetcher(props.api);
    const rows =  ref([]);
    const columns = ref([]);
    const optionsSick = ref(null);
    const valueSick = ref(null);
    const optionsState = ref([null, 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((state) =>  { return { label: state, value: state } } ));
    const valueState = ref(null);

    onMounted(async () => {
      loading.value = false;

      let sicks = [];
      sicks = await api.request("options");
      optionsSick.value = sicks.result.map((sick) =>  { return { label: sick, value: sick } } );
      valueSick.value = valueSick.value && sicks.result.includes(valueSick.value) ? valueSick.value : sicks.result[0];

      await setTableData();
    });

    const setTableData = async () => {
      const currentResult = await api.request(valueSick.value);

      columns.value = [];
      const tableData = convertObjectToArray(currentResult);
      for (const column of tableData[0]){
        columns.value.push(
          {
            title: column.charAt(0).toUpperCase() + column.slice(1),
            key: column,
            sorter: 'default'
          }
        )
      }

      rows.value = [];
      for (let i = 1; i < tableData.length; i++) {
        const cells = {};
        for (let j = 0; j < tableData[i].length; j++) {
          cells[columns.value[j].key] = tableData[i][j];
        }
        rows.value.push(cells)
      }
    }

    const convertObjectToArray = (externalObj) => {
      const result = [];
      let obj = externalObj;

      const state = valueState.value;
      if (state) {
        const filteredData = {};
        Object.keys(obj).forEach(year => {
          const stateData = obj[year][state];
          if (stateData) {
            filteredData[year] = {[state]: stateData};
          }
        });
        obj = filteredData;
      }

      // Get the keys of the object and sort them in ascending order
      const years = Object.keys(obj).sort();

      // Push the headers (year, acronym, value) to the result array
      result.push(['Ano', 'Sigla', 'Contaminação']);

      // Loop through each year
      for (const year of years) {
        // Loop through each state in the year
        for (const [acronym, value] of Object.entries(obj[year])) {
          // Push the year, acronym, and value to the result array as an array
          result.push([year, acronym, value]);
        }
      }

      return result;
    }

    const handleUpdateValueSick = async (e) => {
      valueSick.value = e;
      await setTableData();
    }

    const handleUpdateValueState = async (e) => {
      valueState.value = e;
      await setTableData();
    }

    return {
      columns,
      loading,
      rows,
      handleUpdateValueSick,
      optionsSick,
      valueSick,
      optionsState,
      valueState,
      handleUpdateValueState
    };
  },
  template: `
    <section>
      <n-data-table
        striped
        :columns="columns"
        :data="rows"
        :bordered="false"
        :loading="loading"
        :pagination="{ pageSlot:7 }"
        :scrollbar-props="{ trigger: 'none', xScrollable: true }"
      />
    </section>
  `
};
