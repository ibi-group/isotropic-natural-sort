# isotropic-natural-sort

[![npm version](https://img.shields.io/npm/v/isotropic-natural-sort.svg)](https://www.npmjs.com/package/isotropic-natural-sort)
[![License](https://img.shields.io/npm/l/isotropic-natural-sort.svg)](https://github.com/ibi-group/isotropic-natural-sort/blob/main/LICENSE)
![](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

A configurable natural sorting implementation for JavaScript that intelligently sorts strings containing numbers, lexicographic orderings, and special characters.

## Why Use This?

- **Smarter Than Standard Sorting**: Sorts numerically within strings (e.g., "file2" comes before "file10")
- **Highly Configurable**: Customize case sensitivity, direction, special character handling, and more
- **Handles Mixed Content**: Works properly with arrays containing both numbers and strings
- **Lexicographic Ordering Support**: Properly sorts version numbers and IP addresses
- **Prefix Positioning**: Control where items with specific prefixes appear in sorted results

## Installation

```bash
npm install isotropic-natural-sort
```

## Usage

```javascript
import _naturalSort from 'isotropic-natural-sort';

// Basic usage with default options
[
    'file10.txt',
    'file2.txt',
    'file1.txt'
].sort(_naturalSort());
// Result: ['file1.txt', 'file2.txt', 'file10.txt']

// With custom options
const _customSortFunction = _naturalSort({
    caseSensitive: true,
    direction: 'desc',
    ignoreSpecialCharacters: false,
    prefixPositions: {
        'important-': 'first',
        'archive-': 'last'
    }
});

myArray.sort(_customSortFunction);
```

## Configuration Options

The `naturalSort` function accepts an options object with the following properties:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `caseSensitive` | Boolean | `false` | Whether to consider character case when sorting strings |
| `direction` | String | `'asc'` | Sort direction, either `'asc'` or `'desc'` |
| `ignoreSpecialCharacters` | Boolean | `true` | Whether to ignore special characters (accents, diacritics) when sorting |
| `prefixPositions` | Object | `{}` | Object mapping prefixes to positions (`'first'` or `'last'`) |

## Examples

### Basic Sorting

```javascript
import _naturalSort from 'isotropic-natural-sort';

// Natural sorting of filenames
const _files = [
  'file10.txt',
  'file2.txt',
  'file1.txt',
  'file20.txt'
];

_files.sort(_naturalSort());
// Result: ['file1.txt', 'file2.txt', 'file10.txt', 'file20.txt']
```

### Case-Sensitive Sorting

```javascript
import _naturalSort from 'isotropic-natural-sort';

const _items = [
    'B',
    'a',
    'C',
    'b'
];

// Case-insensitive (default)
_items.sort(_naturalSort());
// Result: ['a', 'B', 'b', 'C']

// Case-sensitive
_items.sort(_naturalSort({
    caseSensitive: true
}));
// Result: ['B', 'C', 'a', 'b']
```

### Descending Order

```javascript
import _naturalSort from 'isotropic-natural-sort';

const _numbers = [
    1,
    10,
    2,
    20
];

_numbers.sort(_naturalSort({
    direction: 'desc'
}));
// Result: [20, 10, 2, 1]
```

### Special Character Handling

```javascript
import _naturalSort from 'isotropic-natural-sort';

const _names = [
    'cáfé charlotte',
    'cafe blue',
    'café amanda'
];

// Ignoring special characters (default)
_names.sort(_naturalSort());
// Result: ['café amanda', 'cafe blue', 'cáfé charlotte']

// Considering special characters
_names.sort(_naturalSort({
    ignoreSpecialCharacters: false
}));
// Result order depends on Unicode points of the accented characters
// Result: ['cafe blue', 'café amanda', 'cáfé charlotte']
```

### Lexicographic Ordering (IP Addresses, Versions)

```javascript
import _naturalSort from 'isotropic-natural-sort';

const _ips = [
        '192.168.0.10',
        '192.168.0.2',
        '10.0.0.1',
        '192.168.1.1'
    ],
    _versions = [
        '1.10.0',
        '1.2.0',
        '1.1.0',
        '1.2.1'
    ];

_ips.sort(_naturalSort());
// Result: ['10.0.0.1', '192.168.0.2', '192.168.0.10', '192.168.1.1']

_versions.sort(_naturalSort());
// Result: ['1.1.0', '1.2.0', '1.2.1', '1.10.0']
```

### Prefix Positioning

```javascript
import _naturalSort from 'isotropic-natural-sort';

const _tasks = [
    'normal-task3',
    'urgent-task1',
    'normal-task1',
    'low-priority-task',
    'urgent-task2'
];

_tasks.sort(_naturalSort({
    prefixPositions: {
        'low-priority-': 'last',
        'urgent-': 'first'
    }
}));
// Result: ['urgent-task1', 'urgent-task2', 'normal-task1', 'normal-task3', 'low-priority-task']
```

### Mixed Content

```javascript
import _naturalSort from 'isotropic-natural-sort';

const _mixed = [
    5,
    '10',
    'item3',
    2,
    'item10',
    'item1'
];

_mixed.sort(_naturalSort());
// Result: [2, 5, '10', 'item1', 'item3', 'item10']
```

## Handling Falsy Values

By default, `null`, `undefined`, and `NaN` values are sorted to the end of the array:

```javascript
import _naturalSort from 'isotropic-natural-sort';

const _withFalsy = [
    'b',
    null,
    'a',
    undefined,
    'c'
];

_withFalsy.sort(_naturalSort());
// Result: ['a', 'b', 'c', null, undefined]
```

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/ibi-group/isotropic-natural-sort/blob/main/CONTRIBUTING.md) for contribution guidelines.

## Issues

If you encounter any issues, please file them at https://github.com/ibi-group/isotropic-natural-sort/issues
