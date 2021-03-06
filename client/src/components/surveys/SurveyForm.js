// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form'; //this connects the form with redux store kinda like connect. Field component
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import { Link } from 'react-router-dom';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(
            this.props.onSurveySubmit //this is how we can put the values into some backend server
          )}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

//redux form automatically matches up the errors with the fields you are rendering
function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value.';
    }
  });

  return errors;
}

// if (!value.title) {
//   errors.title = 'You must provide a title';
// }
// if (!value.subject) {
//   errors.subject = 'You must provide a subject';
// }
// if (!value.body) {
//   errors.body = 'You must provide a body';
// }

//Redux Form Helper
export default reduxForm({
  validate, //this => validate: validate is es 5,
  form: 'surveyForm',
  destroyOnUnmount: false //doesn't get rid of form data upon Unmounting
})(SurveyForm);

//Below was what was in the reenderfields array
// <div>
//   <Field
//     label="Survey Title"
//     type="text"
//     name="title"
//     component={SurveyField}
//   />
//   <Field
//     label="Subject Line"
//     type="text"
//     name="subject"
//     component={SurveyField}
//   />
//   <Field
//     label="E-mail Body"
//     type="text"
//     name="body"
//     component={SurveyField}
//   />
//   <Field
//     label="Recipient List"
//     type="text"
//     name="emails"
//     component={SurveyField}
//   />
// </div>
//
