import React from 'react';
import { Modal } from 'antd';
import { CustomerEditForm } from './../CustomerForms';

const Customer_modal = (props) => {
  const { updateCustomerRow } = props;
  
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
      {props.type === "customer_edit" && 
        <CustomerEditForm setOpenModal={props.setopenModal} row={props.row} updateCustomerRow={updateCustomerRow}/>
      }
    </Modal>
  );
};

export default Customer_modal;