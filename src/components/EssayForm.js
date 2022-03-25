import React from 'react';

// We can make the React component state be the “single source of truth”.
// The React component that renders a form also controls what happens in that form on subsequent user input.
// An input form element whose value is controlled by React in this way is called a “controlled component”.

// In HTML, a <textarea> element defines its text by its children:
// <textarea>
//   Hello there, this is some text in a text area
// </textarea>
// In React, a <textarea> uses a value attribute instead.
// This way, a form using a <textarea> can be written very similarly to a form that uses a single-line input
class EssayForm extends React.Component
{
    constructor(props)
    {
        super(props);
        // Notice that this.state.value is initialized in the constructor, so that the text area starts off with some text in it.
        this.state = { value: 'Please write an essay about your favorite DOM element.' };
    }

    handleChange = (event) =>
    {
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) =>
    {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay:
                    <textarea value={this.state.value} onChange={this.handleChange} />        </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default EssayForm;
