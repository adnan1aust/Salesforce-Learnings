import { LightningElement, api } from 'lwc';

export default class ReusableFreeInput extends LightningElement {
    @api searchParam;
    @api showFreeInput;
    iconName = 'utility:jump_to_top';
    searchBtnText = 'Search';

    handleSearch() {
        this.iconName = 'utility:jump_to_bottom';
        const searchEvent = new CustomEvent(
            'search', {
                detail: {
                    freeInput: this.showFreeInput ? this.template.querySelector('lightning-input').value : '',
                }
        });
        this.dispatchEvent(searchEvent);
    }

    toggleSearchFilterFormVisibility() {

        this.iconName = this.iconName == 'utility:jump_to_top' ? 'utility:jump_to_bottom' : 'utility:jump_to_top';
        const toggleEvent = new CustomEvent('toggle', {
        });
        this.dispatchEvent(toggleEvent);
    }

    handleKeyPress(event) {

        if (event.keyCode === 13) {
            this.iconName = 'utility:jump_to_bottom';
            this.handleSearch();
        }
    }

    @api getFreeInput() {
        this.iconName = 'utility:jump_to_bottom';
        let freeInput = '';
        if (this.template.querySelector('lightning-input')) {
            freeInput = this.template.querySelector('lightning-input').value;
        }
        return freeInput;
    }

    @api focus() {
        this.template.querySelector('lightning-input').focus();
    }

}