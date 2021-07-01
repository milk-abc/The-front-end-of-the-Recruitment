//双指针，从后往前遍历，取较大值放在数组末尾
var merge = function(A, m, B, n) {
    let i=m-1,j=n-1,k=m+n-1;
    while(i>=0||j>=0){
        let cur=0;
        if(i==-1){
            cur=B[j--];
        }
        else if(j==-1){
            cur=A[i--];
        }
        if(A[i]>=B[j]){
            cur=A[i--];
        }
        else if(A[i]<B[j]){
            cur=B[j--];
        }
        A[k--]=cur;
    }
};