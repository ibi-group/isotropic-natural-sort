import _characterFold from 'isotropic-character-fold';
import _Error from 'isotropic-error';

const _lexicographicOrderRegexp = /^[+-]?\d+(?:\.[+-]?\d+){2,}$/,

    _splitString = string => {
        const split = [];

        let lastIndex = 0;

        string.replace(/([+-]?\d+(?:\.[+-]?\d+)*)/g, (match, numbers, index) => {
            split.push(string.substring(lastIndex, index));
            split.push(match);
            lastIndex = index + match.length;
            return match;
        });

        if (lastIndex !== string.length) {
            split.push(string.substring(lastIndex));
        }

        return split;
    };

export default ({
    caseSensitive = false,
    direction = 'asc',
    ignoreSpecialCharacters = true,
    prefixPositions = {}
} = {}) => {
    const aIsEqualToB = 0,
        aIsGreaterThanB = (() => {
            switch (direction) {
                case 'asc':
                    return 1;
                case 'desc':
                    return -1;
            }

            throw _Error({
                details: {
                    direction
                },
                message: 'Invalid direction'
            });
        })(),
        aIsLessThanB = -aIsGreaterThanB,
        aPosition = position => {
            switch (position) {
                case 'first':
                    return aIsLessThanB;
                case 'last':
                    return aIsGreaterThanB;
            }

            throw _Error({
                details: {
                    position
                },
                message: 'Invalid position'
            });
        },
        bPosition = position => {
            switch (position) {
                case 'first':
                    return aIsGreaterThanB;
                case 'last':
                    return aIsLessThanB;
            }

            throw _Error({
                details: {
                    position
                },
                message: 'Invalid position'
            });
        },
        normalizeString = (() => {
            if (caseSensitive) {
                if (ignoreSpecialCharacters) {
                    return string => _characterFold(string);
                }

                return string => string;
            }

            if (ignoreSpecialCharacters) {
                return string => _characterFold(string).toLowerCase();
            }

            return string => string.toLowerCase();
        })(),
        prefixes = Object.keys(prefixPositions).sort((a, b) => b.length - a.length);

    return (a, b) => {
        if (!a && a !== 0) {
            if (!b && b !== 0) {
                return aIsEqualToB;
            }

            return aPosition('last');
        }

        if (!b && b !== 0) {
            return bPosition('last');
        }

        a = `${a}`;
        b = `${b}`;

        {
            let aPrefixPosition,
                bPrefixPosition;

            prefixes.some(prefix => {
                if (!aPrefixPosition && a.startsWith(prefix)) {
                    aPrefixPosition = prefixPositions[prefix];
                }

                if (!bPrefixPosition && b.startsWith(prefix)) {
                    bPrefixPosition = prefixPositions[prefix];
                }

                return aPrefixPosition && bPrefixPosition;
            });

            if (aPrefixPosition !== bPrefixPosition) {
                if (aPrefixPosition) {
                    return aPosition(aPrefixPosition);
                }

                return bPosition(bPrefixPosition);
            }
        }

        const aSplit = _splitString(a),
            bSplit = _splitString(b);

        for (let index = 0, minimumLength = Math.min(aSplit.length, bSplit.length); index < minimumLength; index += 1) {
            const aChunk = aSplit[index],
                bChunk = bSplit[index];

            if (aChunk === bChunk) {
                continue;
            }

            {
                const aNumber = +aChunk,
                    bNumber = +bChunk;

                if (Number.isNaN(aNumber)) {
                    if (Number.isNaN(bNumber)) {
                        if (_lexicographicOrderRegexp.test(aChunk) && _lexicographicOrderRegexp.test(bChunk)) {
                            const aLexicographicOrder = aChunk.split('.'),
                                bLexicographicOrder = bChunk.split('.');

                            for (let index = 0, minimumLength = Math.min(aLexicographicOrder.length, bLexicographicOrder.length); index < minimumLength; index += 1) {
                                const aChunk = aLexicographicOrder[index],
                                    bChunk = bLexicographicOrder[index];

                                if (aChunk === bChunk) {
                                    continue;
                                }

                                {
                                    const aNumber = +aChunk,
                                        bNumber = +bChunk;

                                    if (aNumber > bNumber) {
                                        return aIsGreaterThanB;
                                    }

                                    if (aNumber < bNumber) {
                                        return aIsLessThanB;
                                    }
                                }

                                if (aChunk > bChunk) {
                                    return aIsGreaterThanB;
                                }

                                return aIsLessThanB;
                            }

                            if (aLexicographicOrder.length > bLexicographicOrder.length) {
                                return aIsGreaterThanB;
                            }

                            return aIsLessThanB;
                        }

                        {
                            const aString = normalizeString(aChunk),
                                bString = normalizeString(bChunk);

                            if (aString > bString) {
                                return aIsGreaterThanB;
                            }

                            if (aString < bString) {
                                return aIsLessThanB;
                            }
                        }

                        if (aChunk > bChunk) {
                            return aIsGreaterThanB;
                        }

                        return aIsLessThanB;
                    }

                    return aIsGreaterThanB;
                }

                if (Number.isNaN(bNumber)) {
                    return aIsLessThanB;
                }

                if (aNumber > bNumber) {
                    return aIsGreaterThanB;
                }

                if (aNumber < bNumber) {
                    return aIsLessThanB;
                }
            }

            if (aChunk > bChunk) {
                return aIsGreaterThanB;
            }

            return aIsLessThanB;
        }

        if (aSplit.length > bSplit.length) {
            return aIsGreaterThanB;
        }

        if (aSplit.length < bSplit.length) {
            return aIsLessThanB;
        }

        return aIsEqualToB;
    };
};
