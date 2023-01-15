// 创建真正节点，将vnode创建为DOM，插入标杆(pivot)元素之前
export default function createElement(vnode) {
    // const fragment = document.createDocumentFragment();
    const domNode = document.createElement(vnode.sel);
    // 有子节点还是有文本，需要判断
    if (vnode.text !== "" && (vnode.children === undefined || vnode.children.length === 0)) {
        // 内部是文本文字
        domNode.innerText = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 内部是子节点，需要遍历 - 递归创建节点
        for (let i = 0; i < vnode.children.length; i++) {
            // 函数的递归会在 ch 节点不存在children时进入第一个if判断而停止
            // 最终所有创建的子节点会逆序挂载上父节点vnode.elm，向外抛出一个层次分明的完整DOM
            // 由于dom对象之间浅拷贝相互引用，外部的newVNode对象的elm就是完整的DOM对象
            const ch = vnode.children[i];
            const chDOM = createElement(ch);
            domNode.appendChild(chDOM);
        }
    }
    // 插入vnode.elm
    vnode.elm = domNode;
    // 返回dom对象
    return vnode.elm;
};
