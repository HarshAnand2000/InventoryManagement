sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"], function (Controller, MessageBox, MessageToast) {
        "use strict"; return Controller.extend("sap.ui.inventory.controller.AddProductInventory", {

            /////////////////for route authentication/////////////
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRouteMatched(this.checkAuthentication, this);
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
            /////////////////for route authentication/////////////

            onSubmit: function (oEvent) {

                var oRouter = this.getOwnerComponent().getRouter();

                var prd_id = this.getView().byId('prd_id').getValue();
                var prd_cat = this.getView().byId('prd_cat').getValue();
                var prd_name = this.getView().byId('prd_name').getValue();
                var prd_type = this.getView().byId('prd_type').getValue();
                var added_on = this.getView().byId('added_on').getValue();
                var added_by = this.getView().byId('added_by').getValue();
                var qty = this.getView().byId('qty').getValue();
                var stocks = this.getView().byId('stocks').getValue();
                var st_unit = this.getView().byId('st_unit').getValue();
                var uom = this.getView().byId('uom').getValue();
                var exp_date = this.getView().byId('exp_date').getValue();
                var batch_no = this.getView().byId('batch_no').getValue();


                var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "../../catalog/", synchronizationMode: "None" });
                var oContext = oModel.bindContext("/DT_PRODUCT");

                oContext.requestObject().then(function (result) {
                    var size = result.value.length;
                    var i = 0;
                    var found = 0;
                    while (i < size) {
                        var cat = result.value[i].prd_cat;
                        if (cat == prd_cat) {
                            var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "../../catalog/", synchronizationMode: "None" });
                            var oListBinding = oModel.bindList("/FT_INVENTORY");
                            var oContext = oListBinding.create({ "prd_id": prd_id, "prd_cat": prd_cat, "prd_name": prd_name, "prd_type": prd_type, "added_on": added_on, "added_by": added_by, "qty": qty, "stocks": stocks, "st_unit": st_unit, "uom": uom, "exp_date": exp_date, "batch_no": batch_no });

                            found = 1;
                            break;
                        }
                        else {
                            found = 0;
                            i++;
                        }

                    }
                    if (found == 1) {
                        MessageBox.success("Product Added Successfully! ");
                    }
                    if (found == 0) {
                        MessageBox.error("Product Category does not exist in Product Master", {
                            actions: ["Manage Product Master", MessageBox.Action.CLOSE],
                            emphasizedAction: "Manage Product Master",
                            onClose: function (sAction) {
                                if (sAction == "Manage Product Master") {
                                    oRouter.navTo("addproductmaster");
                                }
                            }
                        });
                    }

                });


            },
            onAddProductMaster: function (oEvent) {
                var oRouter = this.getOwnerComponent().getRouter();
                //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("addproductmaster");
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
                var tempModel = this.getView().getModel("TempDataModel");
                tempModel.setProperty("/authenticated",false);
                var oRouter = this.getOwnerComponent().getRouter();
                //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("login");
            }
        });
    });