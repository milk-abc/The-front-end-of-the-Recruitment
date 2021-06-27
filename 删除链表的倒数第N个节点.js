//先定义一个与head距离n个位置的指针nthnode，并将head赋值l1
//接着进行移动，如果nthnode指向最后一个结点，代表l1指向倒数第n+1个节点
//删除l1后的节点用l1.next=l1.next.next，返回head
//如果要删除的是头结点的话，此时nthnode必指向null,返回head.next
var removeNthFromEnd = function(head, n) {
    let l1=head,nthnode=head;
    while(n&&nthnode){
        nthnode=nthnode.next;
        n--;
    }
    if(!nthnode){
        return head.next
    }
    while(nthnode.next){
        l1=l1.next;
        nthnode=nthnode.next;
    }
    l1.next=l1.next.next;
    return head
};