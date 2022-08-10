import {

} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ModalKit from 'components/Shared/ModalKit';

interface Props {
  disclosure: UseDisclosureReturn;
}

const markdown = `
Task 1 is literally just to plot a graph of Temperature against Altitude based on the
lapse rate, which is equal to $L = - \\frac{dT}{dh}$.


The data, after calculating the temperatures from the data given in [*A Standard Atmosphere* [A French]](https://www.bpho.org.uk/bpho/computational-challenge/BPhO%20CompPhys%20Challenge%202022%20v2.pdf#page=4), is:
| Altitude (km)  | Temperature (K)   |
|----------------|-------------------|
| 0              | 228               |
| 11             | 216.5             |
| 20             | 216.5             |
| 32             | 228.5             |
| 47             | 270.5             |
| 51             | 270.5             |
| 71             | 214.5             |
| 80             | 196.5             |
`;

const Task1Modal = ({ disclosure }: Props) => (
  <ModalKit
    disclosure={disclosure}
    title="Task 1"
    markdown={markdown}
  />
);

export default Task1Modal;
