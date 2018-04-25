import React, {Component} from 'react';
import {TextField} from "material-ui";
import PropTypes from 'prop-types';
import {elementType} from '../MUICustomInput';

class Input extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        hintText: PropTypes.string.isRequired,
        label: PropTypes.string,
        elementType: PropTypes.string.isRequired,
        anotherConfig: PropTypes.object,
        onChanged: PropTypes.func.isRequired,
        errorText: PropTypes.string.isRequired,
        value:PropTypes.string.isRequired,
        defaultValue:PropTypes.string.isRequired
    }

    render() {
        let inputElement = <div>No Component to render</div>;
        switch (this.props.elementType) {
            case (elementType.input):
                inputElement = <TextField
                    id={this.props.id}
                    fullWidth={true}
                    hintText={this.props.hintText}
                    onChange={this.props.onChanged}
                    errorText={this.props.errorText}
                    value={this.props.value}
                    type="text"
                    floatingLabelText={this.props.label}
                    {...this.props.anotherConfig}
                />;
                break;
            case (elementType.textarea):
                inputElement = <TextField
                    id={this.props.id}
                    multiLine={true}
                    fullWidth={true}
                    rowsMax={4}
                    rows={4}
                    value={this.props.value}
                    hintText={this.props.hintText}
                    onChange={this.props.onChanged}
                    errorText={this.props.errorText}
                    floatingLabelText={this.props.label}
                    {...this.props.anotherConfig}
                />;
                break;
            case (elementType.email):
                inputElement = <TextField
                    id={this.props.id}
                    fullWidth={true}
                    hintText={this.props.hintText}
                    onChange={this.props.onChanged}
                    errorText={this.props.errorText}
                    value={this.props.value}
                    floatingLabelText={this.props.label}
                    {...this.props.anotherConfig}
                />;
                break;
            case (elementType.password):
                inputElement = <TextField
                    id={this.props.id}
                    fullWidth={true}
                    hintText={this.props.hintText}
                    onChange={this.props.onChanged}
                    errorText={this.props.errorText}
                    value={this.props.value}
                    type="password"
                    floatingLabelText={this.props.label}
                    {...this.props.anotherConfig}
                />;
                break;
            case (elementType.phone):
                inputElement = <TextField
                    id={this.props.id}
                    fullWidth={true}
                    hintText={this.props.hintText}
                    onChange={this.props.onChanged}
                    errorText={this.props.errorText}
                    value={this.props.value}
                    floatingLabelText={this.props.label}
                    {...this.props.anotherConfig}
                />;
                break;
            default:
                inputElement =  <TextField
                    id={this.props.id}
                    hintText={this.props.hintText}
                    onChange={this.props.onChanged}
                    errorText={this.props.errorText}
                    value={this.props.value}
                    floatingLabelText={this.props.label}
                    fullWidth={true}
                />;break;
        }

        return <div style={{marginBottom:'10px'}}>{inputElement}</div>
    }
}
/*
const input = (props) => {
    let cssInput = [classes.InputElement];
    let validationMessage = null;
    if ((!props.valid) && props.touched && props.validation) {
        cssInput.push(classes.Error)
        validationMessage = <span className={classes.ErrorMessage}>{props.validationMessage.join(', ')}</span>
    }

    let inputElement = <div>No Component to render</div>;
    switch (props.elementType) {
        case ('input'):
            inputElement = <div><TextField
            /></div>;
            break;
        case ('input-password'):
            inputElement = <div><input
                className={cssInput.join(' ')}
                type="password"
                onBlur={props.blur}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/></div>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={cssInput.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}></textarea>;
            break;
        case ('input-email'):
            inputElement = <input
                className={cssInput.join(' ')}
                type="email"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('input-phone'):
            inputElement = <input
                className={cssInput.join(' ')}
                type="tel"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={cssInput.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} className={classes.Option}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={cssInput.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationMessage}
        </div>
    );
}*/

export default Input;
