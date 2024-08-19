// Form fields validation
function CheckFieldsForm(fields) {
  var result = true;
  var check_fields = new Array();

  $.each(fields, function (i, selector) {
    var length = $(selector).length;

    if (length == 1) {
      check_fields.push($(selector));
    } else if (length > 1) {
      $(selector).each(function () {
        check_fields.push($(this));
      });
    }
  });

  $.each(check_fields, function (i, item) {
    item.removeClass("f-incorrect");

    var custom_select = item.closest(".custom_select_container");
    custom_select.removeClass("f-incorrect");

    if ($.trim(item.val()) == "" || item.val() == -1) {
      item.addClass("f-incorrect");
      custom_select.addClass("f-incorrect");

      result = false;
    }
  });

  return result;
}

// Plural
function Plural(num, words) {
  var wforms = words.split("|");

  if (wforms.length == 3) {
    var plural =
      num % 10 == 1 && num % 100 != 11
        ? 0
        : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
        ? 1
        : 2;
    return wforms[plural];
  } else return "";
}

// Formatted price
function FormatPrice(num) {
  var result = "";

  if ((matches = /^(-?)(\d+)(\.(\d+))?$/.exec(num))) {
    sign = matches[1] ? matches[1] : "";
    whole = matches[2];
    psub = matches[4] ? matches[4] : "";

    while (/\d+\d{3}/.test(whole)) {
      whole = whole.replace(/(\d+)(\d{3})/, "$1 $2");
    }

    psub = psub.replace(/^(0+)$/, "");
    psub = psub.length == 1 ? psub + "0" : psub;

    result = sign + whole + (psub != "" ? "." + psub : "");
  }

  return result;
}

function tableSearch() {
  var input, filter, table, tr, td, td2, i, txtValue, txtValue2;
  input = document.getElementById("tablefilterInput");
  filter = input.value.toUpperCase();
  tr = document.getElementsByClassName("d-row");

  // Перебирайте все строки таблицы и скрывайте тех, кто не соответствует поисковому запросу
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByClassName("d-title")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        $(".delivery-table-subtitle").css({ display: "" });
      } else {
        tr[i].style.display = "none";
        $(".delivery-table-subtitle").css({ display: "none" });
      }
    }
  }
}

function popupSearch() {
  var input, filter, table, tr, td, td2, i, txtValue, txtValue2;
  input = document.getElementById("popupfilterInput");
  filter = input.value.toUpperCase();
  tr = document.getElementsByClassName("dpl");

  // Перебирайте все строки таблицы и скрывайте тех, кто не соответствует поисковому запросу
  for (i = 0; i < tr.length; i++) {
    td = tr[i];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

let rlink = "";

function calc() {
  let calc = $(".js-calc");
  let position = calc.find('input[type="hidden"][name="position"]').val();
  let tol = calc.find('input[name="tol"]:checked').val();
  let material = calc.find('input[type="hidden"][name="material"]').val();
  let panelType = calc.find('input[type="hidden"][name="panel_type"]').val();
  let profileType = calc.find('input[name="profile_type"]:checked').val();
  let profileTypeText = calc
    .find('input[name="profile_type"]:checked')
    .next()
    .html();
  let colorName = calc.find('input[name="color"]').val();
  let dopText = "";

  let dopCounter = 0;
  $("input.dop_select:checked").each(function (index) {
    if (dopCounter === 0) {
      dopText += $(this).val();
      dopCounter++;
    } else {
      dopText += ", " + $(this).val();
    }
  });

  if (dopCounter === 0) {
    dopText = "—";
  }

  if (panelType === undefined) {
    panelType = calc.find('input[name="panel_type"]:checked').val();
  }

  if (material === undefined) {
    material = calc.find('input[name="material"]:checked').val();
  }

  if (panelType === "roof") {
    profileType = "trap";
    profileTypeText = "Трапециевидный";
    $('input[name="profile_type"][value="trap"]').prop("checked", true);
    $(".only-sten").hide();
  } else {
    $(".only-sten").show();
  }

  let path = `/images/calc/${position}/${panelType}/${profileType}/${material}/${colorName}.png?w=1114&h=330&fit=crop`;

  if (position === "vertical") {
    path = `/images/calc/${position}/${panelType}/${profileType}/${material}/${colorName}.png?h=580&w=180&fit=crop`;
  }

  rlink = `/calc?paneltype=${panelType}&profiletype=${profileType}&material=${material}&colorname=${colorName}`;

  $(".js-calc-link").attr("href", rlink);

  $(".pcalc-image img").attr("src", path);

  if ($(".main-calc-info").length) {
    $(".js-panel-type-text").html(
      panelType === "roof" ? "Кровельные" : "Стеновые"
    );
    $(".js-serd-text").html(material === "pir" ? "PIR" : "Минвата");
    $(".js-profile-type-text").html(profileTypeText);
    $(".js-t-text").html(tol);
    $(".js-service-text").html(dopText);
    $(".js-color-text").html(
      $(".color-picker-colors")
        .find(`[data-color='${colorName}']`)
        .data("color-name") +
        ", " +
        colorName.replace(/RAL/, 'RAL ')
    );
    $(".color-round").css(
      "background-color",
      $(".color-picker-colors")
        .find(`[data-color='${colorName}']`)
        .data("color-code")
    );

    $(".color-picker-colors > div").removeClass("active");
    $(".color-picker-colors")
      .find(`[data-color='${colorName}']`)
      .addClass("active");
  }
}


