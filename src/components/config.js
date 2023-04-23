import { NConfigProvider, ptBR } from "naive-ui";

export const config = {
  components:  {
    NConfigProvider,
  },
  setup () {
    const lightThemeOverrides = {
      common: {
        primaryColor: "#e96f5f",
        primaryColorHover: "#e96f5f",
      },
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
