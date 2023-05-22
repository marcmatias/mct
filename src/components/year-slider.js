import { ref } from "vue/dist/vue.esm-bundler";
import { NCard, NSlider, NSpace, NButton, NIconWrapper } from "naive-ui";

export const yearSlider = {
  components:  {
    NCard,
    NSlider,
    NSpace,
    NButton,
    NIconWrapper
  },
  props: {},
  setup () {
    return {
      value: ref(0),
      min: ref(2019),
      max: ref(2023)
    }
  },
  template: `
    <section style="display: flex; gap: 14px; margin-top: 24px; align-items: center;">
      <n-button type="primary" circle>
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
          </svg>
        </template>
      </n-button>
      <span style="white-space:nowrap; padding: 0px 6px; font-size: 14px">{{ min }}</span>
      <n-slider v-model:value="value" :min="min" :max="max" :tooltip="true">
        <template #thumb>
          <n-icon-wrapper :size="12" :border-radius="12">
          </n-icon-wrapper>
        </template>
      </n-slider>
      <span style="white-space:nowrap; padding: 0px 6px; font-size: 14px">{{ max }}</span>
    </section>
  `,
}
