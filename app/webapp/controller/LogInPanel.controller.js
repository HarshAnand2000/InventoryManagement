sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("sap.ui.inventory.controller.LogInPanel", {





      onLogIn: function (oEvent) {
         var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "../../catalog/", synchronizationMode: "None" });
         var oContext = oModel.bindContext("/DT_USER");

         var username = this.getView().byId("user_input");
         var password = this.getView().byId("pass_input");
         var oRouter = this.getOwnerComponent().getRouter();

         oContext.requestObject().then(function (result) {
            var user = result.value[0].username;
            var pass = result.value[0].password;
            if (username.getValue() === "") {
               MessageToast.show("Please enter username", { at: "center top" }); return;
            }
            else if (password.getValue() === "") {
               MessageToast.show("Please enter password", { at: "center top" }); return;
            }
            else {
               if (username.getValue() === user && password.getValue() === pass) {
                  MessageToast.show("Congratulations!!! You have successfully Logged in...", { at: "center top" });
               }
               else { MessageToast.show("Invalid username or password", { at: "center top" }); return; }
            }
            oRouter.navTo("home");
         });

      }
   });
});