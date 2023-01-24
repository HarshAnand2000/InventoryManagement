sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
 ], function (Controller,MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.inventory.controller.LogInPanel", {
       onLogIn : function (oEvent) {
          MessageToast.show("Congratulations!!! You have successfully Logged in...",{
            at: "center top"
          });
         var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("home");
       }
    });
 });