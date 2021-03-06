import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { validate } from './formControl';
import CleanField from '../../form/templates/cleanField';
import ButtonInline from '../../form/templates/buttonInline';

const formClass = 'card card-body col-xs-12 offset-sm-1 col-sm-10 offset-md-1 col-md-10 mb-3';

class ChangePassword extends PureComponent {
  render() {
    const {
      handleSubmit,
      // pristine,
      // reset,
      submitting,
      onSuccess,
      onPassError,
    } = this.props;
    const fieldSetup = {
      component: CleanField,
    };
    const onSuccessClassName = ' custom-form-success-outline';
    const successClassName = onSuccess ? formClass + onSuccessClassName : formClass;
    return (
      <form onSubmit={handleSubmit} className={successClassName}>
        <div className="form-group row mb-0 pb-0">
          <div className="col-12">
            <h4 className="text-success text-center">Update Password</h4>
          </div>
        </div>
        <div className="form-group row mb-0 pb-0">
          <label htmlFor="email" className="col-sm-2 col-form-label text-muted mb-0 pb-0 pr-0"><small>User</small></label>
          <div className="col-sm-10 pb-0 mb-0 ml-0 mt-0 pt-0">
            <div>
              <div
                disabled
                readOnly
                className="form-control custom-form-plaintext text-success p-xs-0 m-xs-0 ml-0 pl-0  "
              >
                {this.props.email}
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row mb-0 pb-0">
          <label htmlFor="oldpassword" className="col-12 col-form-label text-muted mb-0 pb-0 "><small>Old Password</small></label>
          <div className="col-12 pb-0 mb-0">
            <div>
              <Field
                name="oldpassword"
                type="password"
                {...fieldSetup}
                specialValidation={onPassError}
              />{
                onPassError &&
                  <div className="col-12 m-o p-0">
                    <span className="text-danger small m-0 p-0">Password is incorrect.</span>
                  </div>
              }
            </div>
          </div>
        </div>
        <hr />
        <div className="form-group row mb-0 pb-0">
          <label htmlFor="newpassword" className="col-12 col-form-label text-muted mb-0 pb-0 "><small>New Password</small></label>
          <div className="col-12 pb-0 mb-0">
            <div>
              <Field
                name="newpassword"
                type="password"
                {...fieldSetup}
              />
            </div>
          </div>
        </div>
        <div className="form-group row mb-4 ">
          <label htmlFor="newpasswordcheck" className="col-12 col-form-label text-muted mb-0 pb-0 "><small>Repeat New Password</small></label>
          <div className="col-12 pb-0 mb-0">
            <div>
              <Field
                name="newpasswordcheck"
                type="password"
                {...fieldSetup}
              />
            </div>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-12 text-center">
            <Field
              name="change"
              component={ButtonInline}
              saveDisabled={submitting}
              text="Update"
            />
          </div>{
            onSuccess &&
            <div className="col-12 pl-4 pt-4 m-o text-center pb-0">
              <span className="text-success small m-0 p-0">Password Changed.</span>
            </div>
          }
        </div>
      </form>
    );
  }
}

ChangePassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onSuccess: PropTypes.bool.isRequired,
  onPassError: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

function mapStateToProps({ loggedIn }) {
  const { email } = loggedIn;
  return { email };
}

export default connect(mapStateToProps, null)(reduxForm({
  // a unique name for the form
  form: 'changePassword',
  validate,
  // warn,
})(ChangePassword));
