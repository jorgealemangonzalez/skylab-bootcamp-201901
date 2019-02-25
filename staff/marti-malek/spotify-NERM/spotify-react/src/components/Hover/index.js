import React from 'react'
import '../Search/index.sass'

class Hover extends React.Component {
    render() {
        const {props: { followers }} = this

        return <div className="popover fade show bs-popover-left amazing-popover" role="tooltip" x-placement="left">
        <div className="arrow"></div>
        <h3 className="popover-header">Followers: {followers.total}</h3>
        </div>
    }
}

export default Hover