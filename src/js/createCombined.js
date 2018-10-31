function createCombined(config) {
    return function (data) {
        for(var props in config){
            // 这里有点像reduce的思路，保存前面的留着下一次使用
           data = config[props](data, state[props]);
        }
        return data;
    }
}

var lastResult = createCombined({
    text: filterArrByText,
    sex: filterArrBySex
})