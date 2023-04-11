const counter = {
  components: { 'n-button': naive.NButton },
  setup() {
    const count = Vue.ref(0);
    return {
      count
    }
  },
  template: `
   <n-button @click="count++">
      You clicked me {{ count }} times.
   </n-button>
  `,
}
