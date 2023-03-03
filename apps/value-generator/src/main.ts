import { ValuesGenerator } from './values-generator';
import CONSTANTS from './constants';
import { ControllersGenerator } from './default-controllers-data-generator/controllers-generator';

const { GENERATED_VALUES } = CONSTANTS;

const valueGenerator = new ValuesGenerator(GENERATED_VALUES);

valueGenerator.runValueGenerator();

// create default controllers
// const controllersGenerator = new ControllersGenerator();

// controllersGenerator.runGenerator();
