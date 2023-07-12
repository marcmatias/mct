import { DataFetcher } from "../data-fetcher";
import { ref, onMounted, watch, computed } from "vue/dist/vue.esm-bundler";
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
    form: {
      type: Object,
    },
  },
  setup(props) {
    const api = new DataFetcher(props.api);
    const chartDefined = ref(true);
    const loading = ref(true);
    const valueSick = computed(() => props.form.sick);
    const valueAcronym = computed(() => props.form.local);
    const valuePeriod = computed(() => props.form.period);

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

    const setChartData = async () => {
      loading.value = false;

      let results = [];
      let sicks = valueSick.value;
      let period = valuePeriod.value;
      if (!sicks) {
        return;
      }
      if(!sicks.length) {
        renderChart();
        return;
      }

      results = await api.request(sicks);

      if (!Array.isArray(sicks)) {
        results = { [sicks]: results }
        sicks = [sicks];
      }

      const allYears = [];
      for(let sick of sicks) {
        allYears.push(...Object.keys(results[sick]));
      }
      const years = [...new Set(allYears)].sort();

      const result = {};
      for(let sick of [sicks]) {
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

    onMounted(async () => {
      await setChartData();
    });

    watch(
      () => [props.form.local, props.form.sick, props.form.period],
      async () => {
        await setChartData();
      }
    )

    return {
      valueSick,
      valueAcronym,
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
