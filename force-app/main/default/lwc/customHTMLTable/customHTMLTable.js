import {LightningElement,wire, track} from 'lwc';
import accs from '@salesforce/apex/GenericController.returnAccs';
import getColor from '@salesforce/apex/GenericController.getColor';
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
    color;
    @wire(accs)
    acc({error, data}) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            console.error('error', error);
        }
    }

    gettColor() {
        getColor({
        })
        .then((data) => {
            this.color = data;
            console.log(data)
        })
        .catch((error) => {
            console.log('error: ', error);
        })
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
    renderedCallback() {
        console.log('Calling')
        getColor({
        })
        .then((data) => {
            this.template.querySelector("table").style.setProperty("--td-background", data);
            console.log(data)
        })
        .catch((error) => {
            console.log('error: ', error);
        })
    }
}