var bg = chrome.extension.getBackgroundPage();

bg.getNotifications(function(data) {
	var $html = $(data);
	if ($html.find('.stream-list').length === 0) {
		alert('未登录');
		chrome.tabs.create({ url: 'https://segmentfault.com/user/login' });
	}
	$('#popup').empty().append($html.find('.stream-list').html());
});

$('#popup').on('click', 'a', function() {
	var $this = $(this);
	var href = $this.attr('href');
	href = transUrl(href);
	chrome.tabs.create({ url: href });
	return false;
});

$('#popup').on('click', 'button', function() {
	var $this = $(this);
	var $unViewed = $('#popup').find('.stream-list__item:not(".viewed")');
	$unViewed.each(function(index, el) {
		var $el = $(el);
		$el.addClass('viewed');
		var url = $el.find('a:last').attr('href');
		url = transUrl(url);
		$.ajax({
			url: url,
			method: 'get'
		});
	});
	$this.attr('disabled', true);
});

function transUrl(url) {
	if (url.substring(0, 1) === '/' && url.substring(0, 2) !== '//') {
		url = 'https://segmentfault.com' + url;
	}
	return url;
}
