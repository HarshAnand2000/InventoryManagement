sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";
    return Controller.extend("sap.ui.inventory.controller.SignUp", {

        onLogInPress: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("login");
        },
        onSignUp: function (oEvent) {

            var username = this.getView().byId('user_input');
            var password = this.getView().byId('pass_input');
            if (username.getValue() === "") {
                MessageToast.show("Please enter username", { at: "center top" }); return;
            }
            if (password.getValue() === "") {
                MessageToast.show("Please enter password", { at: "center top" }); return;
            }
            var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "/catalog/", synchronizationMode: "None" });
            var oListBinding = oModel.bindList("/DT_USER");
            var oContext = oListBinding.create({ "username": username.getValue(), "password": password.getValue() });

            MessageToast.show("Signed Up Successfully!");
            username.setValue("");
            password.setValue("");
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("login");

        },
        handleValueHelp : function(){
            var x = this.getView().byId("pass_input");
            if (x.getProperty("type") == "Password") {
              x.setProperty("type","Text");
              x.setValueHelpIconSrc("sap-icon://hide");
            } else {
            x.setProperty("type","Password");
            x.setProperty("valueHelpIconSrc","sap-icon://show");
            }
         }

    });
});