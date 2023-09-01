const medalhas = [
    {
        name: 'a',
        g: 5,
        s: 0,
        b: 1
    },
    {
        name: 'b',
        g: 2,
        s: 1,
        b: 0
    },
    {
        name: 'c',
        g: 0,
        s: 2,
        b: 2
    },
    {
        name: 'd',
        g: 0,
        s: 2,
        b: 3
    },
    {
        name: 'e',
        g: 5,
        s: 1,
        b: 0
    }
];

const result = [...medalhas].sort((a, b) => {
    if (a.g !== b.g) {
      return b.g - a.g;
    }

    if (a.s !== b.s) {
      return b.s - a.s;
    }

    return b.b - a.b;
});

console.log(result);