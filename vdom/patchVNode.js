import createElement from "./createElement.js";
import updateChildren from "./updateChildren.js";

export default function patchVNode(oldVNode, newVNode) {
    // 新旧节点elm赋值，便于DOM操作
    const elm = (newVNode.elm = oldVNode.elm);
    // 判断新旧vnode是否是同一个对象（引用地址相同）
    if (oldVNode === newVNode) return;
    // 判断新vnode有无text属性
    if (newVNode.text !== undefined && !newVNode.children?.length) {
        console.log("新vnode有text属性");
        if (newVNode.text !== oldVNode.text) {
            // 新旧vnode的text不同，直接让新text替换DOM中的内容，children直接消失
            elm.innerText = newVNode.text;
        }
    } else {
        console.log("新vnode没有text属性");
        // 判断旧vnode有没有children
        const fragment = document.createDocumentFragment();
        if (oldVNode.children?.length) {
            // oldVNode和newVNode均有children，最复杂的情况
            updateChildren(elm, oldVNode.children, newVNode.children);
        } else {
            // 旧vnode只有text，没有children，新vnode有children
            elm.innerHTML = "";
            // 遍历新vnode的子节点，创建dom上树
            for (let i = 0; i < newVNode.children.length; i++) {
                fragment.appendChild(createElement(newVNode.children[i]));
            }
            elm.appendChild(fragment);
        }
    }
};
