import React from 'react';
import { Modal } from 'antd';
import { CustomerEditForm } from './../CustomerForms';

const Customer_modal = (props) => {
  const { updateCustomer } = props;
  
  return (
    <Modal
      title={props.title}
      centered
      visible={props.openModal}
      onOk={() => props.setopenModal(false)}
      onCancel={() => props.setopenModal(false)}
      width={1000}
      footer={null}
    >
      {props.type === "sales_edit" && 
        <CustomerEditForm setOpenModal={props.setopenModal} row={props.row} updateCustomer={updateCustomer}/>
      }
    </Modal>
  );
};

export default Customer_modal;