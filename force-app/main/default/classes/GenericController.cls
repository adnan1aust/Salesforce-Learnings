public inherited sharing class GenericController {
    @AuraEnabled(Cacheable=true)
    public static list<Account> returnAccs(){
        return [SELECT Id, Name, Industry, Type,Phone, Rating, AccountNumber FROM Account];
    }

    @AuraEnabled
    public static string getColor(){
        return  Colorss__mdt.getInstance('Test').Value__c;
    }
}