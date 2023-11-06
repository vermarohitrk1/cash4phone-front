import React from 'react';
import { Modal } from 'antd';
import {QuoteForm } from './form';

const QuoteModal = (props) => {
  const { updateTable } = props;
  
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
      <QuoteForm setopenModal={props.setopenModal} updateTable={updateTable}/>
      
    </Modal>
  );
};

export default QuoteModal;