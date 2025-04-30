class ApiNbrbBy_Helper {
  static onChange() {
    try {
      const INPUT = document.getElementById("nbrbby_input");
      const OUTPUT = document.getElementById("nbrbby_output");
      const SELECT = document.getElementById("nbrbby_select");

      const SELECTED_OPTION = SELECT.options[SELECT.selectedIndex];
      const OFFICIAL_RATE = SELECTED_OPTION.getAttribute(
        "custom__cur_officialrate"
      );
      const SCALE = SELECTED_OPTION.getAttribute("custom__cur_scale");

      // SCALE BYN ~ OFFICIAL_RATE USD
      // INPUT BYN ~ OUTPUT USD
      OUTPUT.value = (INPUT.value * OFFICIAL_RATE) / SCALE;
    } catch (exception) {
      console.error(exception);
    }
  }

  static async setSelect() {
    try {
      const ARRAY = await ApiNbrbBy_Helper.fetchJson();
      const SELECT = document.getElementById("nbrbby_select");

      let html = "";
      for (let i = 0; i < ARRAY.length; ++i) {
        const CURRENT = ARRAY[i];

        const TITLE = [
          `${CURRENT.Cur_Scale} ${CURRENT.Cur_Abbreviation} = ${CURRENT.Cur_OfficialRate} BYN`,
          ``,
          `Код валюты: ${CURRENT.Cur_Abbreviation}`,
          `Наименование валюты: ${CURRENT.Cur_Name}`,
        ]
          .join("\n")
          .replace(/"/g, "'");

        html += `
                    <option
                        value="${CURRENT.Cur_ID}"
                        title="${TITLE}"
                        custom__Cur_ID="${CURRENT.Cur_ID}"
                        custom__Date="${CURRENT.Date}"
                        custom__Cur_Abbreviation="${CURRENT.Cur_Abbreviation}"
                        custom__Cur_Scale="${CURRENT.Cur_Scale}"
                        custom__Cur_Name="${CURRENT.Cur_Name}"
                        custom__Cur_OfficialRate="${CURRENT.Cur_OfficialRate}"
                    >
                        ${CURRENT.Cur_Abbreviation} - ${CURRENT.Cur_Name}
                    </option>
                `;
      }

      SELECT.innerHTML = html;
      ApiNbrbBy_Helper.onChange();
    } catch (exception) {
      console.error(exception);
    }
  }

  static async fetchJson() {
    const _URL = "https://api.nbrb.by/exrates/rates?periodicity=0";

    const RESPONSE = await fetch(_URL);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS != 200) {
      throw new Error(`HTTP status ${HTTP_STATUS}`);
    }

    const _JSON = await RESPONSE.json();
    return _JSON;
  }
}
