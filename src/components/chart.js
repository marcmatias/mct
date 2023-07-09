import { DataFetcher } from "../data-fetcher";
import { ref, onMounted } from "vue/dist/vue.esm-bundler";
import { colors } from "../utils";
import { NSelect, NEmpty, NSpin } from "naive-ui";
import { Chart, LineController, LineElement, PointElement, LinearScale, Tooltip, CategoryScale, Legend } from 'chartjs';
import ChartDataLabels from "chartjs-plugin-datalabels";

// Registrar a escala "category"
Chart.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Tooltip, Legend, ChartDataLabels);

export const chart = {
  components: {
    NSelect,
    NEmpty,
    NSpin
  },
  props: {
    api: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const api = new DataFetcher(props.api);
    const chartDefined = ref(true);
    const loading = ref(true);
    const optionsSick = ref(null);
    const valueSick = ref(null);
    const optionsAcronym = ref(null);
    const valueAcronym = ref(null);
    const optionsSicksDisabled = ref(false);

    const setAcronymOptions = async () => {
      let acronyms = await api.request("statesAcronym");
      acronyms = Object.values(acronyms).map(x => x.acronym).sort();
      optionsAcronym.value = acronyms.map((acronym) =>  { return { label: acronym, value: acronym } } );
      valueAcronym.value = acronyms[0];
    }

    const setSicksOptions = async (setDefaultValue = false) => {
      let sicks = [];
      try {
        sicks = await api.request("options");
        optionsSicksDisabled.value = false;
        optionsSick.value = sicks.result.map((sick) =>  { return { label: sick, value: sick } } );
        valueSick.value = null;
        if (setDefaultValue) {
          valueSick.value = [sicks.result[0]];
        }
      } catch {
        valueSick.value = null;
        optionsSicksDisabled.value = true;
      }
    }

    let chart = null;
    const renderChart = (labels, datasets) => {
      if (!labels && !datasets) {
        chartDefined.value = false;
        return;
      }
      chartDefined.value = true;

      if(chart) {
        chart.data.labels = labels;
        chart.data.datasets = datasets;
        chart.update();
        return;
      }

      try {
        const ctx = document.querySelector("#chart").getContext('2d');
        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: false,
                ticks: {
                  color: "rgba(127,127,127, 1)",
                  padding: 20,
                  font: {
                    size: 14,
                  }
                }
              },
              y: {
                suggestedMin: 0,
                suggestedMax: 100,
                border: {
                  display: false,
                },
                grid: {
                  color: "rgba(127,127,127, .2)",
                },
                ticks: {
                  callback: function(value) {
                    return value + " %";
                  },
                  color: "rgba(127,127,127, 1)",
                  padding: 20,
                  font: {
                    size: 14,
                  }
                }
              }
            },
            layout: {
              padding: {
                bottom: 20
              }
            },
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                formatter: function(value, context) {
                  if (context.dataIndex === context.dataset.data.length - 1) {
                    return `${context.dataset.label}\n${value}%`;
                  } else {
                    return null;
                  }
                },
                font: {
                  weight: 'bold'
                },
                align: 'end',
                offset: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 4,
                textAlign: 'center',
                color: function(context) {
                  return context.dataset.backgroundColor;
                },
              }
            },
            layout: {
              padding: {
                right: 40
              }
            },
          }
        });
      } catch (e) {
        // Do nothing
      }
    }

    onMounted(async () => {
      await setAcronymOptions();
      await setSicksOptions(true);
      await setChartData();
    });

    const handleUpdateValueSick = async (e) => {
      valueSick.value = e;
      await setChartData();
    }

    const setChartData = async () => {
      loading.value = false;
      let results = [];
      const sicks = valueSick.value;
      if(!sicks.length) {
        renderChart();
        return;
      }

      results = await api.request(sicks);

      if (sicks.length === 1) {
        const color = colors[0];
        renderChart(
          Object.keys(results),
          [
            {
              label: sicks,
              data: Object.values(results).map(state => state[valueAcronym.value]) ,
              backgroundColor: color,
              borderColor: color,
              borderWidth: 2,
            }
          ]
        )
        return;
      }

      const allYears = [];
      for(let sick of sicks) {
        allYears.push(...Object.keys(results[sick]));
      }
      const years = [...new Set(allYears)].sort();

      const result = {};
      for(let sick of sicks) {
        for (let year of years) {
          if (result[sick]) {
            if (results[sick][year]) {
              result[sick].push(results[sick][year][valueAcronym.value]);
            } else {
              result[sick].push(null);
            }
          } else {
            if (results[sick][year]) {
              result[sick] = [results[sick][year][valueAcronym.value]];
            } else {
              result[sick] = [null];
            }
          }
        }
      }

      const data = [];
      let counter = 0;
      for(let [key, value] of Object.entries(result)) {
        const color = colors[counter];
        counter++;
        data.push({
          label: key,
          data: value,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
        });
      }
      renderChart(
        years,
        data
      )

    }

    const handleUpdateValueAcronym = async (e) => {
      valueAcronym.value = e;
      await setChartData();
    }
    return {
      optionsSick,
      valueSick,
      optionsSicksDisabled,
      handleUpdateValueSick,
      optionsAcronym,
      valueAcronym,
      handleUpdateValueAcronym,
      chartDefined,
      loading
    };
  },
  template: `
    <n-spin :show="loading">
      <div class="mct-canva mct-canva--chart">
        <canvas :class="chartDefined ? '' : 'element-hidden'" id="chart"></canvas>
        <n-empty :class="chartDefined ? 'element-hidden' : ''" style="justify-content: center"></n-empty>
      </div>
    </n-spin>
  `
};
