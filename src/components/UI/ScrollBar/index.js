import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './ScrollBar.css';

export default class ScrollBar extends Component {
    static propTypes = {
        id:PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string
    };

    static defaultProps = {
        backgroundColor: 'white'
    }

    render() {
        return <div id={this.props.id} className={classes.scrollbar}
                    style={{
                        height: this.props.height,
                        backgroundColor: this.props.backgroundColor
            }}>
            {this.props.children}
        </div>
    }
}

