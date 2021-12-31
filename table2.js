function creatingcolumns(){
     // var serial = createElement();
    // serial.innerText = 'S.NO';
    // serial.style.position = 'sticky';
    // serial.style.top = '0px';
    // serial.style.backgroundColor = '#fff';
    // container.appendChild(serial); 


    // var div = createElement();
        // div.setAttribute('header', i + 2);
        // div.setAttribute('value', 'header');
        // div.innerText = ob.columns[i].title;
        // div.style.position = 'sticky';
        // div.style.top = '0px';
        // div.style.backgroundColor = '#fff';
        // container.appendChild(div);
}

// var rowno;
// function loopingrows(s, e, ob) {
//     rowno = 0;
//     var rows = ob.rows;
//     for (var i = s; i < e; i++) {

//         creatingrows(rows, i, ob)
//     }
// }
// function creatingrows(y, z, ob) {
//     if (y[z] !== undefined) {
//         rowno++
//         var x = document.querySelector('.container');
//         var serialdiv = createElement();
//         serialdiv.setAttribute('rows', 'yes')
//         serialdiv.innerText = z + 1;
//         serialdiv.setAttribute('rowno', rowno)
//         serialdiv.setAttribute('value', 'row')
//         x.appendChild(serialdiv);
//         var elementslength = ob.columns.length;
//         for (var j = 0; j < elementslength; j++) {
//             var div = createElement();
//             div.setAttribute('cells', 'yes');
//             div.setAttribute('tabindex', 1);
//             if (j === 0) {
//                 div.innerText = y[z][ob.columns[j].title];
//             } else {
//                 var sub = ob.columns[j].title;
//                 if (sub !== 'total') {
//                     // total += (y[z][sub]) / 1;
//                 } else {
//                     y[z][sub] = total;
//                 }
//                 div.innerHTML = y[z][sub];
//             }
//             div.setAttribute('name', ob.columns[j].title);
//             div.setAttribute('rowno', z + 1)
//             x.appendChild(div);

//         }
//     }
// }


function createElement() {
    var div = document.createElement('div');
    div.className = "item1";
    return div;
}


function removefocus(){
    // stylesheet.cssRules[12].selectorText = '.cells'
    // var ele = e.target;
    // var rows = glo.rows;
    // if (e.keyCode === 13 || e.keyCode === 9) {

    //     var activeele = document.activeElement;
    //     if (activeele.hasAttribute('contenteditable')) {
    //         activeele.removeAttribute('contenteditable');
    //         var innervalue = ele.innerText;
    //         var row = ele.getAttribute('index');
    //         var title = ele.getAttribute('title');
    //         rows[row - 1][title] = (innervalue);
    //         activeele.blur();
    //         var nextele = ele.nextElementSibling;            
    //         nextele.focus();
    //     } else {
    //         // e.target.focus();
    //         activeele.setAttribute('contenteditable', 'true');
    //         e.preventDefault();

    //     }


    // } if (e.keyCode === 37 || e.keyCode === 39) {
    //     var element;
    //     if (e.keyCode === 37) {
    //         element = ele.previousElementSibling;
    //     }
    //     else {
    //         element = ele.nextElementSibling;
    //     }
    //     if (element) {
    //         element.focus();
    //     }
    //     e.target.removeAttribute('contenteditable');
    // }
    // if (e.keyCode === 38 || e.keyCode === 40) {
    //     e.preventDefault();
    //     var childs = ele.parentNode.children;
    //     var array = Array.from(childs)
    //     var index = array.indexOf(ele);
    //     var addvalue = glo.columns.length + 1;
    //     var newindex;
    //     if (e.keyCode === 38) {
    //         newindex = index - addvalue;
    //     } else {
    //         newindex = index + addvalue;
    //     }
    //     var newele = childs[newindex];
    //     if (newele) {
    //         newele.focus();

    //     }
    //     e.target.removeAttribute('contenteditable');
    // }
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
// function scrolling(e) {

//     // var sctop = e.target.scrollTop;
//     // if (sctop >= 0) {
//     //     if (sctop % 2 === 0) {
//     //         var start = Math.floor(sctop / 20);
//     //         var end = Math.floor((sctop + 300) / 20);
//     //         function deleting() {
//     //             var rows = document.querySelectorAll('.item1[rows=yes]')
//     //             rows.forEach(x => {
//     //                 x.remove()
//     //             })
//     //             var cells = document.querySelectorAll('.item1');
//     //             cells.forEach(x => {
//     //                 if (x.hasAttribute('cells')) {
//     //                     x.remove();
//     //                 }
//     //             })
//     //         }
//     //         setTimeout(deleting(), 300);
//     //         loopingrows(start, end, table)
//     //     }
//     // }

//     if (callfunction) {
//         initial = initial + 1
//         var start = ((initial * 300) + 300)
//         console.log(initial);
//         var end = (start + 300);
//         var s = start / 20;
//         var e = end / 20;
//         console.log(`${s} ${e}`);
//         loopingrows(s, e, table)
//         callfunction = false;
//     } else {
//         var top = e.target.scrollTop;
//         var x = Math.floor(top / 300)
//         if (x === initial + 1 || x === initial - 1) {
//             if (x > 0) {
//                 callfunction = true;
//                 scrolling();
//             }
//         }
//     }
// }
// function loading() {
//     generaterows(1000, table)
//     var main = document.querySelector('.main');
//     var sctop = main.scrollTop;
//     if (sctop === 0) {
//         var start = sctop / 20;
//         var end = 300/ 20;
//         loopingrows(start, end, table)
//     }
// }

var callfunction = false;
var initial;
function scroll() {
    // generaterows(1000, table)
    // var mainsctop=document.querySelector('.main').scrollTop;
    // initial=mainsctop/300;
    // if(mainsctop===0){       
    //     var start=mainsctop/20;
    //     var end=(mainsctop+300)/20
    //     var nextstart=end;
    //     var nextend=(300+300)/20;       
    //     loopingrows(start, end, table) ; 
    //     loopingrows(nextstart, nextend, table) ;  
    // }   
    // console.log(initial)
    // console.log(`${start} ${end}`)
}