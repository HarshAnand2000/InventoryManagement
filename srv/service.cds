using { my.inventory as my } from '../db/scheam';

service Catalog{
    entity FT_INVENTORY as projection on my.FT_INVENTORY;
    entity DT_PRODUCT as projection on my.DT_PRODUCT;
}