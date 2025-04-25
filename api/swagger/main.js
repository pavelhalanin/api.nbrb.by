class SwaggerUI__Helper {
  static getUrl() {
    const SELECT = document.getElementById("swagger_ui__select");
    const _URL = SELECT.value;
    return _URL;
  }

  static innerHtmlSwaggerUI() {
    try {
      const NO_CACHE_PREFIX = `?v=${new Date().toJSON().slice(0,19)}`;
      const _URL = SwaggerUI__Helper.getUrl() + NO_CACHE_PREFIX;
      window.ui = SwaggerUIBundle({
        url: _URL,
        dom_id: "#swagger-ui",
      });
    } catch (exception) {
      console.error(exception);
    }
  }
}

window.onload = () => {
  SwaggerUI__Helper.innerHtmlSwaggerUI();
};
