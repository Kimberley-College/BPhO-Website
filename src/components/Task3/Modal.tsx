import {

} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ModalKit from 'components/Shared/ModalKit';

interface Props {
  disclosure: UseDisclosureReturn;
}

const markdown = `

As outlined in [*A Standard Atmosphere* [A French]](https://www.bpho.org.uk/bpho/computational-challenge/BPhO%20CompPhys%20Challenge%202022%20v2.pdf#page=31), task 3 requires 
the solving of the following coupled pair of ordinary differential equations for pressure and temperature, whilst keeping track of lapse rate, dew point temperature and boiling point 
temperature. $T_K$ denotes temperature in Kelvin.

$$
\\begin{aligned}
\\frac{dT}{dh} & = -L(r,T_K) \\\\
\\frac{dP}{dh} & = -\\frac{34.171}{ T_K} \\left ( P - 0.37776 U E_S(T) \\right ) \\\\
L(r,T_K) & = 9.7734 \\frac{1 + 5420.3 \\frac{r}{T_K}}{1 + 8400955.5 \\frac{r}{ T_K^2}} \\\\
r(P,T) & = \\frac{UE_S(T)}{P-UE_S(T)} \\\\
E_S(T) & = 6.1121e^{ \\left (18.678 - \\frac{T}{234.5} \\right ) \\left (\\frac{T}{T+257.14} \\right ) }
\\end{aligned}
$$

It is suggested to use [*Euler's* method](https://en.wikipedia.org/wiki/Euler_method), with a step size of $\\Delta h = 0.01$, and the code below shows just how simple an 
implementation of this method can be, whilst still being able to be compiled to WebAssembly that returns a Float32Array when called in TypeScript.
\`\`\`rust
#[wasm_bindgen(js_name = eulerScheme)]
pub fn euler_scheme(u: f32, p0: f32, t0: f32) -> Box<[f32]> {
    let es = |t: f32| 6.1121 * ((18.678 - t / 234.5) * (t / (t + 257.14))).exp();
    let dp = |p: f32, ues: f32, tk: f32| -34.171 * (p - 0.37776 * ues) / tk;
    let l = |p: f32, ues: f32, tk: f32| 9.7734 * (tk + 5420.3 * ues / (p - ues)) / (tk * tk + 8400955.5 * ues / (p - ues)) * tk;
    let next = |u: f32, x: [f32; 3]| [x[0] + 0.01 * dp(x[0], u * es(x[1]), x[1] + 273.15), x[1] - 0.01 * x[2], l(x[0], u * es(x[1]), x[1] + 273.15)];
    let mut soln = vec![[p0, t0, l(p0, u * es(t0), t0 + 273.15)]];
    for _ in 1..1101 { soln.push(next(u, *soln.last().unwrap())); }
    soln.concat().into_boxed_slice()
}
\`\`\`
This obviously does not track dew point and boiling point temperatures, and returns the data in a sub-optimal format for our use case. 
Therefore, in our WebAssembly crate, we used a better internal representation (also accomodating the current limited features of the standard).
Additionally we also implemented the [*Runge-Kutta 4th Order* method](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods), with a step size of $\\Delta h = 0.1$ in order to
massively improve memory efficiency and give a performance boost. The only performance inhibitor left was slow re-rendering of graphs when adjusting sliders,
and so we incorporated the [*Ramer-Douglas-Peucker* algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm) into the crate
to prune points for buttery-smooth responsiveness when adjusting sliders. 


See the [*technical report*]() for the implementation specifics of working with WebAssembly.
`;

const Task3Modal = ({ disclosure }: Props) => (
  <ModalKit
    disclosure={disclosure}
    title="Task 3"
    markdown={markdown}
  />
);

export default Task3Modal;
