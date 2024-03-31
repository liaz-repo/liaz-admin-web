/**
 * 下划线转驼峰
 */
export function toCamelCase(str) {
    return str.replace(/_[a-z]/g, function (s) {
        return s.substring(1).toUpperCase();
    });
}

/**
 * 首字母大写
 */
export function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 首字母小写
 */
export function lowerFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * 是否为数字
 */
export function isNumber(str) {
    return /^[0-9]+.?[0-9]*/.test(str);
}