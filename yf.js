var fs = require('fs');
var order=[];
var expressions=[];
var flag=0;
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
            console.log("程序开始");
            for(flag=0;flag<order.length;flag++){
                switch(order[flag].value){
                    case 'const':
                    ConstWords();
                    break;
                    case 'Var':
                    VarWords();
                    break;
                    case 'begin':
                    WhileWords();
                    break;
                }
            }  
            console.log("程序结束");        
        }
    )
}
function ConstWords(){
    console.log(`常量说明${order[flag].value}`);
    while(order[flag].value!==';'){
        flag++;
        switch(order[flag].type){
            case 'sertConst':
            console.log(`常量定义${order[flag].value}`);
            break;
            case 'equal':
            console.log(`等于${order[flag].value}`);
            break;
            case 'num':
            console.log(`无符号整数${order[flag].value}`);
            break;
            case 'symbol':
            console.log(`${order[flag].value}`);
            break;
        }

    }
}
function VarWords(){
    if(order[flag].value==='Var')
    console.log(`变量说明${order[flag].value}`);
    while(order[flag].value!==';'){
        flag++;
        switch(order[flag].type){
            case 'sertConst':
            console.log(`变量定义${order[flag].value}`);
            break;
            case 'equal':
            console.log(`等于${order[flag].value}`);
            break;
            case 'num':
            console.log(`无符号整数${order[flag].value}`);
            break;
            case 'symbol':
            console.log(`${order[flag].value}`);
            break;
        }

    }
}
function WhileWords(){
    if(order[flag].value==='begin')
    console.log(`复合语句${order[flag].value}`);
    while(order[flag].value!=='end'){
        flag++;
        switch(order[flag].type){
            case 'sertConst':
            AssignStatement();
            console.log(`标识符${order[flag].value}`);
            break;
            case 'equal':
            console.log(`赋值语句${order[flag].value}`);
            ExpressionStatement();
            // 等号之后获取表达式
            getExpression();
            break;
            case 'num':
            console.log(`无符号整数${order[flag].value}`);
            break;
            case 'op':
            console.log(`运算符${order[flag].value}`);
            break;
            case 'symbol':
            console.log(`${order[flag].value}`);
            break;
        }
        
    }
    console.log(`复合语句${order[flag].value}`);
}
function AssignStatement(){
    if(order[flag].type==='sertConst'&&order[flag+1].type==='equal'){
        console.log('赋值语句');
    }
}
function ExpressionStatement(){
    if(order[flag].type==='equal'&&order[flag-1].type==='sertConst'){
        console.log('表达式');
    }
}
function getExpression(){
    console.log('项');
    while(order[flag].value!==';'){
        flag++;
        factor();
        // 若为加减，则为单独的项
        if(order[flag-1].value==='+'||order[flag-1].value==='-'){
            console.log('项');
        }
        if(order[flag].type!=='op'&&order[flag].type!=='symbol'){
            console.log('因子');
            console.log('标识符',order[flag].value);
        }else if(order[flag].type==='op') {
            console.log('运算符',order[flag].value);
        }else console.log(order[flag].value);    
    }
    
}
function factor(){
    if(order[flag].value==='('){
        if(order[flag-1].value==='+'||order[flag-1].value==='-')console.log('项');
        console.log('因子');
        console.log(`左括号${order[flag].value}`);
        flag++;
    var tag=0;
    for(var i=flag;i<order.length;i++){
        if(order[i].value===')'){
            tag=1;
        }
    }
    if(tag===0)console.log('缺少右括号！');
}else if(order[flag].value===')'){
    console.log('右括号)');
    flag++;
}
}
main();