var table = {
    tableheight: 300,
    columns: [
        {
            title: 'id',
            type: 'number',
        },
        {
            title: 'name',
            type: 'string',
        },
        {
            title: 'age',
            type: 'number',
        },
        {
            title: 'gender',
            type: 'string',
        },
        {
            title: 'date',
            type: 'date'
        }, {
            title: 'attendance',
            type: 'boolean'
        }
    ],
    rows: [

    ]
}
var glo;
function generatetext() {
    var random = Math.floor(Math.random() * 10);
    return 'text' + random;
}
function generatenumber(x) {
    var random;
    if (x === 'age') {
        random = Math.floor(Math.random() * 10);
    } else {
        random = '#' + (Math.floor(Math.random() * 10) + 5000);
    }
    return random;
}
function generatedate() {
    var day = Math.floor(Math.random() * 31);
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    return `${day}/${month}/${year}`
}
function generateboolean() {
    var arr = ['true', 'false']
    random = Math.floor(Math.random() * 2);
    var value = arr[random]
    return value;
}
function creatingdata(ob) {
    var collength = ob.columns.length;
    var data = new Object();
    for (var i = 0; i < collength; i++) {
        var column = ob.columns[i];
        var proname = column.title;
        data[proname] = generating(column);
    }
    ob.rows.push(data);
}
function generating(column) {
    if (column.type === 'string') {
        return generatetext()
    } else if (column.type === 'number') {
        return generatenumber(column.title);
    } else if (column.type === 'date') {
        return generatedate();
    } else {
        return generateboolean();
    }
}
var height;
function generaterows(n, object) {
    glo = object;
    for (var i = 1; i <= n; i++) {
        creatingdata(object);
    }
}
function onloading() {
    // if(localStorage.length===0){
    // generaterows(100,table);
    //     localStorage.setItem('obj',JSON.stringify(table));        
    // }   
    // glo=JSON.parse(localStorage.getItem('obj'));
    generaterows(100, table);
    if (glo.tableheight === '') {
        glo.tableheight = 300;
    }
    height = glo.tableheight;
    creatingcolumns();
    var columns = glo.columns.length;
    var main = document.querySelector('.main');
    var container = document.querySelector('.container');
    container.style.gridTemplateColumns += ` 40px`;
    for (var i = 0; i < columns; i++) {
        container.style.gridTemplateColumns += ` 100px`;
    }
    var mainsctop = main.scrollTop;
    if (mainsctop === 0) {
        var start = Math.floor(mainsctop / 20);
        var end = Math.floor((mainsctop + height) / 20);
        var nextstart = end;
        var nextend = (height + height) / 20;
        loopingrows(start, end, glo, 'container');
        loopingrows(nextstart, nextend, glo, 'container');
    }
    container.addEventListener('click', highlight);
    container.addEventListener('dblclick', editing);
    container.addEventListener('keydown', removefocus);
    container.addEventListener('drag', draging);
    container.addEventListener('drop', droping);
    container.addEventListener('dragenter', dragentering);
    container.addEventListener('dragleave', dragleaving);
    container.addEventListener('dragover', dragovering);
}
function creatingcolumns() {
    var main = document.querySelector('.main')
    main.style.height = glo.tableheight + 'px';
    collength = glo.columns.length;
    var container = document.querySelector('.container');
    for (var i = 0; i <= collength; i++) {
        var ele = createElement();
        ele.classList.add('header');
        container.appendChild(ele)
        if (i === 0) {
            ele.innerText = 'S.NO'
        }
        else {
            ele.innerText = table.columns[i - 1].title;
            ele.setAttribute('value', 'columnheader')
            ele.setAttribute('header', i)
            ele.setAttribute('draggable', 'true');
        }
    }
}
var rowno;
function loopingrows(s, e, ob, a) {
    rowno = 0;
    var rows = ob.rows;
    if (a === 'container') {

        for (var i = s; i < e; i++) {
            creatingrows(rows, i, ob, a)
        }
    }
    else {
        for (var i = e - 1; i >= s; i--) {
            creatingrows(rows, i, ob, a)
        }
    }    
        if (highlightrow) {
            hightlightingrow(highlightrow);
        }
    
}
var highlightrowNo;
var highlightrow;
var highlighted;
function creatingrows(y, z, ob, a) {
    if (y[z] !== undefined) {
        rowno++
        var x = document.querySelector('.container');
        var serialdiv = createElement();
        serialdiv.innerText = z + 1;
        serialdiv.setAttribute('value', 'rowheader')
        var elementslength = ob.columns.length;
        var inele = x.childNodes[elementslength + 1];
        if (a === 'container') {
            x.appendChild(serialdiv);
        } else {
            inele.parentNode.insertBefore(serialdiv, inele);
        }
        if (highlighted === 'row') {
            if (highlightrowNo == (z + 1)) {
                highlightrow = serialdiv;
            }
        }
        for (var j = 0; j < elementslength; j++) {
            var div = createElement();
            var sub = ob.columns[j].title;
            div.innerText = y[z][ob.columns[j].title];
            div.setAttribute('value', 'cells');
            div.setAttribute('title', sub);
            div.setAttribute('tabindex', 1)
            div.setAttribute('index', z + 1);
            if (a === 'container') {
                x.appendChild(div);
            } else {
                inele.parentNode.insertBefore(div, inele);
            }
        }
    }
}
var block = 1;
var preblock;
function scrolling() {
    var stylesheet = document.styleSheets[0];
    var parent = document.querySelector('.container');
    var up_removing_start = glo.columns.length + 1;
    var up_removing_end = ((height / 20) * up_removing_start) + up_removing_start;
    var totalblock = Math.floor(glo.rows.length / (height / 20));
    var main = document.querySelector('.main');
    var scrollheight = main.scrollHeight;
    var clientheight = main.clientHeight;
    var scrolltop = main.scrollTop;
    var bottom = scrollheight - clientheight;
    if (scrolltop === bottom) {
        if (totalblock > block) {
            block++;
            var start = Math.floor((height * block) / 20);
            var end = Math.floor(((height * block) + height) / 20);
            preblock = block;
            if (block > 2 && block < totalblock + 1) {
                for (var i = up_removing_end - 1; i >= up_removing_start; i--) {
                    var child = parent.children[i];
                    if (child) {
                        parent.removeChild(child);
                    }
                }
                if(highlighted==='row'){
                    stylesheet.cssRules[11].selectorText = `.test`;
                }
            }
            loopingrows(start, end, glo, 'container');
        }
    }
    if (scrolltop === 0) {
        var down_removing_start;
        down_removing_start = parent.children.length - 1;
        if (preblock !== undefined) {
            block = preblock - 1;
            if (preblock > 1 && preblock <= totalblock) {
                rowstart = Math.floor((preblock * height) / 20);
                rowend = Math.floor(((preblock * height) + height) / 20);
                if (preblock > 2) {
                    var x = preblock - 3;
                    var start = (x * height) / 20;
                    var end = ((x * height) + height) / 20;
                    if(highlighted==='row'){
                        stylesheet.cssRules[11].selectorText = `.test`;
                    }
                    loopingrows(start, end, glo, 'inset');
                    document.querySelector('.main').scrollTop = height - 20;
                }
                down_removing_start = parent.children.length - 1;
                for (var i = rowstart; i < rowend; i++) {
                    for (var j = 0; j <= glo.columns.length; j++) {
                        if (glo.rows[i] != undefined) {
                            var child = parent.children[down_removing_start];
                            parent.removeChild(child);
                            down_removing_start--;
                        }
                    }
                }
                preblock = preblock - 1;
            }
        }
    }
}
function createElement() {
    var div = document.createElement('div');
    div.className = "item1";
    return div;
}
var preFocEle;
function highlight(e) {
    var att = e.target.getAttribute('value');
    var stylesheet = document.styleSheets[0];
    if (preFocEle) {
        preFocEle.removeAttribute('contenteditable');
        preFocEle.blur();
        removestyle(preFocEle);
        updatingvalue(preFocEle);
    }
    if (att === 'rowheader' || att === 'columnheader') {
        if (att === 'rowheader') {
            highlightrowNo = e.target.innerText;
            highlighted ='row';
            highlightrow = e.target;
            hightlightingrow(highlightrow);

        }
        else {
            highlighted = 'column';
            var nth = glo.columns.length + 1
            var headerno = e.target.getAttribute('header') / 1 + 1;
            stylesheet.cssRules[11].selectorText = `.item1:nth-child(${nth}n+${headerno})`;
        }
        stylesheet.cssRules[12].selectorText = '.cells'
    }
    else {
        var nth = findingindex(e.target) + 1;
        stylesheet.cssRules[11].selectorText = '.test';
        if (nth !== 1) {
            stylesheet.cssRules[12].selectorText = `.item1:nth-child(${nth})`;
        }
        preFocEle = e.target;
        e.target.focus();
    }
}
function editing(e) {
    var ele = e.target;
    var att = ele.getAttribute('value')
    if (att === 'cells') {
        ele.setAttribute('contenteditable', true);
        ele.focus();
        addingstyle(ele)
    }
}
function removefocus(e) {
    var stylesheet = document.styleSheets[0];
    var ele = e.target;
    if (ele.hasAttribute('contenteditable')) {
        if (e.keyCode === 13) {
            ele.removeAttribute('contenteditable');
            updatingvalue(ele);
            removestyle(ele);
        } else if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault();
        }
    } else {
        if (e.keyCode === 13) {
            ele.setAttribute('contenteditable', 'true');
            e.preventDefault();
            addingstyle(ele);
        } else if (e.keyCode === 37 || e.keyCode === 39) {
            var element;
            if (e.keyCode === 37) {
                element = ele.previousElementSibling;
            }
            else {
                element = ele.nextElementSibling;
            }
            if (element.getAttribute('value') === 'cells') {
                var nth = findingindex(element) + 1;
                stylesheet.cssRules[12].selectorText = `.item1:nth-child(${nth})`;
                element.focus();
            }
        }
        else if (e.keyCode === 38 || e.keyCode === 40) {
            var index = findingindex(ele)
            var addvalue = glo.columns.length + 1;
            var newindex;
            if (e.keyCode === 38) {
                newindex = index - addvalue;
            } else {
                newindex = index + addvalue;
            }
            var childs = document.querySelector('.container').children;
            var newele = childs[newindex];
            if (newele) {
                if (newele.getAttribute('value') === 'cells') {
                    stylesheet.cssRules[12].selectorText = `.item1:nth-child(${newindex + 1})`;
                    newele.focus();
                    e.preventDefault();
                    ele.blur();
                }
            }
        }
    }
}
function hightlightingrow(ele) {
    var stylesheet = document.styleSheets[0];
    var len = glo.columns.length + 1;
    var index = findingindex(ele);
    var row = index / len;
    var start = (row * len) + 1;
    var end = (start + len) - 1;   
    if (start > 0) {
        stylesheet.cssRules[11].selectorText = `.item1:nth-child(n+${start}):nth-child(-n+${end})`;
    }
}
function findingindex(ele) {
    var att = ele.getAttribute('value');
    if (att === 'rowheader' || att === 'cells') {
        var parent = document.querySelector('.container')
        var childs = parent.children;
        var array = Array.from(childs)
        var index = array.indexOf(ele);
        return index;
    }
}
function updatingvalue(ele) {
    if (ele.hasAttribute('title')) {
        var rows = glo.rows;
        var innervalue = ele.innerText;
        var row = ele.getAttribute('index');
        var title = ele.getAttribute('title');
        rows[row - 1][title] = (innervalue);
    }
}
function addingstyle(ele) {
    ele.style.position = 'relative';
    ele.style.top = '-1px';
    ele.style.left = '-2px';
    ele.style.boxShadow = '1px 2px 3px 0px gray';
}
function removestyle(ele) {
    ele.style.position = 'static';
    ele.style.boxShadow = 'none';
}
var header;
function draging(e) {   
    var stylesheet = document.styleSheets[0];
    var ele = e.target;
    var att = ele.getAttribute('value');
    if (att === 'columnheader') {
        header = ele.getAttribute('header');
    }
    var nth = glo.columns.length + 1;
    stylesheet.cssRules[11].selectorText = `.item1:nth-child(${nth}n+${header / 1 + 1})`;
}
function droping(e) {
    var stylesheet = document.styleSheets[0];
    var ele = e.target;
    ele.style.border = '1px solid #dedede'
    var att = ele.getAttribute('value');
    if (att === 'columnheader') {
        var dropheader = ele.getAttribute('header');
        var container = document.querySelector('.container');
        var nth = glo.columns.length + 1;
        stylesheet.cssRules[11].selectorText = `.item1:nth-child(${nth}n+${dropheader / 1 + 1})`;
        var firindex = glo.columns[header - 1];
        glo.columns[header - 1] = glo.columns[dropheader - 1];
        glo.columns[dropheader - 1] = firindex;
        var loopcount = container.childElementCount / nth;
        for (var i = 0; i < loopcount; i++) {
            var firstele = container.children[(nth * i) + header / 1];
            var secondele = container.children[(nth * i) + dropheader / 1];
            var temptext = firstele.innerText;
            firstele.innerText = secondele.innerText
            secondele.innerText = temptext;
            if (i !== 0) {
                var firstatt = glo.columns[header - 1].title;
                var secondatt = glo.columns[dropheader - 1].title
                firstele.setAttribute('title', firstatt);
                secondele.setAttribute('title', secondatt);
            }
        }
    }
    e.preventDefault();
}
function dragentering(e) {
    var ele = e.target;
    var att = ele.getAttribute('value');
    if (att === 'columnheader') {
        ele.style.border = '2px dashed lightgreen';
    }
}
function dragleaving(e) {
    var ele = e.target;
    var att = ele.getAttribute('value');
    if (att === 'columnheader') {
        ele.style.border = '1px solid #dedede';
    }
}
function dragovering(e) {
    e.preventDefault();
}



