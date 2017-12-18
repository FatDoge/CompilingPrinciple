var fs = require('fs');
function main() {
    var ch = '';
    var text;
    var keyWords = ['var','Var', 'function', 'if', 'else', 'return', 'true', 'false','for','then','while','end','do','const','Const'];
    var symbol = [',','(', ')', '{', '}',':','=',':=','<','<>','>','<=','>=',';','+','-','*','/']
    var sertConst = [];
    fs.readFile('input.txt', 'UTF-8', function (err, data) {
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
                            console.log(strToken, 'keyWords')
                            tag = 1;
                        }
                    }
                    if (sertConst.length === 0 && tag === 0) {
                        sertConst.push(strToken);
                        console.log(strToken, 'sertConst')
                        tag = 1;
                    }
                    if (sertConst.length != 0 && tag === 0) {
                        for (var t = 0; t < sertConst.length; t++) {
                            if (sertConst[t] === strToken && tag === 0) {
                                tag = 1;
                                console.log(strToken, 'sertConst')
                                break;
                            }
                            else {
                                sertConst.push(strToken);
                                tag = 1;
                                console.log(strToken, 'sertConst')
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
                    console.log(strToken, 'num')
                    tag = 1;
                }
                for (var d = 0; d < symbol.length; d++) {
                    if (symbol[d] === ch) {
                        console.log(ch, 'symbol')
                        i++;
                        tag = 1;
                        break;
                    }
                }
                if (tag === 0)i++;
            }
        }
    )
}
main();