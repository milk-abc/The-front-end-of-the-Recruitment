var getLeastNumbers = function(arr,k) {
    let quicksort=function(arr,l,r){
        if(l>=r){
            return
        }
        let pivot=arr[l];
        console.log('pivot',pivot)
        let i=l,j=r;
        while(i<j){
            while(i<j){
                if(arr[j]<pivot){
                    arr[i]=arr[j];
                    break;
                }
                j-=1;
            }
            if(i<j){
                i+=1;
            }
            while(i<j){
                if(arr[i]>pivot){
                    arr[j]=arr[i];
                    break;
                }
                i+=1;
            }
            if(i<j){
                j-=1;
            }
        }
        arr[i]=pivot;
        console.log('pivot,arr',pivot,arr)
        quicksort(arr,l,i-1);
        quicksort(arr,i+1,r)
    }
    quicksort(arr,0,arr.length-1)
    return arr.slice(0,k);
};
let arr=[4,6,5,3,2]
arr1=getLeastNumbers(arr,3)
console.log(arr)
console.log(arr1)