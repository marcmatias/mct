import { DataFetcher } from "../data-fetcher";
import { MapChart } from "../map-chart";
import { ref, onMounted, toRaw } from "vue/dist/vue.esm-bundler";
import { NSelect, NCard, NSpin, NButton } from "naive-ui";

export const map = {
  components: {
    NSelect,
    NCard,
    NSpin,
    NButton,
  },
  props: {
    api: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const api = new DataFetcher(props.api);
    const optionsSick = ref(null);
    const valueSick = ref(null);
    const optionsAcronym = ref(null);
    const valueAcronym = ref(null);
    const optionsAcronymDisabled = ref(false);
    const optionsSicksDisabled = ref(false);
    const optionsYear = ref(null);
    const buttonPlayDisabled = ref(null);
    const valueYear = ref(null);
    const optionsYearDisabled = ref(false);
    const loading = ref(true);
    const yearMapElement = ref(null);

    const queryMap = async (mapUrl) => {
      const svg = await fetch(mapUrl);
      const mapText = await svg.text();
      return mapText;
    };

    const renderMap = (args) => {
      new MapChart({
        ...args,
        legendTitle: "Porcentagem de contaminação da população brasileira.",
        legendSource: "IBGE 2023"
      });
      loading.value = false;
    }

    const setMap = async (enableFields = true) => {
      loading.value = true;
      const mapElement = document.querySelector('#map');
      await setSicksOptions(enableFields);
      const acronym = valueAcronym.value;
      if (acronym == "BR") {
        const map =
          await queryMap(
            'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=image/svg+xml&qualidade=intermediaria&intrarregiao=UF'
          );
        const datasetStates = await api.request(valueSick.value);
        setYearsOptions(Object.keys(datasetStates).map(x => x).sort());
        const states = await api.request("statesAcronym");
        renderMap({ element: mapElement, map, datasetStates: datasetStates[valueYear.value], states });
        return;
      }

      const map = await queryMap(
        `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${acronym}?formato=image/svg+xml&qualidade=intermediaria&intrarregiao=municipio`
      );
      if (!valueSick.value) {
        return renderMap({ element: mapElement, map });
      }
      try {
        const datasetCities = await api.requestState(acronym + "/" + valueSick.value);
        setYearsOptions(Object.keys(datasetCities).map(x => x).sort());
        const cities = await api.requestState(acronym + "/" + "citiesAcronym");
        renderMap({ element: mapElement, map, datasetCities: datasetCities[valueYear.value], cities });
      } catch {
        renderMap({ element: mapElement, map });
      }
    }

    const setAcronymOptions = async () => {
      let acronyms = await api.request("statesAcronym");
      acronyms = Object.values(acronyms).map(x => x.acronym).sort();
      acronyms.unshift("BR");
      optionsAcronym.value = acronyms.map((acronym) =>  { return { label: acronym, value: acronym } } );
      valueAcronym.value = acronyms[0];
    }

    const setSicksOptions = async (enableFields = true) => {
      let sicks = [];
      try {
        const acronym = valueAcronym.value;
        if (acronym === "BR") {
          sicks = await api.request("options");
        } else {
          sicks = await api.requestState(acronym + "/" + "options");
        }
        if (enableFields) {
          optionsSicksDisabled.value = false;
          optionsYearDisabled.value = false;
          buttonPlayDisabled.value = false;
        }
        optionsSick.value = sicks.result.map((sick) =>  { return { label: sick, value: sick } } );
        valueSick.value = valueSick.value && sicks.result.includes(valueSick.value) ? valueSick.value : sicks.result[0];
      } catch {
        optionsSicksDisabled.value = true;
        optionsYearDisabled.value = true;
        buttonPlayDisabled.value = true;
        valueSick.value = null;
        valueYear.value = null;
      }
    }

    const setYearsOptions = (years) => {
      optionsYear.value = years.map((year) =>  { return { label: year, value: year } } );
      if (valueYear.value && years.includes(valueYear.value)) {
        valueYear.value = valueYear.value;
      } else {
        const recentYear = optionsYear.value.map(x => x.value);
        valueYear.value = recentYear[recentYear.length - 1];
      }
    }

    onMounted(async () => {
      await setAcronymOptions();
      await setSicksOptions();
      await setMap();
    });


    const handleUpdateValueSick = async (e) => {
      valueSick.value = e;
      await setMap();
    }
    const handleUpdateValueAcronym = async (e) => {
      valueAcronym.value = e;
      await setMap();
    }
    const handleUpdateValueYear = async (e) => {
      valueYear.value = e;
      await setMap();
    }

    const waitFor = (delay) => new Promise(resolve => setTimeout(resolve, delay));

    const playMap = async () => {
      buttonPlayDisabled.value = true;
      optionsYearDisabled.value = true;
      optionsSicksDisabled.value = true;
      optionsAcronymDisabled.value = true;
      for (let year of toRaw(optionsYear.value)) {
        valueYear.value = year.value;
        await setMap(false);
        yearMapElement.value.innerText = valueYear.value;
        yearMapElement.value.style.opacity = 1;
        await waitFor(2000)
      }
      yearMapElement.value.style.opacity = 0;
      buttonPlayDisabled.value = false;
      optionsYearDisabled.value = false;
      optionsSicksDisabled.value = false;
      optionsAcronymDisabled.value = false;
    }

    return {
      optionsAcronym,
      valueAcronym,
      optionsAcronymDisabled,
      optionsSick,
      optionsSicksDisabled,
      valueSick,
      optionsYear,
      optionsYearDisabled,
      valueYear,
      handleUpdateValueSick,
      handleUpdateValueAcronym,
      handleUpdateValueYear,
      loading,
      playMap,
      yearMapElement,
      buttonPlayDisabled
    };
  },
  template: `
    <NCard class="test" title="Mapa">
      <template #header-extra>
        <div class="container-input-card">
          <NSelect
            v-model:value="valueSick"
            filterable
            :options="optionsSick"
            style="width: 130px"
            placeholder="Doença"
            @update:value="handleUpdateValueSick"
            :disabled="optionsSicksDisabled"
          />
          <NSelect
            v-model:value="valueAcronym"
            filterable
            :options="optionsAcronym"
            style="width: 70px"
            placeholder="Sigla"
            @update:value="handleUpdateValueAcronym"
            :disabled="optionsAcronymDisabled"
          />
          <NSelect
            v-model:value="valueYear"
            filterable
            :options="optionsYear"
            style="width: 80px"
            placeholder="Ano"
            @update:value="handleUpdateValueYear"
            :disabled="optionsYearDisabled"
          />
          <NButton :disabled="buttonPlayDisabled" @click="playMap" title="Animação com os dados de todos os anos disponíveis no mapa">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-play-fill" viewBox="0 0 16 16">
              <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
          </NButton>
        </div>
      </template>
      <NSpin :show="loading" style="min-height: 337.6px;">
        <div id="map"></div>
        <div ref="yearMapElement" class="mct-canva-year"></div>
      </NSpin>
    </NCard>
  `
};
