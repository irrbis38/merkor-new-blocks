var loader = $(".loader");
var loader_show = false;

function scrollMore() {
    var $target = $("#showmore-triger");

    if (!$target) return;

    if (loader_show) {
        return false;
    }

    var wt = $(window).scrollTop();
    var wh = $(window).height();
    var et = $target.offset().top;
    var eh = $target.outerHeight();
    var dh = $(document).height();

    if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
        var count = parseInt($target.attr("data-count"));
        if (isNaN(count)) return false;

        $.ajax({
            type: "POST",
            url: "/ajaxer.php?x=objects_more",
            data: {
                count: count,
            },
            dataType: "json",
            beforeSend: function () {
                loader.show();
                loader_show = true;
            },
            success: function (result) {
                loader.hide();
                var new_content = $(result.html);
                $(".objects-row").append(new_content);

                new_content
                    .filter(".object-item")
                    .css("opacity", 0)
                    .animate({ opacity: 1 }, 300);

                $target.attr("data-count", count + parseInt(result.count));

                if (result.is_last) $target.remove();
            },
            complete: function () {
                loader_show = false;
            },
        });
    }
}

$(window).scroll(function () {
    scrollMore();
});

$(document).ready(function () {
    scrollMore();
});
