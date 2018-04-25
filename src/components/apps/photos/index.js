import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CircularProgress, GridList, GridTile} from "material-ui";

class Photos extends Component {

    static propTypes = {
        data: PropTypes.array,
        isStillLoading: PropTypes.bool,
        error: PropTypes.string,
        onClick: PropTypes.func
    };

    render() {
        let rendered = <div align="center">No Photos<br/> {this.props.error}</div>;
        if (this.props.isStillLoading) {
            rendered = (<div style={{marginTop: '50px', textAlign: 'center'}}><CircularProgress/></div>);
        } else {
            if (this.props.data !== undefined) {
                if (this.props.data.length > 0) {
                    const list = this.props.data.map((data, index) => {
                        return <GridTile
                            style={{cursor: 'pointer'}}
                            onClick={() => this.props.onClick(data)}
                            key={data.id}
                            title={data.title}>
                            <img src={data.thumbnailUrl} alt={data.title}/>
                        </GridTile>
                    });
                    rendered = (<GridList cols={6} padding={10} cellHeight="auto">
                        {list}
                    </GridList>);
                }
            }
        }

        return <div>{rendered}</div>
    }
}

export default Photos;