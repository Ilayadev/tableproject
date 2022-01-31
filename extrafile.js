// var callfunction = true;
// var initial = 1;
// var lastblock = 0;
// if (preblock >= 2) {
            //     block = preblock - 1;                
            //     if(preblock>2){
            //         var x = preblock - 3;
            //         console.log(x)
            //          var start = (x * height) / 20;
            //          var end = ((x * height) + height) / 20;
            //          loopingrows(start, end, glo, 'inset');
            //          preblock=preblock-1;
            //     }
            //     rowstart = (preblock * height) / 20;
            //     rowend = ((preblock * height) + height) / 20
            //     for (var i = rowstart; i < rowend; i++) {
            //         for (var j = 0; j <= glo.columns.length; j++) {
            //             if (glo.rows[i] != undefined) {
            //                 var child = parent.children[down_removing_start];
            //                 parent.removeChild(child);
            //                 down_removing_start--;
            //             }
            //         }
            //     }

            //     }
            // if (preblock === 2 || preblock === 3) {
            //     var rowstart;
            //     var rowend;
            //     // if (preblock === 2) {
            //     //     rowstart = (preblock * height) / 20;
            //     //     rowend = ((preblock * height) + height) / 20
            //     //     initial = 1;
            //     //     down_removing_start = parent.children.length - 1;
            //     //     callfunction = true;
            //     // }
            //     // if (preblock === 3) {
            //     //     stylesheet.cssRules[11].selectorText = '.test';
            //     //     rowstart = (preblock * height) / 20;
            //     //     rowend = ((preblock * height) + height) / 20
            //     //     var start = 0;
            //     //     var end = height / 20;
            //     //     loopingrows(start, end, glo, 'inset');
            //     //     down_removing_start = parent.children.length - 1;
            //     //     document.querySelector('.main').scrollTop = height - 20;
            //     //     preblock = preblock - 1;
            //     // }

            //     for (var i = rowstart; i < rowend; i++) {
            //         for (var j = 0; j <= glo.columns.length; j++) {
            //             if (glo.rows[i] != undefined) {
            //                 var child = parent.children[down_removing_start];
            //                 parent.removeChild(child);
            //                 down_removing_start--;
            //             }
            //         }
            //     }
            // }
             // if (preblock === lastblock) {
                //     preblock = totalblock;
                //     rowstart = (preblock * height) / 20;
                //     rowend = ((preblock * height) + height) / 20;
                //     down_removing_start = parent.children.length - 1;
                //     for (var i = rowstart; i < rowend; i++) {
                //         for (var j = 0; j <= glo.columns.length; j++) {
                //             if (glo.rows[i] != undefined) {
                //                 var child = parent.children[down_removing_start];
                //                 parent.removeChild(child);
                //                 down_removing_start--;
                //             }
                //         }
                //     }
                //     preblock = preblock - 1;
                //     lastblock = 0;
                // }
                 // if (preblock === totalblock) {               
            //     lastblock = totalblock - 1;
            //     var x = preblock - 3;
            //     var start = (x * height) / 20;
            //     var end = ((x * height) + height) / 20;
            //     loopingrows(start, end, glo, 'inset');
            //     document.querySelector('.main').scrollTop = height - 20;
            //     rowstart = (preblock * height) / 20;
            //     rowend = ((preblock * height) + height) / 20
            //     down_removing_start = parent.children.length - 1;
            //     for (var i = rowstart; i < rowend; i++) {
            //         for (var j = 0; j <= glo.columns.length; j++) {
            //             if (glo.rows[i] != undefined) {
            //                 var child = parent.children[down_removing_start];
            //                 parent.removeChild(child);
            //                 down_removing_start--;
            //             }
            //         }
            //     }
            //     preblock = preblock - 1;
            // }
            // if (callfunction) {
    //     if (top === initial) {
    //         block = 2
    //         var start = (height * block) / 20;
    //         var end = ((height * block) + height) / 20;
    //         preblock = block;
    //         loopingrows(start, end, glo, 'container');
    //         callfunction = false;
    //         initial = 2;
    //     }
    // }
    // else {
    //     if (top === initial) {
    //         block++;
    //         var start = (height * block) / 20;
    //         var end = ((height * block) + height) / 20;
    //         preblock = block;
    //         if (block === totalblock) {
    //             lastblock = block;
    //         }
    //         loopingrows(start, end, glo, 'container');
    //         stylesheet.cssRules[11].selectorText = '.test';
    //         for (var i = up_removing_end - 1; i >= up_removing_start; i--) {
    //             var child = parent.children[i];
    //             parent.removeChild(child);
    //         }
    //     }
    // }
