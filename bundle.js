(()=>{"use strict";var e;!function(e){e[e.Up=0]="Up",e[e.Down=1]="Down",e[e.Left=2]="Left",e[e.Right=3]="Right"}(e||(e={}));const t=e,n=function(){function e(e,t){this.x=e,this.y=t}return e.prototype.equals=function(e){return this.x===e.x&&this.y===e.y},e.prototype.next=function(n){if(n===t.Up)return new e(this.x,this.y-1);if(n===t.Down)return new e(this.x,this.y+1);if(n===t.Left)return new e(this.x-1,this.y);if(n===t.Right)return new e(this.x+1,this.y);throw new Error("Invalid direction")},e.prototype.toString=function(){return"(".concat(this.x,", ").concat(this.y,")")},e}();var r=function(){function e(e,t,n){this.element=e,this.onLevelChange=t,this.levelManager=n,this.render=function(){return'\n        <div class="nav-container">\n            <input class="checkbox" type="checkbox" id="menu-toggle">\n            <div class="hamburger-lines">\n                <span class="line line1"></span>\n                <span class="line line2"></span>\n                <span class="line line3"></span>\n            </div>\n            <ul class="menu-items">\n                <li>\n                    <form id="level-select-form">\n                        <input id="level-select" pattern="(o3|o4|tbt)-\\d+"><br>\n                        <input type="submit" value="Go to level"><br>\n                        <button id="next-level">Next level</button>\n                    </form>\n                </li>\n            </ul>\n        </div>'},this.element.innerHTML=this.render(),this.menuToggle=this.element.querySelector("#menu-toggle"),this.levelSelect=this.element.querySelector("#level-select"),this.levelSelectForm=this.element.querySelector("#level-select-form"),this.nextLevelElement=this.element.querySelector("#next-level"),this.update(),this.registerEventListeners()}return e.prototype.close=function(){this.menuToggle.checked=!1,this.levelSelect.value=this.levelManager.current()},e.prototype.handleLevelChange=function(e){e.preventDefault(),this.onLevelChange(this.levelSelect.value)},e.prototype.handleNextLevel=function(){return e=this,t=void 0,r=function(){var e;return function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(l){return function(u){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(s=0)),s;)try{if(n=1,r&&(i=2&l[0]?r.return:l[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,l[1])).done)return i;switch(r=0,i&&(l=[2&l[0],i.value]),l[0]){case 0:case 1:i=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,r=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!i||l[1]>i[0]&&l[1]<i[3])){s.label=l[1];break}if(6===l[0]&&s.label<i[1]){s.label=i[1],i=l;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(l);break}i[2]&&s.ops.pop(),s.trys.pop();continue}l=t.call(e,s)}catch(e){l=[6,e],r=0}finally{n=i=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}}(this,(function(t){switch(t.label){case 0:return[4,this.levelManager.next(this.levelManager.current())];case 1:return null!==(e=t.sent())&&this.onLevelChange(e),[2]}}))},new((n=void 0)||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function l(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}));var e,t,n,r},e.prototype.registerEventListeners=function(){this.levelSelectForm.addEventListener("submit",this.handleLevelChange.bind(this)),this.nextLevelElement.addEventListener("click",this.handleNextLevel.bind(this))},e.prototype.update=function(){this.levelSelect.value=this.levelManager.current()},e}();const i=r,o=function(){function e(e){this.onHashChange=e,window.addEventListener("popstate",this.handlePopState.bind(this))}return e.prototype.setLevel=function(e){history.pushState({},"","#".concat(e))},e.prototype.handlePopState=function(){var e=window.location.hash.match(/#((o3|o4|tbt)-\d+)/);if(null!==e){var t=e[1];this.onHashChange(t)}},e}();var s,l;!function(e){e[e.White=0]="White",e[e.Blue=1]="Blue",e[e.Red=2]="Red",e[e.Yellow=4]="Yellow",e[e.Purple=3]="Purple",e[e.Orange=6]="Orange",e[e.Green=5]="Green",e[e.Black=1/0]="Black"}(l||(l={}));var u=((s={})[l.White]="White",s[l.Blue]="Blue",s[l.Red]="Red",s[l.Yellow]="Yellow",s[l.Purple]="Purple",s[l.Orange]="Orange",s[l.Green]="Green",s[l.Black]="Black",s);const c=l,a=function(){function e(e,t){this.color=e,this.selected=t}return e.prototype.toString=function(){return'<button tabindex="-1" class="color-select color-'.concat(this.color.toString()).concat(this.selected?" selected":"",'" value="').concat(this.color.toString(),'"></button>')},e}(),h=function(){function e(e,t){this.number=e,this.selected=t}return e.prototype.toString=function(){return'<button tabindex="-1" class="number-select'.concat(this.selected?" selected":"",'" value="').concat(this.number,'">').concat(this.number,"</button>")},e}();var d;!function(e){e[e.color=0]="color",e[e.number=1]="number"}(d||(d={}));const p=function(){function e(e,t){this.type=e,this.value=t}return e.Type=d,e}();var f,v,b=function(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))};!function(e){e[e.Single=0]="Single",e[e.Multiple=1]="Multiple"}(v||(v={}));var m={w:c.White,u:c.Blue,b:c.Black,r:c.Red,g:c.Green,y:c.Yellow,p:c.Purple,o:c.Orange},g={1:1,2:2,3:3,4:4,5:5},y=((f={})[c.White.toString()]=c.White,f[c.Black.toString()]=c.Black,f[c.Blue.toString()]=c.Blue,f[c.Red.toString()]=c.Red,f[c.Yellow.toString()]=c.Yellow,f);const C=function(){function e(e,t,n){var r=this;this.root=e,this.el=t,this.onOk=n,this.availableColors=[],this.availableNumbers=[],this.selectedColors=[],this.selectedNumbers=[],this.type=v.Single,this.render=function(){return'\n        <div id="color-select"></div><div>\n        <div id="number-select"></div>\n        <div>\n            <button id="dialog-ok">Ok</button>\n            <button id="dialog-cancel">Cancel</button>\n        </div>'},this.renderColorOptions=function(){return r.availableColors.map((function(e){return new a(e,r.selectedColors.includes(e)).toString()})).join("")},this.renderNumberOptions=function(){return r.availableNumbers.map((function(e){return new h(e,r.selectedNumbers.includes(e)).toString()})).join("")},this.el.innerHTML=this.render(),this.ok=this.el.querySelector("#dialog-ok"),this.cancel=this.el.querySelector("#dialog-cancel"),this.colorSelect=this.el.querySelector("#color-select"),this.numberSelect=this.el.querySelector("#number-select"),this.registerEvents()}return e.prototype.handleOk=function(){this.el.close(),this.onOk(this.getSelection())},e.prototype.getSelection=function(){return b(b([],this.getSelectedColors().map((function(e){return new p(p.Type.color,e)})),!0),this.getSelectedNumbers().map((function(e){return new p(p.Type.number,e)})),!0)},e.prototype.update=function(){this.colorSelect.innerHTML=this.renderColorOptions(),this.numberSelect.innerHTML=this.renderNumberOptions()},e.prototype.open=function(e,t,n,r,i){this.resetForm(),this.type=i,this.availableColors=n,this.selectedColors=e,this.selectedNumbers=t,this.availableNumbers=r,this.update(),this.el.showModal()},e.prototype.close=function(){this.el.close()},e.prototype.handleCancel=function(){this.close()},e.prototype.isOpen=function(){return this.el.open},e.prototype.getSelectedColors=function(){return this.selectedColors},e.prototype.getSelectedNumbers=function(){return this.selectedNumbers},e.prototype.handleKeyboardEvent=function(e){if(this.isOpen()){var t=e.key;if("Escape"===t)return e.preventDefault(),void this.close();if("Enter"===t)return this.handleOk(),void e.preventDefault();if("Backspace"===t)return this.resetForm(),this.selectedNumbers=[],this.selectedColors=[],this.update(),void e.preventDefault();if(m.hasOwnProperty(t)){e.preventDefault();var n=m[t];return this.selectedColors.includes(n)?(this.selectedColors=this.selectedColors.filter((function(e){return e!==n})),void this.update()):(this.selectedColors.push(n),void this.update())}if(g.hasOwnProperty(t)){e.preventDefault();var r=g[t];return this.selectedNumbers.includes(r)?(this.selectedNumbers=this.selectedNumbers.filter((function(e){return e!==r})),void this.update()):(this.selectedNumbers.push(r),void this.update())}}},e.prototype.resetForm=function(){this.selectedColors=[],this.selectedNumbers=[],this.colorSelect.innerHTML=""},e.prototype.registerEvents=function(){this.ok.addEventListener("click",this.handleOk.bind(this)),this.cancel.addEventListener("click",this.handleCancel.bind(this)),this.root.addEventListener("keyup",this.handleKeyboardEvent.bind(this)),this.el.addEventListener("click",this.handleClick.bind(this))},e.prototype.handleClick=function(e){var t=e.target;if(t instanceof HTMLButtonElement){var n=t.value;if(t.classList.contains("color-select")){var r=y[n];return this.selectedColors.includes(r)?this.selectedColors=this.selectedColors.filter((function(e){return e!==r})):this.selectedColors.push(r),void this.update()}var i=parseInt(n,10);this.selectedNumbers.includes(i)?this.selectedNumbers=this.selectedNumbers.filter((function(e){return e!==i})):this.selectedNumbers.push(i),this.update()}},e.Type=v,e}(),w=function(){function e(e,t,n,r){this.grid=e,this.clues=t,this.numbers=n,this.colors=r}return e.prototype.getGrid=function(){return this.grid},e.prototype.getCell=function(e){return this.grid.getCell(e)},e.prototype.getClues=function(){return this.clues},e.prototype.getColors=function(){return this.colors},e.prototype.getNumbers=function(){return this.numbers},Object.defineProperty(e.prototype,"height",{get:function(){return this.grid.cells.length},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"width",{get:function(){return this.grid.cells[0].length},enumerable:!1,configurable:!0}),e.prototype.getClue=function(e,t){return this.clues.find((function(n){return n.coordinate.equals(e)&&n.direction===t}))},e.prototype.isComplete=function(){return this.grid.cells.every((function(e){return e.every((function(e){return e.isComplete()}))}))},e}(),S=function(){function e(e,t,n){if(this.numberCandidates=[],this.colorCandidates=[],this.colorGuess=void 0,this.numberGuess=void 0,t<1)throw new Error("Number must be gte ".concat(1,"."));if(t>=5)throw new Error("Number must be lte ".concat(5,"."));this.color=e,this.number=t,this.coordinate=n}return e.prototype.isComplete=function(){return this.number===this.numberGuess&&this.color===this.colorGuess},e.prototype.getColorGuess=function(){return this.colorGuess},e.prototype.getNumberGuess=function(){return this.numberGuess},e.prototype.setColorGuess=function(e){this.colorGuess=e,void 0!==e&&(this.colorCandidates=[])},e.prototype.setNumberGuess=function(e){this.numberGuess=e,void 0!==e&&(this.numberCandidates=[])},e.prototype.getColorCandidates=function(){return this.colorCandidates},e.prototype.addColorCandidate=function(e){this.colorCandidates.includes(e)||this.colorCandidates.push(e)},e.prototype.resetColorCandidates=function(){this.colorCandidates=[]},e.prototype.getNumberCandidates=function(){return this.numberCandidates},e.prototype.addNumberCandidate=function(e){this.numberCandidates.includes(e)||this.numberCandidates.push(e)},e.prototype.resetNumberCandidates=function(){this.numberCandidates=[]},e.prototype.toString=function(){return"".concat(this.color,"/").concat(this.number," ").concat(this.coordinate.toString())},e}(),k=function(){function e(e){this._cells=e}return Object.defineProperty(e.prototype,"cells",{get:function(){return this._cells},enumerable:!1,configurable:!0}),e.prototype.getCell=function(e){return this._cells[e.y][e.x]},e.prototype.validate=function(){return!0},e}(),N=function(e,t,n,r,i){this.coordinate=e,this.direction=t,this.color=n,this.number=r,this.not=i};var x={up:t.Up,down:t.Down,left:t.Left,right:t.Right},E={white:c.White,blue:c.Blue,red:c.Red,yellow:c.Yellow,purple:c.Purple,orange:c.Orange,green:c.Green,black:c.Black};const G=function(){function e(){var e=this;this.buildGrid=function(t){return new k(t.map((function(t,n){return e.mapRow(t,n)})))},this.mapRow=function(t,n){return t.map((function(t,r){return e.mapCell(t,n,r)}))},this.mapCell=function(e,t,r){return new S(E[e.color],e.number,new n(r,t))},this.buildClues=function(t){return t.map((function(t){return e.buildClue(t)}))},this.buildClue=function(e){return new N(new n(e.x,e.y),x[e.direction],e.color?E[e.color]:void 0,e.number,e.not)}}return e.prototype.build=function(e){return new w(this.buildGrid(e.grid),this.buildClues(e.clues),e.numbers,e.colors.map((function(e){return E[e]})))},e}(),L=function(e,t){return void 0===t&&(t={}),fetch(e,t).then((function(e){return e.json()})).then((function(e){return e}))};var O=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function l(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},B=function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(l){return function(u){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(s=0)),s;)try{if(n=1,r&&(i=2&l[0]?r.return:l[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,l[1])).done)return i;switch(r=0,i&&(l=[2&l[0],i.value]),l[0]){case 0:case 1:i=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,r=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!i||l[1]>i[0]&&l[1]<i[3])){s.label=l[1];break}if(6===l[0]&&s.label<i[1]){s.label=i[1],i=l;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(l);break}i[2]&&s.ops.pop(),s.trys.pop();continue}l=t.call(e,s)}catch(e){l=[6,e],r=0}finally{n=i=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}},T=function(){function e(e,t,n){this.root=e,this.levelManager=t,this.renderer=n,this.enteringCandidates=!1,this.gameBuilder=new G,this.urlState=new o(this.handleHashChange.bind(this)),this.gameElement=this.root.querySelector("#game"),this.dialog=new C(this.root,this.root.querySelector("#dialog"),this.handleDialogOk.bind(this)),this.menu=new i(this.root.querySelector("#menu"),this.handleLevelChange.bind(this),this.levelManager),this.root.addEventListener("click",this.handleCellClick.bind(this))}return e.prototype.handleCellClick=function(e){if(!this.dialog.isOpen()&&void 0!==this.game){var t=e.target;if(null!==t){var r=this.closest(t,".cell");if(null!==r){var i=r.dataset.x,o=r.dataset.y,s=new n(parseInt(i,10),parseInt(o,10));this.currentCell=this.game.getCell(s),this.enteringCandidates=null!==this.closest(t,".candidates"),this.dialog.open(this.enteringCandidates?this.currentCell.getColorCandidates():[this.currentCell.getColorGuess()].filter((function(e){return void 0!==e})),this.enteringCandidates?this.currentCell.getNumberCandidates():[this.currentCell.getNumberGuess()].filter((function(e){return void 0!==e})),this.game.getColors(),this.game.getNumbers(),this.enteringCandidates?C.Type.Multiple:C.Type.Single)}}}},e.prototype.handleLevelChange=function(e){return O(this,void 0,void 0,(function(){return B(this,(function(t){switch(t.label){case 0:return[4,this.newGame(e).catch((function(){alert("No such level: ".concat(e))}))];case 1:return t.sent(),this.menu.close(),[2]}}))}))},e.prototype.handleDialogOk=function(e){if(void 0===this.currentCell)throw new Error("currentCell is undefined");if(void 0===this.game)throw new Error("game is undefined");var t=this.currentCell;if(this.currentCell=void 0,this.enteringCandidates)return t.resetColorCandidates(),t.resetNumberCandidates(),e.forEach((function(e){if(e.type!==p.Type.color){var n=e.value;t.addNumberCandidate(n)}else{var r=e.value;t.addColorCandidate(r)}})),void this.renderer.render(this.gameElement,this.game);t.setNumberGuess(void 0),t.setColorGuess(void 0),e.forEach((function(e){if(e.type!==p.Type.number){var n=e.value;t.setColorGuess(n)}else{var r=e.value;t.setNumberGuess(r)}})),this.winCheck(),this.renderer.render(this.gameElement,this.game)},e.prototype.init=function(){return O(this,void 0,void 0,(function(){var e;return B(this,(function(t){switch(t.label){case 0:return e=this.levelManager.current(),[4,this.newGame(e)];case 1:return t.sent(),[2]}}))}))},e.prototype.newGame=function(e,t){return void 0===t&&(t=!1),O(this,void 0,void 0,(function(){var n;return B(this,(function(r){switch(r.label){case 0:return[4,L("./api/game/".concat(e,".json"))];case 1:return n=r.sent(),this.game=this.gameBuilder.build(n),t||this.urlState.setLevel(e),this.levelManager.setLevel(e),this.renderer.render(this.gameElement,this.game),[2]}}))}))},e.prototype.winCheck=function(){var e;(null===(e=this.game)||void 0===e?void 0:e.isComplete())&&setTimeout((function(){return alert("Victory!")}),0)},e.prototype.closest=function(e,t){return e.matches(t)?e:null===e.parentElement?null:this.closest(e.parentElement,t)},e.prototype.handleHashChange=function(e){this.newGame(e,!0).catch((function(){alert("No such level: ".concat(e))}))},e}();const M=T;var R="gameId";const P=function(){function e(e){this.storage=e}return e.prototype.setId=function(e){this.storage.setItem(R,JSON.stringify(e))},e.prototype.getId=function(){var e=this.storage.getItem(R);return null===e?null:JSON.parse(e)},e}(),H=function(){function e(){}return e.prototype.render=function(e,t){var n=this,r=e.parentElement;r.removeChild(e),e.innerHTML='<div class="game rows-'.concat(t.height," cols-").concat(t.width,'">\n            <div class="horizontal-border"></div>\n            ').concat(t.getGrid().cells.map((function(e){return n.renderRow(e,t)}),this).join(""),"\n        </div>"),r.appendChild(e)},e.prototype.renderRow=function(e,t){var n=this;return'\n            <div class="row">\n                <div class="vertical-border"></div>\n                '.concat(e.map((function(e){return n.renderCell(e,t)}),this).join(""),'\n            </div>\n            <div class="row">\n                ').concat(this.renderHorizontalClues(e,t),"\n            </div>\n        ")},e.prototype.renderCell=function(e,n){var r=n.getClue(e.coordinate,t.Right);return'\n            <div class="cell'.concat(this.renderCellClassName(e),'"\n                data-x="').concat(e.coordinate.x,'"\n                data-y="').concat(e.coordinate.y,'"\n            >\n                ').concat(this.renderCellValue(e),'\n                <div class="candidates">').concat(this.renderCandidates(e),'</div>\n            </div>\n            <div class="vertical-border').concat(this.renderClueClassName(r),'">\n                ').concat(this.renderClueValue(r),"\n            </div>\n        ")},e.prototype.renderCellValue=function(e){var t=e.getNumberGuess();return void 0!==t?"".concat(t):""},e.prototype.renderCellClassName=function(e){var t=e.getColorGuess();return void 0===t?"":" color-".concat(t)},e.prototype.renderClueValue=function(e){if(void 0===e)return"";var t=void 0!==e.color?u[e.color]:"".concat(e.number);return'<span class="clue'.concat(!0===e.not?" not":"",'">').concat(t,"</span>")},e.prototype.renderClueClassName=function(e){return void 0===e||void 0===e.color?"":" color-".concat(e.color)},e.prototype.renderHorizontalClues=function(e,t){var n=this;return"<div></div>".concat(e.map((function(e){return n.renderHorizontalClue(e,t)})).join(""))},e.prototype.renderHorizontalClue=function(e,n){var r=n.getClue(e.coordinate,t.Down);return'\n            <div class="horizontal-border'.concat(this.renderClueClassName(r),'">\n                ').concat(this.renderClueValue(r),"\n            </div>\n            <div></div>")},e.prototype.renderCandidates=function(e){return"\n            <ul>".concat(e.getColorCandidates().map((function(e){return'<li class="color-'.concat(e,' color-candidate">&nbsp;</li>')})).join(""),"</ul>\n            <ul>").concat(e.getNumberCandidates().map((function(e){return"<li>".concat(e,"</li>")})).join(""),"</ul>\n        ")},e}();var I=["o3","o4","tbt"],j=function(){function e(e){this.store=e}return e.prototype.setLevel=function(e){this.store.setId(e)},e.prototype.current=function(){var e;return null!==(e=this.store.getId())&&void 0!==e?e:"o3-1"},e.prototype.next=function(e){return t=this,n=void 0,i=function(){var t,n,r,i,o;return function(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(l){return function(u){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(s=0)),s;)try{if(n=1,r&&(i=2&l[0]?r.return:l[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,l[1])).done)return i;switch(r=0,i&&(l=[2&l[0],i.value]),l[0]){case 0:case 1:i=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,r=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!i||l[1]>i[0]&&l[1]<i[3])){s.label=l[1];break}if(6===l[0]&&s.label<i[1]){s.label=i[1],i=l;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(l);break}i[2]&&s.ops.pop(),s.trys.pop();continue}l=t.call(e,s)}catch(e){l=[6,e],r=0}finally{n=i=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}}(this,(function(s){switch(s.label){case 0:if(console.log("level",e),null===(t=e.match(/^(o3|o4|tbt)/)))throw new Error("Invalid level: ".concat(e));return n=t[1],r=e.replace(/(\d+)$/,(function(e,t){return"".concat(parseInt(t,10)+1)})),i=!0,[4,L("./api/game/".concat(r,".json")).catch((function(){i=!1}))];case 1:return s.sent(),i?[2,r]:(o=I.indexOf(n)+1)===I.length?[2,null]:[2,"".concat(I[o],"-1")]}}))},new((r=void 0)||(r=Promise))((function(e,o){function s(e){try{u(i.next(e))}catch(e){o(e)}}function l(e){try{u(i.throw(e))}catch(e){o(e)}}function u(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(s,l)}u((i=i.apply(t,n||[])).next())}));var t,n,r,i},e}();const q=j;new M(window.document.getElementById("app"),new q(new P(window.localStorage)),new H).init()})();