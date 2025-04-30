class Tabs_Helper {
  static innerHtml_tabs() {
    try {
      const DIV = document.getElementById("root-tabs");

      const ARRAY = [
        { id: 1, name: "Главная" },
        { id: 2, name: "Документация API" },
        { id: 3, name: "Конвертер валют" },
      ];

      DIV.innerHTML = `
                <div class="container">
                    <ul class="nav nav-tabs mt-2 mb-2">
                        ${ARRAY.map((e) => {
                          return `
                                <li class="nav-item">
                                    <span
                                        class="nav-link"
                                        custom__tab_id="${e.id}"
                                        onclick="Tabs_Helper.selectTab_byTabId('${e.id}')"
                                    >
                                        ${e.name}
                                    </span>
                                </li>
                            `;
                        }).join("")}
                    </ul>
                </div>
            `;
    } catch (exception) {
      console.error(exception);
    }
  }

  static selectTab_byTabId(tabId) {
    try {
      const DIV = document.getElementById("root-tabs");
      const SPAN_ARRAY = DIV.querySelectorAll("span");

      for (let i = 0; i < SPAN_ARRAY.length; ++i) {
        SPAN_ARRAY[i].classList.remove("active");
      }

      for (let i = 0; i < SPAN_ARRAY.length; ++i) {
        const CURRENT = SPAN_ARRAY[i];

        let isTabFound = false;
        const TAB_ID_1 = `${CURRENT.getAttribute("custom__tab_id")}`;
        const TAB_ID_2 = `${tabId}`;
        const IS_EQUALS = TAB_ID_1.localeCompare(TAB_ID_2) == 0;
        if (IS_EQUALS) {
          CURRENT.classList.add("active");
          isTabFound = true;
          break;
        }
      }

      Tabs_Helper.innerHtml_content_byTabId(tabId);
    } catch (exception) {
      console.error(exception);
    }
  }

  static innerHtml_content_byTabId(tabId) {
    try {
      const DIV = document.getElementById("root-content");
      switch (tabId) {
        case "2":
          DIV.innerHTML = `
                        <div class="container">
                            <label for="swagger_ui__select" class="form-label">Конфиг</label>
                            <select id="swagger_ui__select" onchange="SwaggerUI_Helper.innerHtmlSwaggerUI()" class="form-select">
                                <option>https://pavelhalanin.github.io/api.nbrb.by/assets/swagger/api.nbrb.by.json</option>    
                                <option>assets/swagger/api.nbrb.by.json</option>
                                <option>https://petstore3.swagger.io/api/v3/openapi.json</option>
                            </select>
                            <div id="swagger-ui"></div>
                        </div>
                    `;
          SwaggerUI_Helper.innerHtmlSwaggerUI();
          break;

        case "3":
          DIV.innerHTML = `
                        <div class="container">
                            <div class="row mt-2">
                                <div class="col-6">
                                    <input
                                        type="number"
                                        class="form-control border-primary"
                                        id="nbrbby_input"
                                        value="1"
                                        step="0.01"
                                        min="0"
                                        oninput="ApiNbrbBy_Helper.onChange()"
                                    />
                                </div>
                                <div class="col-6">
                                    <select
                                        class="form-select border-primary"
                                        id="nbrbby_select"
                                        onchange="ApiNbrbBy_Helper.onChange()"
                                    ></select>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-6">
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="nbrbby_output"
                                        step="0.01"
                                        min="0"
                                        readonly
                                    />
                                </div>
                                <div class="col-6">
                                    <input
                                        type="text"
                                        class="form-control col-6"
                                        value="BYN - Белорусский рубль"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                    `;
          ApiNbrbBy_Helper.setSelect();
          break;

        case "1":
        default:
          DIV.innerHTML = `
                        <div class="container">
                            <p>НБРБ - Национальный Банк Республики Беларусь.</p>
                            <p>
                                На оффициальном сайте НБРБ предосталвена документация API в текстовом виде:
                                <a
                                    href="https://www.nbrb.by/apihelp/exrates"
                                    target="_blank"
                                >
                                    https://www.nbrb.by/apihelp/exrates
                                </a>
                            </p>
                            <p>
                                В мире IT принято документировать API в SwaggerUI.
                                Результат смотри во вкладке "Документация API".
                            </p>
                        </div>
                    `;
          break;
      }
    } catch (exception) {
      console.error(exception);
    }
  }
}
