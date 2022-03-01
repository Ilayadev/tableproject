var table = {
    tableheight: 600,
    columns: [
        {
            title: 'Id',
            type: 'number',
        },
        {
            title: 'Name',
            type: 'string',
        },
        {
            title: 'Age',
            type: 'number',
        },
        {
            title: 'Gender',
            type: 'string',
        },
        {
            title: 'Date',
            type: 'date'
        }, {
            title: 'Attendance',
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
    if (x === 'id') {
        random = '#' + (Math.floor(Math.random() * 10) + 5000);
    } else {
        random = Math.floor(Math.random() * 10);
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
 var columns_length;
function onloading() {
    var container = document.querySelector('.container');
    generaterows(100, table);
    if (glo.tableheight === '') {
        glo.tableheight = 300;
    }
    columns_length = glo.columns.length;
    var No_of_rows = glo.rows.length
    var dumy = document.querySelector('.dummy');
    dumy.style.height = (No_of_rows * 20) + 20 + 'px';
    height = glo.tableheight;
    creatingcolumns();
    var main = document.querySelector('.main');
    container.style.gridTemplateColumns += ` 40px`;
    for (var i = 0; i < columns_length; i++) {
        container.style.gridTemplateColumns += ` 1fr`;
    }
    var mainsctop = main.scrollTop;
    if (mainsctop === 0) {
        var start = Math.floor(mainsctop / 20);
        var end = Math.floor((mainsctop + height) / 20);
        var nextstart = end;
        var nextend = (height + height) / 20;
        loopingrows(start, end, 'container');
        loopingrows(nextstart, nextend, 'container');
    }
    container.addEventListener('click', highlight);
    container.addEventListener('dblclick', editing);
    container.addEventListener('keydown', removefocus);
    container.addEventListener('drag', draging);
    container.addEventListener('drop', droping);
    container.addEventListener('dragenter', dragentering);
    container.addEventListener('dragleave', dragleaving);
    container.addEventListener('dragover', dragovering);
    totalblock = Math.floor(glo.rows.length / (height / 20));
    three_block_children = Math.floor(((height / 20) * (columns_length + 1)) * 3);
}
function creatingcolumns() {
    var main = document.querySelector('.overall')
    main.style.height = glo.tableheight + 'px';
    var container = document.querySelector('.container');
    for (var i = 0; i <= columns_length; i++) {
        var ele = creat('container');
        ele.classList.add('header');
        container.appendChild(ele)
        if (i === 0) {
            ele.innerText = 'S.NO'
        }
        else {
            ele.innerText = glo.columns[i - 1].title;
            ele.setAttribute('value', 'columnheader')
            ele.setAttribute('header', i)
            ele.setAttribute('draggable', 'true');
        }
    }
}
var ele_index;
var children_count
function loopingrows(s, e, a) {
    var container = document.querySelector('.container');
    var stylesheet = document.styleSheets[0];
    children_count = container.childElementCount;
    if (children_count === three_block_children + (columns_length + 1)) {
        removelements = true;
    } else {
        removelements = false;
    }
    var rows = glo.rows;
    if (a === 'container') {
        for (var i = s; i < e; i++) {
            creatingrows(rows, i, a)
        }
    }
    else {
        ele_index = Math.floor(((height / 20) * (columns_length + 1)) * 2) + columns_length;
        for (var i = e - 1; i >= s; i--) {
            creatingrows(rows, i, a)
        }
    }
    if (highlighted === 'row') {
        if (highlightrowNo > s) {
            hightlightingrow(highlightrow);
        }
    }
}
var removelements;
var creat = (str) => {
    var container = document.querySelector('.container');
    var div
    if (str === 'container') {
        if (children_count == three_block_children + (columns_length + 1)) {
            div = container.childNodes[columns_length + 1];
        }
        else {
            div = document.createElement('div');

        }
    } else {
        div = container.childNodes[ele_index];
        if (div === undefined) {
            div = document.createElement('div');
        }
    }
    div.classList.add('item1')
    return div;
}
var highlightrowNo;
var highlightrow;
var highlighted;
function creatingrows(y, z, a) {
    var container = document.querySelector('.container');
    var elementslength = glo.columns.length;
    if (y[z] !== undefined) {
        var x = document.querySelector('.container');
        ele_index++;
        var serialdiv = creat(a);
        serialdiv.innerText = z + 1;
        serialdiv.setAttribute('value', 'rowheader')
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
            ele_index++;
            var div = creat(a);
            var sub = glo.columns[j].title;
            div.innerText = y[z][glo.columns[j].title];
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
    else {
        if (removelements) {
            ele_index = 7;
            container.childNodes[ele_index].remove();
            for (var i = 0; i < elementslength; i++) {
                container.childNodes[ele_index].remove();
            }
        }
    }
}
var block = 0;
var preblock;
var totalblock;
function mainscrolling() {
    var overall = document.querySelector('.overall');
    var main = document.querySelector('.main');
    var scrollheight = main.scrollHeight;
    var clientheight = main.clientHeight;
    var scrolltop = main.scrollTop;
    var bottom = scrollheight - clientheight;
    if (scrolltop === bottom) {
        if (totalblock > block) {
            block++;
            preblock = block
            overall.scrollTop = block * height;
        }
    }
    if (scrolltop === 0) {
        if (preblock > 0) {
            if (preblock != 0) {
                preblock = preblock - 1;
                block = preblock;
            }
            overall.scrollTop = preblock * height;
        }
    }
}
var preFocEle;
function highlight(e) {
    var att = e.target.getAttribute('value');
    var stylesheet = document.styleSheets[0];
    if (preFocEle) {
        if (preFocEle.hasAttribute('contenteditable')) {
            updatingvalue(preFocEle);
        }
        preFocEle.removeAttribute('contenteditable');
        preFocEle.blur();
        removestyle(preFocEle);
    }
    if (att === 'rowheader' || att === 'columnheader') {
        if (att === 'rowheader') {
            highlightrowNo = e.target.innerText;
            highlighted = 'row';
            highlightrow = e.target;
            var nextele = e.target.nextElementSibling;
            hightlightingrow(highlightrow);
            hightlightingrow(nextele);
            nextele.focus();
            preFocEle = nextele;
        }
        else {
            highlighted = 'column';
            var nth = glo.columns.length + 1
            var headerno = e.target.getAttribute('header') / 1 + 1;
            stylesheet.cssRules[11].selectorText = `.item1:nth-child(${nth}n+${headerno})`;
            stylesheet.cssRules[12].selectorText = '.cells'
        }
    }
    else {
        var nth = findingindex(e.target) + 1;
        highlighted = 'cells';
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
        stylesheet.cssRules[11].selectorText = `.test`;
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
    var att = ele.getAttribute('value')
    if (start > 0) {
        if (att === 'rowheader') {
            stylesheet.cssRules[11].selectorText = `.item1:nth-child(n+${start}):nth-child(-n+${end})`;
        }
        else {
            stylesheet.cssRules[12].selectorText = `.item1:nth-child(${index + 1})`;
        }
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
    var rows
    if (ele.hasAttribute('title')) {
        rows = glo.rows
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
    e.preventDefault();
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
    e.preventDefault();
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
var previousblock = 0;
var rowarr = [0, 1];
var sc = 0;
function overallscrolling(e) {
    e.preventDefault();
    var overall = document.querySelector('.overall');
    var overallTop = overall.scrollTop;
    var main = document.querySelector('.main')
    var checking = Math.round(overallTop / height);
    if (checking != previousblock) {
        if (checking === totalblock) {
            block = checking
            preblock = checking;
            printing(checking - 2, 'down');
            printing(checking - 1, 'down');
            printing(checking, 'down');
        } else if (checking == 0) {
            printing(checking + 2, 'up');
            printing(checking + 1, 'up');
            printing(checking, 'up');
            block = checking;
            preblock = checking
        } else {
            if (previousblock > checking) {
                printing(checking + 1, 'up');
                printing(checking, 'up');
                printing(checking - 1, 'up');
                preblock = checking;
            } else {
                printing(checking - 1, 'down');
                printing(checking, 'down');
                printing(checking + 1, 'down');
                block = checking
            }

        }
        previousblock = checking;
    }
    else {
        main.scrollTop = sc + overallTop % height;
    }
    if (overallTop === 0) {
        block = 0;
        main.scrollTop = 0;
    }
}
var three_block_children;
function printing(x, dir) {
    var overall = document.querySelector('.overall');
    var scrolltop = overall.scrollTop;
    var scrollHeight = overall.scrollHeight
    var container = document.querySelector('.container');
    var main = document.querySelector('.main');
    var childs = container.childElementCount;
    var include = rowarr.includes(x);
    if (x >= 0) {
        if (include) {
        }
        else {
            var start = Math.floor((height * x) / 20);
            var end = Math.floor(((height * x) + height) / 20);
            if (dir === 'down') {
                sc = height;
                if (x <= totalblock) {
                    rowarr.push(x);
                }
                loopingrows(start, end, 'container')
                if (childs >= three_block_children + (columns_length + 1)) {
                    rowarr.shift();
                }
            }
            else {
                sc = 0;
                rowarr.unshift(x);
                loopingrows(start, end, 'inset')
                rowarr.pop()
            }
        }
        if (scrolltop === 0) {
            main.scrollTop = 0;
        } else if (scrolltop === scrollHeight - height) {
            main.scrollTop = height * 2;
        } else {
            main.scrollTop = height;
        }
    }
}














