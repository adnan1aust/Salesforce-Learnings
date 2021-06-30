import {LightningElement,wire, track} from 'lwc';
import accs from '@salesforce/apex/GenericController.returnAccs';

export default class CustomHTMLTable extends LightningElement {
    @track sortObjcet = {
        Name: true,
        AccountName: false,
        CloseDate: false,
        Stage: false,
        Confidence: false,
        Amount: false,
        Contact : false,
    }
    asc = true;
    currentSortAttribute = 'Name';
    newSortAttribute;
    accounts = [];
    @wire(accs)
    acc({error, data}) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.error = error;
            console.log('error ===> ' + JSON.stringify(error));
        }
    }
    handleClick(event) {
        this.newSortAttribute = event.currentTarget.dataset.id;
        if (this.newSortAttribute != this.currentSortAttribute) {
            this.sortObjcet[this.currentSortAttribute] = false;
            this.sortObjcet[this.newSortAttribute] = true;
            this.asc = true;
            this.currentSortAttribute = this.newSortAttribute;
        } else {
            this.asc = !this.asc;
        }
        console.log(event.currentTarget.dataset.id);
    }
}