//     function mainscrolling() {
//         var stylesheet = document.styleSheets[0];
//         var parent = document.querySelector('.container');
//         var  overall=document.querySelector('.overall');
//         var up_removing_start = glo.columns.length + 1;
//         var up_removing_end = ((height / 20) * up_removing_start) + up_removing_start;
//         var totalblock = Math.floor(glo.rows.length / (height / 20));
//         var main = document.querySelector('.main');
//         var scrollheight = main.scrollHeight;
//         var clientheight = main.clientHeight;
//         var scrolltop = main.scrollTop;
//         var bottom = scrollheight - clientheight;
//         if (scrolltop === bottom) {
//             if (totalblock > block) {
//                 block++;
//                 main.scrollTop=300;
//                 overall.scrollTop=block*300
//                 var start = Math.floor((height * block) / 20);
//                 var end = Math.floor(((height * block) + height) / 20);
//                 preblock = block;
//                 if (block > 2 && block < totalblock + 1) {
//                     for (var i = up_removing_end - 1; i >= up_removing_start; i--) {
//                         var child = parent.children[i];
//                         if (child) {
//                             parent.removeChild(child);
//                         }
//                     }
//                     if (highlighted === 'row') {
//                         stylesheet.cssRules[11].selectorText = `.test`;
//                     }
//                 }
//                 loopingrows(start, end, glo, 'container');
    
//             }
//         }
//         else{
//             overall.scrollTop+=main.scrollTop%300
//         }
//         if (scrolltop === 0) {
//             var down_removing_start;
//             down_removing_start = parent.children.length - 1;
//             if (preblock !== undefined) {
//                 block = preblock - 1;
//                 if (preblock > 1 && preblock <= totalblock) {
//                     rowstart = Math.floor((preblock * height) / 20);
//                     rowend = Math.floor(((preblock * height) + height) / 20);
//                     if (preblock > 2) {
//                         var x = preblock - 3;
//                         var start = (x * height) / 20;
//                         var end = ((x * height) + height) / 20;
//                         if (highlighted === 'row') {
//                             stylesheet.cssRules[11].selectorText = `.test`;
//                             stylesheet.cssRules[12].selectorText = '.cells';
//                         }
//                         loopingrows(start, end, glo, 'inset');
//                         document.querySelector('.main').scrollTop = height;
//                         document.querySelector('.overall').scrollTop = height;
//                     }
//                     down_removing_start = parent.children.length - 1;
//                     for (var i = rowstart; i < rowend; i++) {
//                         for (var j = 0; j <= glo.columns.length; j++) {
//                             if (glo.rows[i] != undefined) {
//                                 var child = parent.children[down_removing_start];
//                                 parent.removeChild(child);
//                                 down_removing_start--;
//                             }
//                         }
//                     }
//                     preblock = preblock - 1;
//                 }
//             }
//         }
//     }

 // for (var i = up_removing_end - 1; i >= up_removing_start; i--) {
                    //     var child = container.children[i];
                    //     if (child) {
                    //         container.removeChild(child);
                    //     }
                    // }

    // for (var j = down_removing_start; j >= three_block_children + up_removing_start; j--) {
                    //     var child = container.children[j];
                    //     if (child) {
                    //         container.removeChild(child);
                    //     }
                    // }