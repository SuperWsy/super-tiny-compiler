/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-06 15:09:44
 * @LastEditTime: 2023-01-06 19:40:29
 * @LastEditors: wsy
 */

describe('suite', () => {
  it.todo('unimplemented test')
})
it("toUpperCase", () => {
  const result = 'foobar'.toUpperCase()
  expect(result).toMatchSnapshot();
});
