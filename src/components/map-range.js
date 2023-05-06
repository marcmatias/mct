import { ref, onMounted, watchEffect } from "vue/dist/vue.esm-bundler";
import { NCard } from "naive-ui";

export const mapRange = {
  components:  { NCard },
  props: {
    mapData: {
      type: Array,
      required: true
    },
  },
  setup(props) {
    const datasetValues = ref([]);

    const handleMapChange = (data) => {
      const svg = document.querySelector('#mapRangeSVG');
      if(!data.length || !svg) { return; }
      svg.setAttribute("height", 0);
      svg.setAttribute("height", svg.parentNode.offsetHeight - 70);
      const circles = document.querySelectorAll("circle");
      circles.forEach(circle => circle.parentNode.removeChild(circle));
      const svgHeight = svg.getAttribute("height");
      for (let i = 0; i < data.length; i++) {
        const samePercentCircle = [...svg.querySelectorAll("circle")].find(x => x.dataset.value === data[i].data + "%");
        if(samePercentCircle) {
          samePercentCircle.setAttribute("data-title", `[ ${samePercentCircle.dataset.title}, ${data[i].name} ]`);
          continue;
        }
        const y = svgHeight - (data[i].data /100 *svgHeight);
        const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute("cx",20);
        circle.setAttribute("cy",y);
        circle.setAttribute("r",6);
        circle.setAttribute("fill", data[i].color);
        circle.setAttribute("data-title", data[i].name);
        circle.setAttribute("data-value", data[i].data + "%");
        circle.setAttribute("opacity", 0.8);
        svg.appendChild(circle);
      }

      svg.addEventListener('mousemove', (e) => {
        const target = e.target;
        if (target.tagName === 'circle') {
          const parentElement = target.parentNode;
          parentElement.appendChild(target);
          showTooltip(e, target.getAttribute('data-title'), target.getAttribute('data-value') );
          return;
        }
        hideTooltip();
      }, false);

      svg.addEventListener("mouseleave", () => {
        hideTooltip();
      });

    }

    const showTooltip = (evt, text, value) => {
      let compensateLeft = 60;
      let compensateTop = 120;

      if (window.innerWidth < "800") {
        compensateLeft = -10;
        compensateTop = 110;
      }
      const tooltip = document.querySelector(".tooltip");
      tooltip.innerHTML = `<span class="mct-tooltip__title">${text}</span> <br>
          <span class="mct-tooltip__result">${value}</span>`;
      tooltip.style.display = "block";
      tooltip.style.left = evt.pageX - compensateLeft + 'px';
      tooltip.style.top = evt.pageY - compensateTop + 'px';
    }

    const hideTooltip = () => {
      const tooltip = document.querySelector(".tooltip");
      tooltip.style.display = "none";
    }

    onMounted(() => {
      handleMapChange(datasetValues.value);
    });

    watchEffect(() => {
      datasetValues.value = props.mapData;
      handleMapChange(datasetValues.value);
    });

    const getWindowWidth = () => {
      handleMapChange(datasetValues.value);
    };
    window.addEventListener('resize', getWindowWidth);
  },
  template: `
    <n-card
      style="max-width: 40px"
      content-style="padding: 0px; display: flex; flex-direction: column; align-items: center; gap: 12px; font-size: 12px;"
    >
      <span style="padding: 12px 0px 0px">100%</span>
      <svg id="mapRangeSVG" width="40" style="overflow: visible">
        <line x1="20" y1="0" x2="20" y2="100%" stroke="gray" stroke-width="0.6"></line>
      </svg>
      <span style="padding: 0px 0px 12px">0%</span>
    </n-card>
    <div class="tooltip mct-tooltip"></div>
  `,
}
