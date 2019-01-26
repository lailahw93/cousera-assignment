

(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOff', ShoppingListCheckOff);



////////the first controller

ToBuyController.$inject = ['ShoppingListCheckOff'];
function ToBuyController(ShoppingListCheckOff) {
  var ToBuyController = this;
  ToBuyController.items = ShoppingListCheckOff.getbuyItems();
  ToBuyController.error = "Everything is bought!";
  ToBuyController.itemName = "";
  ToBuyController.itemQuantity = "";

  ToBuyController.addItem = function (itemIndex,itemName,itemQuantity) {
    ShoppingListCheckOff.BoutItemstoList(itemIndex,itemName, itemQuantity);
  }
}



////////////// the second controller

AlreadyBoughtController.$inject = ['ShoppingListCheckOff'];
function AlreadyBoughtController(ShoppingListCheckOff) {
  var AlreadyBoughtController = this;
  AlreadyBoughtController.error = "Nothing bought yet";
  AlreadyBoughtController.items = ShoppingListCheckOff.getboughtItems();

  AlreadyBoughtController.removeItem = function (itemIndex) {
    ShoppingListCheckOff.returnItemToBuyList(itemIndex);
  };
}





///////////////// service
function ShoppingListCheckOff(maxItems=100) {




    var service = this;

  // List of shopping items
  var itemsToBuy = [{
        name: "apple",
        quantity: 5
      },
      {
        name: "banana",
        quantity: 9
      },
     {
        name: "coockies",
        quantity: 10
      }
      ,     {
        name: "Donuts",
        quantity: 100
      },
      {
        name: "Chocolate",
        quantity: 4
      }];

  var BoughtItems = [];

    service.BoutItemstoList = function (itemIndex,itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (BoughtItems.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      BoughtItems.push(item);
      this.removeItem(itemIndex,itemsToBuy);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (itemsToBuy.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      itemsToBuy.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };
  service.returnItemToBuyList = function(itemIndex){
    itemsToBuy.push(BoughtItems[itemIndex]);
    BoughtItems.splice(itemIndex,1);
  }

  service.removeItem = function (itemIndex, ListName) {
    ListName.splice(itemIndex, 1);
  };

  service.getbuyItems = function () {
    return itemsToBuy;
  };

  service.getboughtItems = function () {
    return BoughtItems;
  };
}



///////////////////////////////////////////

///////////////////////////////////////////






})();