class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
}
  
class Tree {
    constructor(array) {
    this.root = this.buildTree(array.sort().filter((value, index) => array.indexOf(value) === index)); // Sort and remove duplicates
}

    buildTree(array) {
        if (array.length === 0) return null;
        const midIndex = Math.floor(array.length / 2);
        const root = new Node(array[midIndex]);
        root.left = this.buildTree(array.slice(0, midIndex));
        root.right = this.buildTree(array.slice(midIndex + 1));
        return root;
    }

    insert(value) {
        let currentNode = this.root;
        while (currentNode) {
        if (value < currentNode.data) {
            if (!currentNode.left) {
            currentNode.left = new Node(value);
            break;
            }
            currentNode = currentNode.left;
        } else if (value > currentNode.data) {
            if (!currentNode.right) {
            currentNode.right = new Node(value);
            break;
            }
            currentNode = currentNode.right;
        } else {
            // Handle duplicate values (optional: throw error or ignore)
            break;
        }
        }
    }

    deleteItem(value) {
        let parentNode = null;
        let currentNode = this.root;
        while (currentNode) {
            if (value < currentNode.data) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } 
            else if (value > currentNode.data) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } 
            else {
                // Node found for deletion
                if (!currentNode.left) {
                    if (parentNode) {
                        if (parentNode.left === currentNode) {
                        parentNode.left = currentNode.right;
                        } 
                        else {
                        parentNode.right = currentNode.right;
                        }
                    } 
                    else {
                        this.root = currentNode.right; // Update root if deleting root node
                    }
                } 
                else if (!currentNode.right) {
                    if (parentNode) {
                        if (parentNode.left === currentNode) {
                        parentNode.left = currentNode.left;
                        } 
                        else {
                        parentNode.right = currentNode.left;
                        }
                    } 
                    else {
                        this.root = currentNode.left; // Update root if deleting root node
                    }
                } 
                else {
                    // Node has two children: find in-order successor
                    let successorParent = currentNode;
                    let successor = currentNode.right;
                    while (successor.left) {
                        successorParent = successor;
                        successor = successor.left;
                    }
                    // Copy successor value to current node
                    currentNode.data = successor.data;
                    // Delete the successor node (which has at most one child)
                    if (successorParent === currentNode) {
                        successorParent.right = successor.right;
                    } 
                    else {
                        successorParent.left = successor.right;
                    }
                }
                break;
            }
        }
    }

    find(value) {
        let currentNode = this.root;
        while (currentNode) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } 
            else if (value > currentNode.data) {
                currentNode = currentNode.right;
            } 
            else {
                return currentNode;
            }
        }
        return null;
    }

    // Level order traversal (iterative)
    levelOrder(callback) {
        const queue = [];
        queue.push(this.root);
        let currentNode;
        while (queue.length) {
            currentNode = queue.shift();
            if (callback) {
                callback(currentNode.data);
            }
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
        return queue.map(node => node.data); // Return array of values if no callback
    }

    // Depth-first traversals (recursive)
    inOrder(callback) {
        const traverse = (node) => {
          if (node) {
            traverse(node.left);
            if (callback) {
              callback(node.data);
            }
            traverse(node.right);
          }
        };
        traverse(this.root);
        return this.inOrder.length ? this.inOrder : []; // If callback used, return empty array
    }
      
    preOrder(callback) {
        const traverse = (node) => {
            if (node) {
            if (callback) {
                callback(node.data);
            }
            traverse(node.left);
            traverse(node.right);
            }
        };
        traverse(this.root);
        return this.preOrder.length ? this.preOrder : [];
    }
    
    postOrder(callback) {
        const traverse = (node) => {
            if (node) {
            traverse(node.left);
            traverse(node.right);
            if (callback) {
                callback(node.data);
            }
            }
        };
        traverse(this.root);
        return this.postOrder.length ? this.postOrder : [];
    }
    
    height(node = this.root) {
    if (!node) return -1; // Height of empty tree is -1
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
    }
    
    depth(node = this.root) {
        if (!node) return -1; // Depth of null node is -1 (not root)
        if (node === this.root) return 0; // Depth of root is 0
        let parent = this.root;
        let current = node;
        let depth = 0;
        while (current) {
            if (current === parent.left) {
            depth++;
            parent = current;
            current = current.left;
            } else if (current === parent.right) {
            depth++;
            parent = current;
            current = current.right;
            }
        }
        return depth;
    }
    
    isBalanced() {
        const checkBalance = (node) => {
            if (!node) return 0; // Balance factor of empty tree is 0
            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);
            const balanceFactor = Math.abs(leftHeight - rightHeight);
            return balanceFactor <= 1 && checkBalance(node.left) <= 1 && checkBalance(node.right) <= 1;
        };
        return checkBalance(this.root);
    }
    
    rebalance() {
        const values = this.inOrder(); // Get in-order traversal for balanced rebuild
        this.root = this.buildTree(values); // Rebuild tree from sorted values
    }
    
}

function getRandomNumbers(count) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
}
  
  const tree = new Tree(getRandomNumbers(20));
  
  console.log("Is balanced:", tree.isBalanced());
  
  console.log("Level order:", tree.levelOrder(value => console.log(value)));
  console.log("Pre-order:", tree.preOrder(value => console.log(value)));
  console.log("Post-order:", tree.postOrder(value => console.log(value)));
  console.log("In-order:", tree.inOrder(value => console.log(value)));
  
  // Unbalance the tree
  tree.insert(150);
  tree.insert(200);
  tree.insert(250);
  
  console.log("\nAfter adding unbalanced elements:");
  console.log("Is balanced:", tree.isBalanced());
  
  // Rebalance the tree
  tree.rebalance();
  
  console.log("\nAfter rebalancing:");
  console.log("Is balanced:", tree.isBalanced());
  
  console.log("Level order:", tree.levelOrder(value => console.log(value)));
  console.log("Pre-order:", tree.preOrder(value => console.log(value)));
  console.log("Post-order:", tree.postOrder(value => console.log(value)));
  console.log("In-order:", tree.inOrder(value => console.log(value)));
  