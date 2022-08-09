import {

} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ModalKit from 'components/Shared/ModalKit';

interface Props {
  disclosure: UseDisclosureReturn;
}

const markdown = `# Test
Task 2 is a simple map according to the formula given in [REFERENCE].
\`\`\`typescript
// making the altitude values
const xValues = new Array(111).fill(0).map((_, i) => i * 0.1); 
// function to calculate pressure
const pressure = (p0: number, t0: number, l: number, h: number) => {
  // if lapse rate is 0
  if (l === 0) {
    return p0 * Math.exp(-34.17 * h / t0);
  }
  // else
  return p0 * (1 - (l * h) / t0) ** (34.17 / l);
};

const currentData: { x: number, y: number }[] = useMemo(() => {
  xValues.map((value) => ({ x: value, y: pressure(p, t, value) })
}), [p, t, l]);
\`\`\`
`;

const Task2Modal = ({ disclosure }: Props) => (
  <ModalKit
    disclosure={disclosure}
    title="Task 2 Explanation"
    markdown={markdown}
  />
);

export default Task2Modal;
