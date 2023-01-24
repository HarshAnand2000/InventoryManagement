using { my.inventory as my } from '../db/scheam';

service UserMaster{
    entity DT_USER as projection on my.DT_USER;
}