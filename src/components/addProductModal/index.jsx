import React from 'react';
import './addProductModal.scss';
import {CustomInput, Modal} from '../index';
import {IMAGE_URL_REGEX} from '../../constant';


class AddProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: null,
                error: null,
            },
            name: {
                value: null,
                error: null,
            },
            description: {
                value: null,
                error: null,
            },
            price: {
                value: null,
                error: null,
            },
            imageLink: {
                value: null,
                error: null,
            },
        };

        const {products, closeModal, addProduct} = props;
        if (!Array.isArray(products))
            throw new Error('products not defined or is not a Array');
        if (typeof closeModal !== 'function')
            throw new Error('closeModal not defined or is not a function');
        if (typeof addProduct !== 'function')
            throw new Error('addProduct not defined or is not a function');

        this.handleForm = this.handleForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleForm(event) {
        event.preventDefault();
        let errorList = {};
        for (let key of Object.keys(this.state)) {
            const {value, error} = this.state[key];
            switch (key) {
                case 'id':
                case 'price':
                case 'name':
                    if (error || value === null)
                        errorList = {...errorList, [key]: {value: null, error: 'Поле обязательно для заполнения'}};
                    break;
                default: {
                    if (error) errorList = {...errorList, [key]: {value: null, error}};
                }
            }
        }
        if (Object.keys(errorList).length) {
            this.setState(errorList);
        } else {
            const values = {};
            for (let key of Object.keys(this.state))
                values[key] = this.state[key].value;
            this.props.addProduct(values);
        }
    }

    handleInput(name, value) {
        switch (name) {
            case 'id': {
                let val = Number(value);
                if (!isNaN(val) && (val % 1 === 0)) {
                    val = Math.abs(val);
                    const checkID = Boolean(this.props.products.find(_p => _p.id === val));
                    if (!checkID)
                        this.setState({id: {value: val, error: null}});
                    else
                        this.setState({id: {value: null, error: 'Данный ID уже существует'}});
                } else
                    this.setState({id: {value: null, error: 'ID должен быть целым числом'}});
            }
                break;
            case 'name': {
                let val = value.trim();
                if (val.replace(/\s+/g, '').length > 0) {
                    this.setState({name: {value: val, error: null}});
                } else {
                    this.setState({name: {value: null, error: 'Введите название товара'}});
                }
            }
                break;
            case 'description': {
                let val = value.trim();
                this.setState({
                    description: {
                        value: val.replace(/\s/g, '').length > 0 ? val : null,
                        error: null
                    }
                });
            }
                break;
            case 'price': {
                let val = Number(value.replace(/\+-/g, ''));
                if (Array)
                    if (!isNaN(Number(val))) {
                        this.setState({price: {value: Number(val.toFixed(2)), error: null}});
                    } else {
                        this.setState({price: {value: null, error: 'Неверная цена товара'}});
                    }
            }
                break;
            case 'imageLink': {
                let val = value.trim().replace(/\s/g, '');
                if (val.length === 0)
                    this.setState({
                        imageLink: {
                            value: null,
                            error: null
                        }
                    });
                else {
                    val = val.match(IMAGE_URL_REGEX);
                    if (Array.isArray(val))
                        this.setState({
                            imageLink: {
                                value: val[0],
                                error: null
                            }
                        });
                    else
                        this.setState({imageLink: {value: null, error: 'URL должна указывать на изображение'}});
                }
            }
                break;
            default:
                throw new Error(`Unknown attribute name:${name}`);
        }
    }

    render() {
        const {handleInput, handleForm} = this;
        const {closeModal} = this.props;
        const {
            id,
            name,
            description,
            price,
            imageLink,
        } = this.state;
        return (
            <Modal closeModal={closeModal}>
                <form onSubmit={handleForm} className="login-modal">
                    <h1 className="login-modal__title">Новый товар</h1>
                    <div className="login-modal__form">
                        <CustomInput
                            title={'ID'}
                            type={'number'}
                            name={'id'}
                            onChange={handleInput}
                            error={id.error}/>
                        <CustomInput
                            title={'Название'}
                            type={'text'}
                            name={'name'}
                            onChange={handleInput}
                            error={name.error}
                        />
                        <CustomInput
                            title={'Описание'}
                            type={'textarea'}
                            name={'description'}
                            onChange={handleInput}
                            error={description.error}
                        />
                        <CustomInput
                            title={'Цена'}
                            type={'number'}
                            name={'price'}
                            onChange={handleInput}
                            error={price.error}
                        />
                        <CustomInput
                            title={'Ссылка на картинку'}
                            type={'text'}
                            name={'imageLink'}
                            onChange={handleInput}
                            error={imageLink.error}
                        />
                    </div>
                    <button type="submit" className="button button_primary login-modal__submit">Добавить</button>
                </form>
            </Modal>
        );
    }
}

export default AddProductModal;
