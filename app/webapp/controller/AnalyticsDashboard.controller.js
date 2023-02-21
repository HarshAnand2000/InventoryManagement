sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/Dialog",
   "sap/m/List",
   "sap/m/StandardListItem",
   "sap/m/Button"
], function (Controller, Dialog, List, StandardListItem, Button) {
   "use strict";

   return Controller.extend("sap.ui.inventory.controller.Home", {


      onInit: function () {

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
               mostSellingProduct.setText(maxProductName)
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
            console.log(year2021,year2022);
            var growth = ((year2022-year2021)/year2021)*100;
            arrowText.setText(growth);
            if(growth.toString().startsWith("")){
               icon.addStyleClass("iconUpColor");
            }
            if(growth.toString().startsWith("-")){
               console.log(growth);
               icon.addStyleClass("iconDownColor");
               icon.setProperty("src","sap-icon://arrow-bottom");
            }
            console.log(growth);
         });

         //YOY Growth 
         
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
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("login");
      },

      onMonthly: function () {
         if (!this.oResizableDialog) {
            this.oResizableDialog = new Dialog({
               title: "This Month Details",
               contentWidth: "550px",
               contentHeight: "300px",
               resizable: true,
               content: new List({
                  items: {
                     path: "/MonthlyDetails",
                     template: new StandardListItem({
                        title: "{productname}",
                        counter: "{prd_sale}"
                     }, {
                        title: "{categoryname}",
                        counter: "{prd_sale}"
                     }

                     )
                  }
               }),
               endButton: new Button({
                  text: "Close",
                  press: function () {
                     this.oResizableDialog.close();
                  }.bind(this)
               })
            });

            //to get access to the controller's model
            this.getView().addDependent(this.oResizableDialog);
         }

         this.oResizableDialog.open();
      },

   });
});