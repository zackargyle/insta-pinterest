var React = require('react');
var Spinner = require('./Spinner');
require('../../scss/BoardPicker.scss');

/*
 *  Board Picker View Component
 *  @prop  {Object}   post    - Instagram post object
 *  @prop  {Function} postPin - parent method for creating a new Pin
 *  @state {String}   saving  - the board id used for creating a new Pin
 *  @state {String}   note    - the description of the Pin
 */
module.exports = class BoardPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            saving: null,
            note: props.post.caption ? props.post.caption.text : ''
        };
    }

    /*
     *  Create pin and show loading bar until closes modal
     *  @param {Object} board - Pinterest board object
     */
    pinit(board) {
        this.props.postPin({
            board: board.id,
            note: this.state.note,
            link: this.props.post.link,
            image_url: this.props.post.images.standard_resolution.url
        });
        this.setState({ saving: board.id });
    }

    /*
     *  Update the textarea with the new value by storing it in state
     */
    update() {
        if (!this.noteEl) this.noteEl = this.refs.note.getDOMNode();
        this.setState({ note: this.noteEl.value });
    }

    /*
     *  Render helper for clarity in logic
     *  @param {String} type - internal map to render component
     *  @param {Object} data - necessary data for specified component type
     */
    _render(type, data) {
        switch(type) {
            case 'LeftSide':
                return (
                    <div className="inline imageWrapper">
                        <img className="postImage" src={this.props.post.images.standard_resolution.url} width="290" height="290"/>
                        <textarea ref="note" className="note" onChange={this.update.bind(this)} value={this.state.note}></textarea>
                    </div>
                );
            case 'Boards':
                return (
                    <div className="inline boards">
                        { data.map(this._render.bind(this, 'Board')) }
                    </div>
                );
            case 'Board':
                var image = data.image.small;
                return (
                    <div className="board">
                        <img src={image.url} width={image.width} height={image.height} />
                        <span>{data.name}</span>
                        { this.state.saving === data.id ? <Spinner /> : <button className="button button--pinit" onClick={this.pinit.bind(this, data)}>Pin it!</button> }
                    </div>
                );
        }
    }

    /*
     *  Return JSX representation of component view
     */
    render () {
        return (
            <div className="BoardPicker" onClick={this.props.close}>
                <div className="content">
                    <header>Pick a Board</header>
                    { this._render('LeftSide') }
                    { this._render('Boards', this.props.boards) }
                </div>
            </div>
        );
    }

}
