export function addClass (el, className) {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

export function hasClass (el, className) {
    // 以className开头或者空白字符在前，后面可跟空白字符或者结束
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}