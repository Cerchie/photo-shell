$(function () {
  const $slides = $(".slides");
  const margin = 44;
  const $slideWidth = $($slides[0]).width();
  const $slideOverallWidth = $slideWidth + margin;
  const $sliderWrapper = $(".slider-wrapper");
  const $slidesWrapper = $(".slides-wrapper");
  const $btnNext = $(".btn-next");
  const $btnPrev = $(".btn-prev");

  const slidesWrapperWidth = () => {
    let slidesAmount = $slides.length;
    let overallWidth = $slideWidth * slidesAmount;
    $slidesWrapper.css("width", overallWidth + margin * slidesAmount - 1);
  };

  const sliderWrapperWidth = () => {
    $sliderWrapper.css("width", $slideWidth + margin);
  };
  const calcMoveAmount = (index, type) => {
    let isNext = type === "+";
    let pastAmount = index * $slideOverallWidth;
    let newAmount;
    let newIndex;
    if (!isNext && index === 0) {
      newAmount = 0;
      newIndex = 0;
    } else if (isNext && index === $slides.length - 1) {
      newAmount = pastAmount;
      newIndex = index;
    } else {
      newAmount = isNext
        ? pastAmount + $slideOverallWidth
        : pastAmount - $slideOverallWidth;
      newIndex = isNext ? index + 1 : index - 1;
    }
    let parallaxAmount = (newIndex / $slides.length) * 100;
    $slides.find(".img-wrapper").css({
      "background-position": `${parallaxAmount}% 50%`,
    });
    $slides.removeClass("active to-right to-left");
    $($slides[newIndex]).addClass(`active`);
    return moveSliderBy(newAmount);
  };

  const moveSliderBy = (amount) => {
    $slidesWrapper.css("transform", `translate3d(-${amount}px, 0, 0)`);
  };

  sliderWrapperWidth();
  slidesWrapperWidth();

  $btnNext.click(function () {
    let index = $(".slides.active").index();
    calcMoveAmount(index, "+");
  });
  $btnPrev.click(function () {
    let index = $(".slides.active").index();
    calcMoveAmount(index, "-");
  });
});
