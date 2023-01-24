using { my.inventory as my } from '../db/scheam';

service ProductMaster{
    entity DT_PRODUCT as projection on my.DT_PRODUCT;
}