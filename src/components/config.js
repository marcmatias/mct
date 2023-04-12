export const config = {
  components:  {
    "n-config-provider": naive.NConfigProvider,
    "n-button": naive.NButton
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
      ptBR: naive.ptBR,
      lightThemeOverrides,
    }
  },
  template: `
    <n-config-provider
      :locale="ptBR"
      :theme-overrides="lightThemeOverrides"
    >
      <slot />
    </n-config-provider>
  `,
}
