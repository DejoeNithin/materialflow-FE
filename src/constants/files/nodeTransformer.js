export const transformToNodesAndEdges = (data) => {
  let nodes = [];
  let edges = [];

  const traverse = (node, parentId) => {
    let currentNode = {
      id: node.node_id,
      data: {
        label: node.node_id,
      },
      position: { x: 0, y: 0 },
    };

    if (parentId) {
      edges.push({
        id: `e${parentId}-${node.node_id}`,
        source: parentId,
        target: node.node_id,
      });
    }

    nodes.push(currentNode);

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        traverse(child, node.node_id);
      });
    }
  };

  traverse(data, null);

  return { nodes, edges };
};
