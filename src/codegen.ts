/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-31 19:58:00
 * @LastEditTime: 2023-01-31 20:18:36
 * @LastEditors: wsy
 */
import { NodeTypes } from './parser';

export function codeGenerator(node: any): string {
  switch (node.type) {
    case NodeTypes.Program:
      return node.body.map(codeGenerator)
        .join('\n');

    case NodeTypes.CallExpression:
      return `${node.callee.name}(${node.arguments.map(codeGenerator).join(', ')})`

    case NodeTypes.ExpressionStatement:
      return codeGenerator(node.expression) + ';'

    case NodeTypes.NumberLiteral:
      return node.value

    default:
      throw new Error('Unknown node type: ' + node.type)
  }
}

