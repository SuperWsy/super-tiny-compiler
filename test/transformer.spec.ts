/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-31 14:57:11
 * @LastEditTime: 2023-01-31 19:50:39
 * @LastEditors: wsy
 */
import { RootNode } from '../src/parser';
import { transformer } from '../src/transformer';
describe('transformer', () => {
  it('transformer', () => {
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'CallExpression',
          name: 'add',
          params: [
            {
              type: 'NumberLiteral',
              value: '2',
            },
            {
              type: 'CallExpression',
              name: 'subtract',
              params: [
                {
                  type: 'NumberLiteral',
                  value: '4',
                }, {
                  type: 'NumberLiteral',
                  value: '2',
                }
              ]
            }
          ]
        }
      ]
    } as RootNode
    const transformerAst = {
      type: 'Program',
      body: [{
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'add'
          },
          arguments: [
            {
              type: 'NumberLiteral',
              value: '2'
            },
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'subtract'
              },
              arguments: [
                {
                  type: 'NumberLiteral',
                  value: '4'
                },
                {
                  type: 'NumberLiteral',
                  value: '2'
                }
              ]
            }
          ]
        }
      }]
    }

    expect(transformer(ast)).toEqual(transformerAst)
  })
})
