sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("sap.ui.inventory.controller.LogInPanel", {
      onLogIn: function (oEvent) {
         var username = this.getView().byId("user_input"); 
         var password = this.getView().byId("pass_input"); 
         var user = "Alice"; var pass = "Alice@1234"; 
         if (username.getValue() === "") { 
            MessageToast.show("Please enter username", { at: "center top" }); return; } 
         else if (password.getValue() === "") { 
            MessageToast.show("Please enter password", { at: "center top" }); return; } 
         else { if (username.getValue() === user && password.getValue() === pass) { 
            MessageToast.show("Congratulations!!! You have successfully Logged in...", { at: "center top" }); } 
         else { MessageToast.show("Invalid username or password", { at: "center top" }); return; } }
         var oRouter = this.getOwnerComponent().getRouter();
         //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("home");
      }
   });
});