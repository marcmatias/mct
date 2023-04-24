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
    const sicks = ref({ label: 'Poliomielite', value: 'Poliomielite' });
    const sick = ref('Poliomielite');
    const types = ref({ label: 'Cobertura Vacinal', value: 'Cobertura Vacinal' });
    const type = ref('Cobertura Vacinal');
    const locals = ref({ label: 'Estados', value: 'BR' });
    const local = ref('BR');
    const periods = ref({ label: 'Todos os Anos', value: 'Todos os Anos' });
    const period = ref('Todos os Anos');

    return { 
      sicks,
      sick,
      type,
      types,
      local,
      locals,
      period,
      periods
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
        />
      </n-form-item>
      <n-form-item label="Tipo de dado">
        <n-select
          :value="type"
          :options="types"
          class="select" 
          style="width: 200px"
        />
      </n-form-item>
      <n-form-item label="Cobertura geográfica">
        <n-select
          :value="local"
          :options="locals"
          class="select" 
          style="width: 200px"
        />
      </n-form-item>
      <n-form-item label="Período disponível">
        <n-select
          :value="period"
          :options="periods"
          class="select" 
          style="width: 200px"
        />
      </n-form-item>
    </section>
  `,
}
