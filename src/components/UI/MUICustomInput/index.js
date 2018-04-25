import React, {Component} from 'react';
import {CircularProgress} from 'material-ui';
import Input from './Input';
import PropTypes from 'prop-types';

export class Inputs extends Component {

    static propTypes = {
        form: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        let formComponent = <div><CircularProgress/></div>

        if (this.props.form.length > 0) {
            formComponent = this.props.form.map((element, index) => {
                return (<Input id={element.id}
                               key={element.id}
                               hintText={element.hintText}
                               elementType={element.elementType}
                               onChanged={(event) => this.props.onChange(event, index)}
                               errorText={element.validationMessage.join(', ')}
                               value={element.value}
                               defaultValue={element.defaultValue}
                               anotherConfig={element.config}/>
                );
            });
        }

        return formComponent;
    }
}

export const checkValidity = (input) => {

    if (input.hasOwnProperty('config')) {
        if (input.config.hasOwnProperty('validation')) {
            const rules = input.config.validation;
            const value = input.value;
            const name = input.label;
            const type = input.elementType;

            let valid = {
                value: false,
                message: []
            };

            if (rules.hasOwnProperty('required')) {
                if (rules.required) {
                    valid.value = value.trim('') !== '';
                    if (!valid.value) valid.message.push(name + " is required");

                    if (valid.value) {
                        if (type === elementType.email) {
                            const pattern = /^\S+@\S+\.\S+$/;
                            valid.value = pattern.test(value.trim(' '));
                            if (!valid.value) valid.message.push(name + ' format is not valid, ex: xxx@sample.com');
                        }

                        if (type === elementType.phone) {
                            const pattern = /^[0-9]{1,}[0-9]{3,15}$/;
                            valid.value = pattern.test(value.trim(' '));
                            if (valid.value) valid.value = value.length >= 9 && value.length <= 15;
                            if (!valid.value) valid.message.push(name + ' format is not valid, ex: +6282199998888 or 082199998888');
                        }
                    }
                }
            }

            if (rules.hasOwnProperty('pattern') && valid.value) {
                const pattern = rules.pattern;
                valid.value = pattern.test(value.trim(' '));
                if (!valid.value) valid.message.push(name + ' format is not valid');
            }

            if (rules.hasOwnProperty('minlength') && valid.value) {
                valid.value = value.length >= rules.minlength;
                if (!valid.value) valid.message.push('Min length of ' + name + ' is ' + rules.minlength);
            }

            if (rules.hasOwnProperty('maxlength') && valid.value) {
                valid.value = value.length <= rules.maxlength;
                if (!valid.value) valid.message.push('Max length of ' + name + 'is ' + rules.maxlength);
            }

            input.valid = valid.value;
            input.validationMessage = [...valid.message];
            input.touched = true;
        } else {
            console.error("Form configuration doesn't have validation key inside config");
        }
    } else {
        console.error("Form configuration doesn't have config key");
    }
};

export const checkFormValid = (forms) => {
    let formValid = false;
    for (let a = 0; a < forms.length; a++) {
        if (forms[a].valid) {
            formValid = true;
        } else {
            formValid = false;
            break;
        }
    }
    return formValid;
};

export const getFormValueJSONObject = (forms) => {
    let formObject = [];
    for (let a = 0; a < forms.length; a++) {
        const object = forms[a];
        formObject.push('"' + object.id + '":"' + object.value + '"');
    }
    const stringObj = '{' + formObject.join(',') + '}';
    const formValueObject = JSON.parse(stringObj);
    return formValueObject;
}

export const elementType = {
    input: 'input',
    textarea: 'textarea',
    email: 'email',
    phone: 'phone',
    password: 'password',
};