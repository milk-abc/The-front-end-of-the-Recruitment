var addTwoNumbers = function(l1, l2) {
    let left=l1,right=l2;
    let l3=new ListNode(0),head=l3;
    let nextval=0;
    while(left!=null||right!=null||nextval!=0){
        let leftval=0,rightval=0;
        if(left){
            leftval=left.val;
        }
        if(right){
            rightval=right.val;
        }
        let val=leftval+rightval+nextval;
        if(val>=10){
            nextval=parseInt(val/10);
        }else{
            nextval=0;
        }
        val=val%10;
        l3.next=new ListNode(val)
        l3=l3.next
        if(left){
            left=left.next;
        }
        if(right){
            right=right.next;
        }
    }
    return head.next
};