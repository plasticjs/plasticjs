import Range from './Range';

const card_types = [
    {
        name: 'amex',
        range: '34,37',
        valid_length: [15]
    }, {
        name: 'diners_club_carte_blanche',
        range: '300-305',
        valid_length: [14]
    }, {
        name: 'diners_club_international',
        range: '36',
        valid_length: [14]
    }, {
        name: 'jcb',
        range: '3528-3589',
        valid_length: [16]
    }, {
        name: 'laser',
        range: '6304, 6706, 6709, 6771',
        valid_length: [16, 17, 18, 19]
    }, {
        name: 'visa_electron',
        range: '4026, 417500, 4508, 4844, 4913, 4917',
        valid_length: [16]
    }, {
        name: 'visa',
        range: '4',
        valid_length: [13, 14, 15, 16, 17, 18, 19]
    }, {
        name: 'mastercard',
        range: '51-55,2221-2720',
        valid_length: [16]
    }, {
        name: 'discover',
        range: '6011, 622126-622925, 644-649, 65',
        valid_length: [16]
    }, {
        name: 'dankort',
        range: '5019',
        valid_length: [16]
    }, {
        name: 'maestro',
        range: '50, 56-69',
        valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
    }, {
        name: 'uatp',
        range: '1',
        valid_length: [15]
    }
];

export default class Plastic
{
    static validateNumber(number)
    {
        number = this._normalize(number);

        const length_valid = false,
              card_type = this._getCardType(number),
              luhn_valid = this._isValidLuhn(number);

        if (card_type) {
            const length_valid = this._isValidLength(number, card_type);
        }

        return {
            card_type: card_type,
            valid: luhn_valid && length_valid,
            luhn_valid: luhn_valid,
            length_valid: length_valid
        }
    }

    static _getCardType(number)
    {
        for (const card_type of card_types) {
            const range = Range.fromString(card_type.range);

            if (range.match(number)) {
                return card_type;
            }
        }
    }

    static _isValidLuhn(number)
    {
        let sum = 0,
            n = 0;

        for (let digit of number.split('').reverse()) {
            digit = parseInt(digit);

            if (n % 2) {
                digit *= 2;

                if (digit < 10) {
                    sum += digit;
                } else {
                    sum += digit - 9;
                }
            } else {
                sum += digit;
            }
        }

        return sum % 10;
    }

    static _isValidLength(number, card_type)
    {
        return card_type.valid_length.indexOf(number.length) !== -1;
    }

    static _normalize(number) {
        return number.replace(/[ -]/g, '');
    }
}