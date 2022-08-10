import {

} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ModalKit from 'components/Shared/ModalKit';

interface Props {
  disclosure: UseDisclosureReturn;
}

const markdown = `
Task 3 requires the solving the following coupled first order differential equations:


$equations$


It is suggested to use [*Euler's* method](https://en.wikipedia.org/wiki/Euler_method) in [*A Standard Atmosphere* [A French]](https://www.bpho.org.uk/bpho/computational-challenge/BPhO%20CompPhys%20Challenge%202022%20v2.pdf#page=31)
, with a step size of $\\Delta h = 0.01$. The code below shows a simple (at the cost of efficiency!) rust implementation of this method, which can be compiled to WebAssembly and return a Float32Array when called in TypeScript.
\`\`\`rust
#[wasm_bindgen(js_name = eulerScheme)]
pub fn euler_scheme(u: f32, p0: f32, t0: f32) -> Box<[f32]> {
    let es = |t: f32| 6.1121 *  ((18.678 - t / 234.5) * (t / (t + 257.14))).exp();
    let dp = |p: f32, ues: f32, tk: f32| -34.171 * (p - 0.37776 * ues) / tk;
    let l = |p: f32, ues: f32, tk: f32| 9.7734 * (tk + 5420.3 * ues / (p - ues)) / (tk * tk + 8400955.5 * ues / (p - ues)) * tk;
    let next = |u: f32, x: [f32; 3]| [x[0] + 0.01 * dp(x[0], u * es(x[1]), x[1] + 273.15), x[1] - 0.01 * x[2], l(x[0], u * es(x[1]), x[1] + 273.15)];
    let mut soln = vec![[p0, t0, l(p0, u * es(t0), t0 + 273.15)]];
    for _ in 1..1101 { soln.push(next(u, *soln.last().unwrap())); }
    soln.concat().into_boxed_slice()
}
\`\`\`
However, in our WebAssembly crate, we also implemented the [*Runge-Kutta 4th Order* method](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods), in order to
massively improve space efficiency and give a performance boost. Additionally, we incorporated the [*Ramer-Douglas-Peucker* algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm) 
to prune points for buttery-smooth responsiveness when adjusting the humidity slider. 
`;

const Task3Modal = ({ disclosure }: Props) => (
  <ModalKit
    disclosure={disclosure}
    title="Task 3 Explanation"
    markdown={markdown}
  />
);

export default Task3Modal;
