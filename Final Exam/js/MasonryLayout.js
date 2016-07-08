$(function () {
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 160,
        isFitWidth: true
    });
    console.log('masonry');
});
