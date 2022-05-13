const createEmptyDrumArray = () => new Array(16).fill(false);
// Drum Arrays
let kicks = createEmptyDrumArray();
let snares = createEmptyDrumArray();
let hiHats = createEmptyDrumArray();
let rideCymbals = createEmptyDrumArray();

const getDrumArrayFromString = (string) => {
    switch (string) {
        case 'kicks':
            return kicks;
        case 'snares':
            return snares;
        case 'hiHats':
            return hiHats;
        case 'rideCymbals':
            return rideCymbals;
        default:
            return;
    }
}

const toggleDrum = (arrayString, index) => {
    const drum = getDrumArrayFromString(arrayString);
    if (!drum || (index < 0) || (index > 15)) {
        return;
    }
    drum[index] = !drum[index];
}

const clear = array => {
    const drum = getDrumArrayFromString(array);
    if (drum) {
        drum.fill(false);
    }
}

const invert = array => {
    const drum = getDrumArrayFromString(array);
    if (drum) {
        for (let i = 0; i < drum.length; i++) {
            drum[i] = !drum[i];
        }
    }
}

const getNeighborPads = (x, y, size) => {
    const neighbors = [];
    if ((size < 1) || (x < 0) || (y < 0) || (x >= size) || (y >= size)) {
        return neighbors;
    }
    neighbors.push([x - 1, y]);
    neighbors.push([x, y - 1]);
    neighbors.push([x + 1, y]);
    neighbors.push([x, y + 1]);
    const neighborPads = neighbors.filter(neighbor => {
        return neighbor.every(val => {
            return val >= 0 && val < size;
        });
    });
    return neighborPads;
}