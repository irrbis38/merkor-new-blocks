"use strict";

// init video

var initVKVideo = (videos) => {
    // generate video url

    var generateUrl = (num, id) => {
        var query = "&hd=2&autoplay=1";
        return "https://vk.com/video_ext.php?oid=-" + num + "&id=" + id + query;
    };

    // create iframe element
    var createIframe = (num, id) => {
        var iframe = document.createElement("iframe");
        iframe.classList.add("video-iframe");
        iframe.setAttribute("src", generateUrl(num, id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
            "allow",
            "autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
        );

        return iframe;
    };

    // handling each video element
    videos.forEach((el) => {
        var videoHref = el.dataset.video;
        var deletedLength = "https://vk.com/video-".length;

        var videoFull = videoHref
            .substring(deletedLength, videoHref.length)
            .split("_");

        var parent = el.parentElement;

        var videoPlayBtn = parent.querySelector(".video-play-btn");

        videoPlayBtn.addEventListener("click", () => {
            var iframe = createIframe(videoFull[0], videoFull[1]);
            parent.querySelector(".video-preview").remove();
            el.append(iframe);
        });
    });
};

var objectItemInit = (container) => {
    var btnPlay = container.querySelector(".nobjects__video_play");
    var sliderContainer = container.querySelector(".nobjects__slider");
    var btnPrev = container.querySelector(".nobjects__prev");
    var btnNext = container.querySelector(".nobjects__next");

    var handlePlayHover = () => {
        container.classList.add("is-hover");
    };

    var handlePlayLeave = () => {
        container.classList.remove("is-hover");
    };

    btnPlay && btnPlay.addEventListener("mouseover", handlePlayHover);
    btnPlay && btnPlay.addEventListener("mouseleave", handlePlayLeave);

    if (sliderContainer) {
        new Swiper(sliderContainer, {
            slidesPerView: 1,
            // loop: true,
            spaceBetween: 10,
            navigation: {
                prevEl: btnPrev,
                nextEl: btnNext,
            },
        });
    }
};

var modalInit = (modal, showModalBtn) => {
    showModalBtn.addEventListener("click", () => {
        modal.classList.add("is-active");
        document.body.classList.add("lock");
    });

    var closeBtn = document.querySelectorAll(".js-modal-close");

    closeBtn.length > 0 &&
        closeBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                modal.classList.remove("is-active");
                document.body.classList.remove("lock");
            });
        });
};

var initProductsGroup = () => {
    var productsGroup = document.querySelector(".products__group");
    var button = document.querySelector(".products__group_more");

    if (productsGroup && button) {
        button.addEventListener("click", () => {
            productsGroup.classList.toggle("is-shown");

            productsGroup.classList.contains("is-shown")
                ? (button.textContent = "Скрыть")
                : (button.textContent = "Показать еще");
        });
    }
};

var initCompanyWrapper = (container) => {
    const btn = container.querySelector(".js-company-showall");

    btn.addEventListener("click", () => {
        container.style.maxHeight = container.scrollHeight + "px";
        container.classList.add("is-open");

        setTimeout(() => {
            container.style.maxHeight = "none";
        }, 300);
    });
};

var reviewsSliderInit = (container) => {
    var prevBtn = container.querySelector(".js-prev-btn");
    var nextBtn = container.querySelector(".js-next-btn");

    var previewsSlider = new Swiper(".nobjects-item__preview", {
        slidesPerView: "auto",
        spaceBetween: 14,
    });

    var fullSlider = new Swiper(".nobjects-item__full", {
        slidesPerView: 1,
        thumbs: {
            swiper: previewsSlider,
        },
        spaceBetween: 10,
        navigation: {
            prevEl: prevBtn,
            nextEl: nextBtn,
        },
    });
};

document.addEventListener("DOMContentLoaded", () => {
    var objectsItems = document.querySelectorAll(".media-item");

    if (objectsItems.length > 0) {
        objectsItems.forEach((obj) => objectItemInit(obj));
    }

    // get all video elements on the page
    var videos = Array.from(document.querySelectorAll(".video-block"));
    videos.length > 0 && initVKVideo(videos);

    var showModalBtn = document.querySelector(".js-open-modal");
    var modal = document.querySelector(".js-modal-feedback");

    // init modal
    modal && showModalBtn && modalInit(modal, showModalBtn);

    // init toggle products group
    initProductsGroup();

    // init toggle company__wrapper

    var companyWrapper = document.querySelector(".js-company-wrapper");

    companyWrapper && initCompanyWrapper(companyWrapper);

    // init reviews slider

    var fullSliderContainers = document.querySelectorAll(
        ".nobjects-item__sliders"
    );

    fullSliderContainers.length > 0 &&
        fullSliderContainers.forEach((container) => {
            reviewsSliderInit(container);
        });
});
