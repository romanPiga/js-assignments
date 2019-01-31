'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    let temp =
        ' _     _  _     _  _  _  _  _ \n' +
        '| |  | _| _||_||_ |_   ||_||_|\n' +
        '|_|  ||_  _|  | _||_|  ||_| _|\n';
    temp = temp.split("\n");
    let nums = new Array(10).fill("");
    for (let r = 0; r < 3; r++) {
        nums = nums.map((el, i) => el += temp[r].slice(i * 3, i * 3 + 3));
    }

    bankAccount = bankAccount.split("\n");
    let resNums = new Array(9).fill("");
    for (let r = 0; r < 3; r++) {
        resNums = resNums.map((el, i) => el += bankAccount[r].slice(i * 3, i * 3 + 3));
    }

    return resNums.map(el => nums.indexOf(el)).join("");
    //throw new Error('Not implemented');
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    text = text.split(" ");
    let str = "";
    for (let i = 0; i < text.length; i++) {
        if (str.length + text[i].length <= columns) {
            str += text[i] + " ";
        }
        else {
            yield str.slice(0, -1);
            str = text[i] + " ";
        }
    }
    yield str.slice(0, -1);
    //throw new Error('Not implemented');
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    let suits = '♥♠♦♣';
    let digits = 'A234567891JQK';

    let suits_arr = new Array(suits.length).fill(0);
    let digit_arr = new Array(digits.length).fill(0);

    for (let card of hand) {
        suits_arr[suits.indexOf(card.slice(-1))]++;
        digit_arr[digits.indexOf(card[0])]++;
    }

    digit_arr.push(digit_arr[0]);

    let suits_string = suits_arr.join('');
    let digit_string = digit_arr.join('');

    return (digit_string.indexOf('11111') !== -1) && (suits_string.indexOf('5') !== -1) ? PokerRank.StraightFlush
        : (digit_string.indexOf('4') !== -1) ? PokerRank.FourOfKind
            : (digit_string.indexOf('2') !== -1) && (digit_string.indexOf('3') !== -1) ? PokerRank.FullHouse
                : (suits_string.indexOf('5') !== -1) ? PokerRank.Flush
                    : (digit_string.indexOf('11111') !== -1) ? PokerRank.Straight
                        : (digit_string.indexOf('3') !== -1) ? PokerRank.ThreeOfKind
                            : (digit_string.match(/2.*2.+/)) ? PokerRank.TwoPairs
                                : (digit_string.indexOf('2') !== -1) ? PokerRank.OnePair
                                    : PokerRank.HighCard;
    throw new Error('Not implemented');
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    figure = figure.split("\n");
    let result = "";
    for (let i = 0; i < figure.length; i++) {
        for (let j = 0; j < figure[i].length; j++) {
            if (figure[i][j] === '+' && (figure[i + 1][j] === '+' || figure[i + 1][j] === '|')) {
                result += '+';
                let x = j + 1;
                for (x; x < figure[i].length; x++) {
                    if (figure[i][x] === '+' &&
                        (figure[i + 1][x] === '+' || figure[i + 1][x] === '|')) {
                        result += "+\n";
                        break;
                    }
                    else result += '-';

                    if (x === figure[i].length - 1 && figure[i][x] !== '+') result = "";
                }
                if (result !== "") {
                    let y = i + 1;
                    for (y; y < figure.length; y++) {
                        if (figure[y][x] === '+') {
                            result += '+' + "-".repeat(x - j - 1) + "+\n";
                            yield result;
                            result = '';
                            break;
                        }
                        else result += '|' + " ".repeat(x - j - 1) + "|\n";

                        if (y === figure.length - 1 && figure[y][x] !== '+') result = "";
                    }
                }
            }
        }
    }
    //throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
