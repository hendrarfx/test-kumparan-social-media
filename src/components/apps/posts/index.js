import React, {Component} from 'react';
import PropTypes from 'prop-types';
import User from './user';
import {GridList} from "material-ui";

class Users extends Component {

    static propTypes = {
        data: PropTypes.array,
        onClick: PropTypes.func,
        baseURL:PropTypes.string
    };

    render() {
        let rendered = <div align="center"><h5>No data users</h5></div>;

        if (this.props.data !== undefined) {
            if (this.props.data.length > 0) {
                const list = this.props.data.map((data,index) => {
                    return <User key={data.id} index={index} data={data} onClick={this.props.onClick} baseURL={this.props.baseURL} />
                });
                rendered=(<GridList cols={4} padding={10} cellHeight="auto">
                    {list}
                </GridList>);
            }
        }
        return <div>{rendered}</div>
    }
}

export default Users;