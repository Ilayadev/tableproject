var glo;
var table = {
    serialcolumn: '40px',
    headerrow:'20px',
    columns: [
        {
            title: 'student',
            width: '100px'
        },
        {
            title: 'tamil',
            width: '100px'
        },
        {
            title: 'english',
            width: '100px'
        },
        {
            title: 'maths',
            width: '100px'
        },
        {
            title: 'science',
            width: '100px'
        },
        {
            title: 'social',
            width: '100px'
        },
        {
            title: 'total',
            width: '100px'
        }
       
    ],
    rows: {
        headerrow: '30px',
        contentrows: {
            students: {
                details: [
                    {

                        student: 'ilaya',
                        tamil: 45,
                        english: 68,
                        maths: 100,
                        science: 56,
                        social: 45,
                        height: '20px'
                    },
                    {
                        student: 'guna',
                        tamil: 65,
                        english: 48,
                        maths: 60,
                        science: 86,
                        social: 35,
                        height: '20px'
                    },
                    {
                        student: 'jawa',
                        tamil: 42,
                        english: 38,
                        maths: 90,
                        science: 66,
                        social: 55,
                        height: '20px'
                    },
                    {
                        student: 'mailesh',
                        tamil: 45,
                        english: 68,
                        maths: 70,
                        science: 86,
                        social: 95,     
                        height: '20px'
                    }
                ]

            }
        }
    },
    addcolumns: function creatingcol(header, value, width) {
        var newcol = new Object();
        newcol.title = header;
        newcol.width = width;
        for (let i = 0; i < this.rows.contentrows.students.details.length; i++) {
            this.rows.contentrows.students.details[i][header] = value[i];
        }
        table.columns.push(newcol);
    },
    addrows: function creatingrow(ob) {
        this.rows.contentrows.students.details.push(ob);
    },
    colorder: function colordering(value, place) {
        var columns = table.columns.length;
        for (var i = 0; i < columns; i++) {
            var header = table.columns[i].title;
            if (header == value) {
                var index = i;
            }
        }
        var ex = table.columns[place - 1];
        table.columns[place - 1] = table.columns[index];
        table.columns[index] = ex;
        creatingcolumns;
    },
    roworder: function rowordering(name, place) {
        var ele = table.rows.contentrows.students.details;
        var rows = ele.length;
        for (var i = 0; i < rows; i++) {
            var value = ele[i].student;
            if (value == name) {
                var index = i;
            }
        }
        var ex = ele[place - 1];
        ele[place - 1] = ele[index];
        ele[index] = ex;
    },
    sort: function sorting(sub) {
        var ele = table.rows.contentrows.students.details
        for (var i = 0; i < ele.length; i++) {
            for (var j = i + 1; j < ele.length; j++) {
                if (ele[i][sub] >= ele[j][sub]) {
                    var temp = ele[i];
                    ele[i] = ele[j];
                    ele[j] = temp;
                }
            }
        }
    }
}
function creatingcolumns(ob) {
    glo=ob;
    var columns = ob.columns.length;
    var headerrow = ob.headerrow;
    var serial = createElement();
    serial.innerText = 'S.NO';    
    var container = document.querySelector('.container');
    container.appendChild(serial);
    container.style.gridTemplateColumns += ob.serialcolumn;
    for (var i = 0; i < columns; i++) {
        var width = ob.columns[i].width;
        container.style.gridTemplateColumns += ` ${width}`;
        var div = createElement();
        div.setAttribute('header',i+2);
        div.setAttribute('value','header');
        div.innerText = ob.columns[i].title;
        container.appendChild(div);
    }
    container.addEventListener('click', highlight);
    container.addEventListener('dblclick', editing);
    container.addEventListener('keydown', removefocus);    
    container.style.gridTemplateRows += ` ${headerrow}`;
    loopingrows(ob);
}
function loopingrows(ob) {
    var rows = ob.rows;
    var rowslength = rows.length;
    for (var i = 0; i < rowslength; i++) {
        creatingrows(rows,i)
    }    
}

