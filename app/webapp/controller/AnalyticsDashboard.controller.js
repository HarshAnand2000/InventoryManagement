sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";

   return Controller.extend("sap.ui.inventory.controller.Home", {


      onInit: function () {

         var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "../../catalog/", synchronizationMode: "None" });
         var oContext = oModel.bindContext("/MonthlyDetails");

         //Most Selling Individual Item for the month
         var mostSellingProduct = this.getView().byId("mostSellingProduct");
         oContext.requestObject().then(function (result) {
            var size = result.value.length;
            var maxProductSale = 0;
            var maxProductName;
            for (var i = 0; i < size; i++) {
               if (result.value[i].prd_sale > maxProductSale) {
                  maxProductSale = Number(result.value[i].prd_sale);
                  maxProductName = result.value[i].productname;
               }
               mostSellingProduct.setText(maxProductName)
            }
         });

         //Most Demanded Category for the month
         var mostSellingCategory = this.getView().byId("mostSellingCategory");
         oContext.requestObject().then(function (result) {
            var size = result.value.length;
            var maxCategorySale=0;
            var maxCategoryName;
            for (var i = 0; i < size; i++) {
               if (result.value[i].cat_sale > maxCategorySale) {
                  console.log(i);
                  maxCategorySale = Number(result.value[i].cat_sale);
                  maxCategoryName = result.value[i].category;
               }
            }
            mostSellingCategory.setText(maxCategoryName);
         });

         //YOY Growth 
         var value = this.getView().byId('arrowText').getText();
         var icon = this.getView().byId("arrowIcon");
         if (value.startsWith("+")) {
            icon.addStyleClass("iconUpColor");
         }
         if (value.startsWith("-")) {
            icon.addStyleClass("iconDownColor");
            icon.mProperties.src = "sap-icon://arrow-bottom";
         }
      },

      onAddProductMaster: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("addproductmaster");
      },
      onAddProductInventory: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("addproductinventory");
      },
      onHome: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("home");
      },
      onViewProductMaster: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("viewproductmaster");
      }
   });
});