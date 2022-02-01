var Wili = {};
Wili.ready = false;
Wili.readyJobs = [];
Wili.Component = class Component {
    id = "";
    elementRef = null;
    state = {
        fault: false,
        loaded: false,
        empty: true,
        phase: "",
        action: false,
        page: 1
    }
    constructor() {
        this.id = [...Array(32)].map(() => Math.floor(Math.random() * 15).toString(16)).join('');
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
        return `<template id="${this.id}">${this.render()}</template>`
    }
    render = () => ""
}
Wili.Root = class Root extends Wili.Component {
    render = () => `<p>Wili framwork is working!</p>`;
}
Wili.build = (rootElementId = "root", rootComponent = new Wili.Root()) => {
    let rootElement = document.getElementById(rootElementId);
    rootElement.innerHTML = rootComponent.toString();
    Wili.readyJobs.forEach((f) => f());
    Wili.ready = true;
}
