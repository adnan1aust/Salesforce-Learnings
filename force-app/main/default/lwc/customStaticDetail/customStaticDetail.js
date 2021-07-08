import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import ADDRESS_FIELD from '@salesforce/schema/Account.BillingAddress';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

import { showAlert } from 'c/commonFunctionalityJS';


const FIELDS = [NAME_FIELD];

export default class CustomStaticDetail extends NavigationMixin(LightningElement) {
    name = NAME_FIELD;
    address = ADDRESS_FIELD;
    website = WEBSITE_FIELD;
    phone = PHONE_FIELD;

    name;
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    initData({ error, data }) {
        if (data) {
            this.name = data.fields.Name.value;
        } else if (error) {
            console.error('Error:', error);
        }

    }

    redirectToScreen(event) {
        if (event.target.name === 'TestScreen') {
            /*Code to copy to clipboard */
            let url = 'www.google.com';
            let placeHolder = document.createElement('textarea');
            document.body.appendChild(placeHolder);
            placeHolder.value = url;
            placeHolder.select();
            document.execCommand('copy');
            document.body.removeChild(placeHolder);

            this.showNotification();
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

    showNotification() {
        showAlert('', 'Your link has been copied', 'success', this);
    }

}