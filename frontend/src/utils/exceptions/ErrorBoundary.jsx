import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 my-4 border border-red-500 bg-red-100 text-red-700 rounded text-center">
                    <h2 className="font-bold text-lg mb-2">
                        Oops! Something went wrong.
                    </h2>
                    <p>
                        We encountered an error trying to display this section.
                    </p>

                    {import.meta.env.NODE_ENV === "development" &&
                        this.state.error && (
                            <details className="mt-2 text-sm text-left">
                                <summary>Error Details</summary>
                                <pre className="mt-1 whitespace-pre-wrap break-words bg-red-50 p-2 rounded">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
