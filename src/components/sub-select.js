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
    const sicks = ref([{ label: 'Poliomielite', value: 'Poliomielite' }]);
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
          :value="sick"
          :options="sicks"
          class="select"
          style="width: 200px"
          placeholder="Selecione doença"
        />
      </n-form-item>
      <n-form-item label="Tipo de dado">
        <n-select
          :value="type"
          :options="types"
          class="select"
          style="width: 200px"
          placeholder="Selecione Tipo de dado"
        />
      </n-form-item>
      <n-form-item label="Estados">
        <n-select
          :value="local"
          :options="locals"
          class="select"
          style="width: 200px"
          placeholder="Selecione Estado"
        />
      </n-form-item>
      <n-form-item label="Abrangência temporal">
        <n-select
          :value="period"
          :options="periods"
          class="select"
          style="width: 200px"
          placeholder="Selecione Abrangência"
        />
      </n-form-item>
      <n-form-item label="Grânularidade">
        <n-select
          :value="granurality"
          :options="granuralities"
          class="select"
          style="width: 200px"
          placeholder="Selecione Grânularidade"
        />
      </n-form-item>
    </section>
  `,
}
