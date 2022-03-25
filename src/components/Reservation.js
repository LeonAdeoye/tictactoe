import React from 'react';

class Reservation extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
    }

    handleInputChange = (event) =>
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // When you need to handle multiple controlled input elements, you can add a name attribute to each element
        // and let the handler function choose what to do based on the value of event.target.name.
        // You can use the ES6 computed property name syntax to update the state key corresponding to the given input name.
        // Also, since setState() automatically merges a partial state into the current state, we only needed to call it with the changed parts.
        this.setState({
            [name]: value
        });
    }

    render()
    {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}

export default Reservation;
