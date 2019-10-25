"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("formiojs/components/_classes/component/Component");
const Table_form_1 = require("formiojs/components/table/Table.form");
class CheckMatrix extends Component_1.default {
    constructor(component, options, data) {
        super(component, options, data);
        this.foo = 'bar';
    }
    static schema() {
        return Component_1.default.schema({
            type: 'checkmatrix',
            numRows: 3,
            numCols: 3,
        });
    }
    /**
     * Render returns an html string of the fully rendered component.
     *
     * @param children - If this class is extendended, the sub string is passed as children.
     * @returns {string}
     */
    render(children) {
        // To make this dynamic, we could call this.renderTemplate('templatename', {}).
        let tableClass = 'table ';
        ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
            if (this.component[prop]) {
                tableClass += `table-${prop} `;
            }
        });
        const inputs = [];
        for (let i = 0; i < this.component.numRows; i++) {
            for (let j = 0; j < this.component.numCols; j++) {
                inputs[i] = inputs[i] || [];
                inputs[i][j] = this.renderTemplate('input', {
                    input: {
                        type: 'input',
                        ref: `${this.component.key}-${i}`,
                        attr: {
                            id: `${this.component.key}-${i}-${j}`,
                            class: 'form-control',
                            type: 'checkbox',
                        },
                    },
                });
            }
        }
        // Calling super.render will wrap its html as a component.
        return super.render(this.renderTemplate('checkmatrix', {
            inputs,
            tableClass,
        }));
    }
    /**
     * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
     * elements to attach functionality to.
     *
     * @param element
     * @returns {Promise}
     */
    attach(element) {
        const refs = {};
        for (let i = 0; i < this.component.numRows; i++) {
            refs[`${this.component.key}-${i}`] = 'multiple';
        }
        this.loadRefs(element, refs);
        this.checks = [];
        for (let i = 0; i < this.component.numRows; i++) {
            this.checks[i] = Array.prototype.slice.call(this.refs[`${this.component.key}-${i}`], 0);
            // Attach click events to each input in the row
            this.checks[i].forEach((input) => {
                this.addEventListener(input, 'click', () => this.updateValue());
            });
        }
        // Allow basic component functionality to attach like field logic and tooltips.
        return super.attach(element);
    }
    /**
     * Get the value of the component from the dom elements.
     *
     * @returns {Array}
     */
    getValue() {
        const value = [];
        for (const rowIndex of Object.keys(this.checks)) {
            const row = this.checks[rowIndex];
            value[rowIndex] = [];
            for (const colIndex of Object.keys(row)) {
                const col = row[colIndex];
                value[rowIndex][colIndex] = !!col.checked;
            }
        }
        return value;
    }
    /**
     * Set the value of the component into the dom elements.
     *
     * @param value
     * @returns {boolean}
     */
    setValue(value) {
        if (!value) {
            return;
        }
        for (const rowIndex of Object.keys(this.checks)) {
            const row = this.checks[rowIndex];
            if (!value[rowIndex]) {
                break;
            }
            for (const colIndex of Object.keys(row)) {
                const col = row[colIndex];
                if (!value[rowIndex][colIndex]) {
                    return false;
                }
                const checked = value[rowIndex][colIndex] ? 1 : 0;
                col.value = checked;
                col.checked = checked;
            }
        }
    }
}
exports.default = CheckMatrix;
CheckMatrix.builderInfo = {
    title: 'Check Matrix',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: CheckMatrix.schema(),
};
CheckMatrix.editForm = Table_form_1.default;
