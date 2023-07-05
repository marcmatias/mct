import { ref } from "vue/dist/vue.esm-bundler";
import { NSelect, NFormItem } from "naive-ui";

export const subSelect = {
  components:  {
    NSelect,
    NFormItem
  },
  props: {
    api: {
      type: String,
      required: true
    },
  },
  setup() {
    const sicks = ref(
      [
        { label: 'Poliomielite', value: 'Poliomielite' },
        { label: 'COVID-19', value: 'COVID-19' },
      ]
    );
    const sick = ref(null);
    const types = ref([{ label: 'Cobertura Vacinal', value: 'Cobertura Vacinal' }]);
    const type = ref(null);
    const locals = ref([{ label: 'Estados', value: 'BR' }]);
    const local = ref(null);
    const periods = ref([{ label: 'Todos os Anos', value: 'Todos os Anos' }]);
    const period = ref(null);
    const granuralities = ref([{ label: 'Estados', value: 'Estados' }]);
    const granurality = ref(null);

    return {
      sicks,
      sick,
      type,
      types,
      local,
      locals,
      period,
      periods,
      granurality,
      granuralities,
    };
  },
  template: `
    <section style="display:flex; gap: 14px">
      <n-form-item label="Doença">
        <n-select
          v-model:value="sick"
          :options="sicks"
          style="width: 200px"
          max-tag-count="responsive"
          placeholder="Selecione doença"
          multiple
        />
      </n-form-item>
      <n-form-item label="Tipo de dado">
        <n-select
          v-model:value="type"
          :options="types"
          style="width: 200px"
          placeholder="Selecione Tipo de dado"
          multiple
        />
      </n-form-item>
      <n-form-item label="Estados">
        <n-select
          v-model:value="local"
          :options="locals"
          style="width: 200px"
          placeholder="Selecione Estado"
          multiple
        />
      </n-form-item>
      <n-form-item label="Abrangência temporal">
        <n-select
          v-model:value="period"
          :options="periods"
          style="width: 200px"
          placeholder="Selecione Abrangência"
          multiple
        />
      </n-form-item>
      <n-form-item label="Grânularidade">
        <n-select
          v-model:value="granurality"
          :options="granuralities"
          style="width: 200px"
          placeholder="Selecione Grânularidade"
          multiple
        />
      </n-form-item>
    </section>
  `,
}
