import { Component } from "react";

import "./search-box.styles.css"

class SearchBox extends Component {

    render() {
        const { onChangeHandler, placeHolder, className } = this.props;
        return (
            <input
                type="search"
                placeholder={placeHolder}
                className={`search-box ${className}`}
                onChange={onChangeHandler}
            />
        )
    }
}

export default SearchBox;