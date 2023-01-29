
/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-06 14:57:54
 * @LastEditTime: 2023-01-28 17:13:13
 * @LastEditors: wsy
 */
import TokenTypes from "./tokenTypes"

export interface TokenItem {
  type: string,
  value: string
}

const LETTERS = /[a-z]/
const NUMBERS = /\d/
const WHITESPACE = /\s/

// (add 2 (subtract 4 2))
export function tokenizer(code: string): TokenItem[] {
  const tokens: TokenItem[] = []
  let current = 0
  while (current < code.length) {
    let char = code[current]
    if (char === '(') {
      tokens.push({
        type: TokenTypes.Paren,
        value: '('
      })
      current++
      continue
    }
    if (char === ')') {
      tokens.push({
        type: TokenTypes.Paren,
        value: ')'
      })
      current++
      continue
    }
    if (LETTERS.test(char)) {
      let value = ''
      while (LETTERS.test(char) && current < code.length) {
        value += char
        char = code[++current]
      }
      tokens.push({
        type: TokenTypes.Name,
        value
      })
      continue
    }
    if (NUMBERS.test(char)) {
      let value = ''
      while (NUMBERS.test(char) && current < code.length) {
        value += char
        char = code[++current]
      }
      tokens.push({
        type: TokenTypes.Number,
        value
      })
      continue
    }
    if (WHITESPACE.test(char)) {
      current++
      continue
    }
  }
  return tokens
}
