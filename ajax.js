//PUT

//RESTful get post put delete
$(function() {
  var $orders = $("#orders");
  var $name = $("#name");
  var $drink = $("#drink");

  var orderTemplate = $("#order-template").html();

  function addOrder(order) {
    $orders.append(Mustache.render(orderTemplate, order));
  }

  $.ajax({
    type: "GET",
    url: "/api/orders",
    success: function(data) {
      $.each(orders, function(i, order) {
        addOrder(order);
      });
    },
    error: function() {
      alert("error loading orders");
    }
  });

  $("#add-order").on("click", function() {
    var order = {
      name: $name.val(),
      drink: $drink.val()
    };

    $.ajax({
      type: "POST",
      url: "/api/orders",
      data: order,
      success: function(newOrder) {
        addOrder(newOrder);
      },
      error: function() {
        alert("error saving order");
      }
    });
  });

  $orders.delegate(".remove", "click", function() {
    var $li = $(this).closest("li");
    var self = this;

    $.ajax({
      type: "DELETE",
      url: "/api/orders/" + $(this).attr("data-id"),
      success: function() {
        $li.fadeOut(300, function() {
          $(this).remove();
        });
      }
    });
  });
  $order.delegate(".editOrder", "click", function() {
    var $li = $(this).closest("li");
    $li.find("input.name").val($li.find("span.name").html());
    $li.find("input.drink").val($li.find("span.drink").html());
    $li.addClass("edit");
  });

  $order.delegate(".cancelEdit", "click", function() {
    $(this)
      .closest("li")
      .removeClass("edit");
  });

  $order.delegate(".saveEdit", "click", function() {
    var $li = $(this).closest("li");
    var order = {
      name: $li.find("input.name").val(),
      drink: $li.find("input.name").val()
    };

    $.ajax({
      type: "PUT",
      url: "/api/orders" + $li.attr("data-id"),
      data: order,
      success: function(newOrder) {
        addOrder(newOrder);
        $li.find("span.name").html(order.name);
        $li.find("span.drink").html(order.name);
        $li.removeClass("edit");
      },
      error: function() {
        alert("error updating order");
      }
    });
  });
});
