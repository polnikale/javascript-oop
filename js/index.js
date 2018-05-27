import Model from './model.js';
import Presenter from './presenter.js';
import View from './view.js';

let model = new Model();
let presenter = new Presenter(model);
let view = new View(presenter);
presenter.init(view);

