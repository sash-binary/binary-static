import React from 'react';
import { InputField } from './form/text_field.jsx';
import { connect } from '../store/connect';
import { localize } from '../../../../_common/localize';

const Barrier = ({
    barrier_1,
    barrier_2,
    onChange,
}) =>  (
        <fieldset>
            <span className='field-info left' htmlFor='barrier_1'>{localize(barrier_2 ? 'High barrier' : 'Barrier')}</span>
            <InputField type='number' name='barrier_1' value={barrier_1} o_change={onChange} is_currency />

            {!!barrier_2 &&
                <React.Fragment>
                    <InputField type='number' name='barrier_2' value={barrier_2} on_change={onChange} is_currency />
                </React.Fragment>
            }
        </fieldset>
);

export default connect(
    ({trade}) => ({
        barrier_1: trade.barrier_1,
        barrier_2: trade.barrier_2,
        onChange : trade.handleChange,
    })
)(Barrier);
