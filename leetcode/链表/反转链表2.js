function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (!head || !head.next || left === right) {
    return head;
  }
  let newHead = new ListNode();
  newHead.next = head;
  let startNode = newHead;
  let cnt = 1;
  while (cnt < left) {
    startNode = startNode.next;
    cnt += 1;
  }
  cnt = 1;
  let endNode = startNode.next;
  while (cnt < right - left + 2) {
    endNode = endNode.next;
    cnt += 1;
  }
  let preNode = startNode.next;
  let curNode = startNode.next.next;
  while (curNode !== endNode) {
    let next = curNode.next;
    curNode.next = preNode;
    preNode = curNode;
    curNode = next;
  }
  startNode.next.next = endNode;
  startNode.next = preNode;
  return newHead.next;
}
