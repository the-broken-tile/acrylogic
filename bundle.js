(()=>{"use strict";var e;!function(e){e[e.Up=0]="Up",e[e.Down=1]="Down",e[e.Left=2]="Left",e[e.Right=3]="Right"}(e||(e={}));const t=e,n=function(){function e(e,t){this.x=e,this.y=t}return e.prototype.equals=function(e){return this.x===e.x&&this.y===e.y},e.prototype.next=function(n){if(n===t.Up)return new e(this.x,this.y-1);if(n===t.Down)return new e(this.x,this.y+1);if(n===t.Left)return new e(this.x-1,this.y);if(n===t.Right)return new e(this.x+1,this.y);throw new Error("Invalid direction")},e.prototype.toString=function(){return"(".concat(this.x,", ").concat(this.y,")")},e}(),r=function(e,t){this.color=e,this.number=t};var o=function(){function e(e,t,n){var r;this.element=e,this.store=t,this.onLevelChange=n,this.render=function(){return'\n        <div class="nav-container">\n        <input class="checkbox" type="checkbox" id="menu-toggle">\n            <div class="hamburger-lines">\n                <span class="line line1"></span>\n                <span class="line line2"></span>\n                <span class="line line3"></span>\n            </div>\n            <ul class="menu-items">\n                <li>\n                    <form id="level-select-form">\n                        <input type="number" id="level-select"><br>\n                        <input type="submit" value="Go to level">\n                    </form>\n                </li>\n            </ul>\n        </div>'},this.element.classList.add("menu"),this.element.innerHTML=this.render(),this.menuToggle=this.element.querySelector("#menu-toggle"),this.levelSelect=this.element.querySelector("#level-select"),this.levelSelectForm=this.element.querySelector("#level-select-form"),this.levelSelect.value="".concat(null!==(r=this.store.getId())&&void 0!==r?r:1),this.registerEventListeners()}return e.prototype.close=function(){var e;this.menuToggle.checked=!1,this.levelSelect.value="".concat(null!==(e=this.store.getId())&&void 0!==e?e:1)},e.prototype.handleLevelChange=function(e){e.preventDefault(),this.onLevelChange(parseInt(this.levelSelect.value,10))},e.prototype.registerEventListeners=function(){this.levelSelectForm.addEventListener("submit",this.handleLevelChange.bind(this))},e}();const i=o;var s,l;!function(e){e[e.White=0]="White",e[e.Blue=1]="Blue",e[e.Red=2]="Red",e[e.Yellow=4]="Yellow",e[e.Purple=3]="Purple",e[e.Orange=6]="Orange",e[e.Green=5]="Green",e[e.Black=1/0]="Black"}(l||(l={}));var u=((s={})[l.White]="White",s[l.Blue]="Blue",s[l.Red]="Red",s[l.Yellow]="Yellow",s[l.Purple]="Purple",s[l.Orange]="Orange",s[l.Green]="Green",s[l.Black]="Black",s);const c=l;var a={w:c.White,u:c.Blue,b:c.Black,r:c.Red,g:c.Green,y:c.Yellow,p:c.Purple,o:c.Orange},h={1:1,2:2,3:3,4:4,5:5};const d=function(){function e(e,t,n){this.root=e,this.el=t,this.onOk=n,this.renderColorOptions=function(e){return'\n        \'<option value=""></option>\n        '.concat(e.map((function(e){return'<option value="'.concat(e,'">').concat(u[e],"</option>")})).join(""))},this.el.innerHTML=this.render(),this.ok=this.el.querySelector("#dialog-ok"),this.cancel=this.el.querySelector("#dialog-cancel"),this.colorSelect=this.el.querySelector("#color-select"),this.numberInput=this.el.querySelector("#number-input"),this.registerEvents()}return e.prototype.handleOk=function(){this.el.close(),this.onOk(this.createGuess())},e.prototype.open=function(e,t,n){this.colorSelect.innerHTML=this.renderColorOptions(t),this.numberInput.min="".concat(n.reduce((function(e,t){return Math.min(e,t)}))),this.numberInput.max="".concat(n.reduce((function(e,t){return Math.max(e,t)}))),this.numberInput.value="",this.el.showModal(),void 0!==e&&(void 0!==e.number&&(this.numberInput.value="".concat(e.number)),void 0!==e.color&&(this.colorSelect.value="".concat(e.color)))},e.prototype.close=function(){this.el.close()},e.prototype.handleCancel=function(){this.close()},e.prototype.render=function(){return'<div>\n            <select id="color-select" autofocus></select>\n        </div>\n        <div>\n        <input id="number-input" type="number" step="1">\n        </div>\n        <div>\n            <button id="dialog-ok">Ok</button>\n            <button id="dialog-cancel">Cancel</button>\n        </div>'},e.prototype.isOpen=function(){return this.el.open},e.prototype.createGuess=function(){return new r(this.getSelectedColor(),this.getSelectedNumber())},e.prototype.getSelectedColor=function(){var e=this.colorSelect.value;if(""!==e)return"Infinity"===e?1/0:parseInt(e,10)},e.prototype.getSelectedNumber=function(){var e=this.numberInput.value;if(""!==e)return parseInt(e,10)},e.prototype.handleKeyboardEvent=function(e){var t=e.key;if("Escape"===t)return e.preventDefault(),void this.close();if("Enter"===t)return this.handleOk(),void e.preventDefault();if("Backspace"===t)return this.resetForm(),void e.preventDefault();if(a.hasOwnProperty(t)){e.preventDefault();var n=a[t];this.colorSelect.value="".concat(n)}else if(h.hasOwnProperty(t)){e.preventDefault();var r=h[t];this.numberInput.value="".concat(r)}},e.prototype.resetForm=function(){this.colorSelect.selectedIndex=-1,this.numberInput.value=""},e.prototype.registerEvents=function(){this.ok.addEventListener("click",this.handleOk.bind(this)),this.cancel.addEventListener("click",this.handleCancel.bind(this)),this.root.addEventListener("keyup",this.handleKeyboardEvent.bind(this))},e}(),p=function(){function e(e,t,n,r){this.grid=e,this.clues=t,this.numbers=n,this.colors=r}return e.prototype.getGrid=function(){return this.grid},e.prototype.getCell=function(e){return this.grid.getCell(e)},e.prototype.getClues=function(){return this.clues},e.prototype.getColors=function(){return this.colors},e.prototype.getNumbers=function(){return this.numbers},Object.defineProperty(e.prototype,"height",{get:function(){return this.grid.cells.length},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"width",{get:function(){return this.grid.cells[0].length},enumerable:!1,configurable:!0}),e.prototype.getClue=function(e,t){return this.clues.find((function(n){return n.coordinate.equals(e)&&n.direction===t}))},e.prototype.isComplete=function(){return this.grid.cells.every((function(e){return e.every((function(e){return e.isComplete()}))}))},e}(),f=function(){function e(e,t,n){if(this.numberCandidates=[],this.colorCandidates=[],this.colorGuess=void 0,this.numberGuess=void 0,t<1)throw new Error("Number must be gte ".concat(1,"."));if(t>=5)throw new Error("Number must be lte ".concat(5,"."));this.color=e,this.number=t,this.coordinate=n}return e.prototype.isComplete=function(){return this.number===this.numberGuess&&this.color===this.colorGuess},e.prototype.getColorGuess=function(){return this.colorGuess},e.prototype.getNumberGuess=function(){return this.numberGuess},e.prototype.setColorGuess=function(e){this.colorGuess=e},e.prototype.setNumberGuess=function(e){this.numberGuess=e},e.prototype.addColorCandidate=function(e){this.colorCandidates.push(e)},e.prototype.removeColorCandidate=function(e){this.colorCandidates=this.colorCandidates.filter((function(t){return t!==e}))},e.prototype.addNumberCandidate=function(e){this.numberCandidates.push(e)},e.prototype.removeNumberCandidate=function(e){this.numberCandidates=this.numberCandidates.filter((function(t){return t!==e}))},e.prototype.toString=function(){return"".concat(this.color,"/").concat(this.number," ").concat(this.coordinate.toString())},e}(),v=function(){function e(e){this._cells=e}return Object.defineProperty(e.prototype,"cells",{get:function(){return this._cells},enumerable:!1,configurable:!0}),e.prototype.getCell=function(e){return this._cells[e.y][e.x]},e.prototype.validate=function(){return!0},e}(),m=function(e,t,n,r,o){this.coordinate=e,this.direction=t,this.color=n,this.number=r,this.not=o};var g={up:t.Up,down:t.Down,left:t.Left,right:t.Right},y={white:c.White,blue:c.Blue,red:c.Red,yellow:c.Yellow,purple:c.Purple,orange:c.Orange,green:c.Green,black:c.Black};const b=function(){function e(){var e=this;this.buildGrid=function(t){return new v(t.map((function(t,n){return e.mapRow(t,n)})))},this.mapRow=function(t,n){return t.map((function(t,r){return e.mapCell(t,n,r)}))},this.mapCell=function(e,t,r){return new f(y[e.color],e.number,new n(r,t))},this.buildClues=function(t){return t.map((function(t){return e.buildClue(t)}))},this.buildClue=function(e){return new m(new n(e.x,e.y),g[e.direction],e.color?y[e.color]:void 0,e.number,e.not)}}return e.prototype.build=function(e){return new p(this.buildGrid(e.grid),this.buildClues(e.clues),e.numbers,e.colors.map((function(e){return y[e]})))},e}();var C=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},w=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(l){return function(u){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,l[0]&&(s=0)),s;)try{if(n=1,r&&(o=2&l[0]?r.return:l[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,l[1])).done)return o;switch(r=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,r=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!o||l[1]>o[0]&&l[1]<o[3])){s.label=l[1];break}if(6===l[0]&&s.label<o[1]){s.label=o[1],o=l;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(l);break}o[2]&&s.ops.pop(),s.trys.pop();continue}l=t.call(e,s)}catch(e){l=[6,e],r=0}finally{n=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}},k=function(){function e(e,t,n){this.root=e,this.store=t,this.renderer=n,this.gameBuilder=new b,this.gameElement=this.root.querySelector("#game"),this.dialog=new d(this.root,this.root.querySelector("#dialog"),this.handleOk.bind(this)),this.menu=new i(this.root.querySelector("#menu"),this.store,this.handleLevelChange.bind(this)),this.root.addEventListener("click",this.handleCellClick.bind(this))}return e.prototype.handleCellClick=function(e){var t,o,i;if(!this.dialog.isOpen()&&void 0!==this.game){var s=e.target;if(null!==s&&s.classList.contains("cell")){var l=s.dataset.x,u=s.dataset.y;if(void 0!==l&&void 0!==u){var c=new n(parseInt(l,10),parseInt(u,10));this.currentCell=null===(t=this.game)||void 0===t?void 0:t.getCell(c),this.dialog.open(new r(null===(o=this.currentCell)||void 0===o?void 0:o.getColorGuess(),null===(i=this.currentCell)||void 0===i?void 0:i.getNumberGuess()),this.game.getColors(),this.game.getNumbers())}}}},e.prototype.handleLevelChange=function(e){return C(this,void 0,void 0,(function(){return w(this,(function(t){switch(t.label){case 0:return[4,this.newGame(e).catch((function(){alert("No such level.")}))];case 1:return t.sent(),this.store.setId(e),this.menu.close(),[2]}}))}))},e.prototype.handleOk=function(e){if(void 0===this.currentCell)throw new Error("currentCell is undefined");if(void 0===this.game)throw new Error("game is undefined");this.currentCell.setColorGuess(e.color),this.currentCell.setNumberGuess(e.number),this.currentCell=void 0,this.renderer.render(this.gameElement,this.game),this.winCheck()},e.prototype.init=function(){var e;return C(this,void 0,void 0,(function(){var t;return w(this,(function(n){switch(n.label){case 0:return t=null!==(e=this.store.getId())&&void 0!==e?e:1,this.store.setId(t),[4,this.newGame(t)];case 1:return n.sent(),[2]}}))}))},e.prototype.newGame=function(e){return C(this,void 0,void 0,(function(){var t;return w(this,(function(n){switch(n.label){case 0:return[4,(r="./api/game/".concat(e,".json"),void 0===o&&(o={}),fetch(r,o).then((function(e){return e.json()})).then((function(e){return e})))];case 1:return t=n.sent(),this.game=this.gameBuilder.build(t),this.renderer.render(this.gameElement,this.game),[2]}var r,o}))}))},e.prototype.winCheck=function(){var e;(null===(e=this.game)||void 0===e?void 0:e.isComplete())&&setTimeout((function(){return alert("Victory!")}),0)},e}();const G=k;var S="gameId";const I=function(){function e(e){this.storage=e}return e.prototype.setId=function(e){this.storage.setItem(S,JSON.stringify(e))},e.prototype.getId=function(){var e=this.storage.getItem(S);return null===e?null:JSON.parse(e)},e}(),O=function(){function e(){}return e.prototype.render=function(e,t){var n=this;e.innerHTML='<div class="game '.concat(t.height,"-rows ").concat(t.width,'-cols">\n            <div class="horizontal-border"></div>\n            ').concat(t.getGrid().cells.map((function(e){return n.renderRow(e,t)}),this).join(""),"\n        </div>")},e.prototype.renderRow=function(e,t){var n=this;return'\n            <div class="row">\n                <div class="vertical-border"></div>\n                '.concat(e.map((function(e){return n.renderCell(e,t)}),this).join(""),'\n            </div>\n            <div class="row">\n                ').concat(this.renderHorizontalClues(e,t),"\n            </div>\n        ")},e.prototype.renderCell=function(e,n){var r=n.getClue(e.coordinate,t.Right);return'\n            <div class="cell'.concat(this.renderCellClassName(e,n),'"\n            data-x="').concat(e.coordinate.x,'"\n            data-y="').concat(e.coordinate.y,'"\n            >\n                ').concat(this.renderCellValue(e,n),'\n            </div>\n            <div class="vertical-border').concat(this.renderClueClassName(r),'">\n                ').concat(this.renderClueValue(r),"\n            </div>\n        ")},e.prototype.renderCellValue=function(e,t){var n=e.getNumberGuess();return void 0!==n?"".concat(n):""},e.prototype.renderCellClassName=function(e,t){var n=e.getColorGuess();return void 0===n?"":" color-".concat(n)},e.prototype.renderClueValue=function(e){if(void 0===e)return"";var t=void 0!==e.color?u[e.color]:"".concat(e.number);return'<span class="clue'.concat(!0===e.not?" not":"",'">').concat(t,"</span>")},e.prototype.renderClueClassName=function(e){return void 0===e||void 0===e.color?"":" color-".concat(e.color)},e.prototype.renderHorizontalClues=function(e,t){var n=this;return"<div></div>".concat(e.map((function(e){return n.renderHorizontalClue(e,t)})).join(""))},e.prototype.renderHorizontalClue=function(e,n){var r=n.getClue(e.coordinate,t.Down);return'\n            <div class="horizontal-border'.concat(this.renderClueClassName(r),'">\n                ').concat(this.renderClueValue(r),"\n            </div>\n            <div></div>")},e}();new G(window.document.getElementById("app"),new I(window.localStorage),new O).init()})();