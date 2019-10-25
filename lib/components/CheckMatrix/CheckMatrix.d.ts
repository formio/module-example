import Component from 'formiojs/components/_classes/component/Component';
export default class CheckMatrix extends Component {
    static builderInfo: {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    static editForm: any;
    static schema(): any;
    private checks;
    private foo;
    private component;
    private renderTemplate;
    private loadRefs;
    private addEventListener;
    private refs;
    private updateValue;
    constructor(component: any, options: any, data: any);
    /**
     * Render returns an html string of the fully rendered component.
     *
     * @param children - If this class is extendended, the sub string is passed as children.
     * @returns {string}
     */
    render(children: any): any;
    /**
     * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
     * elements to attach functionality to.
     *
     * @param element
     * @returns {Promise}
     */
    attach(element: any): any;
    /**
     * Get the value of the component from the dom elements.
     *
     * @returns {Array}
     */
    getValue(): any[];
    /**
     * Set the value of the component into the dom elements.
     *
     * @param value
     * @returns {boolean}
     */
    setValue(value: any): boolean;
}
