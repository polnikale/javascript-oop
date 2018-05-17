import App from './app.js';
import ColorPalette from './color-palette.js';
// import ColorPicker from './color-picker.js';
const canvas = document.querySelector('canvas');
const colorPaletteElem = document.querySelector('#color-palette');


if (!canvas || !colorPaletteElem) {
    throw new Error('NO CANVAS!');
}

new App({
    canvas,

    colorPalette: new ColorPalette({
        element: colorPaletteElem,
        colors: [
            { red: 252, green: 76, blue: 79 },
            { red: 79, green: 163, blue: 252 },
            { red: 104, green: 178, blue: 91 }
        ]
    }),

    // colorPicker: new ColorPicker({
    //     element: document.querySelector('#color-picker')
    // })
});