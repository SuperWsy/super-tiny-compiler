/*
 * @Description: 
 * @Author: wsy
 * @Date: 2023-01-29 16:26:13
 * @LastEditTime: 2023-01-29 17:24:52
 * @LastEditors: wsy
 */
import { RootNode, ChildNode, NodeTypes } from './parser';



interface VisitorValue {
  enter(node: RootNode | ChildNode, parent: RootNode | ChildNode | null): void;
  exit(node: RootNode | ChildNode, parent: RootNode | ChildNode | null): void;
}
type VisitorKey = keyof typeof NodeTypes

type Visitor = {
  [key in VisitorKey]: VisitorValue
}

export function traverse(ast: RootNode, visitor: Visitor) {
  function traverseArray(array: ChildNode[], parent: RootNode | ChildNode) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  function traverseNode<T>(node: RootNode | ChildNode, parent: RootNode | ChildNode | null) {
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
        throw new TypeError((node as ChildNode)?.type ?? "Error");
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  traverseNode<RootNode>(ast, null);
}
