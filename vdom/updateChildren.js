import patchVNode from "./patchVNode.js";
import createElement from "./createElement.js";

function checkSameVNode(a, b) {
    return a.sel === b.sel && a.key === b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
    // 旧前指针
    let oldStartIndex = 0;
    // 新前指针
    let newStartIndex = 0;
    // 旧后指针
    let oldEndIndex = oldCh.length - 1;
    // 新后指针
    let newEndIndex = newCh.length - 1;
    // 旧前节点
    let oldStartVNode = oldCh[0];
    // 新前节点
    let newStartVNode = newCh[0];
    // 旧后节点
    let oldEndVNode = oldCh[oldEndIndex];
    // 新后节点
    let newEndVNode = newCh[newEndIndex];
    // keySet
    const keyMap = new Map();
    // 四指针命中查找法，循环进行条件：旧前<=旧后 && 新前<=新后
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 首先不是判断四种命中，而是先略过已经加了undefined标记的节点项
        if (oldStartVNode === null || oldCh[oldStartIndex] === undefined) {
            oldStartVNode = oldCh[++oldStartIndex];
        } else if (oldEndVNode === null || oldCh[oldEndIndex] === undefined) {
            oldEndVNode = oldCh[--oldEndIndex];
        } else if (newStartVNode === null || newCh[newStartIndex] === undefined) {
            newStartVNode = newCh[++newStartIndex];
        } else if (newEndVNode === null || newCh[newEndIndex] === undefined) {
            newEndVNode = newCh[--newEndIndex];
        } else if (checkSameVNode(oldStartVNode, newStartVNode)) {
            // 1.新前vs旧前
            // 再调用patchNode进入子节点内部判断其内部children再度判断
            patchVNode(oldStartVNode, newStartVNode);
            oldStartVNode = oldCh[++oldStartIndex];
            newStartVNode = newCh[++newStartIndex];
        } else if (checkSameVNode(oldEndVNode, newEndVNode)) {
            // 2.新后vs旧后
            patchVNode(oldEndVNode, newEndVNode);
            oldEndVNode = oldCh[--oldEndIndex];
            newEndVNode = newCh[--newEndIndex];
        } else if (checkSameVNode(oldStartVNode, newEndVNode)) {
            // 3.新后vs旧前
            patchVNode(oldStartVNode, newEndVNode);
            // 移动旧前节点到旧后节点后面
            parentElm.insertBefore(oldStartVNode.elm, oldEndVNode.elm.nextElementSibling);
            oldStartVNode = oldCh[++oldStartIndex];
            newEndVNode = newCh[--newEndIndex];
        } else if (checkSameVNode(oldEndVNode, newStartVNode)) {
            // 4.新前vs旧后
            patchVNode(oldEndVNode, newStartVNode);
            // 移动旧后节点到旧前节点前面
            parentElm.insertBefore(oldEndVNode.elm, oldStartVNode.elm);
            oldEndVNode = oldCh[--oldEndIndex];
            newStartVNode = newCh[++newStartIndex];
        } else {
            // 都没有匹配到的情况
            console.log("都没有匹配到");
            keyMap.clear();
            for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                const key = oldCh[i]?.key;
                if (key !== undefined) {
                    keyMap.set(key, i);
                }
            }
            // 寻找新前指针节点的key在keyMap中映射的位置序号
            const indexInOld = keyMap.get(newStartVNode.key);
            if (indexInOld) {
                // 如果非undefined，则不是新项目
                // patch本项
                const elmToMove = oldCh[indexInOld];
                patchVNode(elmToMove, newStartVNode);
                // 处理完之后当前项设为undefined
                oldCh[indexInOld] = undefined;
                // 将indexInOld指向的原旧节点移动到旧前指针之前
                parentElm.insertBefore(elmToMove.elm, oldStartVNode.elm);
            } else {
                // 如果undefined，则说明是新项，需要插入到旧前指针之前
                parentElm.insertBefore(createElement(newStartVNode), oldStartVNode.elm);
            }
            newStartVNode = newCh[++newStartIndex];
        }
    }
    // 循环结束后，新后>=新前，表明剩余待新增节点
    if (newEndIndex >= newStartIndex) {
        // 此处待新增的节点可能需要追加到待处理新前节点末尾，也可能是在节点头部
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // beforeElm为null则执行appendChild操作，不为null说明在头部执行新增插入
            const beforeElm = newCh[newEndIndex + 1] ? newCh[newEndIndex + 1].elm : null;
            parentElm.insertBefore(createElement(newCh[i]), beforeElm);
        }
    }
    // 循环结束后，旧后>=旧前，表明剩余待删除节点
    if (oldEndIndex >= oldStartIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
};
