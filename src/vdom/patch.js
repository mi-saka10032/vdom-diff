import vnode from "./vnode.js";
import createElement from './createElement.js'

export default function patch(oldVNode, newVNode) {
    // 判断传入的第一个参数，是DOM节点还是虚拟节点？
    if (oldVNode?.sel === "" || oldVNode?.sel === undefined) {
        // 传入的第一个参数 oldVNode 是DOM节点，需要包装虚拟节点
        oldVNode = vnode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode)
    }
    // 判断oldVNode和newVNode是不是同一个节点
    if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
        console.log("是同一节点，需要精细化比较");
    } else {
        console.log('不是同一个节点，暴力替换');
        createElement(newVNode, oldVNode.elm)
    }
};
