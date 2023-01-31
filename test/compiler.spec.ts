/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-31 20:06:12
 * @LastEditTime: 2023-01-31 20:06:17
 * @LastEditors: wsy
 */
import { compiler } from '../src/index';

describe('compiler', () => {
  it('compiler', () => {
    const input = '(add 2 (subtract 4 2))';
    expect(compiler(input)).toEqual('add(2, subtract(4, 2));')
  });
})
