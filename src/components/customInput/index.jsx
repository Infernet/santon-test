import React from 'react';
import './customInput.scss';


class CustomInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        const {title, type, name, onChange} = props;

        if (typeof title !== 'string')
            throw new Error('title not defined or is not a string');
        if (typeof type !== 'string')
            throw new Error('type not defined or is not a string');
        if (typeof name !== 'string')
            throw new Error('name not defined or is not a string');
        if (typeof onChange !== 'function')
            throw new Error('onChange not defined or is not a function');

        this.handlerValue = this.handlerValue.bind(this);
    }

    handlerValue({target: {value, name, type}}) {
        if (type === 'number') {
            const val = String(value)
                .replace(/[eE]+/g, '')
                .replace(/,/, '.');
            this.setState({value: val});
            if (!isNaN(Number(val)))
                this.props.onChange(name, Number(val).toFixed(2));
        } else {
            this.setState({value: value});
            this.props.onChange(name, value);
        }
    }

    render() {
        const {type, name, title, error} = this.props;
        return (
            <div className="custom-input">
                <label className="custom-input__label">
                    <p className="custom-input__title">{title}</p>
                    {type !== 'textarea' ?
                        <input
                            type={type}
                            name={name}
                            className={`custom-input__input${error ? ' custom-input__input_error' : ''}`}
                            value={this.state.value}
                            onChange={this.handlerValue}
                        /> :
                        <textarea
                            name={name}
                            className={`custom-input__input${error ? ' custom-input__input_error' : ''}`}
                            value={this.state.value}
                            onChange={this.handlerValue}
                        />
                    }

                </label>
                <p className="custom-input__error">{error}</p>
            </div>
        );
    }
}

export default CustomInput;
