import vsSource from "./vertex.glsl?raw";
import fsSource from "./fragment.glsl?raw";

const app = document.querySelector<HTMLCanvasElement>('#app')!;

const gl = app.getContext("webgl2")!;

const createShader = function (gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    const errText = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`error compiling shader: ${errText}`)
}

const createProgram = function (gl: WebGL2RenderingContext, vShader: WebGLShader, fShader: WebGLShader) {
    const program = gl.createProgram()!;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program
    }

    const errText = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);

    throw new Error(`failed to link program: ${errText}`);
}

const vShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
const program = createProgram(gl, vShader, fShader);
