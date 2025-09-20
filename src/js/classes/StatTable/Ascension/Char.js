import {StatTableAscension} from '../Ascension.js'

export class StatTableAscensionChar extends StatTableAscension {
  getLevels() {
    return [1, 20, 40, 50, 60, 70, 80, 90];
  }
}
