Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class=' +
((__t = (ctx.tableClass)) == null ? '' : __t) +
'>\n  <tr>\n  ';
 for (let i = 0; i < ctx.component.numRows; i++) { ;
__p += '\n    <td>\n    ';
 for (let j = 0; j < ctx.component.numCols; j++) { ;
__p += '\n      <td>\n        ' +
((__t = (ctx.inputs[i][j])) == null ? '' : __t) +
'\n      </td>\n    ';
 } ;
__p += '\n    </tr>\n  ';
 } ;
__p += '\n  </tbody>\n</table>\n';
return __p
}