import { LightningElement, api } from 'lwc';
import styleSheet from '@salesforce/resourceUrl/styleSheet';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class ReusableFilterInput extends LightningElement {

    cssLoaded = false;
    @api filterInputFields;

    /*Method to be called from parent component to pass filter input data */
    @api getFilterFieldsData() {
        let filtervalues = {};
        const div = this.template.querySelectorAll('.filterInput');
        div.forEach(element => {
            filtervalues[element.name] = element.value;
        });
        return filtervalues;
    }

    /*Method to be called from parent component to handle validation */
    @api handleValidation() {
        const div = this.template.querySelectorAll('.filterInput');
        return div;
    }

    /*Seach data after enter button press */
    handleKeyPress(event) {

        if(event.keyCode === 13){
            const searchEvent = new CustomEvent(
                'search', {
                    detail: {}
            });
            this.dispatchEvent(searchEvent);
        }
    }

    renderedCallback() {

        if (!this.cssLoaded) {
            Promise.all([
                loadStyle( this, styleSheet )
                ]).then(() => {
                    console.log( 'Custom style for common filter input loaded.' );
                })
                .catch(error => {
                    console.log( error.body.message );
            });
            this.cssLoaded = true;
        }
    }

}