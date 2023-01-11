import vnode from "./vnode.js";

// 编写一个低配版h函数，这个函数必须接收3个参数，缺一不可
// 弱化了重载功能，仅判断三种形态
// 1.h('div', {}, '文字')
// 2.h('div', {}, [])
// 3.h('div', {}, h())
export default function h(sel, data, c) {
    // 检查参数个数
    if (arguments.length !== 3) {
        throw new Error("h函数必须传入3个参数");
    }
    // 检查参数c的类型
    if (typeof c === "string" || typeof c === "number") {
        // 形态1
        return vnode(sel, data, undefined, c, undefined);
    } else if (Array.isArray(c)) {
        // 形态2
        const children = []
        for (let i = 0; i < c.length; i++) {
            // 检查c[i]必须是一个对象
            if (!(typeof c[i] === "object" && c[i].hasOwnProperty("sel"))) {
                throw new Error("传入的数组参数中有项不是h函数");
            }
            children.push(c[i]);
        }
        return vnode(sel, data, children, undefined, undefined);
    } else if (typeof c === "object" && c.hasOwnProperty("sel")) {
        // 形态3 传入的c是唯一的children
        const children = [c];
        return vnode(sel, data, children, undefined, undefined);
    } else {
        throw new Error("传入的第三个参数类型有误");
    }
}
