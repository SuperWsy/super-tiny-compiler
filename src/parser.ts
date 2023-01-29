/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-28 17:12:27
 * @LastEditTime: 2023-01-29 16:11:07
 * @LastEditors: wsy
 */

import type { TokenItem } from './tokenizer';
import TokenTypes from './tokenTypes';



enum NodeTypes {
  Program = "Program",
  NumberLiteral = 'NumberLiteral',
  CallExpression = "CallExpression"
}

interface Node {
  type: NodeTypes;
}
type ChildNode = CallExpressionNode | NumberLiteralNode

interface RootNode extends Node {
  body: ChildNode[]
}

interface NumberLiteralNode extends Node {
  value: string;
}

interface CallExpressionNode extends Node {
  name: string;
  params: ChildNode[]
}

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  }
}

function createNumberLiteral(value: string): NumberLiteralNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  }
}
function createCallExpression(name: string, params: ChildNode[] = []): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params,
  }
}

export function parser(tokens: TokenItem[]) {
  let current = 0;
  const Root = createRootNode();

  function walk() {
    let token = tokens[current];
    if (token.type === TokenTypes.Number) {
      current++;
      return createNumberLiteral(token.value)
    }
    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current];
      const callExpressionNode = createCallExpression(token.value)
      token = tokens[++current];
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        callExpressionNode.params.push(walk());
        token = tokens[current];
      }
      current++;
      return callExpressionNode;
    }
    throw new TypeError(token.type);
  }
  while (current < tokens.length) {
    Root.body.push(walk())
  }

  return Root
}
