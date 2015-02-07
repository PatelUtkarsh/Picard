/**
 * External dependencies
 */
var React = require( 'react/addons' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var Comments = require( '../comments/comments.jsx' ),
	EntryContent = require( './entry-content/entry-content.jsx' );

/**
 * Animation setup
 */
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * Renders post
 */
Hentry = React.createClass({
	handleAdd: function( e ) {
		e.preventDefault();
		url = this.props.link;
		url = url.replace(/^.*\/\/[^\/]+/, '');
		page( url );
	},
	render: function() {
		// Decide whether or not to render comments and entry-content
		var comments,
			content;
		if ( this.props.context !== 'index' ) {
			comments = <Comments postID={ this.props.id } />;
			entryContent = <EntryContent content={ this.props.content } />;
		} else {
			comments = '';
			entryContent = '';
		}

		return (
			<div>
				<article className={this.props.post_class}>
					<header className="entry-header">
						<h1 className="entry-title">
							<a onClick={this.handleAdd} href={this.props.link} rel="bookmark">
								{this.props.title}
							</a>
						</h1>
						<div className="entry-meta">
							{this.props.date}
						</div>
					</header>

					<ReactCSSTransitionGroup transitionName="picard-content">
						{ entryContent }
					</ReactCSSTransitionGroup>
				</article>
				{ comments }
			</div>
		);
	}
});

module.exports = Hentry;