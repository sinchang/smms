$(function () {
	$(document).ajaxStart(function () {
		$(".loading").show();
	}).ajaxStop(function () {
		$(".loading").hide();
	});

	var clipboard = new Clipboard('.copy');
	clipboard.on('success', function (e) {
		$(".tooltips").show();
	});
	clipboard.on('error', function (e) {
		alert("复制失败");
	});


	var $input = $('#smfile'),
		$label = $input.next('label'),
		labelVal = $label.html();
	$input.on('change', function (e) {
		$(".img").hide();
		$(".tooltips").hide();
		if (e.target.value) {
			fileName = e.target.value.split('\\').pop();
		}
		if (fileName) {
			$label.html(fileName);
			$(".btn").click(function () {
				var imageUrl;
				var formData = new FormData($("#upload")[0]);
				console.log(formData);
				$.ajax({
					type: 'POST',
					url: "https://sm.ms/api/upload?ssl=true",
					data: formData,
					processData: false,
					contentType: false,
					dataType: "json",
					error: function () {
						console.log("出现错误");
					},
					success: function (data) {
						imageUrl = data.data.url;
						$(".img").show();
						$(".showUrl1").val(imageUrl);
						$(".showUrl2").val('![](' + imageUrl + ')');
						$(".img img").attr("src", imageUrl);
					},
				});
				return false;
			});
		} else {
			$label.html(labelVal);
		}
	});
});