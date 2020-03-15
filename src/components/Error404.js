import React, { Component } from 'react'

export class Error404 extends Component {
    render() {
        return (
            <div className="text-center mt-3">
                <h1 className="text-light">404 Not Found</h1>
                <h3 className="text-light">Did you type the link correctly?</h3>
            </div>
        )
    }
}

export default Error404
