import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid} from "react-bootstrap";
import {FontIcon} from "material-ui";
import {styling} from '../../common/config/material.ui.themes.config';

class Wrapper extends Component {
    static propTypes = {
        title: PropTypes.string,
        titleFontSize: PropTypes.string,
        titleFontColor: PropTypes.string,
        showHorizontalLine: PropTypes.bool,
        className: PropTypes.string,
        showBackButton: PropTypes.bool,
        history: PropTypes.object
    }

    static defaultProps = {
        showHorizontalLine: false,
        titleFontSize: '24px',
        titleFontColor: '#333',
        showBackButton: false
    }

    render() {
        let backButton = this.props.showBackButton ?
            <span style={{marginRight: 10}} onClick={() => this.props.history.goBack()}><FontIcon
                className="material-icons" color={styling.palette.primary1Color}>arrow_back</FontIcon></span> : null;
        let title = null;
        if (this.props.title !== null && this.props.title !== '' && this.props.title !== undefined) {
            const style = {
                fontSize: this.props.titleFontSize,
                color: this.props.titleFontColor
            };
            title = (<div style={style}><b>{this.props.title}</b></div>);
        }
        let horizontal = this.props.showHorizontalLine ? <hr/> : null;
        return (<Grid fluid={true}>
            <div className={this.props.classes} style={{marginTop: '15px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>{backButton}<span>{title}</span></div>
                {horizontal}
                {this.props.children}</div>
        </Grid>);
    }
}

export default Wrapper;