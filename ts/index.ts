import App from './app.js';
// import ColorPalette from './color-palette.js';
// import ColorPicker from './color-picker.js';
const canvas = document.querySelector('canvas');

if (!canvas) {
    throw new Error('NO CANVAS!');
}

new App({
    canvas,

    // colorPalette: new ColorPalette({
    //     element: document.querySelector('#color-palette'),
    //     colors: [
    //         { red: 252, green: 76, blue: 79 },
    //         { red: 79, green: 163, blue: 252 },
    //         { red: 104, green: 178, blue: 91 }
    //     ]
    // }),

    // colorPicker: new ColorPicker({
    //     element: document.querySelector('#color-picker')
    // })
});