using { my.inventory as my } from '../db/scheam';

service Catalog{
    entity FT_INVENTORY as projection on my.FT_INVENTORY;
    entity DT_PRODUCT as projection on my.DT_PRODUCT;
    entity DT_USER as projection on my.DT_USER;
    entity YearlyDetails as projection on my.YearlyDetails;
    entity MonthlyDetails as projection on my.MonthlyDetails;
}