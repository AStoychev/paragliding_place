import { Component } from "react";

import { PageNotFound } from "../pageNotFound/pageNotFound";

export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    };

    static getDerivedStateFromError(error) {
        console.log("getDerivedStateFromError");
        console.log(error);

        return {hasError: true}
    };

    componentDidCatch(error, errorInfo) {
        // Log error
        console.log("componentDidCatch")
    }

    render() {
        if (this.state.hasError) {
            return <PageNotFound />
        }

        return (
            <>
                {this.props.children}
            </>
        )
    }
}