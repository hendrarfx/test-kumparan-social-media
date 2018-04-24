import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Post from './post';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from "material-ui";

class Posts extends Component {

    static propTypes = {
        data: PropTypes.array,
        baseURL: PropTypes.string,
    };


    render() {
        let rendered = <div align="center"><h5>No post</h5></div>;

        if (this.props.data !== undefined) {
            if (this.props.data.length > 0) {
                const list = this.props.data.map((data, index) => {
                    return <Post key={data.id} index={index} data={data}
                                 baseURL={this.props.baseURL}/>
                });
                rendered = ( <Table>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn style={{width:150}}>No</TableHeaderColumn>
                            <TableHeaderColumn>Title</TableHeaderColumn>
                            <TableHeaderColumn style={{width:100}}>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {list}
                    </TableBody></Table>);
            }
        }
        return <div>{rendered}</div>
    }
}

export default Posts;