import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Wrapper extends Component {
    static propTypes = {
        title: PropTypes.string,
        titleFontSize: PropTypes.string,
        titleFontColor: PropTypes.string,
        showHorizontalLine: PropTypes.bool,
        className: PropTypes.string
    }

    static defaultProps = {
        showHorizontalLine: false,
        titleFontSize: '24px',
        titleFontColor: '#333'
    }

    render() {

        let title = null;
        if (this.props.title !== null && this.props.title !== '' && this.props.title !== undefined) {
            const style = {
                fontSize: this.props.titleFontSize,
                color: this.props.titleFontColor
            };
            title = (<div style={style}><b>{this.props.title}</b></div>);
        }
        let horizontal = this.props.showHorizontalLine ? <hr/> : null;
        return (<div className={this.props.classes} style={{marginTop: '15px'}}>{title}
            {horizontal}
            {this.props.children}</div>);
    }
}

export default Wrapper;