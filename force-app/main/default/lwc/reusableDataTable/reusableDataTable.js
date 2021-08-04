import { LightningElement, api } from 'lwc';
import colors from '@salesforce/resourceUrl/colors';
import { loadStyle } from 'lightning/platformResourceLoader';
const TABLE_HEIGHT = '350px';
const CARDMARGIN = '0px';

export default class ReusableDataTable extends LightningElement {
    @api records;
    @api tableColumns;
    @api title;
    @api iconName;
    @api showSpinner;
    @api sortBy;
    @api sortDirection;
    @api visibleRecords;
    @api currentIndex;
    @api doShowRowNumberColumn;
    @api doHideCheckBoxColumn;
    @api doEnableInfiniteLoading;
    @api rowActionColName;
    @api isRowActionActive = false;
    @api tableHeight = TABLE_HEIGHT;
    @api cardMargin = CARDMARGIN;
    @api stopLoadMoreCall;
    @api isCardHidden = false;
    @api isStaticResourceNeeded = false;
    @api selectedRows = [];

    scrollCountHolder = 100;
    lazyLoading = false;

    /*Method to dispatch a sort event to parent */
    doSort(event) {
        try {

            this.visibleRecords = [];
            this.currentIndex = this.scrollCountHolder;
            this.lazyLoading = false;
            const sortEvent = new CustomEvent('sort', {
                detail: event.detail.fieldName
            });
            this.dispatchEvent(sortEvent);

        } catch (error) {
            console.error(error);
        }

    }

    /*Method to implement infinite loading */
    loadMoreData() {
        if (this.stopLoadMoreCall) {
            this.stopLoadMoreCall = !this.stopLoadMoreCall;
            return;
        }
        if (this.lazyLoading === false && this.visibleRecords.length != 0) {
            try {
                if (this.visibleRecords.length === this.records.length) {
                    return;
                }

                this.lazyLoading = true;

                setTimeout(() => {
                    this.currentIndex += this.scrollCountHolder;
                    this.visibleRecords = this.visibleRecords.concat(this.records.slice(this.visibleRecords.length, this.currentIndex));
                }, 500);

                setTimeout(() => {
                    this.lazyLoading = false;
                }, 1500);

            } catch (error) {
                console.error(error);
            }
        }
    }

    /*Method to handle datatable row level action */
    handleRowActions(event) {
        if (event.detail.action.name === 'common_action' && this.isRowActionActive) {
            if (this.rowActionColName) {
                const rowActionEvent = new CustomEvent('rowaction', {
                    detail: event.detail.row[this.rowActionColName]
                });
                this.dispatchEvent(rowActionEvent);
            }
        } else if (this.isRowActionActive) {
            const rowActionEvent = new CustomEvent('rowaction', {
                detail: { name: event.detail.action.name , row: event.detail.row }
            });
            this.dispatchEvent(rowActionEvent);
        }
    }

    /*Method to set table height from parent*/
    @api adjustDataTableHeight(height) {
        this.template
            .querySelector("lightning-card")
            .style.setProperty("--table-height", height);
    }

    renderedCallback() {

        if(!this.isCardHidden){
            this.template
                .querySelector("lightning-card")
                .style.setProperty("--table-height", this.tableHeight);
            this.template
                .querySelector("lightning-card")
                .style.setProperty("--card-margin", this.cardMargin);
        }

        if(this.isStaticResourceNeeded){
            Promise.all([
                loadStyle( this, colors )
                ]).then(() => {
                    console.log( 'Custom style for datatable loaded.' );
                })
                .catch(error => {
                    console.log( error.body.message );
            });
            this.isStaticResourceNeeded = false;
        }

    }

    /* Returns selected checkbox data to parent */
    getSelecteRowData(event) {
        let checkboxSelection = event.detail.selectedRows;
        const selectionAction = new CustomEvent('selectionaction', {
            detail: checkboxSelection
        });
        this.dispatchEvent(selectionAction);
    }

}