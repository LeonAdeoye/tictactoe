import React from 'react';

// We can make the React component state be the “single source of truth”.
// The React component that renders a form also controls what happens in that form on subsequent user input.
// An input form element whose value is controlled by React in this way is called a “controlled component”.

// React, instead of using this selected attribute, uses a value attribute on the root select tag.
// This is more convenient in a controlled component because you only need to update it in one place.
class FlavourForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {value: 'coconut'};
    }

    handleChange = (event) =>
    {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) =>
    {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default FlavourForm;
