import { ref } from "vue/dist/vue.esm-bundler";
import { NCard, NCollapse, NCollapseItem } from "naive-ui";

export const collapsableSelect = {
  components:  {
    NCard,
    NCollapse,
    NCollapseItem
  },
  setup () {
    const compareRegioes = ref(true);
    const tipoDeDoses = ref(false);
    const handleItemHeaderClick = ({
      name,
      expanded
    }) => {
      if (name === "1") {
        compareRegioes.value = true;
        tipoDeDoses.value = false;
      } else {
        compareRegioes.value = false;
        tipoDeDoses.value = true;
      }
    }
    return {
      handleItemHeaderClick,
      compareRegioes,
      tipoDeDoses
    }
  },
  template: `
    <n-collapse default-expanded-names="1"  @item-header-click="handleItemHeaderClick" style="height:100%" accordion>
      <template #arrow><span></span></template>
      <n-collapse-item title="Compare Regiões" name="1">
        <template #header-extra>
          <span v-if="compareRegioes">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
          </span>
        </template>
        <div style="min-height:100%">good 1</div>
      </n-collapse-item>
      <n-collapse-item title="Test 2" name="2">
        <template #header-extra>
          <span v-if="tipoDeDoses">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
          </span>
        </template>
        <div>good 2</div>
      </n-collapse-item>
    </n-collapse>
  `,
}
