public inherited sharing class GenericController {
    @AuraEnabled(Cacheable=true)
    public static list<Account> returnAccs(){
        return [SELECT Id, Name, Industry, Type,Phone, Rating, AccountNumber FROM Account];
    }
}