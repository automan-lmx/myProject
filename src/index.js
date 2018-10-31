var personArray = [
    { name: '李太白', sex: 'female', dex: '如果能重来，我要选李白', age: 23, img: './src/img/1.jpg' },
    { name: '李明', sex: 'male', dex: '好吧，常见的名', age: 22, img: './src/img/2.jpg' },
    { name: '王敏', sex: 'female', dex: '你好可爱啊', age: 18, img: './src/img/3.jpg' },
    { name: '刘柳', sex: 'male', dex: '瘦子', age: 21, img: './src/img/4.jpg' },
    { name: '林琳', sex: 'female', dex: '胖子', age: 44, img: './src/img/5.jpg' },
    { name: '蔡菜', sex: 'male', dex: '不，你不菜', age: 17, img: './src/img/6.jpg' },
    { name: '林大', sex: 'female', dex: '林子大了,什么鸟都有', age: 24, img: './src/img/7.jpg' },
];

// 把数据渲染到页面
var oUl = document.getElementsByTagName('ul')[0];
var oInput = document.getElementsByClassName('sText')[0];
// 全局过滤变量，耦合度高
// 当筛选条件过多就会造成冗杂
var filterText = '', filterSex = 'all';
/**
 * 动态往页面插入数据
  尽量使用纯函数思想 
*/
function insertData(data) {
    var innerData = '', innerHTML = '';
    data.forEach(function (ele, index) {
        innerData += '<li>\
        <img src="' + ele.img + '"/>\
        <p class="name">' + ele.name + '</p>\
        <p class="des">' + ele.dex + '</p>\
        </li>'
    });
    oUl.innerHTML = innerData;
}

insertData(personArray);

// 输入框输入搜索
oInput.oninput = function (e) {
    // 这里还要避免高频触发
    filterText = this.value;
    // 根据过滤之后重新渲染数据
    var matchPerson =filterPerson(personArray, filterText);
    var matchSex = filterArrBySex(matchPerson, filterSex);
    insertData(matchSex);
}

// 获取数据的事件
function event(){
    console.log(this.value);
}
// 避免高频触发的函数,防抖
function debounce(handler, delay) {
    var timer;
    var self = this, _args = arguments;
    console.log(this)
    timer = setTimeout(function () {
        clearTimeout(timer);      
        return handler.apply(self, _args);
    }, delay);
}
function filterPerson(data, text) {
    if (!text) { // 如果输入为空，直接返回原来的数据
        return data;
    } else {
        // 根据过滤规则过滤不符合筛选条件的数据
        return data.filter(function (ele, index) {
            return ele.name.indexOf(text) != -1;
        })
    }
}

/**
 * 实现点击不同的按钮进行筛选
 */
var oBtn = [].slice.call(document.getElementsByClassName('btn')); 
var lastBtn = oBtn[2];
oBtn.forEach(function (ele, index) {
    ele.onclick = function () {
        changeActive(this);
        // selectSex(this); 不推荐这种，耦合性高
        filterSex = this.getAttribute('sex');
        var newArr = filterArrBySex(personArray, filterSex);
        var newArr2 = filterPerson(newArr, filterText);
        insertData(newArr2);
    }
})

/**
 * 
 * @param {*} dom 
 * 思路就是把上次有标记的按钮存在一个变量里，
 * 当点击的时候把标记的类名给清空，
 * 然后当前的元素添加 “active"
 * 最后把当前元素作为最后一个，因为它含有active
 */
function changeActive(currentBtn) {
    lastBtn.className = 'btn';
    currentBtn.className += ' active';
    lastBtn = currentBtn;
}

/**
 * 实现根据不同性别选择响应的数据
 * 单独把 All 拿出来，然后 不同的性别就使用同一套语句来执行
 * 这种代码耦合性比较高
 */

function selectSex(dom) {
    var data = '';
    if (dom.innerText === 'All') {
        insertData(personArray);
    } else {
        data = personArray.filter(function (ele, index) {
            return ele.sex == dom.innerText;
        });
        insertData(data);
    }
}

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