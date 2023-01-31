/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-31 20:04:01
 * @LastEditTime: 2023-01-31 20:07:11
 * @LastEditors: wsy
 */
import { tokenizer } from './tokenizer';
import { parser } from './parser';
import { transformer } from './transformer';
import { codeGenerator } from './codegen';

export function compiler(input: string) {
  let tokens = tokenizer(input);
  let ast = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);
  return output;
}
