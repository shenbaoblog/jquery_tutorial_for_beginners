$(function() {
  var $order = $("#orders");
  $.ajax({
    type: "GET",
    url: "/api/orders",
    success: function(data) {
      $.each(orders, function(i, order) {
        $orders.append(
          "<li>name: " + order.name + ", drink: " + order.drink + "</li>"
        );
      });
    }
  });
});
