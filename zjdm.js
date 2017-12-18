var fs = require('fs');
var order=[]
function main() {
    var ch = '';
    var text;
    var keyWords = ['var','Var', 'function', 'if', 'else', 'return', 'true', 'false','for','then','while','end','do','const','Const'];
    var symbol = [',','(', ')', '{', '}',':',':=','<','<>','>','<=','>=',';']
    var op=['+','-','*','/']
    var equal='='
    var sertConst = [];
    fs.readFile('middlecode.txt', 'UTF-8', function (err, data) {
            text = data.toString().split('');
            for (var i = 0; i < text.length;) {
                var strToken = '';
                ch = text[i];
                var tag = 0;
                if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                    while ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                        strToken += ch;
                        i += 1;
                        ch = text[i];
                    }
                    for (var j = 0; j < keyWords.length; j++) {
                        if (keyWords[j] === strToken && tag === 0) {
                            //console.log(strToken, 'keyWords')
                            tag = 1;
                            var item={'value':strToken,'type':'keyWords'};
                            order.push(item);
                        }
                    }
                    if (sertConst.length === 0 && tag === 0) {
                        sertConst.push(strToken);
                        //console.log(strToken, 'sertConst')
                        tag = 1;
                        var item={'value':strToken,'type':'sertConst'};
                        order.push(item);
                    }
                    if (sertConst.length != 0 && tag === 0) {
                        for (var t = 0; t < sertConst.length; t++) {
                            if (sertConst[t] === strToken && tag === 0) {
                                tag = 1;
                                //console.log(strToken, 'sertConst')
                                var item={'value':strToken,'type':'sertConst'};
                                order.push(item);
                                break;
                            }
                            else {
                                sertConst.push(strToken);
                                tag = 1;
                                //console.log(strToken, 'sertConst')
                                var item={'value':strToken,'type':'sertConst'};
                                order.push(item);
                                break;
                            }
                        }
                    }
                }
                else if (ch >= '0' && ch <= '9') {
                    while (ch >= '0' && ch <= '9') {
                        strToken += ch;
                        i += 1;
                        ch = text[i];
                    }
                    //console.log(strToken, 'num')
                    tag = 1;
                    var item={'value':strToken,'type':'num'};
                    order.push(item);
                }
                for (var d = 0; d < symbol.length; d++) {
                    if (symbol[d] === ch) {
                        //console.log(ch, 'symbol')
                        var item={'value':ch,'type':'symbol'};
                        order.push(item);
                        i++;
                        tag = 1;
                        break;
                    }
                }
                for (var d = 0; d < op.length; d++) {
                    if (op[d] === ch) {
                        //console.log(ch, 'op')
                        var item={'value':ch,'type':'op'};
                        order.push(item);
                        i++;
                        tag = 1;
                        break;
                    }
                }
                if(equal===ch){
                    //console.log(ch,'equal')
                    var item={'value':ch,'type':'equal'};
                    order.push(item);
                    i++;
                    tag=1;
                }
                if (tag === 0)i++;
            }
        
            //console.log("序列：",order);
            // 对序列进行遍历找到符合三地址码的连续数组成员
            // sertConst equal sertConst op sertConst
            for(var i=0;i<order.length-4;i++){
                if(order[i].type==='sertConst'&&order[i+1].type==='equal'&&order[i+2].type==='sertConst'&&order[i+3].type==='op'&&order[i+4].type==='sertConst'){
                    //找到三地址指令
                    //console.log(order[i].value,order[i+1].value,order[i+2].value,order[i+3].value,order[i+4].value);
                    var temp=`t${i}`;
                    console.log(temp,order[i+1].value,order[i+2].value,order[i+3].value,order[i+4].value);
                    console.log(order[i].value,equal,temp);
                }
            }
        }
    )
}
main();