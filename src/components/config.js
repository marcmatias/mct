export const config = {
  components:  { 
    "n-config-provider": naive.NConfigProvider,
    "n-button": naive.NButton
  },
  setup () {
    let darkThemed = !window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = Vue.ref(null);

    const changeTheme = () => {
      darkThemed = !darkThemed;

      if (darkThemed) {
        theme.value = naive.darkTheme;
        document.querySelector("html").classList.add("dark");
        return;
      }
      theme.value = null;
      document.querySelector("html").classList.remove("dark");
    };

    const lightThemeOverrides = {
      common: {
        primaryColor: "#2563eb",
        primaryColorHover: "#1d4ed8"
      }
    };

    const darkThemeOverrides = {
      common: {
        primaryColor: "#38bdf8",
        primaryColorHover: "#93c5fd"
      }
    };

    Vue.onBeforeMount(() => {
      changeTheme();
    });

    return {
      // Config-provider setup
      ptBR: naive.ptBR,
      lightThemeOverrides,
      darkThemeOverrides,
      changeTheme,
      theme
    }
  },
  template: `
    <n-config-provider
      :locale="ptBR"
      :theme="theme"
      :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
    >
      <div class="container-elements container-elements--theme">
        <n-button @click="changeTheme" tertiary round>
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-circle-half"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
          </svg>
        </n-button>
      </div>
      <slot />
    </n-config-provider>
  `,
}
