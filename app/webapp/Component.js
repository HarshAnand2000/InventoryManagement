sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
 ], function (UIComponent,JSONModel) {
    "use strict";
    return UIComponent.extend("sap.ui.inventory.Component", {
       metadata : {
             interfaces: ["sap.ui.core.IAsyncContentCreation"],
             manifest: "json"
       },
       init : function () {
         
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);

        //setting global JSON model
        this.setModel(new sap.ui.model.json.JSONModel({authenticated: false}) , "TempDataModel");

        // create the views based on the url/hash
		  this.getRouter().initialize();
     }
    });
 });