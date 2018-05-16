import App from './app.js';
// import ColorPalette from './color-palette.js';
// import ColorPicker from './color-picker.js';
const canvas = document.querySelector('canvas');
if (!canvas) {
    throw new Error('NO CANVAS!');
}
new App({
    canvas,
});
