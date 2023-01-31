/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-29 16:26:13
 * @LastEditTime: 2023-01-31 19:33:52
 * @LastEditors: wsy
 */

import { RootNode, ChildNode, NodeTypes, ParentNode } from './parser';

type MethodFn = (node: RootNode | ChildNode, parent?: ParentNode) => void;

interface VisitorValue {
  enter?: MethodFn;
  exit?: MethodFn;
}
type VisitorKey = keyof typeof NodeTypes

type Visitor = {
  [key in VisitorKey]?: VisitorValue
}

export function traverse(ast: RootNode, visitor: Visitor) {
  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node: RootNode | ChildNode, parent?: ParentNode) {
    const methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case NodeTypes.NumberLiteral:
        break;
      default:
        break;
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  traverseNode(ast);
}
