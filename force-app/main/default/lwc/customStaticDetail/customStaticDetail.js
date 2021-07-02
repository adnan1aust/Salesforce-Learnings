import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import ADDRESS_FIELD from '@salesforce/schema/Account.Address';
import EMAIL_FIELD from '@salesforce/schema/Account.Email';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';


const FIELDS = [NAME_FIELD];

export default class CustomStaticDetail extends NavigationMixin(LightningElement) {
    name = NAME_FIELD;
    address = ADDRESS_FIELD;
    email = EMAIL_FIELD;
    phone = PHONE_FIELD;

    name;
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', FIELDS })
    initData({ error, data }) {
        if (data) {
            this.name = data.fields.Name.value;
        } else if (error) {
            console.error('Error:', error);
        }

    }

    redirectToScreen(event) {
        if (event.target.name === 'TestScreen') {

        } else if (event.target.name === 'TestScreen1') {
            let urlParam = {
                c__name: this.name
            };
            let navigationAttributes = {
                apiName: 'TestScreen'
            };
            this.navigateToOtherScreen('standard__navItemPage', urlParam, navigationAttributes);
        } else if (event.target.name === 'TestScreen2') {
            let urlParam = {
                c__name: this.name
            };
            let navigationAttributes = {
                apiName: 'TestScreen'
            };
            this.navigateToOtherScreen('standard__navItemPage', urlParam, navigationAttributes);
        } else if (event.target.name === 'TestScreen3') {
            let urlParam = {
                c__name: this.name
            };
            let navigationAttributes = {
                apiName: 'TestScreen'
            };
            this.navigateToOtherScreen('standard__navItemPage', urlParam, navigationAttributes);
        }
    }

    navigateToOtherScreen(pageType, urlParam, navigationAttributes) {
        this[NavigationMixin.GenerateUrl]({
            type: pageType,
            attributes: navigationAttributes,
            state: urlParam
        }).then(url => {
            window.open(url, "_blank");
        });
    }

}