import { ref } from "vue/dist/vue.esm-bundler";
import { NCard, NCollapse, NCollapseItem, NInput, NInputGroup, NDataTable, NButton } from "naive-ui";

const createColumns = () => [
  {
    title: "Name",
    key: "name",
  },
  {
    type: "selection",
  },
];

const data = Array.from({ length: 46 }).map((_, index) => ({
  name: `State ${index}`,
}));

data.unshift({ name: "Todos os estados" });

export const collapsableSelect = {
  components:  {
    NCard,
    NCollapse,
    NCollapseItem,
    NInput,
    NDataTable,
    NInputGroup,
    NButton
  },
  setup () {
    const checkedRowKeysRef = ref([]);
    const compareRegioes = ref(true);
    const tipoDeDoses = ref(false);
    const handleItemHeaderClick = ({
      name,
      expanded
    }) => {
      if (name === "1") {
        compareRegioes.value = expanded ? true : false;
        tipoDeDoses.value = false;
      } else {
        compareRegioes.value = false;
        tipoDeDoses.value = expanded ? true : false;
      }
    }

    const clearCollapseTableSelections = () => {
      checkedRowKeysRef.value = [];
    }
    return {
      handleItemHeaderClick,
      compareRegioes,
      tipoDeDoses,
      createColumns,
      data,
      columns: createColumns(),
      checkedRowKeys: checkedRowKeysRef,
      rowKey: (row) => row.name,
      handleCheck(rowKeys, rowsValues, meta) {
        if (meta.action === "check" && meta.row.name === "Todos os estados") {
          checkedRowKeysRef.value = data.map(el => el.name);
        } else if (meta.action === "uncheck" && meta.row.name === "Todos os estados") {
          checkedRowKeysRef.value = [];
        } else {
          checkedRowKeysRef.value = rowKeys;
        }
      },
      clearCollapseTableSelections
    }
  },
  template: `
    <n-collapse default-expanded-names="1"  @item-header-click="handleItemHeaderClick" style="height:100%" accordion>
      <template #arrow><span></span></template>
      <n-collapse-item title="Compare Regiões" name="1">
        <template #header-extra>
          <span v-if="compareRegioes">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
          </span>
          <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
          </span>
        </template>
        <div style="min-height:100%">
          <n-input-group>
            <n-input placeholder="Buscar região">
              <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 12px" width="16" height="16" fill="#e96f5f" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </template>
            </n-input>
          </n-input-group>
          <n-data-table
            v-model:checked-row-keys="checkedRowKeys"
            class="collapse-table"
            :columns="columns"
            :data="data"
            :row-key="rowKey"
            :max-height="490"
            :bordered="false"
            :single-line="true"
            :single-column="true"
            :bottom-bordered="false"
            @update:checked-row-keys="handleCheck"
          />
        </div>
        <div style="display: flex; margin: 6px 0px;">
          <n-button
            :onClick="clearCollapseTableSelections"
            style="width: 100%; display: flex; justify-content: start" quaternary type="primary">
            <template #icon>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>
            </template>

            &nbsp;Limpar seleção
          </n-button>
        </div>
      </n-collapse-item>

      <n-collapse-item title="Filtre por tipo de dose" name="2">
        <template #header-extra>
          <span v-if="tipoDeDoses">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
          </span>
        </template>
        <div>Lorem Ipsum</div>
      </n-collapse-item>
    </n-collapse>
  `,
}
