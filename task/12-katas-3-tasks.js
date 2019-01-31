'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    puzzle = puzzle.map(el => "*" + el + "*");
    puzzle.push("");
    puzzle.unshift("");
    for (let i = 0; i < puzzle[1].length; i++) {
        puzzle[0] += "*";
        puzzle[puzzle.length - 1] += "*";
    }
    let lastPoints = [];
    let l = 0;
    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[i].length; j++) {
            if (searchStr[l] === puzzle[i][j]) {
                lastPoints.push(i + " " + j);
                l++;
                let x = j, y = i;
                for (l; l < searchStr.length; l++) {
                    if (lastPoints.indexOf(y + " " + (x - 1)) === -1 && searchStr[l] === puzzle[y][x - 1]) {
                        x--;
                    }
                    else if (lastPoints.indexOf(y + " " + (x + 1)) === -1 && searchStr[l] === puzzle[y][x + 1]) {
                        x++;
                    }
                    else if (lastPoints.indexOf((y - 1) + " " + x) === -1 && searchStr[l] === puzzle[y - 1][x]) {
                        y--;
                    }
                    else if (lastPoints.indexOf((y + 1) + " " + x) === -1 && searchStr[l] === puzzle[y + 1][x]) {
                        y++;
                    }
                    else {
                        l = 0;
                        break;
                        lastPoints = [];
                    }
                    lastPoints.push(y + " " + x);
                    if (l === searchStr.length - 1) return true;
                }
            }
        }
    }
    return false;
    //throw new Error('Not implemented');
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
const Combinatorics = require('js-combinatorics');// :)
function* getPermutations(chars) {
    let cmb = Combinatorics.permutation(chars.split("")).toArray();
    for (let i = 0; i < cmb.length; i++) {
        yield cmb[i].join("");
    }
    //throw new Error('Not implemented');
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let max = quotes.reverse()[0];
    return quotes.reduce((profit, curr) => {
        max = Math.max(max, curr);
        return profit - curr + max;
    }, 0);
    //throw new Error('Not implemented');
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: url => {
        let res = "";
        for (let i = 0; i < url.length; i += 2) {
            let tmp1 = url.charCodeAt(i);
            let tmp2 = url.charCodeAt(i + 1);
            let code = (tmp1 << 8) | tmp2;
            res += String.fromCharCode(code);
        }
        return res;
    },

    decode: code => {
        let res = "";
        for (let i = 0; i < code.length; i++) {
            let char = parseInt(code.charCodeAt(i), 10);
            let tmp1 = char & 255;
            let tmp2 = (char >> 8) & 255;
            if (tmp1 === 0) {
                res += String.fromCharCode(tmp2)
            } else {
                res += String.fromCharCode(tmp2) + String.fromCharCode(tmp1);
            }
        }
        return res;
    }
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
