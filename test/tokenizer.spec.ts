/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-06 15:09:44
 * @LastEditTime: 2023-01-28 16:53:14
 * @LastEditors: wsy
 */
import { tokenizer } from '../src/tokenizer'
describe('tokenizer', () => {
  it("paren", () => {
    const code = `(`
    const tokens = [
      { type: 'paren', value: '(' },
    ]
    expect(tokenizer(code)).toStrictEqual(tokens)
  });
  it("add", () => {
    const code = `add`
    const tokens = [
      { type: 'name', value: 'add' },
    ]
    expect(tokenizer(code)).toStrictEqual(tokens)
  });

  it("number", () => {
    const code = `2`
    const tokens = [
      { type: 'number', value: '2' },
    ]
    expect(tokenizer(code)).toStrictEqual(tokens)
  });
  it("tokenizer", () => {
    const code = `(add 2 (subtract 4 2))`
    const tokens = [
      { type: 'paren', value: '(' },
      { type: 'name', value: 'add' },
      { type: 'number', value: '2' },
      { type: 'paren', value: '(' },
      { type: 'name', value: 'subtract' },
      { type: 'number', value: '4' },
      { type: 'number', value: '2' },
      { type: 'paren', value: ')' },
      { type: 'paren', value: ')' },
    ]
    expect(tokenizer(code)).toStrictEqual(tokens)
  });
})
