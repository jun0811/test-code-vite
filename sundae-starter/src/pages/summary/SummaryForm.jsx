// CheckBox
import { Button, Popover } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { useState } from 'react';

const SummaryForm = () => {
  const [agree, setAgree] = useState(false);

  const popover = (
    <Popover>
      <Popover.Body>실제로는 제공되지 않습니다</Popover.Body>
    </Popover>
  );

  return (
    <div>
      <div>
        <input
          type="checkbox"
          id="terms-conditions-agree"
          value={agree}
          onClick={() => {
            setAgree((pre) => !pre);
          }}
          style={{ margin: '5px' }}
        />
        <label htmlFor="terms-conditions-agree">
          I agree to{' '}
          <OverlayTrigger placement="right" overlay={popover}>
            <span role="button" style={{ color: 'blue' }}>
              Terms and Conditions
            </span>
          </OverlayTrigger>
        </label>
      </div>
      <Button disabled={!agree} className="">
        Confirm order
      </Button>
    </div>
  );
};

export default SummaryForm;
