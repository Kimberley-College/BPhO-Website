import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Heading, ModalFooter, Button, Text,
} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';

interface Props {
  disclosure: UseDisclosureReturn;
}

const Task1Modal = ({ disclosure }: Props) => (
  <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Task 1 Explanation</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex flexFlow="column nowrap" align="center" gap={5}>
          <Heading as="h3" size="md" fontWeight="bold">Pressure (KPa)</Heading>
          <Text>
            The pressure is the amount of air that is in the atmosphere.
            The pressure is measured in kilopascals (KPa).
          </Text>
          <Text>
            The pressure is measured at the surface of the Earth.
            The pressure is measured at the surface of the Earth.
          </Text>
          <Text>
            The pressure is measured at the surface of the Earth.
            The pressure is measured at the surface of the Earth.
          </Text>

          <Heading as="h3" size="md" fontWeight="bold">Temperature (K)</Heading>
          <Text>
            The temperature is the temperature of the air.
            The temperature is measured in kelvins (K).
          </Text>
          <Text>
            The temperature is measured at the surface of the Earth.
            The temperature is measured at the surface of the Earth.
          </Text>
          <Text>
            The temperature is measured at the surface of the Earth.
            The temperature is measured at the surface of the Earth.
          </Text>
        </Flex>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={disclosure.onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default Task1Modal;
