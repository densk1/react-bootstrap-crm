import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions.js';

import Comments from '../comments/';

class App extends Component {
	componentDidMount = async () => {
		let { clientID } = this.props.match.params;
		await this.props.getContact( clientID );
	}

	addComment = (e) => {
		e.preventDefault();
		let { clientID } = this.props.match.params;
		let comment = this.props.newComment;
		if (comment.length > 1 ) {
			this.props.addNewComment( clientID, comment );
			this.props.newCommentText('');
		}
	}
	buildContactCard = () => {
		let card = this.props.card;
		return(
			<div className="container">			
				<div className="row">
					<div className="col-md-6 mb-4">
						<div className="card">
							<div className="card-body">
								<h6 className="card-subtitle mb-2 text-muted">Name</h6>
								<h5 className="card-title">{card.name}</h5>

								<h6 className="card-subtitle mb-2 text-muted">Email</h6>
								<h5 className="card-title">{card.email}</h5>

								<h6 className="card-subtitle mb-2 text-muted">Company</h6>
								<h5 className="card-title">{card.company}</h5>
								<p className="card-text"><small className="text-muted">Last updated ...</small></p>
							</div>
						</div>

					</div>
					<div className="col-md-12">
						<div className="card mb-4">
							
							<div className="card-body">
								<div className="form-group">
									<form >
									<textarea 
									className="form-control"
									onChange={(e)=> {
										this.props.newCommentText(e.target.value);
									}}
									onKeyPress={(e)=> e.key === 'Enter' && this.addComment(e)}
									placeholder="Add a note..."
									value={this.props.newComment}
									
									></textarea>
									</form>
								</div>
								<button 
									className="btn btn-sm btn-success" 
									onClick={(e)=>this.addComment(e)}
									>Add Note</button>
							</div>
						</div>
						<Comments clientID={this.props.match.params.clientID}/>
					</div>
				</div>
			</div>

		)
	}
	render(){
		return this.props.card && this.buildContactCard()
	}
}

function mapStateToProps ({ contacts }) {
	let { card } = contacts;
	let { newComment } = contacts.comments;
	return { card, newComment };
}
	
export default connect(mapStateToProps,actions)(App);
