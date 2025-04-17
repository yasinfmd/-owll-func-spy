#!/usr/bin/env node
const fs = require('fs');
const acorn = require('acorn');
const walk = require('acorn-walk');

const currentYear = new Date().getFullYear();
const supportedVersions = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

const tryParse = (code) => {
  for (const ver of supportedVersions) {
    try {
      return acorn.parse(code, {
        ecmaVersion: ver,
        sourceType: 'module',
        locations: true,
      });
    } catch (err) {
        console.info(`Parsing failed for ECMAScript ${ver}, trying next version...`);
    }
  }
  throw new Error('Parsing failed. Could not parse file with supported ECMAScript versions.');
};

const analyzeFunctionCalls = (filepath, functionName) => {
  const code = fs.readFileSync(filepath, 'utf-8');
  const ast = tryParse(code);

  const calls = [];
  const references = [];

  walk.simple(ast, {
    CallExpression(node) {
      if (
        node.callee.type === 'Identifier' &&
        node.callee.name === functionName
      ) {
        calls.push({
          line: node.loc.start.line,
          arguments: node.arguments.map((arg) => {
            if (arg.type === 'Literal') return arg.value;
            if (arg.type === 'Identifier') return `Identifier(${arg.name})`;
            return `Expr(${arg.type})`;
          }),
        });
      }
    },
    Identifier(node) {
      if (node.name === functionName) {
        references.push({ line: node.loc.start.line, column: node.loc.start.column });
      }
    }
  });

  return { calls, references };
};

const targetFile = process.argv[2];       
const functionName = process.argv[3];

if (!targetFile) {
  console.error('Please provide a .js file name');
  process.exit(1);
}

const result = analyzeFunctionCalls(targetFile, functionName);
console.log(JSON.stringify(result, null, 2));
