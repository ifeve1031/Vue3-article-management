/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    g.sort((a,b) => a-b);//升序排序
    s.sort((a,b) => a-b);
    const m = g.length;
    const n = s.length
    let count = 0;//设置下标计数
    for( let i=0; i<m; i++){
        for(let j=count; j<n; j++){
            if(g[i]<=s[j]){
                count++;
                break;
            }
        }
        
    }
    return count;
};