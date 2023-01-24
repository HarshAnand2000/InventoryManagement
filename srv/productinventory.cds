using { my.inventory as my } from '../db/scheam';

service ProductInventory{
    entity FT_INVENTORY as projection on my.FT_INVENTORY;
}