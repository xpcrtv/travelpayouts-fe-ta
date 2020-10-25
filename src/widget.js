import flatpickr from "flatpickr";
import rangePlugin from "~/flatpickr/dist/plugins/rangePlugin";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import "~/flatpickr/dist/themes/light.css";

import i18next from "i18next";
import en from "./i18n/en.json";
import ru from "./i18n/ru.json";

import "./styles/main.scss";

const widget = () => {
  i18next.init(
    {
      lng: "ru",
      resources: {
        en,
        ru,
      },
    },
    (err, intlLib) => {
      if (err) {
        console.log(err);
      }

      const title = document.querySelector(".widget_title");
      const description = document.querySelector(".widget_description");
      const searchBtn = document.querySelector(".widget_form_btn");
      const departPlaceholder = document.querySelector('[name="date-from"]');
      const returnPlaceholder = document.querySelector('[name="date-to"]');

      title.innerText = intlLib("title");
      description.innerText = intlLib("description");
      searchBtn.innerText = intlLib("searchBtn");
      departPlaceholder.setAttribute(
        "placeholder",
        intlLib("departPlaceholder")
      );
      returnPlaceholder.setAttribute(
        "placeholder",
        intlLib("returnPlaceholder")
      );

      const dateDepartInput = document.querySelector('[name="date-from"]');
      const dateReturnInput = document.querySelector('[name="date-to"]');
      flatpickr(dateDepartInput, {
        clickOpens: false,
        disableMobile: true,
        dateFormat: "d.m.Y",
        locale: "ru",
        plugins: [new rangePlugin({ input: dateReturnInput })],
      });
    }
  );
};

export default widget;
