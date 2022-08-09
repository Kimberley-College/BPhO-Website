/* eslint-disable react/require-default-props */
import {
  Flex, Heading, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb,
} from '@chakra-ui/react';
import { useMemo } from 'react';

interface Props {
  title: string;
  unit: string;
  domain: [number, number];
  step: number;
  numTicks: number;
  tickFn: (i: number) => number;
  value: number;
  onChange: (value: number) => void;
  labelLeft?: number;
  tooltipLeft?: number;
  decimalPoints?: number;
}

const SliderKit = ({
  title, unit, domain, step, value, onChange, tickFn, numTicks, labelLeft = -4, tooltipLeft = -10, decimalPoints = 1,
}: Props) => {
  const labelStyles = useMemo(() => ({
    ml: labelLeft,
    mt: '2',
    fontSize: 'sm',
  }), [labelLeft]);

  return (
    <Flex flexFlow="column nowrap" align="center" w="100%">
      <Heading as="h3" size="md" fontWeight="bold" mb={7}>{title}</Heading>
      <Slider aria-label="slider-ex-1" value={value} onChange={onChange} min={domain[0]} max={domain[1]} step={step} minWidth="250px" width="60%" my={3}>
        {new Array(numTicks).fill(0).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
          <SliderMark visibility={i % 2 === 0 ? 'visible' : ['hidden', null, 'visible']} key={tickFn(i)} value={tickFn(i)} {...labelStyles}>{(tickFn(i)).toFixed(decimalPoints)}</SliderMark>
        ))}
        <SliderMark
          value={value}
          textAlign="center"
          bg="brand.kimberley"
          color="white"
          mt="-9"
          ml={tooltipLeft}
          w="20"
        >
          {value}{unit}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
};

export default SliderKit;
