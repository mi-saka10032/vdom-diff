import h from "./h.js";
import patch from "./patch.js";

const vdom1 = h("ul", {}, [
    h("li", { key: "A" }, "A"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "D" }, "D"),
    h("li", { key: "E" }, "E"),
]);
const container = document.getElementById("container");
patch(container, vdom1);

const vdom2 = h("ul", {}, [
    h("li", { key: "E" }, "E"),
    h("li", { key: "Q" }, "Q"),
    h("li", { key: "D" }, "D"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "A" }, "A"),
]);

const vdom3 = h("ul", {}, [
    h("li", { key: "Q" }, "Q"),
    h("li", { key: "T" }, "T"),
    h("li", { key: "E" }, "E"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "A" }, "A"),
    h("li", { key: "D" }, "D"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "V" }, "V"),
]);

const btn = document.getElementById("btn");
btn.onclick = patch.bind(this, vdom1, vdom2);

const btn2 = document.getElementById("btn2");
btn2.onclick = patch.bind(this, vdom2, vdom3);
