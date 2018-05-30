import GridModel from './grid/gridModel.js';
import GridPresenter from './grid/gridPresenter.js';
import GridView from './grid/gridView.js';

let gridModel = new GridModel();
let gridPresenter = new GridPresenter(gridModel);
let gridView = new GridView(gridPresenter);
gridPresenter.init(gridView);