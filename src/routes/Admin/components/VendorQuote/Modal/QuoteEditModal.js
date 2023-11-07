import React from 'react';
import { Modal } from 'antd';
import {QuoteEditForm } from './editForm';

const QuoteEditModal = (props) => {
  const { updateTable } = props;
  
  return (
    <Modal
      title={props.title}
      centered
      visible={props.openEditModal}
      onOk={() => props.setOpenEditModal(false)}
      onCancel={() => props.setOpenEditModal(false)}
      width={1000}
      footer={null}
    >
      <QuoteEditForm setOpenEditModal={props.setOpenEditModal} updateTable={updateTable}/>
      
    </Modal>
  );
};

export default QuoteEditModal;