$(function () {
            $('#s-input')
          .mouseup(function (e) { e.preventDefault(); })
          .autocomplete({
              position: { my: "left top", at: "left bottom", offset: "0, 5", collision: "none" },
              source: function (request, response) {
                  $.ajax({
                      url: "https://clients1.google.com/complete/search?q=" + request.term + "&hl=en&client=partner&source=gcsc&partnerid=000686474741928011237:5og56crijbk&ds=cse&nocache=" + Math.random().toString(),
                      dataType: "jsonp",
                      success: function (data) {
                          response($.map(data[1], function (item) {
                              return {
                                  label: item[0],
                                  value: item[0]
                              };
                          }));
                      }
                  });
              },
              autoFill: true,
              minChars: 0,
              select: function (event, ui) {
                  $(this).closest('input').val(ui.item.value);
                  $(this).closest('form').trigger('submit');
                  $(this).closest('#s-btn').trigger('click');
              }
          });
        });
