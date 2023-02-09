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

         var uname = username.getValue();
         this.getView().getModel("TempDataModel").setProperty("/", { "UserName": uname });


         oContext.requestObject().then(function (result) {
            var size = result.value.length;
            var i = 0;
            while (i < size) {
               var user = result.value[i].username;
               var pass = result.value[i].password;
               console.log(user, pass);

               if (username.getValue() === "") {
                  MessageToast.show("Please enter username", { at: "center top" }); return;
               }
               if (password.getValue() === "") {
                  MessageToast.show("Please enter password", { at: "center top" }); return;
               }
               if (username.getValue() === user && password.getValue() === pass) {
                  MessageToast.show("Congratulations!!! You have successfully Logged in...", { at: "center top" });
                  oRouter.navTo("home");
                  break;
               }
               else {

                  MessageToast.show("Invalid username and password", { at: "center top" });
                  i++;
               }

            }
         });

      }
   });
});