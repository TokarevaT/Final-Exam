'use strict'; // Проверяем на валидность

    var ajaxModule = function () { };
    ajaxModule.prototype = {
        iterator: 1,
        masonryTimeoutClear: "",

        init: function (request, callback) {
            var self = this;

            self.iterator++;

            request = encodeURIComponent(request.split());
            this.callAjax(request, callback);

            $(".result").html("").show();
        },
        // ----------------------------------------------------------- Поиск элементов. Ajax запрос
        callAjax: function (request, callback) {
            var self = this;

            var ajaxRequest = $.ajax({
                url: "https://pixabay.com/api/?username=mjweaver01&key=2750116-f516471249e70495e72331045&q=" + request + "&image_type=photo",
                success: function (response) {
                    self.parseResponse(response);
                },
                error: function (response) {
                    console.log(response);
                }
            })

            ajaxRequest.then(function () {
                if (callback) {
                    callback();
                }
            })
        },
        // ----------------------------------------------------------- Вывод результатов
        parseResponse: function (response) {
            var self = this;
            
            if (response.hits != 0) {
                var divs = $('.grid .grid-item');
                for (var i = 0; i < divs.length; i++) {
                    if (i <= response.hits.length) {
                        var width = 300;
                        var element = $(divs[i]);
                        if (element.hasClass('grid-item--width2')) {
                            width = 320;
                        }
                        else if (element.hasClass('grid-item--width3')) {
                            width = 480;
                        }
                        $(divs[i]).empty();
                        $(divs[i]).append("<div class='image image" + i + "' style='width:" + width + "px; height:310px;border-radius: 5px; background: url(" + response.hits[i].webformatURL + ");'><a href='" + response.hits[i].pageURL + "' target='_blank'><div class='overlay'></div></a><div class='hidden'></div></div>");
                    }
                }
            }
      
            clearTimeout(self.masonryTimeoutClear);
        },
    }
    // ----------------------------------------------------------- Сохраняем и выводим значение с одной страницы на другю методом location.search
    var newModule = new ajaxModule();

    var Params = location.search.substring(5); // substring(5) - 5-тый эелемент после знака ?
    Params = decodeURIComponent(Params); // перекодируем что-бы можно было использовать любые знаки
    $('._sw').val(Params) // сохраняем значение в инпут
    newModule.init(Params); // выводим результаты поиска

    // ----------------------------------------------------------- Метод умного поиска
    var timeoutClear;
    $("._sw").keyup(function () { // при вводе данных в поисковую строку автоматически выводим результаты поиска
        var keyword = $(this).val().toLowerCase();

        clearTimeout(timeoutClear);
        timeoutClear = setTimeout(function () {

            if (keyword || !keyword === "undefined") {
                newModule.init(keyword);
            }
        }, 500);
    });


    function clickSearch() {
        var textValue = $('._sw').val();
        debugger;
       // ajaxModule.callAjax(textValue, callback);
    }