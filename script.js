function isEqualArrays(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, i) => val === arr2[i]);
}

console.log('1.6:', JSON.stringify([1, 2, 3]), '==', JSON.stringify([1, 2, 3]), ':', isEqualArrays([1, 2, 3], [1, 2, 3]));
console.log('1.6:', JSON.stringify([1, 2, 3]), '==', JSON.stringify([1, 2]), ':', isEqualArrays([1, 2, 3], [1, 2]));

function isEqualObj(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every(key => obj1[key] === obj2[key]);
}

console.log('1.7:', JSON.stringify({a: 1, b: 2}), '==', JSON.stringify({b: 2, a: 1}), ':', isEqualObj({a: 1, b: 2}, {b: 2, a: 1}));
console.log('1.7:', JSON.stringify({a: 1}), '==', JSON.stringify({a: 1, b: 2}), ':', isEqualObj({a: 1}, {a: 1, b: 2}));

function convertToRanges(numbers) {
    if (numbers.length === 0) return '';
    numbers.sort((a, b) => a - b);
    let result = [];
    let start = numbers[0];
    let end = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === end + 1) {
            end = numbers[i];
        } else {
            result.push(start === end ? `${start}` : `${start}-${end}`);
            start = numbers[i];
            end = numbers[i];
        }
    }
    result.push(start === end ? `${start}` : `${start}-${end}`);
    return result.join(',');
}

console.log('2.2:', JSON.stringify([1, 2, 3, 5, 7, 8, 9]), ':', convertToRanges([1, 2, 3, 5, 7, 8, 9]));
console.log('2.2:', JSON.stringify([1, 3, 5]), ':', convertToRanges([1, 3, 5]));

function rle(str) {
    if (str === '') return '';
    let result = [];
    let count = 1;

    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            result.push(count + str[i - 1]);
            count = 1;
        }
    }
    return result.join('');
}

console.log('3.6:', JSON.stringify("aabcccccaaa"), ':', rle("aabcccccaaa"));
console.log('3.6:', JSON.stringify("abcde"), ':', rle("abcde"));