function creatingrows(y,z) {
    console.log(y+z);
    var total = 0;
    var x = document.querySelector('.container');
    var serialdiv = createElement();
    serialdiv.setAttribute('rows','yes')
    serialdiv.innerText = z + 1;
    serialdiv.setAttribute('rowno',z+1)
    serialdiv.setAttribute('value','row')
    x.appendChild(serialdiv);
    x.style.gridTemplateRows += ` ${y[z].height}`;
    var elementslength = ob.columns.length;
    for (var j = 0; j < elementslength; j++) {
        var div = createElement();
        div.setAttribute('cells', 'yes');
        div.setAttribute('tabindex',1);
        if (j === 0) {
            div.innerText = y[z][ob.columns[j].title];        
        } else {
            var sub = ob.columns[j].title;            
            if (sub !== 'total') {
                total += (y[z][sub]) / 1;
            } else {
                y[z][sub] = total;
            }
            div.innerHTML = y[z][sub];
        }        
        div.setAttribute('name',ob.columns[j].title);
        div.setAttribute('rowno',z+1)
        x.appendChild(div);

    }
}
function createElement() {
    var div = document.createElement('div');
    div.className = "item1";
    return div;
}
// this.table.addcolumns('total',[234,340,489,41/6],'50px');
// this.table.addrows({student:'kailash',tamil:45,english:56,maths:98,science:69,social:45,total:490,height:'20px'})
// this.table.roworder('ilaya',2)
// this.table.sort('total');
// this.table.colorder('tamil',4);
function highlight(e) {
    if (document.querySelector('.highlight')) {
        var ele = document.querySelectorAll('.highlight');
        ele.forEach(x => {
            x.classList.remove('highlight')
        })
    }    
    var att = e.target.getAttribute('value');
    var stylesheet=document.styleSheets[0];
    stylesheet.cssRules[9].style.backgroundColor='#8c9998'; 
    if (att === 'row'||att ==='header') {          
        if(att ==='row'){
            var rowno=e.target.getAttribute('rowno');
            var  start=(rowno*8)+1;   
            var end=start+glo.columns.length;               
            stylesheet.cssRules[9].selectorText=`.item1:nth-child(n+${start}):nth-child(-n+${end})`;
        } 
        else{
            var nth=glo.columns.length+1
            var headerno=e.target.getAttribute('header');
            stylesheet.cssRules[9].selectorText=`.item1:nth-child(${nth}n+${headerno})`;             
        }
       
    } 
    else{
        // e.target.focus();
        var childs=e.target.parentNode.children;
        var array=Array.from(childs)
        var index=array.indexOf(e.target);
        var nth=index+1;        
        stylesheet.cssRules[9].selectorText=`.item1:nth-child(${nth})`;        
        // e.target.classList.add('highlight')
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
        if ((x.hasAttribute('cells'))||(x.hasAttribute('rows'))) {
            x.remove()
        }
    })
    document.querySelector('.container').style.gridTemplateRows = table.headerrow;
    loopingrows();
}
function editing(e) {   
    var ele = e.target    
    if (ele.hasAttribute('cells')) {
        ele.setAttribute('contenteditable', true); 
        ele.focus();
    }    
}
function removefocus(e) {  
      var stylesheet=document.styleSheets[0];
      stylesheet.cssRules[9].style.backgroundColor='transparent'; 
    if (document.querySelector('.highlight')) {
        var ele = document.querySelectorAll('.highlight');
        ele.forEach(x => {
            x.classList.remove('highlight')
        })
    }
    var ele = e.target;
    var studet=table.rows;
    if(e.keyCode===13||e.keyCode===9){
        ele.setAttribute('contenteditable','false') 
        ele.blur();      
        var innervalue=ele.innerText;
        var row=ele.getAttribute('rowno');
        var value=ele.getAttribute('name');
        studet[row-1][value]=(innervalue)/1;  
    }if(e.keyCode===37||e.keyCode===39){            
        ele.setAttribute('contenteditable','false');   
        var element;    
        if(e.keyCode===37){
            element=ele.previousElementSibling;
        }
        else{
            element=ele.nextElementSibling;
        }
        if(element){
            element.focus();
        }
    }
    if(e.keyCode===38||e.keyCode===40){
            ele.setAttribute('contenteditable','false'); 
            var childs=ele.parentNode.children;
            var array=Array.from(childs)
            var index=array.indexOf(ele);
            var addvalue=glo.columns.length+1;
            var newindex;
           if(e.keyCode===38){
            newindex=index-addvalue;
           }else{
            newindex=index+addvalue;
           }
            var newele=childs[newindex];
           if(newele){
            newele.focus();
           }
   }
}
function loading(){
  creatingcolumns(table);
}



