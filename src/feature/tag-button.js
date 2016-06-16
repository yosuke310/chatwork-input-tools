const buttons = [{
  html: '<li role="button" class="_showDescription" aria-label="info：選択したメッセージをinfoタグで囲みます"><span class="tag">info</span></li>',
  tag: ['[info]', '[/info]'],
}, {
  html: '<li role="button" class="_showDescription" aria-label="title：選択したメッセージをtitleタグで囲みます"><span class="tag">title</span></li>',
  tag: ['[title]', '[/title]'],
}, {
  html: '<li role="button" class="_showDescription" aria-label="code：選択したメッセージをcodeタグで囲みます"><span class="tag">code</span></li>',
  tag: ['[code]', '[/code]'],
}, {
  html: '<li role="button" class="_showDescription" aria-label="hr：メッセージにhrタグを挿入します"><span class="tag">hr</span></li>',
  tag: ['[hr]'],
}, {
  html: '<li role="button" class="_showDescription" aria-label="( ´ー`)。о（）：選択したメッセージを( ´ー`)。о（）で囲みます"><span class="tag">( ´ー`)。о（）</span></li>',
  tag: ['( ´ー`)。о（', '）'],
}];

let chatTextarea = document.getElementById('_chatText')
  , chatSendTool = document.getElementById('_chatSendTool')
  , chatSendToolExtension = createElement('<ul id="_chatSendToolExtension"></ul>');

// create DOM element from html
function createElement(html) {
  let dummy = document.createElement('div');
  dummy.insertAdjacentHTML('beforeEnd', html);
  return dummy.children[0];
}

function handler(tagOpen, tagClose = '') {
  return function(e){
    chatTextarea.focus();
    let text = chatTextarea.value
      , selectionStart = chatTextarea.selectionStart
      , selectionEnd = chatTextarea.selectionEnd
      , caret = selectionStart + tagOpen.length;
    if (!!tagClose && selectionEnd - selectionStart > 0) {
      caret += selectionEnd - selectionStart + tagClose.length;
    }
    chatTextarea.value = text.substr(0, selectionStart)
      + tagOpen
      + text.substr(selectionStart, selectionEnd - selectionStart)
      + tagClose
      + text.substr(selectionEnd, text.length);
    chatTextarea.setSelectionRange(caret, caret);
  };
}

buttons.forEach(function(button){
  let elm = createElement(button.html);
  elm.addEventListener('click', handler.apply(this, button.tag));
  chatSendToolExtension.appendChild(elm);
});
chatSendTool.appendChild(chatSendToolExtension);
