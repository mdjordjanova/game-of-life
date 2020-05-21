import { gliderGunPattern } from '../patterns/glider-gun';
import { exploderPattern } from '../patterns/exploder';
import { smallExploderPattern } from '../patterns/small-exploder';
import { glidersPattern } from '../patterns/gliders';
import { tenCellInfiniteGrowth } from '../patterns/10-cell-infiinite-growth';
import { oneHundredOnePattern } from '../patterns/101';
import { seventeenC45Reaction } from '../patterns/17c45_reaction';
import { pattern22p36 } from '../patterns/22p36';
import { twoFumaroles } from '../patterns/fumaroles';
import { clearPattern } from '../patterns/clear';

export const patterns = [
  { name: 'Gilder Gun', config: gliderGunPattern },
  { name: 'Exploder', config: exploderPattern },
  { name: 'Small Exploder', config: smallExploderPattern },
  { name: 'Gliders', config: glidersPattern },
  { name: '10 Cell Infinite Growth', config: tenCellInfiniteGrowth },
  { name: '101', config: oneHundredOnePattern },
  { name: '17c45 Reaction', config: seventeenC45Reaction },
  { name: '2 Fumaroles', config: twoFumaroles },
  { name: '22p36', config: pattern22p36 },
  { name: 'Clear', config: clearPattern },
];
