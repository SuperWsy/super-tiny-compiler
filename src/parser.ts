/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-28 17:12:27
 * @LastEditTime: 2023-01-31 20:02:51
 * @LastEditors: wsy
 */

import type { TokenItem } from './tokenizer';
import TokenTypes from './tokenTypes';



export enum NodeTypes {
  Program = "Program",
  NumberLiteral = 'NumberLiteral',
  CallExpression = "CallExpression",
  Identifier = "Identifier",
  ExpressionStatement = "ExpressionStatement"
}

export type ChildNode = CallExpressionNode | NumberLiteralNode
export type ParentNode = RootNode | CallExpressionNode

export interface RootNode {
  type: NodeTypes.Program;
  body: ChildNode[];
  _context?: ChildNode[];
}

export interface NumberLiteralNode {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface CallExpressionNode {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[],
  _context?: ChildNode[];
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
