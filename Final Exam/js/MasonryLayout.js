$(function () {
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 160,
        //columnWidth: '.grid-sizer',
        isFitWidth: true
    });
    console.log('masonry');
});
//.grid-sizer,
//        .grid-item {
//    width: 80%;
//        //}