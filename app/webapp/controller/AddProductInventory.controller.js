sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/m/MessageBox"], function (Controller,MessageBox) {
        "use strict"; return Controller.extend("sap.ui.inventory.controller.AddProductInventory", {
            onSubmit: function (oEvent) {

                var prd_id = this.getView().byId('prd_id').getValue();
                var prd_cat = this.getView().byId('prd_cat').getValue();
                var prd_name = this.getView().byId('prd_name').getValue(); 
                var prd_type = this.getView().byId('prd_type').getValue();  
                var added_on = this.getView().byId('added_on').getValue(); 
                var added_by = this.getView().byId('added_by').getValue(); 
                var qty = this.getView().byId('qty').getValue(); 
                var stocks = this.getView().byId('stocks').getValue(); 
                var st_unit= this.getView().byId('st_unit').getValue(); 
                var uom= this.getView().byId('uom').getValue(); 
                var exp_date= this.getView().byId('exp_date').getValue(); 
                var batch_no= this.getView().byId('batch_no').getValue(); 

                var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "../../catalog/", synchronizationMode: "None" }); 
                var oListBinding = oModel.bindList("/FT_INVENTORY"); 
                var oContext = oListBinding.create({ "prd_id": prd_id, "prd_cat": prd_cat, "prd_name": prd_name, "prd_type": prd_type, "added_on": added_on, "added_by": added_by, "qty" : qty, "stocks" : stocks, "st_unit" : st_unit, "uom": uom, "exp_date": exp_date, "batch_no": batch_no });
       
                MessageBox.success("Product Added Successfully! ");
       
       
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
                var oRouter = this.getOwnerComponent().getRouter();
                //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("login");
             }
        });
    });