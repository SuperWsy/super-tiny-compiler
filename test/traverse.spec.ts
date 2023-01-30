/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-29 16:26:31
 * @LastEditTime: 2023-01-30 16:17:06
 * @LastEditors: wsy
 */
import { traverse } from '../src/traverse';
import { RootNode } from '../src/parser';

describe('traverse', () => {
  it('traverse', () => {
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
    const classArr: string[] = []
    traverse(ast, {
      Program: {
        enter(node, parent) {
          classArr.push('Program-enter')
        },
        exit(node, parent) {
          classArr.push('Program-exit')
        },
      },
      CallExpression: {
        enter(node, parent) {
          classArr.push('CallExpression-enter')
        },
        exit(node, parent) {
          classArr.push('CallExpression-exit')
        },
      },

      NumberLiteral: {
        enter(node, parent) {
          classArr.push('NumberLiteral-enter')
        },
        exit(node, parent) {
          classArr.push('NumberLiteral-exit')
        },
      },
    })
    expect(classArr).toStrictEqual([
      'Program-enter',
      'CallExpression-enter',
      'NumberLiteral-enter',
      'NumberLiteral-exit',
      'CallExpression-enter',
      'NumberLiteral-enter',
      'NumberLiteral-exit',
      'NumberLiteral-enter',
      'NumberLiteral-exit',
      'CallExpression-exit',
      'CallExpression-exit',
      'Program-exit'
    ])
  });
})
