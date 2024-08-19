$(document).ready(function () {
    (function () {
        $(".js-quant").mask("0###", {
            translation: { 0: { pattern: /[1-9*]/ } },
        });
        $('input[name="phone"]').mask("+7 (999) 999-99-99");

        var form = $(".manuf-form");
        var submit_button = $(".send-form");
        var class_disabled = "_disabled";
        var loader = $(".message_loader");

        submit_button.on("click", function (e) {
            e.preventDefault();
            form.submit();
        });

        $("input").on("input", function (e) {
            if ($(this).hasClass("f-incorrect"))
                $(this).removeClass("f-incorrect");
        });

        // Form submit
        form.on("submit", function (e) {
            e.preventDefault();

            if (form.hasClass(class_disabled)) return false;

            var allow_submit = true;
            var error_list = [];

            form.find(".custom_form_error").hide();

            // Required fields
            if (!CheckFieldsForm(form.find(".required_field"))) {
                allow_submit = false;
            }

            if (form.find('input[name="phone"]').val().length !== 18) {
                $('input[name="phone"]').addClass("f-incorrect");
                allow_submit = false;
            }

            if (!allow_submit) {
                return false;
            }

            $.ajax({
                type: "POST",
                url: "/ajaxer.php?x=form_manufacture",
                data: form.serialize(),
                dataType: "json",
                beforeSend: function () {
                    form.addClass(class_disabled);
                    submit_button.addClass(class_disabled);
                    loader.show();
                },
                success: function (result) {
                    if (result.success) {
                        $(
                            ".pro-form-content, .main-calc-section--form, .js-hide"
                        ).hide();
                        $(".js-show").show();
                        $(".pro-form-thx").show();
                    }
                },
                error: function () {},
                complete: function () {
                    form[0].reset();
                    form.removeClass(class_disabled);
                    submit_button.removeClass(class_disabled);
                    loader.hide();
                },
            });
        });
    })();
});
