chrome.browserAction.onClicked.addListener(function (tab) {
  var w = 450;
  var h = 650;
  var left = (screen.width / 2) - (w / 2);
  var top = (screen.height / 2) - (h / 2);

  chrome.windows.create({
    url: 'index.html',
    width: w,
    height: h,
    'left': left,
    'top': top,
    type: 'popup',
    focused: false
  }, function (window) {
    chrome.windows.update(currentWindowId, {
      focused: true
    });
  });
});
