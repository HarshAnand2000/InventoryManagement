namespace my.inventory;

entity DT_USER{
    key username : String;
    password : String;
}

entity DT_PRODUCT{
    key prd_id : String;
    prd_cat : String;
    prd_type : String;
    created_on : String;
    created_by : String;
    uom : String;
    active : Boolean;
    FT_Inventory : Composition of many FT_INVENTORY on FT_Inventory.prd_cat=prd_cat;
}

entity FT_INVENTORY{
    prd_id : String;
    prd_cat : String;
    prd_name : String;
    prd_type : String;
    key added_on : Timestamp;
    added_by : String;
    qty : String;
    stocks : String;
    st_unit : String;
    uom : String;
    exp_date : String;
    batch_no : String;
}