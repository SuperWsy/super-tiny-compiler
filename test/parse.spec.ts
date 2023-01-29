/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-28 17:10:15
 * @LastEditTime: 2023-01-29 16:05:36
 * @LastEditors: wsy
 */
import { tokenizer } from '../src/tokenizer';
import { parser } from '../src/parser'
describe('parser', () => {
  it('Number', () => {
    const tokens = [
      { type: 'number', value: '2' },
    ]
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'NumberLiteral',
          value: '2',
        }
      ]
    }
    expect(parser(tokens)).toStrictEqual(ast)
  });
  it('CallExpression', () => {
    const tokens = [
      { type: 'paren', value: '(' },
      { type: 'name', value: 'add' },
      { type: 'number', value: '2' },
      { type: 'number', value: '4' },
      { type: 'paren', value: ')' },
    ]
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
              type: 'NumberLiteral',
              value: '4',
            }
          ]
        }
      ]
    }
    expect(parser(tokens)).toStrictEqual(ast)
  });
  it('parser', () => {
    const tree = {
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
    }
    const code = `(add 2 (subtract 4 2))`
    const tokens = tokenizer(code)
    expect(parser(tokens)).toStrictEqual(tree)
  });
})
