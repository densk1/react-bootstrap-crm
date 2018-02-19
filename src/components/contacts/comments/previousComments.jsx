import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions.js';
import Moment from 'react-moment';
import {AllHtmlEntities} from 'html-entities';


class Comments extends Component {

	componentDidMount = () => {
		this.props.getComments( this.props.clientID );
	}
	parseDate = (date) => {
		let dmy  = new Date(date).getDate();
		console.log(dmy);
		return(
			dmy
		)
	}
	showComments = () => {
		let comments = this.props.comments;
		return comments.map(
			d=>
			<div key={d._id} className="card mb-4">
				<div className="card-body">
					<p className="card-text">{AllHtmlEntities.decode(d.comment)}</p>
					<p className="card-text">
						<small className="text-muted">
							Added <strong>	<Moment date={d.added} fromNow /></strong> by 
							<strong> {AllHtmlEntities.decode(d.addedBy)} </strong>
							<a href="" className="text-success col-sm-2">edit </a> 
							<a href={d._id} className="text-danger  col-sm-2">delete</a>
						</small>
					</p>
				</div>
			</div>
			)
	}
	render() {
		return(
            <div className="row ">
                <div className="offset-sm-1 col-sm-10">
                    {this.props.comments && this.showComments()}
                </div>
            </div>
            
		)
	}
}

function mapStateToProps ({ contacts }) {
    let clientID = contacts.card._id;
	let {comments} = contacts.comments; 
	return { clientID, comments };
}
	
export default connect(mapStateToProps,actions)(Comments);

