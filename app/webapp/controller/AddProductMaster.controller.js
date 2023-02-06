sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/m/MessageBox"], function (Controller, MessageBox) {
         "use strict"; return Controller.extend("sap.ui.inventory.controller.AddProductMaster", {

            onSubmit: function (oEvent) {



                var prd_id = this.getView().byId('prd_id').getValue();
                var prd_cat = this.getView().byId('prd_cat').getValue(); 
                var prd_type = this.getView().byId('prd_typ').getValue();  
                var created_on = this.getView().byId('created_on').getValue(); 
                var created_by = this.getView().byId('created_by').getValue(); 
                var uom = this.getView().byId('uom').getValue(); 
                var active = this.getView().byId('active').getValue(); 
                var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "../../catalog/", synchronizationMode: "None" }); 
                var oListBinding = oModel.bindList("/DT_PRODUCT"); 
                var oContext = oListBinding.create({ "prd_id": prd_id, "prd_cat": prd_cat, "prd_type": prd_type, "created_on": created_on, "created_by": created_by, "uom": uom, "active": active });
       
                MessageBox.success("Successfully submit !");
       
       
             },
             onViewProductMaster: function (oEvent) {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("viewproductmaster");
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
             }
             
         }); 
    });