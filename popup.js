var bg = chrome.extension.getBackgroundPage();

bg.getNotifications(function(data) {
	var $html = $(data);
	if ($html.find('.stream-list').length === 0) {
		alert('未登录');
		chrome.tabs.create({ url: 'https://segmentfault.com/user/login' });
	}
	$('#popup').append($html.find('.stream-list').html());
});

$('#popup').on('click', 'a', function() {
	var $this = $(this);
	var href = $this.attr('href');
	if (href.substring(0, 1) === '/' && href.substring(0, 2) !== '//') {
		href = 'https://segmentfault.com' + href;
	}
	chrome.tabs.create({ url: href });
	return false;
});
