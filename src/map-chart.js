export class MapChart {

  constructor({
    element,
    map,
    datasetCities,
    cities,
    datasetStates,
    states,
    legendTitle,
    legendSource
  }) {
    this.element = typeof element === "string" ?
      element.querySelector(element) : element;
    this.map = map;
    this.datasetCities = datasetCities;
    this.cities = cities;
    this.datasetStates = datasetStates;
    this.states = states;
    this.legendTitle = legendTitle;
    this.legendSource = legendSource;

    this.init();
  }

  init() {
    const self = this;

    if (self.datasetCities) {
      self.render();
      self.loadMapState();
      return;
    }

    self.render();
    self.loadMapNation();
  }

  applyMap(map) {
    const self = this;

    const svgContainer = self.element.querySelector("#canvas");
    svgContainer.innerHTML = map;

    const svgElement = svgContainer.querySelector("svg");
    svgElement.style.maxWidth = "100%";
    svgElement.style.height = "100%";
    svgElement.style.margin = "auto";
    svgElement.style.display = "block";
  }

  setData(
    {
      row = 0,
      datasetStates,
      contentData
    } = {}
  ) {
    const self = this;
    // Querying map country states setting eventListener
    for (const path of self.element.querySelectorAll('#canvas svg path')) {
      const content = contentData ? contentData[path.id] : [];
      const dataset = self.findElement(datasetStates, content);

      if (!dataset || !dataset.data[row]) {
        path.style.fill = "#c7c7c7";
        continue;
      }
      const result = dataset.data[row];
      const resultColor = self.getColor(result);
      const tooltip = self.element.querySelector(".mct-tooltip")

      path.addEventListener("mousemove", (event) => {
        self.tooltipPosition(event, tooltip);
      });
      path.addEventListener("mouseover", (event) => {
        path.style.transition = "all 0.3s";
        path.style.fill = "gold";
        tooltip.innerHTML = `
          <article>
            <div class="mct-tooltip__title">${content.name}</div>
            <div class="mct-tooltip__result">${result + " %"}</div>
          </article>`;
        path.style.opacity = "95%";
        tooltip.style.display = "block";
        self.tooltipPosition(event, tooltip);
      });
      path.addEventListener("mouseleave", () => {
        path.style.fill = resultColor;
        tooltip.style.display = "none";
      });

      path.style.fill = resultColor;
    };

    if (self.legendTitle) {
      self.element.querySelector(".mct-legend-text").innerHTML = self.legendTitle;
    }
    if (self.legendSource) {
      self.element.querySelector(".mct-legend-source").innerHTML = "Fonte: " + self.legendSource;
    }
  }

  tooltipPosition(event, tooltip) {
    let compensateLeft = 60;
    let compensateTop = 200;

    if (window.innerWidth < "800") {
      compensateLeft = 10;
      compensateTop = 350;
    }
    tooltip.style.left = event.clientX - compensateLeft + window.scrollX + "px";
    tooltip.style.top = event.clientY - compensateTop + window.scrollY + "px";
  }
  findElement(arr, name) {
    for (let i = 0; i < arr.length; i++) {
      const object = arr[i];
      const labelLowerCase = object.label.toLowerCase();

      if(!name) {
        continue;
      }

      const nameAcronymLowerCase = name.acronym ? name.acronym.toLowerCase() : "";
      const nameNameLowerCase = name.name ? name.name.toLowerCase() : "";

      const labelWithoutSpaces = labelLowerCase.replaceAll(" ", "");

      if (
        labelLowerCase == nameAcronymLowerCase ||
        labelWithoutSpaces == nameNameLowerCase.replaceAll(" ", "") ||
        labelLowerCase == nameNameLowerCase ||
        labelWithoutSpaces == nameNameLowerCase.replaceAll(" ", "")
      ) {
        return object;
      }
    }

    return;
  }

  loadMapState () {
    const self = this;
    let result = [];

    if (self.datasetCities) {
      result =
        Object.entries(
          self.datasetCities
        ).map(([key, val]) =>
          {
            return {
              label: key,
              data: [val]
            }
          }
        );
    }

    self.applyMap(self.map);

    self.setData({
      datasetStates: result,
      contentData: self.cities
    })
  }

  loadMapNation() {
    const self = this;
    let result = [];

    if (self.datasetStates) {
      result =
        Object.entries(
          self.datasetStates
        ).map(([key, val]) =>
          {
            return {
              label: key,
              data: [val]
            }
          }
        );
    }

    self.applyMap(self.map);
    self.setData({
      datasetStates: result,
      contentData: self.states
    })
  }

  getColor(percentage) {
    const self = this;

    if (percentage < 20) {
      // First range: from 0 to 19
      const initialColor = [178, 203, 176];
      const finalColor = [116, 177, 182];
      const intervalPercentage = percentage / 20;
      return self.interpolateColors(initialColor, finalColor, intervalPercentage);
    } else if (percentage < 40) {
      // Second range: from 20 to 39
      const initialColor = [116, 177, 182];
      const finalColor = [43, 115, 177];
      const intervalPercentage = (percentage - 20) / 20;
      return self.interpolateColors(initialColor, finalColor, intervalPercentage);
    } else if (percentage < 60) {
      // Third range: from 40 to 59
      const initialColor = [43, 115, 177];
      const finalColor = [23, 93, 137];
      const intervalPercentage = (percentage - 40) / 20;
      return self.interpolateColors(initialColor, finalColor, intervalPercentage);
    } else if (percentage < 80) {
      // Fourth range: from 60 to 79
      const initialColor = [23, 93, 137];
      const finalColor = [47, 56, 126];
      const intervalPercentage = (percentage - 60) / 20;
      return self.interpolateColors(initialColor, finalColor, intervalPercentage);
    } else {
      // Fifth range: from 80 to 100
      const initialColor = [47, 56, 126];
      const finalColor = [13, 0, 161];
      const intervalPercentage = (percentage - 80) / 20;
      return self.interpolateColors(initialColor, finalColor, intervalPercentage);
    }
  }

  interpolateColors(initialColor, finalColor, intervalPercentage) {
    const r = Math.round(initialColor[0] + (finalColor[0] - initialColor[0]) * intervalPercentage);
    const g = Math.round(initialColor[1] + (finalColor[1] - initialColor[1]) * intervalPercentage);
    const b = Math.round(initialColor[2] + (finalColor[2] - initialColor[2]) * intervalPercentage);
    return `rgb(${r}, ${g}, ${b})`;
  }


  render () {
    const self = this;

    const map = `
      <section class="mct__canva-section">
        <div id="canvas" class="mct-canva">
          <div class="spinner-container">
            <div id="spinner" class="spinner"></div>
          </div>
        </div>
        <div class="mct-legend">
          <div style="display:flex; gap: 4px;">
            <div class="mct-legend__gradient"></div>
            <div class="mct-legend__content">
              <div class="mct-legend-top">100%</div>
              <div class="mct-legend-middle">50%</div>
              <div class="mct-legend-base">0%</div>
            </div>
          </div>
          <div class="mct-legend-text"></div>
          <div class="mct-legend-source"></div>
        </div>
      </section>
      <div class="mct-tooltip"></div>
    `;

    self.element.innerHTML = map;
  }
}
