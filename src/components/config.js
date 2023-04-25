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
      DataTable: {
        thColorHover: "#e96f5f",
        thColor: "#ececec",
        tdColorStriped: "#ececec",
        thFontWeight:  "500",
        thIconColor: "#e96f5f",
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
