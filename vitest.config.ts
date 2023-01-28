/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-06 15:04:35
 * @LastEditTime: 2023-01-28 16:10:10
 * @LastEditors: wsy
 */
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
