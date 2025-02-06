"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const codeSnippets = [
  `// Node.js Express server
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}/\`);
});`,

  `// React functional component
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(result => setData(result));
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default DataFetcher;`,

  `// AI: Simple neural network in JavaScript
class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    
    this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes);
    this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();
    
    this.bias_h = new Matrix(this.hiddenNodes, 1);
    this.bias_o = new Matrix(this.outputNodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
  }

  feedforward(input_array) {
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);
    
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);
    
    return output.toArray();
  }
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}`,
]

const BackgroundCode: React.FC = () => {
  const snippetsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const animateSnippets = () => {
      snippetsRef.current.forEach((snippet, index) => {
        if (snippet) {
          const speed = 0.5 + index * 0.2
          snippet.style.transform = `translateY(${(Date.now() * speed) % 1000}px)`
        }
      })
      requestAnimationFrame(animateSnippets)
    }

    animateSnippets()
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          ref={(el) => (snippetsRef.current[index] = el)}
          className="absolute text-gray-600 opacity-10 text-sm whitespace-pre font-mono"
          style={{
            left: `${(index * 30) % 90}%`,
            top: `-${500 + index * 200}px`,
          }}
          whileHover={{ opacity: 0.3, transition: { duration: 0.2 } }}
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  )
}

export default BackgroundCode

