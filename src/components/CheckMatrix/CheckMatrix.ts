import Component from 'formiojs/components/_classes/component/Component';
import editForm from 'formiojs/components/table/Table.form';

export default class CheckMatrix extends Component {

  public static builderInfo = {
    title: 'Check Matrix',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: CheckMatrix.schema(),
  };

  public static editForm = editForm;

  public static schema() {
    return Component.schema({
      type: 'checkmatrix',
      numRows: 3,
      numCols: 3,
    });
  }
  private checks: any;
  private foo: string;
  private component: any;
  private renderTemplate: any;
  private loadRefs: any;
  private addEventListener: any;
  private refs: any;
  private updateValue: any;
  constructor(component, options, data) {
    super(component, options, data);
    this.foo = 'bar';
  }

  /**
   * Render returns an html string of the fully rendered component.
   *
   * @param children - If this class is extendended, the sub string is passed as children.
   * @returns {string}
   */
  public render(children) {
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
  public attach(element) {
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
  public getValue() {
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
  public setValue(value) {
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
