// Use this presets array inside your presetHandler
const { get } = require('express/lib/request');
const presets = require('./presets');

const getPreset = (index) => {
    return presets[index] || null;
}

const createOrUpdatePreset = (array, index) => {
    if (!presets[index]) {
      return;
    }
    presets[index] = array;
    return presets[index];
}

// Complete this function:
const presetHandler = (method, index, newPresetsArray) => {
    if (method === 'GET') {
        let preset = getPreset(index);
        if (preset) {
            return [200, preset];
        } else {
            return [404];
        }
    } else if (method === 'PUT') {
        const newPreset = createOrUpdatePreset(newPresetsArray, index)
        if (newPreset) {
            return [200, newPreset];
        } else {
            return [404];
        }
    } else {
        return [400]
    }
}

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
