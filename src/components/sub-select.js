import { NSelect, NFormItem, NDatePicker } from "naive-ui";

export const subSelect = {
  components:  {
    NSelect,
    NFormItem,
    NDatePicker
  },
  props: {
    api: {
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
    form: {
      type: Object,
      required: true,
    }
  },
  // Popular selects com options vindos da api
  // Se usuário muda para imunizante atualiza dados buscando de imunizantes nos selects necessários
  // Se usuário muda para gráfico ou para tabela ou volta para mapa, tipo de select muda para alguns casos pode ser multi ou simples
  template: `
    <section style="display:flex; gap: 14px">
      <n-form-item label="Doença">
        <n-select
          v-model:value="form.sick"
          :options="form.sicks"
          style="width: 200px"
          max-tag-count="responsive"
          placeholder="Selecione doença"
        />
      </n-form-item>
      <n-form-item label="Tipo de dado">
        <n-select
          v-model:value="form.type"
          :options="form.types"
          style="width: 200px"
          placeholder="Selecione Tipo de dado"
          multiple
        />
      </n-form-item>
      <n-form-item label="Estados">
        <n-select
          v-model:value="form.local"
          :options="form.locals"
          style="width: 200px"
          placeholder="Selecione Estado"
          multiple
        />
      </n-form-item>
      <n-form-item label="Abrangência temporal" style="width: 200px">
        <n-date-picker
         :update-value-on-close="true"
         v-model:value="form.periods"
         type="yearrange"
         clearable 
        />
      </n-form-item>
      <n-form-item label="Granularidade">
        <n-select
          v-model:value="form.granurality"
          :options="form.granuralities"
          style="width: 200px"
          placeholder="Selecione Granularidade"
          multiple
        />
      </n-form-item>
    </section>
  `,
}
