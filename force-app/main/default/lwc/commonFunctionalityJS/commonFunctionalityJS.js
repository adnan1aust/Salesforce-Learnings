import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/*ES6 module function to show customizable alert */
const showAlert = (alertTitle, alertMessage, alertVariant, context) => {
    const evt = new ShowToastEvent({
        title: alertTitle,
        message: alertMessage,
        variant: alertVariant
    });
    context.dispatchEvent(evt);
}

export {  showAlert };