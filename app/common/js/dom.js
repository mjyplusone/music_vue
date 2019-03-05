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

// 添加css3浏览器前缀
let elementStyle = document.createElement('div').style;

// 测试浏览器需要哪种前缀
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }

    return false;
})();

export function prefixStyle (style) {
    if (vendor === false) {
        return false;
    }

    if (vendor === 'standard') {
        return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
