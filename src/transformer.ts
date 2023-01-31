/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-31 14:56:40
 * @LastEditTime: 2023-01-31 19:53:47
 * @LastEditors: wsy
 */
import { RootNode, ChildNode, NodeTypes } from './parser';
import { traverse } from './traverse';
import { CallExpressionNode } from './parser';


export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeTypes.Program,
    body: [],
  }
  ast._context = newAst.body;

  traverse(ast, {
    CallExpression: {
      enter(node, parent) { 
        if (node.type === NodeTypes.CallExpression) {
          let expression: any = {
            type: NodeTypes.CallExpression,
            callee: {
              type: NodeTypes.Identifier,
              name: node.name,
            },
            arguments: [],
          }
          node._context = expression.arguments

          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: NodeTypes.ExpressionStatement,
              expression,
            }
          }
          parent?._context?.push(expression)
        }
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          parent?._context?.push({
            type: NodeTypes.NumberLiteral,
            value: node.value,
          })
        }
      }
    }
  })
  return newAst
}
