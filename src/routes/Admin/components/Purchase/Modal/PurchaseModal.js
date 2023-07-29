import React from 'react';
import { Modal } from 'antd';

import PurchaseForm from './Form/PurchaseForm';

const PurchaseModal = (props) => {
  const {updateTable} = props;
  return (
    <>
      <Modal
        title={props.title}
        centered
        visible={props.openModal}
        onOk={(value) => props.setopenModal(false)}
        onCancel={(value) => props.setopenModal(false)}
        width={1000}
        footer={null}
      >
       
      {props.type === "purchase" && 
        <PurchaseForm setopenModal={props.setopenModal} updateTable={updateTable}/>
      }
      </Modal>
    </>
  );
};

export default PurchaseModal;