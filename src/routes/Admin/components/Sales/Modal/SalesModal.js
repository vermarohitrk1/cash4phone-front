import React from 'react';
import { Modal } from 'antd';
import {SalesForm, SalesEditForm} from './Form/SalesForm';

const Sales_modal = (props) => {
  
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
      {props.type === "sales" && 
        <SalesForm setopenModal={props.setopenModal}/>
      }
      {props.type === "sales_edit" && 
        <SalesEditForm setOpenModal={props.setopenModal} row={props.row}/>
      }
    </Modal>
  );
};

export default Sales_modal;