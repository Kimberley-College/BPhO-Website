import {

} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ModalKit from 'components/Shared/ModalKit';

interface Props {
  disclosure: UseDisclosureReturn;
}

const markdown = `
[*A Standard Atmosphere* [A French]](https://www.bpho.org.uk/bpho/computational-challenge/BPhO%20CompPhys%20Challenge%202022%20v2.pdf#page=14) details how
pressure is given by $ p(h) = p_0 \\left ( 1 - \\frac{L(h - h_0)}{T_0} \\right)^{\\frac{Mg}{LR}} $
, or when lapse rate is zero, $ p(h) = p_0 e^{- \\frac{Mg}{RT} (h - h_0)} $.


In TypeScript, this is calculated as follows:
\`\`\`typescript
// making the altitude values
const xValues = new Array(111).fill(0).map((_, i) => i * 0.1); 
// function to calculate pressure
const pressure = (p0: number, t0: number, l: number, h: number) => {
  // if lapse rate is 0
  if (l === 0) {
    return p0 * Math.exp(-34.17 * h / t0);
  }
  // all other lapse rate values
  return p0 * (1 - (l * h) / t0) ** (34.17 / l);
};
// mapping the altitude values to an array of points that can be plotted
const currentData: { x: number, y: number }[] = useMemo(() => {
  xValues.map((value) => ({ x: value, y: pressure(p, t, value) })
}), [p, t, l]); // takes lapse rate, and initial temperature and pressure as arguments
\`\`\`
We then prune 85-95% of points using the [*Ramer-Douglas-Peucker* algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm), in order to make the graph more responsive, 
without sacrificing visual quality in any capacity.
`;

const Task2Modal = ({ disclosure }: Props) => (
  <ModalKit
    disclosure={disclosure}
    title="Task 2 Explanation"
    markdown={markdown}
  />
);

export default Task2Modal;
