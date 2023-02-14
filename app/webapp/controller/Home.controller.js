sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageBox"
], function (BaseController, MessageBox) {
   "use strict";

   return BaseController.extend("sap.ui.inventory.controller.Home", {

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
      onAnalyticsDashboard: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("analyticsdashboard");
      },
      onHome: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("home");
      },
      onLogOut: function (oEvent) {
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("login");
      }
   });
});