sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageBox"
], function (BaseController, MessageBox) {
   "use strict";

   return BaseController.extend("sap.ui.inventory.controller.Home", {

      /////////////////for route authentication/////////////
      onInit:function(){
         var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.attachRouteMatched(this.checkAuthentication,this);
      },

      checkAuthentication : function(oEvent){
         var sRouteName = oEvent.getParameter("name");
        
         if(sRouteName !== "" && sRouteName !=="signup" &&  sRouteName !=="forgotpassword"){
            if(!this.isAuthenticated()){
               var oRouter = this.getOwnerComponent().getRouter();
               oRouter.navTo("login");
               oEvent.preventDefault();
            }
         }
      },

      isAuthenticated:function(){
         var oModel = this.getView().getModel("TempDataModel");
         return oModel.getProperty("/authenticated");
      },
      /////////////////for route authentication/////////////

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
         var tempModel = this.getView().getModel("TempDataModel");
         tempModel.setProperty("/authenticated",false);
         oRouter.navTo("login");
      }
   });
});