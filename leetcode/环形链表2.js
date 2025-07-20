var detectCycle = function (head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    //从最开始slow就等于fast，所以必须要先走
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) {
      break;
    }
  }
  if (!fast || !fast.next) {
    return null;
  }
  slow = head;
  while (slow != fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
};
