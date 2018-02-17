class Trie
{
    constructor()
    {
        this.trie = {}
    }

    push(value)
    {
        value = value.toString();

        let obj = this.trie;
        let i = 0;

        for (let char of value.split('')) {
            if (obj[char] === undefined) {
                if (i === (value.length - 1)) {
                    obj[char] = null
                } else {
                    obj[char] = {}
                }
            }

            obj = obj[char];

            i++
        }
    }

    find(value)
    {
        value = value.toString();

        let obj = this.trie;
        let i = 0;

        for (let char of value.split('')) {
            if (obj.hasOwnProperty(char)) {
                if (obj[char] === null) {
                    return true
                }
            } else {
                return false
            }

            obj = obj[char];
            i++
        }

        return false;
    }
}

export default class Range
{
    constructor(trie)
    {
        if (!trie instanceof Trie) {
            throw(new Error("Range constructor requires a Trie parameter"));
        }

        this.trie = trie
    }

    static fromString(ranges) {
        if (!ranges instanceof String) {
            throw(new Error("Range constructor requires a String parameter"));
        }

        ranges = ranges.replace(/ /g, '');
        ranges = ranges.split(',');

        let trie = new Trie

        for (const range of ranges) {
            let r;

            if (r = range.match(/^(\d+)-(\d+)$/)) {
                for (const n of intrange(parseInt(r[1]), parseInt(r[2]))) {
                    console.log(n);
                    trie.push(n);
                }
            } else if (range.match(/^\d+$/)) {
                trie.push(range);
            } else {
                throw new Error(`Invalid range '${r}'`);
            }
        }

        return new Range(trie)
    }

    match(number) {
        return this.trie.find(number)
    }
}

function* intrange(begin, end) {
    for (let i = begin; i <= end; i += 1) {
        yield i;
    }
}