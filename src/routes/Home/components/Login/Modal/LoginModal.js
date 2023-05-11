import React from 'react';
import { Modal } from 'antd';
import StepForm from '../otp/StepForm';

const LoginModal = (props) => {
  return (
    <>
      <Modal
        title={props.title}
        centered
        visible={props.openModal}
        onOk={(value) => props.setopenModal(false)}
        onCancel={(value) => props.setopenModal(false)}
        width={1000}
        // bodyStyle={{height: '100px'}}
        footer={null}
      >
       <StepForm setopenModal={props.setopenModal} setPhoneNo={props.setPhoneNo} />
      {/* {props.type === "purchase" && 
        <PurchaseForm setopenModal={props.setopenModal}/>
      } */}
      </Modal>
    </>
  );
};

export default LoginModal;