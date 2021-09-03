import { LightningElement } from 'lwc';
import doclink from '@salesforce/resourceUrl/ServiceAgreement';

export default class LwcWithPDFViewer extends LightningElement {
    resourceUrl = doclink + '#toolbar=0';

    handleNextClick() {
        let checkBox = this.template.querySelector('lightning-input');
        if (checkBox.checked) {
            //do something   
        }
    }
 }