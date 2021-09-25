var mergeTwoLists = function(l1, l2) {
    let left=l1,right=l2,l3=new ListNode("0");
    let head=l3;
    while(left!=null&&right!=null){
        if(left.val>=right.val){
            l3.next=right;
            right=right.next;
        }else{
            l3.next=left;
            left=left.next;
        }
        l3=l3.next;
    }
    if(left){
        l3.next=left;
    }
    if(right){
        l3.next=right;
    }
    return head.next
};