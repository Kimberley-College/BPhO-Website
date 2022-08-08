import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button,
} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';

interface Props {
  disclosure: UseDisclosureReturn;
  title: string;
  markdown: string;
}

const newTheme = {
  code: (props) => {
    const { children, ...rest } = props;
    return (
      <SyntaxHighlighter language="rust" style={materialDark} PreTag="div" {...rest}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
};

const ModalKit = ({ disclosure, title, markdown }: Props) => (
  <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} size="5xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <ReactMarkdown
          components={ChakraUIRenderer(newTheme)}
          skipHtml
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >{markdown}
        </ReactMarkdown>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={disclosure.onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ModalKit;
