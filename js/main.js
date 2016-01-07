$(function() {
	$(document).ajaxStart(function() {
		$(".loading").show();
	}).ajaxStop(function() {
		$(".loading").hide();
	});
	$(".tooltips").hide();
	var clipboard = new Clipboard('.copy');
	clipboard.on('success', function(e) {
		$(".tooltips").css("display", "block");
	});
	clipboard.on('error', function(e) {
		alert("复制失败");
	});
	$('#smfile').each(function() {
		var $input = $(this),
			$label = $input.next('label'),
			labelVal = $label.html();
		$input.on('change', function(e) {
			$(".tooltips").hide(); //再次上传文件提示消失
			if (e.target.value) {
				fileName = e.target.value.split('\\').pop();
			}
			if (fileName) {
				$label.html(fileName);
				$(".btn").click(function() {
					var imageUrl;
					var formData = new FormData($("#upload")[0]);
					$.ajax({
						type: 'POST',
						url: "https://sm.ms/api/upload",
						data: formData,
						processData: false, // tell jQuery not to process the data
						contentType: false,
						dataType: "json",
						error: function() {
							console.log("出现错误");
						},
						success: function(data) {
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
})