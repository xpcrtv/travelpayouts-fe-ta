import flatpickr from "flatpickr";
import rangePlugin from "~/flatpickr/dist/plugins/rangePlugin";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import "~/flatpickr/dist/themes/light.css";

import i18next from "i18next";
import en from "./i18n/en.json";
import ru from "./i18n/ru.json";

import "./styles/main.scss";
import widgetHtml from "./template/widget.tpl.html";

import { getParamsFromHref, getOptions, setTheme, getLang } from "./helpers";
import config from "./config";

// fill widget with intl text
const fillWidgetWithText = (intlLib, widget) => {
  const title = widget.querySelector(".widget_title");
  const description = widget.querySelector(".widget_description");
  const searchBtn = widget.querySelector(".widget_form_btn");
  const departPlaceholder = widget.querySelector('[name="date-from"]');
  const returnPlaceholder = widget.querySelector('[name="date-to"]');

  title.innerText = intlLib("title");
  description.innerText = intlLib("description");
  searchBtn.innerText = intlLib("searchBtn");
  departPlaceholder.setAttribute("placeholder", intlLib("departPlaceholder"));
  returnPlaceholder.setAttribute("placeholder", intlLib("returnPlaceholder"));
};
// create widget html
const createWidgetElement = (widgetHtml) => {
  const widgetEl = document.createElement("article");
  widgetEl.classList.add("widget");
  widgetEl.innerHTML = widgetHtml;
  return widgetEl;
};

// datelicker init
const datepickerInit = (widget, lang) => {
  const dateDepartInput = widget.querySelector('[name="date-from"]');
  const dateReturnInput = widget.querySelector('[name="date-to"]');
  flatpickr(dateDepartInput, {
    clickOpens: false,
    disableMobile: true,
    dateFormat: "d.m.Y",
    locale: lang,
    plugins: [new rangePlugin({ input: dateReturnInput })],
  });
};

// set handle for form
const setFormAction = (widget) => {
  const form = widget.querySelector(".widget_form");
  const formSubmitAction = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const departTime = formData.get("date-from");
    const returnTime = formData.get("date-to");
    if (departTime && returnTime) {
      alert(`${departTime} => ${returnTime}`);
    } else {
      alert("some field is empty");
    }
  };
  form.addEventListener("submit", formSubmitAction);
};

// widget init
const widget = () => {
  const root = document.querySelector("script#widget");
  const href = root.getAttribute("src");
  const hrefParams = getParamsFromHref(href);
  const options = getOptions(config, hrefParams);
  const lang = getLang(options);
  const widgetEl = createWidgetElement(widgetHtml);
  setTheme(options);
  setFormAction(widgetEl);
  datepickerInit(widgetEl, lang);
  i18next.init(
    {
      lng: lang,
      resources: {
        en,
        ru,
      },
    },
    (err, intlLib) => {
      if (err) {
        console.log(err);
      }
      fillWidgetWithText(intlLib, widgetEl);
      root.replaceWith(widgetEl);
    }
  );
};

export default widget;
