import flatpickr from "flatpickr";
import rangePlugin from "~/flatpickr/dist/plugins/rangePlugin";
import "~/flatpickr/dist/themes/light.css";

import "./styles/main.scss";

const widget = () => {
  const dateDepartInput = document.querySelector('[name="date-from"]');
  const dateReturnInput = document.querySelector('[name="date-to"]');
  flatpickr(dateDepartInput, {
    clickOpens: false,
    disableMobile: true,
    dateFormat: "d.m.Y",
    plugins: [new rangePlugin({ input: dateReturnInput })],
  });
};

export default widget;
