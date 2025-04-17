# @owll/func-spy

A JavaScript/TypeScript analysis tool to find function references and call sites using AST (Abstract Syntax Tree). This CLI tool helps you analyze the usage of a function throughout your codebase by parsing JavaScript or TypeScript files.

## Features
- Identify **function calls** and **references** within a JavaScript or TypeScript file.
- Support for ECMAScript versions from 2015 (ES6) to the current year.
- Easily integrates into your development workflow to help with refactoring and debugging.

## Installation

You can install the package globally or use it directly via `npx`.

### Option 1: Install globally

```bash
npm install -g @owll/func-spy
```

### Option 2: Install globally

```bash
npx @owll/func-spy path/to/your/file.js functionName
```

## Usage

After installation, you can use the command line tool to analyze the usage of a specific function in a JavaScript or TypeScript file.

```bash
func-spy <file-path> <function-name>

<file-path>: The path to the JavaScript or TypeScript file you want to analyze.

<function-name>: The name of the function whose references and calls you want to find.
```

## Example
To analyze a function named startGame in a file called game.js:
```bash
npx @owll/func-spy game.js startGame
```
This will analyze the game.js file and search for all occurrences of the startGame function.


## Output
The tool will output a JSON object with details about the function calls and references found in the file. The output will look like this:

```json
{
  "calls": [
    {
      "line": 10,
      "arguments": ["literal_argument", "Identifier(player)"]
    },
    {
      "line": 25,
      "arguments": ["Identifier(gameId)", "literal_argument"]
    }
  ],
  "references": [
    {
      "line": 5,
      "column": 15
    },
    {
      "line": 18,
      "column": 7
    }
  ]
}
```

## Output Explanation:
```bash
calls: An array of function calls where the function is called in the file.

line: The line number where the function call occurs.

arguments: An array of arguments passed to the function, showing either the literal value or the identifier used.

references: An array of references to the function, showing where the function is referenced without being called.

line: The line number where the reference occurs.

column: The column number where the reference occurs in the line.
```

## Supported ECMAScript Versions

The tool supports ECMAScript versions from 2015 (ES6) to the current year. The parser will try parsing with different ECMAScript versions starting from the latest supported version and fall back to previous versions if parsing fails.

## Support

For support, you can reach out via [Buy Me A Coffee](https://buymeacoffee.com/yasindlklcc).

## License

This project is licensed under the MIT License.