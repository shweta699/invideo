import React, { useEffect, useRef, useState } from 'react';
import { Palette } from 'lucide-react';

const DEFAULT_VERTEX_SHADER = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

const DEFAULT_FRAGMENT_SHADER = `
  precision mediump float;
  uniform float uTime;
  
  void main() {
    vec2 uv = gl_FragCoord.xy/600.0;
    vec3 color = 0.5 + 0.5*cos(uTime + uv.xyx + vec3(0,2,4));
    gl_FragColor = vec4(color, 1.0);
  }
`;

const SHADER_PRESETS = {
  'gradient': {
    name: 'Gradient',
    fragment: DEFAULT_FRAGMENT_SHADER
  },
  'circles': {
    name: 'Animated Circles',
    fragment: `
      precision mediump float;
      uniform float uTime;
      
      void main() {
        vec2 uv = (gl_FragCoord.xy - 300.0) / 300.0;
        float d = length(uv);
        vec3 color = vec3(0.5 + 0.5 * sin(d * 10.0 - uTime));
        gl_FragColor = vec4(color, 1.0);
      }
    `
  },
  'plasma': {
    name: 'Plasma Effect',
    fragment: `
      precision mediump float;
      uniform float uTime;
      
      void main() {
        vec2 uv = gl_FragCoord.xy/600.0;
        float v = sin(uv.x*10.0 + uTime) + sin(uv.y*10.0) + sin((uv.x+uv.y)*10.0);
        vec3 color = vec3(sin(v), sin(v+2.0), sin(v+4.0)) * 0.5 + 0.5;
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }
};

export function Shader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPreset, setSelectedPreset] = useState('gradient');
  const [isPlaying, setIsPlaying] = useState(true);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;

    gl.shaderSource(vertexShader, DEFAULT_VERTEX_SHADER);
    gl.shaderSource(fragmentShader, SHADER_PRESETS[selectedPreset as keyof typeof SHADER_PRESETS].fragment);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Set up geometry
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'aVertexPosition');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeUniformLocation = gl.getUniformLocation(program, 'uTime');

    // Animation loop
    let startTime = Date.now();
    
    const render = () => {
      if (!isPlaying) return;
      
      const currentTime = (Date.now() - startTime) * 0.001;
      gl.uniform1f(timeUniformLocation, currentTime);
      
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedPreset, isPlaying]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Shader Playground</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.entries(SHADER_PRESETS).map(([key, preset]) => (
              <option key={key} value={key}>{preset.name}</option>
            ))}
          </select>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full aspect-square bg-black rounded-lg shadow-lg"
        />

        <div className="mt-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
          <pre className="text-green-400 text-sm">
            {SHADER_PRESETS[selectedPreset as keyof typeof SHADER_PRESETS].fragment}
          </pre>
        </div>
      </div>
    </div>
  );
}