// 通过文本来过滤数据
function filterArrByText(data, text) {
    if (!text) { // 如果输入为空，直接返回原来的数据
        return data;
    } else {
        // 根据过滤规则过滤不符合筛选条件的数据
        return data.filter(function (ele, index) {
            return ele.name.indexOf(text) != -1;
        })
    }
}