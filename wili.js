var Wili = {};

Wili.ready = false;
Wili.readyJobs = [];
Wili.rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
Wili.rand16 = length => [...Array(length)].map(() => Wili.rand(0, 15).toString(16)).join('');
Wili.Component = class Component {
    id = "";
    elementRef = null;
    props = {};
    state = {
        fault: false,
        loaded: false,
        empty: true,
        phase: "",
        action: false,
        page: 1
    }
    constructor(props = {}) {
        this.id = Wili.rand16(32);
        this.props = props;
    }
    setState = (inputs) => {
        this.state = {...this.state, ...inputs}
        this.forceUpdate();
    }
    forceUpdate = () => {
        if (this.elementRef !== null) {
            this.elementRef.innerHTML = this.render();
        }
        this.componentDidUpdate();
        this.parentComponentDidUpdate();
    }
    componentDidUpdate = () => {}
    parentComponentDidUpdate = () => {}
    componentDidMount = () => {}
    componentWillMount = () => {}
    componentDidUnmount = () => {}
    componentWillUnmount = () => {}
    unmount = () => {
        this.componentWillUnmount();
        if (this.elementRef) {
            this.elementRef.remove();
        }
        this.componentDidUnmount();
    }
    mount = () => {
        this.componentWillMount();
        let template = document.getElementById(this.id);
        this.elementRef = template.content.firstElementChild.cloneNode(true);
        template.parentElement.insertBefore(this.elementRef, template);
        this.componentDidMount();
        this.componentDidUpdate();
        this.parentComponentDidUpdate();
    }
    toString = () => {
        if (!Wili.ready) Wili.readyJobs.push(this.mount);
        let rendered = this.render();
        return `<template id="${this.id}">${Array.isArray(rendered) ? rendered.join("") : rendered}</template>`
    }
    render = () => this.props.children;
}
Wili.OnClickHandler = class OnClickHandler extends Wili.Component {
    componentDidMount = () => this.elementRef.onclick = this.props.onclick;
}
Wili.build = (rootElementId = "root", rootComponent = new Wili.Component()) => {
    return new Promise((resolve) => {
        let rootElement = document.getElementById(rootElementId);
        rootElement.innerHTML = rootComponent.toString();
        Wili.readyJobs.forEach((f) => f());
        Wili.ready = true;
        resolve();
    })
}
