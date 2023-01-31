
/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-31 19:57:14
 * @LastEditTime: 2023-01-31 20:16:20
 * @LastEditors: wsy
 */
import { codeGenerator } from '../src/codegen';
describe('codegen', () => {
  it('codegen', () => {
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
    expect(codeGenerator(transformerAst)).toEqual('add(2, subtract(4, 2));')
  });
})
