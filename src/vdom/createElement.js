// 创建真正节点，将vnode创建为DOM，插入标杆(pivot)元素之前
export default function createElement(vnode, pivot) {
    const fragment = document.createDocumentFragment();
    const domNode = document.createElement(vnode.sel);
    // 有子节点还是有文本，需要判断
    if (vnode.text !== "" && (vnode.children === undefined || vnode.children.length === 0)) {
        // 它内部是文本文字
        domNode.innerText = vnode.text;
    }
};
