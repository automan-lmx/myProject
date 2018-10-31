// 筛选事件通过性别
function filterArrBySex(data, sex){
    if(sex == 'all'){
        return data;
    }else{
        return data.filter(function(ele,index){
            return ele.sex == sex;
        });
    }
}