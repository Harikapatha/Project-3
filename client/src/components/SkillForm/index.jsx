import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import { ADD_SKILL } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SkillForm = ({ profileId }) => {
  const [skill, setSkill] = useState('');

  const [addSkill, { error }] = useMutation(ADD_SKILL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addSkill({
        variables: { profileId, skill },
      });

      setSkill('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Add some exercises.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            {/* <input
              placeholder="add exercise..."
              value={skill}
              className="form-input w-100"
              onChange={(event) => setSkill(event.target.value)}
            /> */}
              <Form.Select
                className="form-input w-100" 
                name='searchInput'
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                size='lg'
                aria-label='Select a category'
              >
                <option value=''>add exercise</option>
                <option value='threadMill'>threadMill</option>
                <option value='walking'>walking</option>
                <option value='cycling'>cycling</option>
                {/* Add more options as needed */}
              </Form.Select>
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Add Exercise
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to endorse skills. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SkillForm;
