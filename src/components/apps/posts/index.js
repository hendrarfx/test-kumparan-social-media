import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Post from './post';
import {CircularProgress, Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from "material-ui";

class Posts extends Component {

    static propTypes = {
        data: PropTypes.array,
        baseURL: PropTypes.string,
        isStillLoading: PropTypes.bool,
        error: PropTypes.string
    };


    render() {
        let rendered = <div align="center">No Post<br/> {this.props.error}</div>;
        if (this.props.isStillLoading) {
            rendered = (<div style={{marginTop: '50px', textAlign: 'center'}}><CircularProgress/></div>);
        } else {
            if (this.props.data !== undefined) {
                if (this.props.data.length > 0) {
                    const list = this.props.data.map((data, index) => {
                        return <Post key={data.id} index={index} data={data}
                                     baseURL={this.props.baseURL}/>
                    });
                    rendered = ( <Table>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width: 150}}>No</TableHeaderColumn>
                                <TableHeaderColumn>Title</TableHeaderColumn>
                                <TableHeaderColumn style={{width: 100}}>Action</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {list}
                        </TableBody></Table>);
                }
            }
        }

        return <div>{rendered}</div>
    }
}

export default Posts;