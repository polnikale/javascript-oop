import { withSingleBehavior, withMultipleBehavior, withOpenBehavior } from './question.js';

export const typesOfBehavior = [
  {type: 'single', behavior: withSingleBehavior},
  {type: 'multiple', behavior: withMultipleBehavior},
  {type: 'open', behavior: withOpenBehavior},
];