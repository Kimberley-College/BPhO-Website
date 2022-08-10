import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Link,
} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface Props {
  disclosure: UseDisclosureReturn;
  title: string;
  markdown: string;
}

const newTheme = {
  code: (props) => {
    const { children, className, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');
    return (
      <SyntaxHighlighter language={match?.[1] ?? 'rust'} style={atomDark} PreTag="div" {...rest}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
  a: (props) => {
    const { children, ...rest } = props;
    return <Link {...rest} isExternal>{children} <ExternalLinkIcon mt="-5px" /></Link>;
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
          remarkPlugins={[remarkMath, remarkGfm]}
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
