sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";
    return Controller.extend("sap.ui.inventory.controller.SignUp", {

        onLiveChange: function () {
            clearTimeout(this._timer);
            this._timer = setTimeout(function () {
            }.bind(this), 500);
        },

        onSubmit: function () {
            var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "../../catalog/", synchronizationMode: "None" });

            var user = this.getView().byId("user_input").getValue();
            var pass = this.getView().byId("pass_input").getValue();
            var confirmPass = this.getView().byId("confirm_pass_input").getValue();

            var oRouter = this.getOwnerComponent().getRouter();

            var oContext2 = oModel.bindContext("/DT_USER");
            oContext2.requestObject().then(function (result) {
                var size = result.value.length;
                var i = 0;
                var found = 0;
                while (i < size) {
                    var userName = result.value[i].username;
                    if (userName == user && pass == confirmPass) {
                        var oContext = oModel.bindContext(`/DT_USER('${user}')`);
                        oContext.getBoundContext().setProperty("password", pass);
                        found = 1;
                        break;
                    }
                    if (userName == user && pass != confirmPass) {
                        found = -1;
                        break;
                    }
                    else {
                        found = 0;
                        i++;
                    }

                }
                if (found == 1) {
                    MessageBox.success("Password reset Successfully!",{
                        actions: ["Go back to LogIn", MessageBox.Action.CLOSE],
                        emphasizedAction: "Go back to LogIn",
                        onClose: function (sAction) {
                            if (sAction == "Go back to LogIn") {
                                oRouter.navTo("login");
                            }
                        }
                    });
                   
                }
                if (found == 0) {
                    MessageBox.error("Please Enter correct username",{
                        emphasizedAction: "CLOSE"
                    });
                }
                if (found == -1) {
                    MessageBox.error("Password doesn't match",{
                        emphasizedAction: "CLOSE"
                    });
                }

            });



        },
        handleValueHelp : function(){
            var x = this.getView().byId("pass_input");
            if (x.getProperty("type") == "Password") {
              x.setProperty("type","Text");
              x.setProperty("valueHelpIconSrc","sap-icon://hide");
            } else {
            x.setProperty("type","Password");
            x.setProperty("valueHelpIconSrc","sap-icon://show");
            }
         },
         handleValueHelp2 : function(){
            var x = this.getView().byId("confirm_pass_input");
            if (x.getProperty("type") == "Password") {
              x.setProperty("type","Text");
              x.setProperty("valueHelpIconSrc","sap-icon://hide");
            } else {
            x.setProperty("type","Password");
            x.setProperty("valueHelpIconSrc","sap-icon://show");
            }
         }





    });
});