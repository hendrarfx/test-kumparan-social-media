import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Album from './album';
import {CircularProgress, GridList} from "material-ui";

class Users extends Component {

    static propTypes = {
        data: PropTypes.array,
        baseURL: PropTypes.string,
        isStillLoading: PropTypes.bool,
        error: PropTypes.string
    };

    render() {
        let rendered = <div align="center">No Albums<br/> {this.props.error}</div>;
        if (this.props.isStillLoading) {
            rendered = (<div style={{marginTop: '50px', textAlign: 'center'}}><CircularProgress/></div>);
        } else {
            if (this.props.data !== undefined) {
                if (this.props.data.length > 0) {
                    const list = this.props.data.map((data, index) => {
                        return <Album key={data.id} index={index} data={data} onClick={this.props.onClick}
                                      baseURL={this.props.baseURL}/>
                    });
                    rendered = (<GridList cols={4} padding={10} cellHeight="auto">
                        {list}
                    </GridList>);
                }
            }
        }

        return <div>{rendered}</div>
    }
}

export default Users;