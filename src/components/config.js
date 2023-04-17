import { NConfigProvider, ptBR } from "naive-ui";

export const config = {
  components:  {
    NConfigProvider,
  },
  setup () {
    const lightThemeOverrides = {
      common: {
        primaryColor: "#2563eb",
        primaryColorHover: "#1d4ed8"
      }
    };

    return {
      // Config-provider setup
      ptBR: ptBR,
      lightThemeOverrides,
    }
  },
  template: `
    <NConfigProvider
      :locale="ptBR"
      :theme-overrides="lightThemeOverrides"
    >
      <slot />
    </NConfigProvider>
  `,
}
