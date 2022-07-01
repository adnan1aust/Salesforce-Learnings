public with sharing class SOQL {
    public SOQL() {

    }
    //SOSL doesn’t support big objects.
    String normalSOSL = 'FIND {test} RETURNING Account (Id), Contact, Opportunity LIMIT 60';/*Use SOSL when you dont know where the data resides */
    Stringf soslInExample = 'FIND {Marcus} IN NAME FIELDS'; /* Email, Name, Phone are supported, by default IN searches ALL FIELDS. */
    String soslWhereExample = 'FIND {test} RETURNING Account (Id WHERE Rating = "Hot" )'; /** Where is used to filter records in SOSL, only record visible to user is returned */
    String soslLimitExample = 'FIND {test} RETURNING Account (Id LIMIT 10)'; /*Max limit is 2000, if limit set to entire query the limit is ditributed, indivual sObject limit can be set*/
    String soslOrderByExample = 'FIND {test} RETURNING Account (Id, Name, Rating, Type ORDERBY Id DESC'; /*use NULLS FIRST or NULLS LAST to sort the null values, by default it is NULL FIRST */
    String soslWildCardExample = 'The query, FIND {Mi*}, willreturn results like "Mike" and "Michael"';/*SOSL supports * and ?, * is for multiple and ? is for single*/
    /*Get the List of Account object from below SOSL like this List<Account> acc = ((List<Account>)result[0]), Static query can be executed by Search.query(soslDemoExample)*/
    String soslDemoExample = 'FIND {United*} IN ALL FIELDS RETURNING Account(Id, Name, Phone WHERE Type ="test" LIMIT 10), Contact(Id, Name, Title ORDER BY Name)';


    String normalSOQL = 'SELECT Id, Name FROMAccount WHERE Name = "ABC"';/*Use SOSL when you do know where the data resides */
    String soqlWithExample = 'SELECT Title FROM KnowledgeArticleVersion WHERE PublishStatus="online" WITH DATA CATEGORYProduct__c AT Desktop__c'; /*AT ABOVE BELOW */
    String soqlInExample = 'SELECT Id FROM Account WHERE AccountNumber IN : integerList'; /*use expression binding*/
    String soqlGroupByExample = 'SELECT LeadSource, COUNT(Name) FROM Lead GROUP BY LeadSource'; /* COUNT_DISTINCT can be used to group non null value*/
    String soqlHavingExample = 'SELECT Name, Count(Id) FROM Account GROUPBY Name HAVING Count(Id) > 1'; /*Having filters the result returned by an aggregate function */
    String soqlOrderByExample = 'SELECT Id, Name FROM Account ORDERBY Name ASC NULLS FIRST'; //Use NULL FIRST or NULL LAST
    String soqlWildCardExample = 'SELECT Id, LastName FROM Contact WHERE LastName LIKE "Ab%"'; // % for all character _ for  single // Dynamic query is executed by Database.query(dynamicQuery)
    //Select all standard field, other values are CUSTOM and ALL, ALL and CUSTOM are not supported in  Apex and BULK API 2.0, salesforce CLI and SOAP REST can do unbounded query if the return result is limited
    String unboundedQueryExample = 'SELECT Test__c, FIELDS(STANDARD)FROM Contact';
    String soqlComparisionExample = 'SELECT Id FROM Account WHERE Types__c INCLUDES ("A1;A2","B4")'; /*for multiselect picklsit.; means and , means or */
    String soqlDateExample = 'SELECT Name FROM Contact WHERE Birthdate = 2021-01-01T00:00:00+08:00'; // In dates there should be no quotes and they use UTC, may need to add hour to adjust with prefered timezone
    String soqlDateLiterals = 'SELECT Name FROM Contact WHERE CreatedDate = YESTERDAY'; //More example : YESTERDAY, NEXT_WEEK, LAST_90_DAYS, LAST_N_MONTHS:6
    String soqlChildToParentExample1 = 'SELECT Id, Name, Account.Name FROM Contact WHERE Account.Rating = "Cold"';// Child to parent uses dot notation
    String soqlChildToParentExample2 = 'SELECT Id, Name, Mother__r.Name,Father__r.Name FROM Child__c WHERE Father__r.Name LIKE "Bill%"';//__r for custom object
    String soqlParentToChildExample1 = 'SELECT Name, (SELECT LastName FROM Contacts) FROM Account'; // Have to use child plural form
    String soqlParentToChildExample2 = 'SELECT Id, Name, (SELECT Id, Name FROM Children__r WHERE Name LIKE "Ted%") FROM Mother__c'; //__r for custom object
    String soqlPolyMorphicExample = 'SELECT Id, Description FROM Task WHERE Who.TypeIN ("Contact", "Lead")'; //whoId and whatId are polymorphic
    String soqlAlisExample = 'SELECT count() FROM Contact contact, contact.Account a WHERE a.name = "MyriadPubs"';
    // Returns 11 to 110, The maximum offset is 2,000 rows.OFFSET is intended to be used in a top-level query.A subquery can use OFFSET only if the parent query has a LIMIT 1 clause.
    //User order by with offset to make suer result set ordering is consistent.
    String soqlOffsetExample = 'SELECT Name FROM Merchandise__c WHERE Price__c > 5.0 ORDER BY Name LIMIT 100 OFFSET 10';
    String soqlLockExample = 'SELECT Id FROM Account LIMIT 2 FOR UPDATE'; // Can't use order by when data is locked
    String soqlQueryAllRows = 'SELECT COUNT() FROM Contact WHERE AccountId = a.Id ALL ROWS'; //returns deleted rows + existing rows


    //APEX CODE SNIPPETS
    public static void apexCodeSnippets(){
        String name = [SELECT Id, Name FROM Account WHERE Name = 'Singha' LIMIT 1].Name; //Fields can be accessed directly
        Integer amount = [SELECT COUNT() FROM Account]; // If query returns an integer there is no need to dereference

        Account account = new Account(Name = 'Acme');
        insert account;
        Contact contact = new Contact(LastName = 'Weissman');
        contact.AccountId = account.Id;
        insert contact;
        contact = [SELECT Account.Name FROM Contact WHERE Id = :contact.Id];
        contact.Account.Name = 'salesforce.com'; // if Account is null no error is given during getting value but during assigning it will give an error
        contact.LastName = 'Roth';
        update contact;
        update contact.Account; //need to update the account seperately

        // Use this format if you are not executing DML statements
        for (Account a : [SELECT Id, Name FROM Account WHERE Name LIKE 'Acme%']) {
        }

        // Use this format for efficiency if you are executing DML statements within the for loop(Not Preferable) : use batch apex instead for efficiency and governer limit
        for (List<Account> accts : [SELECT Id, Name FROM Account WHERE Name LIKE 'Acme%']) {
            update accts;
        }
    }

}
