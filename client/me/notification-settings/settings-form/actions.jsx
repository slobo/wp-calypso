/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */
import FormButton from 'components/forms/form-button';

export default React.createClass( {
	displayName: 'NotificationSettingsFormActions',

	mixins: [ React.addons.PureRenderMixin ],

	propTypes: {
		onSave: PropTypes.func.isRequired,
		onSaveToAll: PropTypes.func,
		disabled: PropTypes.bool.isRequired,
		isApplyAllVisible: PropTypes.bool
	},

	render() {
		return (
			<div className="notification-settings-form-actions">
				{ this.props.isApplyAllVisible &&
				<FormButton className="notification-settings-form-actions__save-to-all" disabled={ this.props.disabled } onClick={ this.props.onSaveToAll } isPrimary={ false } >
					{ this.translate( 'Save to All Sites' ) }
				</FormButton> }
				<FormButton disabled={ this.props.disabled } onClick={ this.props.onSave } >
					{ this.translate( 'Save Settings' ) }
				</FormButton>
			</div>
		);
	}
} );
