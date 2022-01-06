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
    return `${day}//${month}//${year}`
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
    glo = object;
    for (var i = 1; i <= n; i++) {
        creatingdata(object);
    }
}
var height=table.tableheight;
function onloading() {
    generaterows(120, table)
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
        var start = mainsctop / 20;
        var end = (mainsctop + height) / 20
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
        ele.classList.add('header')
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
}
function creatingrows(y, z, ob, a) {
    if (y[z] !== undefined) {       
        rowno++
        var x = document.querySelector('.container');
        var serialdiv = createElement();
        serialdiv.innerText = z + 1;
        serialdiv.setAttribute('rowno', rowno)
        serialdiv.setAttribute('value', 'rowheader')
        var elementslength = ob.columns.length;
        var inele = x.childNodes[elementslength + 1];
        if (a === 'container') {
            x.appendChild(serialdiv);
        } else {
            inele.parentNode.insertBefore(serialdiv, inele);

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
var block = 0;
var callfunction = true;
var reverse = true;
var initial = 1;
function scrolling() {   
    
    var mainsctop = document.querySelector('.main').scrollTop;
    var top = Math.floor(mainsctop / height);
    var parent = document.querySelector('.container');
    var up_removing_start=glo.columns.length+1;
    var up_removing_end=((height/20)*up_removing_start)+up_removing_start;
    var totalcells=(height/20)*up_removing_start;
    var totalblock=glo.rows.length/(height/20);
    if (callfunction) {
        if (top === initial) {
            block = 2
            var start = (height * block) / 20;
            var end = ((height * block) + height) / 20;
            preblock = block;
            loopingrows(start, end, glo, 'container');
            callfunction = false;
            initial = 2;
        }
    }
    else {        
            if (top === initial) {
                block++;
                var start = (height * block) / 20;
                var end = ((height * block) + height) / 20;
                preblock = block;
                loopingrows(start, end, glo, 'container');              
                    for (var i = up_removing_end-1; i >= up_removing_start; i--) {                      
                        var child = parent.children[i];
                        parent.removeChild(child);
                    }               
            }        
    }
    if (mainsctop / height === 0) {       
        var length = parent.children.length;
        var down_removing_start = length-1 ;
        var down_removing_end=down_removing_start-totalcells        
        if (reverse) {
            if (preblock === 2) {                    
                console.log(`${down_removing_start} ${down_removing_end}`) ;          
                for (var i = down_removing_start; i >=down_removing_end+1; i--) {
                    var child = parent.children[i];
                    parent.removeChild(child);                   
                }
                initial = 1;
            callfunction = true;                
            }
            if (preblock === 3) {                              
                var start = 0;
                var end = height / 20;
                loopingrows(start, end, glo, 'inset');
                document.querySelector('.main').scrollTop = height-20;
                for (var i = down_removing_start; i >=down_removing_end+1; i--) {
                    var child = parent.children[i];
                    parent.removeChild(child);                   
                }
                preblock = preblock - 1;
               
            }
            if (preblock>3&&preblock<totalblock) {               
                var x = preblock - 3;               
                var start = (x * height) / 20;
                var end = ((x * height) + height) / 20;               
                loopingrows(start, end, glo, 'inset');
                document.querySelector('.main').scrollTop =height-20;
                for (var i = down_removing_start; i >=down_removing_end+1; i--){
                    var child = parent.children[i];
                    parent.removeChild(child);                   
                }
                preblock = preblock - 1;               
            }
            if(preblock===totalblock){            
                var x = preblock - 3;              
                var start = (x * height) / 20;
                var end = ((x * height) + height) / 20;               
                loopingrows(start, end, glo, 'inset');
                document.querySelector('.main').scrollTop = height-20;
                preblock=preblock-1;
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
function findingindex(ele) {
    var childs = ele.parentNode.children;
    var array = Array.from(childs)
    var index = array.indexOf(ele);
    var nth = index;
    return nth;
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
    var ele = e.target;
    var att = ele.getAttribute('value');
    if (att === 'columnheader') {
        e.preventDefault();
    }
}



