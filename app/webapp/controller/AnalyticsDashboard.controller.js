sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/Dialog",
   "sap/m/List",
   "sap/m/StandardListItem",
   "sap/m/Button",
   'sap/ui/core/Fragment',
], function (Controller, Dialog, List, StandardListItem, Button, Fragment) {
   "use strict";

   return Controller.extend("sap.ui.inventory.controller.Home", {




      onInit: function () {



         /////////////////for route authentication/////////////
         var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.attachRouteMatched(this.checkAuthentication, this);


         var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "../../catalog/", synchronizationMode: "None" });
         var oContext = oModel.bindContext("/MonthlyDetails");
         var oContext2 = oModel.bindContext("/YearlyDetails");
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
               mostSellingProduct.setText(maxProductName);
            }
         });

         //Most Demanded Category for the month
         var mostSellingCategory = this.getView().byId("mostSellingCategory");
         oContext.requestObject().then(function (result) {
            var size = result.value.length;
            var maxCategorySale = 0;
            var maxCategoryName;
            for (var i = 0; i < size; i++) {
               if (result.value[i].cat_sale > maxCategorySale) {
                  maxCategorySale = Number(result.value[i].cat_sale);
                  maxCategoryName = result.value[i].category;
               }
            }
            mostSellingCategory.setText(maxCategoryName);
         });

         //YOY Growth 
         var arrowText = this.getView().byId("arrowText");
         var icon = this.getView().byId("arrowIcon");
         oContext2.requestObject().then(function (result) {
            var size = result.value.length;
            var year2022 = 0;
            var year2021 = 0;
            for (var i = 0; i < size; i++) {
               if (result.value[i].year == "2022") {
                  year2022 += parseInt(result.value[i].detergent) + parseInt(result.value[i].soap) + parseInt(result.value[i].skincare)
                     + parseInt(result.value[i].toothpaste)
               }
               if (result.value[i].year == "2021") {
                  year2021 += parseInt(result.value[i].detergent) + parseInt(result.value[i].soap) + parseInt(result.value[i].skincare)
                     + parseInt(result.value[i].toothpaste)
               }
            }

            console.log(year2021, year2022);
            var growth = ((year2022 - year2021) / year2021) * 100;
            growth = growth.toString().slice(0, 5);
            arrowText.setText(growth);
            if (!growth.startsWith("-")) {
               icon.addStyleClass("iconUpColor");
            }
            if (growth.startsWith("-")) {
               console.log(growth);
               icon.addStyleClass("iconDownColor");
               icon.setProperty("src", "sap-icon://arrow-bottom");
            }
            console.log(growth);
         });



      },
      checkAuthentication: function (oEvent) {
         var sRouteName = oEvent.getParameter("name");

         if (sRouteName !== "" && sRouteName !== "signup" && sRouteName !== "forgotpassword") {
            if (!this.isAuthenticated()) {
               var oRouter = this.getOwnerComponent().getRouter();
               oRouter.navTo("login");
               oEvent.preventDefault();
            }
         }
      },

      isAuthenticated: function () {
         var oModel = this.getView().getModel("TempDataModel");
         return oModel.getProperty("/authenticated");
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
      },
      onLogOut: function (oEvent) {
         var tempModel = this.getView().getModel("TempDataModel");
         tempModel.setProperty("/authenticated",false);
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("login");
      }
   });
});