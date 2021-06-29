import {LightningElement,wire} from 'lwc';

export default class CustomHTMLTable extends LightningElement {
    asc = true;
    handleClick(event) {
        event.preventDefault();
        this.asc = !this.asc;
        console.log(event.target.name);
    }
}