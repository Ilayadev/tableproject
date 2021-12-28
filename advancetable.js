var table = {
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
    var dumy = document.querySelector('.dummy');
    dumy.style.height = (n * 20) + 20 + 'px';
    for (var i = 1; i <= n; i++) {
        creatingdata(object);
    }
    creatingcolumns(object);
}
function creatingcolumns(ob) {
    glo = ob;
    var columns = ob.columns.length;
    var headerrow = ob.headerrow;
    var serial = createElement();
    serial.innerText = 'S.NO';
    serial.style.position = 'sticky';
    serial.style.top = '0px';
    serial.style.backgroundColor = '#fff';
    var container = document.querySelector('.container');
    container.style.gridTemplateColumns += ` 40px`;
    container.appendChild(serial);
    container.style.gridTemplateColumns += ob.serialcolumn;
    for (var i = 0; i < columns; i++) {
        container.style.gridTemplateColumns += ` 1fr`;
        var div = createElement();
        div.setAttribute('header', i + 2);
        div.setAttribute('value', 'header');
        div.innerText = ob.columns[i].title;
        div.style.position = 'sticky';
        div.style.top = '0px';
        div.style.backgroundColor = '#fff';
        container.appendChild(div);
    }
    container.addEventListener('click', highlight);
    container.addEventListener('dblclick', editing);
    container.addEventListener('keydown', removefocus);
}
var rowno;
function loopingrows(s, e, ob) {
    rowno = 0;
    var rows = ob.rows;
    for (var i = s; i < e; i++) {

        creatingrows(rows, i, ob)
    }
}
function creatingrows(y, z, ob) {
    if (y[z] !== undefined) {
        rowno++
        var x = document.querySelector('.container');
        var serialdiv = createElement();
        serialdiv.setAttribute('rows', 'yes')
        serialdiv.innerText = z + 1;
        serialdiv.setAttribute('rowno', rowno)
        serialdiv.setAttribute('value', 'row')
        x.appendChild(serialdiv);
        var elementslength = ob.columns.length;
        for (var j = 0; j < elementslength; j++) {
            var div = createElement();
            div.setAttribute('cells', 'yes');
            div.setAttribute('tabindex', 1);
            if (j === 0) {
                div.innerText = y[z][ob.columns[j].title];
            } else {
                var sub = ob.columns[j].title;
                if (sub !== 'total') {
                    // total += (y[z][sub]) / 1;
                } else {
                    y[z][sub] = total;
                }
                div.innerHTML = y[z][sub];
            }
            div.setAttribute('name', ob.columns[j].title);
            div.setAttribute('rowno', z + 1)
            x.appendChild(div);

        }
    }
}
function createElement() {
    var div = document.createElement('div');
    div.className = "item1";
    return div;
}
function highlight(e) {
    if (document.querySelector('.highlight')) {
        var ele = document.querySelectorAll('.highlight');
        ele.forEach(x => {
            x.classList.remove('highlight')
        })
    }
    var att = e.target.getAttribute('value');
    var stylesheet = document.styleSheets[0];
    stylesheet.cssRules[11].style.backgroundColor = '#8c9998';
    if (att === 'row' || att === 'header') {
        if (att === 'row') {
            var len = glo.columns.length;
            var rowno = e.target.getAttribute('rowno');
            var start = (rowno * (len + 1)) + 1;
            var end = start + len;
            stylesheet.cssRules[11].selectorText = `.item1:nth-child(n+${start}):nth-child(-n+${end})`;
        }
        else {
            var nth = glo.columns.length + 1
            var headerno = e.target.getAttribute('header');
            stylesheet.cssRules[11].selectorText = `.item1:nth-child(${nth}n+${headerno})`;
        }
    }
    else {
        var childs = e.target.parentNode.children;
        var array = Array.from(childs)
        var index = array.indexOf(e.target);
        var nth = index + 1;
        stylesheet.cssRules[11].selectorText = `.item1:nth-child(${nth})`;
    }
    console.log('hii');
}
function editing(e) {
    var ele = e.target
    if (ele.hasAttribute('cells')) {
        ele.setAttribute('contenteditable', true);
        ele.focus();
    }
}
function removefocus(e) {
    var stylesheet = document.styleSheets[0];
    stylesheet.cssRules[11].style.backgroundColor = 'transparent';
    if (document.querySelector('.highlight')) {
        var ele = document.querySelectorAll('.highlight');
        ele.forEach(x => {
            x.classList.remove('highlight')
        })
    }
    var ele = e.target;
    var row = glo.rows;
    if (e.keyCode === 13 || e.keyCode === 9) {
        ele.setAttribute('contenteditable', 'false')
        // var innervalue = ele.innerText;
        // var row = ele.getAttribute('rowno');
        // var value = ele.getAttribute('name');
        // row[row - 1][value] = (innervalue) / 1;
    } if (e.keyCode === 37 || e.keyCode === 39) {
        ele.setAttribute('contenteditable', 'false');
        var element;
        if (e.keyCode === 37) {
            element = ele.previousElementSibling;
        }
        else {
            element = ele.nextElementSibling;
        }
        if (element) {
            element.focus();
        }
    }
    if (e.keyCode === 38 || e.keyCode === 40) {
        ele.setAttribute('contenteditable', 'false');
        var childs = ele.parentNode.children;
        var array = Array.from(childs)
        var index = array.indexOf(ele);
        var addvalue = glo.columns.length + 1;
        var newindex;
        if (e.keyCode === 38) {
            newindex = index - addvalue;
        } else {
            newindex = index + addvalue;
        }
        var newele = childs[newindex];
        if (newele) {
            newele.focus();
        }
    }

}
function creatingdialogue() {
    var overley = document.querySelector('.overley')
    overley.style.display = 'inline-flex';
    var elements = glo.columns.length;
    var box = document.querySelector('.dialogue')
    for (var i = 0; i < elements; i++) {
        var name = glo.columns[i].title;
        if (name !== 'total') {
            var lable = document.createElement('label');
            var input = document.createElement('input');
            lable.setAttribute('class', name);
            lable.innerText = name + ':';
            input.setAttribute('id', name);
            box.appendChild(lable);
            box.appendChild(input);
        }
    }
    var button = document.createElement('button');
    button.innerText = 'Add';
    button.style.alignSelf = 'center';
    button.addEventListener('click', addingrow)
    button.classList.add('button')
    box.appendChild(button)
        ;
}
function addingrow() {
    var elements = glo.columns.length;
    var box = document.querySelector('.dialogue')
    var newrow = new Object();
    for (var i = 0; i < elements; i++) {
        var name = glo.columns[i].title
        if (name !== 'total') {
            var ele = box.querySelector('#' + name);
            newrow[name] = ele.value;
            ele.remove();
            box.querySelector('.' + name).remove();
        }
    }
    table.rows.push(newrow);
    box.querySelector('button').remove();
    var overley = document.querySelector('.overley')
    overley.style.display = 'none';
    var items = document.querySelectorAll('.item1');
    items.forEach(x => {
        if ((x.hasAttribute('cells')) || (x.hasAttribute('rows'))) {
            x.remove()
        }
    })
    document.querySelector('.container').style.gridTemplateRows = '20px';
}
function scrolling(e) {

    var sctop = e.target.scrollTop;
    if (sctop >= 0) {
        if (sctop % 2 === 0) {
            var start = Math.floor(sctop / 20);
            var end = Math.floor((sctop + 300) / 20);
            function deleting() {
                var rows = document.querySelectorAll('.item1[rows=yes]')
                rows.forEach(x => {
                    x.remove()
                })
                var cells = document.querySelectorAll('.item1');
                cells.forEach(x => {
                    if (x.hasAttribute('cells')) {
                        x.remove();
                    }
                })
            }
            setTimeout(deleting(), 300);
            loopingrows(start, end, table)
        }
    }
}
function loading() {
    generaterows(1000, table)
    var main = document.querySelector('.main');
    var sctop = main.scrollTop;
    if (sctop === 0) {
        var start = sctop / 20;
        var end = 300/ 20;
        loopingrows(start, end, table)
    }
}

