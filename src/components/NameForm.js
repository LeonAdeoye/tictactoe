import React from 'react';

// We can combine the two by making the React state be the “single source of truth”.
// Then the React component that renders a form also controls what happens in that form on subsequent user input.
// An input form element whose value is controlled by React in this way is called a “controlled component”.
class NameForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {value: ''};

    }

    handleChange = (event) =>
    {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) =>
    {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default NameForm;
