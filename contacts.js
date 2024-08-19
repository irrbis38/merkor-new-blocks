ymaps.ready(init);

function init() {
    $(".map_zone").each(function (index) {
        var id = $(this).data("id");
        var lat = $(this).data("lat");
        var lng = $(this).data("lng");

        let myMap = new ymaps.Map("map_" + id, {
            center: [lat, lng],
            zoom: 16,
            behaviors: ["default", "scrollZoom"],
            controls: [],
        });

        myMap.controls.add(
            new ymaps.control.ZoomControl({
                options: {
                    position: {
                        right: 20,
                        top: 20,
                    },
                },
            })
        );

        myMap.behaviors.disable("scrollZoom");

        var myPlacemark = new ymaps.Placemark(
            [lat, lng],
            {
                iconContent: "",
                hintContent: "",
                balloonContent: "",
            }
            /* {
                 iconLayout: 'default#image',
                 iconImageHref: './media/img/svg/map-marker.svg',
                 iconImageSize: [60, 72],
                 iconImageOffset: [-30, -72],
             } */
        );

        myMap.geoObjects.add(myPlacemark);
    });
}
