import { init, classModule, propsModule, styleModule, eventListenersModule, h } from "snabbdom";
// import h from './h.js'

// 创建出patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// 创建虚拟节点
const myVNode1 = h("ul", { key: "ul" }, [
    h("li", { key: "A" }, "A"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "D" }, "D")
]);

// 创建虚拟节点
const myVNode2 = h("ul", { key: "ul" }, [
    h("li", { key: "E" }, "E"),
    h("li", { key: "A" }, "A"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "D" }, "D")
]);


// 虚拟节点上树
const container = document.getElementById("container");
patch(container, myVNode1);

const btn = document.getElementById("btn");
btn.onclick = patch.bind(this, myVNode1, myVNode2);
