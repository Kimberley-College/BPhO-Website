import {

} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ModalKit from 'components/Shared/ModalKit';

interface Props {
  disclosure: UseDisclosureReturn;
}

const markdown = `
The data for Earth was sourced from our own calculations seen in the previous tasks.


The data for Mars was sourced from the [NASA Glenn Research Center](https://www.grc.nasa.gov/www/k-12/airplane/atmosmrm.html).


The data for Venus was sourced from [Blumenthal, Kay, Palen, Smith] Understanding Our Universe. ISBN 9780393912104.
`;

const PlanetsModal = ({ disclosure }: Props) => (
  <ModalKit
    disclosure={disclosure}
    title="Planets"
    markdown={markdown}
  />
);

export default PlanetsModal;
