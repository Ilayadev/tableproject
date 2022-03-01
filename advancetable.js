var table = {
    tableheight: '300',
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
            type: 'Boolean'
        }
    ],
    rows: [

    ]
}
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
function generaterows(n, object) {
    var dumy = document.querySelector('.dummy');
    dumy.style.height = (n * 20) + 20 + 'px';
    for (var i = 1; i <= n; i++) {
        creatingdata(object);
    }
}
function creatingcolumns(ob) {
    glo = ob;
    var columns = ob.columns.length;
    var container = document.querySelector('.container');
    container.style.gridTemplateColumns += ` 40px`;
    for (var i = 0; i < columns; i++) {
        container.style.gridTemplateColumns += ` 100px`;
    }
    container.addEventListener('click', highlight);
    container.addEventListener('dblclick', editing);
    container.addEventListener('keydown', removefocus);
    container.addEventListener('drag', draging);
    container.addEventListener('drop', droping);
    container.addEventListener('dragenter', dragentering);
    container.addEventListener('dragleave', dragleaving);
    container.addEventListener('dragover', dragovering);
    container.addEventListener('dragend', dragend);
}
var preFocEle;
var highlightrow;
function highlight(e) {
    var att = e.target.getAttribute('value');
    var stylesheet = document.styleSheets[0];
    if (att === 'rowheader' || att === 'columnheader') {
        if (att === 'rowheader') {
            highlightrow = e.target.innerText;
            var len = glo.columns.length;
            var rowno = e.target.getAttribute('rowno');
            var start = (rowno * (len + 1)) + 1;
            var end = start + len;
            stylesheet.cssRules[11].selectorText = `.item1:nth-child(n+${start}):nth-child(-n+${end})`;
        }
        else {
            var nth = glo.columns.length + 1
            var headerno = e.target.getAttribute('header') / 1 + 1;
            stylesheet.cssRules[11].selectorText = `.item1:nth-child(${nth}n+${headerno})`;
        }
        stylesheet.cssRules[12].selectorText = '.cells'
    }
    else {
        if (preFocEle) {
            preFocEle.removeAttribute('contenteditable');
            preFocEle.blur();
            removestyle(preFocEle);
            updatingvalue(preFocEle);
        }
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
function creatingelements() {
    generaterows(100000, table)
    creatingcolumns(table)
    if (table.tableheight === '') {
        table.tableheight = '300'
    }
    var col = table.columns.length + 1;
    var rows = table.tableheight / 20;
    var totalele = col * rows
    var main = document.querySelector('.main')
    main.style.height = table.tableheight + 'px';
    var container = main.querySelector('.container')
    for (var i = 0; i < totalele; i++) {
        var ele = document.createElement('div');
        ele.classList.add('item1')
        container.appendChild(ele);
    }
    for (var i = 0; i < col; i++) {
        var ele = container.children[i];
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
    var mainsctop = main.scrollTop;
    var start = mainsctop / 20;
    var end = (mainsctop + table.tableheight) / 20;
    assingvalue(start, end, table)
}
var n = 7;
function assingvalue(start, end, ob) {
    var row = start;
    var parent = document.querySelector('.container');
    var collen = ob.columns.length;
    var prerow;
    var arr = ob.rows.slice(start, end);
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < collen + 1; j++) {
            var ele = parent.children[n];
            if (ele) {
                if (j === 0) {
                    ele.innerText = row + 1;
                    ele.setAttribute('value', 'rowheader');
                    ele.setAttribute('rowno', i + 1);
                } else {
                    var obj = arr[i];
                    var title = ob.columns[j - 1].title;
                    var values = obj[title];
                    ele.innerText = values;
                    ele.setAttribute('value', 'cells');
                    ele.setAttribute('rowno', i + 1)
                    ele.setAttribute('title', title);
                    ele.setAttribute('tabindex', 1)
                    ele.setAttribute('index', row + 1);
                }
            }
            n++;
        }
        var stylesheet = document.styleSheets[0];
        stylesheet.cssRules[11].selectorText = '.test';
        row++;
    }
}
function scrolling() {
    n = 7;
    var main = document.querySelector('.main')
    var mainsctop = main.scrollTop;
    if (mainsctop >= 0) {
        // if (mainsctop % 2 === 0) {
        var start = Math.floor(mainsctop / 20);
        var end = Math.floor((mainsctop / 1 + table.tableheight / 1) / 20);
        assingvalue(start, end, table);
        // }
    }
}
var header;
function findingindex(ele) {
    var childs = ele.parentNode.children;
    var array = Array.from(childs)
    var index = array.indexOf(ele);
    var nth = index;
    return nth;
}
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
    ele.style.border = '1px solid lightgreen'
    var att = ele.getAttribute('value');
    if (att === 'columnheader') {
        var dropheader = ele.getAttribute('header');
        var container = document.querySelector('.container');
        var nth = glo.columns.length + 1;
        stylesheet.cssRules[11].selectorText = `.item1:nth-child(${nth}n+${dropheader / 1 + 1})`;
        var firindex = glo.columns[header - 1];
        glo.columns[header - 1] = glo.columns[dropheader - 1];
        glo.columns[dropheader - 1] = firindex;
        var firstele = container.children[header];
        var secondele = container.children[dropheader];
        var temptext = firstele.innerText;
        firstele.innerText = secondele.innerText
        secondele.innerText = temptext;
        scrolling(container);
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
function dragend(e) {
    var ele = e.target;
    var att = ele.getAttribute('value');
    if (att === 'columnheader') {

    }
}
function dragovering(e) {
    var ele = e.target;
    var att = ele.getAttribute('value');
    if (att === 'columnheader') {
        e.preventDefault();
    }
}
function updatingvalue(ele) {
    var rows = glo.rows;
    var innervalue = ele.innerText;
    var row = ele.getAttribute('index');
    var title = ele.getAttribute('title');
    rows[row - 1][title] = (innervalue);
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







