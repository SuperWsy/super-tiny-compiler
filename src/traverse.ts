/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-29 16:26:13
 * @LastEditTime: 2023-01-30 18:11:00
 * @LastEditors: wsy
 */
import { RootNode, ChildNode, NodeTypes } from './parser';



interface VisitorValue {
  enter(node: RootNode | ChildNode, parent?: RootNode | ChildNode): void;
  exit(node: RootNode | ChildNode, parent?: RootNode | ChildNode): void;
}
type VisitorKey = keyof typeof NodeTypes

type Visitor = {
  [key in VisitorKey]?: VisitorValue
}

export function traverse(ast: RootNode, visitor: Visitor) {
  function traverseArray(array: ChildNode[], parent: RootNode | ChildNode) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }  

  function traverseNode(node: RootNode | ChildNode, parent?: RootNode | ChildNode) {
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
