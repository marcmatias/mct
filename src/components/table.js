import { DataFetcher } from "../data-fetcher";

export const table = {
  components: {
    "n-button": naive.NButton,
    "n-data-table": naive.NDataTable,
    "n-input": naive.NInput,
    "n-input-group": naive.NInputGroup,
    "n-select": naive.NSelect
  },
  setup() {
    const loading = Vue.ref(true);
    const api = new DataFetcher();
    const rows =  Vue.ref([]);
    const columns = Vue.ref([]);
    const optionsSick = Vue.ref(null);
    const valueSick = Vue.ref(null);


    Vue.onMounted(async () => {
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

    const convertObjectToArray = (obj) => {
      const result = [];

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

    return {
      columns,
      loading,
      rows,
      handleUpdateValueSick,
      optionsSick,
      valueSick
    };
  },
  template: `
    <div>
      <div class="container-elements container-elements--table">
        <div class="container-elements__selects">
          <n-select
            v-model:value="valueSick"
            filterable
            :options="optionsSick"
            style="width: 200px"
            placeholder="Selecione doença"
            @update:value="handleUpdateValueSick"
          />
        </div>
      </div>
      <n-data-table
        :columns="columns"
        :data="rows"
        :bordered="false"
        :loading="loading"
        :pagination="{ pageSlot:7 }"
        :scrollbar-props="{ trigger: 'none', xScrollable: true }"
      ></n-data-table>
    </div>
  `
};
