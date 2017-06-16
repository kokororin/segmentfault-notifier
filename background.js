var getNotifications = function(cb) {
	$.ajax({
		url: 'https://segmentfault.com/user/notifications',
		method: 'get',
		dataType: 'html'
	}).then(function(data) {
		typeof cb === 'function' && cb(data);
		var $list = $(data).find('.notify-stream');
		if ($list.length === 0) {
			chrome.browserAction.setBadgeText({
				text: '!'
			});
			return;
		}

		var $unViewed = $list.find('.stream-list__item:not(".viewed")');
		chrome.browserAction.setBadgeText({
			text: $unViewed.length + ''
		});
	});
};

setInterval(getNotifications, 5000);
