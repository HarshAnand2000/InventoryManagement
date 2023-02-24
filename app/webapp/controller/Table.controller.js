sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/ViewSettingsDialog",
	"sap/m/ViewSettingsItem",
	"sap/m/MessageToast"
], function (
	BaseController,
	Filter,
	FilterOperator,
	Sorter,
	ViewSettingsDialog,
	ViewSettingsItem,
	MessageToast
) {
	"use strict";

	return BaseController.extend("sap.ui.inventory.controller.Table", {

		onInit: function () {
			this._oTable = this.byId("inventoryTable");
			this._oVSD = null;
			this._sSortField = null;
			this._bSortDescending = false;
			this._aValidSortFields = ["prd_id", "prd_cat", "prd_name"];
			this._sSearchQuery = null;

			this._initViewSettingsDialog();


		},
		onRefresh: function () {
			var oBinding = this.byId("inventoryTable").getBinding("items");
			if (oBinding.hasPendingChanges()) {
				MessageBox.error("refreshNotPossible");
				return;
			}
			oBinding.refresh();
			MessageToast.show("Refreshed Successfully");
		},
		onDelete: function () {
			var oSelected = this.byId("inventoryTable").getSelectedItems();
			console.log(oSelected[i]);
			if (oSelected) {
				for (var i = 0; i < oSelected.length; i++) {
					console.log(oSelected[i]);
					oSelected[i].getBindingContext().delete("$auto").then(function () {
						MessageToast.show("Deleted Succesfully!!");
					});
				}
			}
		},
		onSortButtonPressed: function () {
			this._oVSD.open();
		},

		onSearchInventoryTable: function (oEvent) {
			this._applySearchFilter(this.byId("searchField").getValue())
		},

		_initViewSettingsDialog: function () {
			this._oVSD = new ViewSettingsDialog("vsd", {
				confirm: function (oEvent) {
					var oSortItem = oEvent.getParameter("sortItem");
					this._applySorter(oSortItem.getKey(), oEvent.getParameter("sortDescending"));
				}.bind(this)
			});

			// init sorting (with simple sorters as custom data for all fields)
			this._oVSD.addSortItem(new ViewSettingsItem({
				key: "prd_id",
				text: "Product ID",
				selected: true			// by default the MockData is sorted by Product ID
			}));

			this._oVSD.addSortItem(new ViewSettingsItem({
				key: "prd_cat",
				text: "Product Category",
				selected: false
			}));

			this._oVSD.addSortItem(new ViewSettingsItem({
				key: "prd_name",
				text: "Product Name",
				selected: false
			}));
		},

		_applySearchFilter: function (sSearchQuery) {
			var aFilters, oFilter, oBinding;

			// add filters for search
			aFilters = [];
			if (sSearchQuery && sSearchQuery.length > 0) {
				aFilters.push(new Filter("prd_id", FilterOperator.Contains, sSearchQuery));
				aFilters.push(new Filter("prd_cat", FilterOperator.Contains, sSearchQuery));
				aFilters.push(new Filter("prd_name", FilterOperator.Contains, sSearchQuery));
				oFilter = new Filter({ filters: aFilters, and: false });  // OR filter
			} else {
				oFilter = null;
			}

			// update list binding
			oBinding = this._oTable.getBinding("items");
			oBinding.filter(oFilter, "Application");
		},

		/**
		 * Applies sorting on our table control.
		 * @param {string} sSortField		the name of the field used for sorting
		 * @param {string} sortDescending	true or false as a string or boolean value to specify a descending sorting
		 * @private
		 */
		_applySorter: function (sSortField, sortDescending) {
			var bSortDescending, oBinding, oSorter;

			// only continue if we have a valid sort field
			if (sSortField && this._aValidSortFields.indexOf(sSortField) > -1) {

				// convert  the sort order to a boolean value
				if (typeof sortDescending == "string") {
					bSortDescending = sortDescending === "true";
				} else if (typeof sortDescending === "boolean") {
					bSortDescending = sortDescending;
				} else {
					bSortDescending = false;
				}

				// sort only if the sorter has changed
				if (this._sSortField && this._sSortField === sSortField && this._bSortDescending === bSortDescending) {
					return;
				}

				this._sSortField = sSortField;
				this._bSortDescending = bSortDescending;
				oSorter = new Sorter(sSortField, bSortDescending);

				// sync with View Settings Dialog
				this._syncViewSettingsDialogSorter(sSortField, bSortDescending);

				oBinding = this._oTable.getBinding("items");
				oBinding.sort(oSorter);
			}
		},

		_syncViewSettingsDialogSorter: function (sSortField, bSortDescending) {
			// the possible keys are: "Product ID" | "Product Category" | "Product Name"
			// Note: no input validation is implemented here
			this._oVSD.setSelectedSortItem(sSortField);
			this._oVSD.setSortDescending(bSortDescending);
		}

	});

});
