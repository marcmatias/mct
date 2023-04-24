import { ref } from "vue/dist/vue.esm-bundler";
import { NButton, NIcon, NModal,  } from "naive-ui";

export const subButtons = {
  components:  {
    NButton,
    NIcon,
    NModal
  },
  setup() {
    return {
      bodyStyle: {
        width: '600px'
      },
      segmented: {
        content: 'soft',
        footer: 'soft'
      },
      showModal: ref(false)
    };
  },
  props: {
    api: {
      type: String,
      required: true

    },
  },
  template: `
    <section style="display:flex; justify-content: space-between; align-items:center; margin-top: 18px; margin-bottom: 12px">
      <span style="color:gray; font-size:14px; font-weight: 400">Fonte: Programa Nacional de imunização (PNI), disponibilizadas no TabNet-DATASUS</span>
      <div style="display: flex; gap: 8px;">
        <n-button quaternary type="primary" style="font-weight: 500">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
            </svg>
          </n-icon>
        </template>
        Sobre a vacina
        </n-button>

        <n-button quaternary type="primary" style="font-weight: 500">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
          </n-icon>
        </template>
        Glossário
        </n-button>

        <n-button quaternary type="primary" style="font-weight: 500" @click="showModal = true">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
          </n-icon>
        </template>
        Download
        </n-button>

        <n-button quaternary type="primary" style="font-weight: 500">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
            </svg>
          </n-icon>
        </template>
        Compartilhar
        </n-button>
      </div>
      <n-modal
        v-model:show="showModal"
        class="custom-card"
        preset="card"
        :style="bodyStyle"
        title="Modal"
        :bordered="false"
        size="large"
        :segmented="segmented"
      >
        <template #header-extra>
          Content extra.
        </template>
        Content
        <template #footer>
          Footer
        </template>
      </n-modal>
    </section>
  `,
}
