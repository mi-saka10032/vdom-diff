import vnode from "./vnode.js";
import createElement from "./createElement.js";
import patchVNode from "./patchVNode.js";

export default function patch(oldVNode, newVNode) {
    // 判断传入的第一个参数，是DOM节点还是虚拟节点？
    if (oldVNode instanceof HTMLElement) {
        // 传入的第一个参数 oldVNode 是DOM节点，需要包装虚拟节点
        oldVNode = vnode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode);
    }
    // 判断oldVNode和newVNode是不是同一个节点
    if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
        console.log("是同一节点，需要精细化比较");
        patchVNode(oldVNode, newVNode);
    } else {
        console.log("不是同一个节点，暴力替换");
        // 递归创建dom对象，并且newVNode中的elm属性从父到子均挂载了匹配的dom对象
        const newVNodeElm = createElement(newVNode);
        const oldVNodeElm = oldVNode.elm;
        if (oldVNodeElm.parentNode && newVNodeElm) {
            // 旧节点的父节点真实存在，且新节点已创建为dom对象，直接调用DOM方法替换
            oldVNodeElm.parentNode.replaceChild(newVNodeElm, oldVNodeElm);
        }
    }
};
