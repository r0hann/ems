import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonGroup(props) {
    const {radioData, onChange, radioValue} = props;
    const [value, setValue]=React.useState(radioValue)

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value)
    };

    return (
        <FormControl component="fieldset">
            {/*<FormLabel component="legend">labelPlacement</FormLabel>*/}
            <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                {radioData.map(radio =>
                    <FormControlLabel
                        key={radio.id}
                        value={radio.id}
                        control={<Radio color="primary"/>}
                        label={radio.label}
                        labelPlacement="start"
                    />)
                }

            </RadioGroup>
        </FormControl>
    );
}
