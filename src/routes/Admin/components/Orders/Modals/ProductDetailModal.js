import { Modal } from 'antd';

export const ProductDetailModal = (props) => {

  return (
    <Modal
      title={props.title}
      visible={props.openModal}
      footer={null}
      onOk={(value) => props.setOpenModal(false)}
      onCancel={(value) => props.setOpenModal(false)}
    >
    <h1>{props.product.brand + ' ' + props.product.model + ' ' + props.product.ram + '/' + props.product.internal_storage + ' ' + props.product.color}</h1>
    <h1>IMEI : {props.product.imei_num} </h1>
    <h1>Marked Price : {props.product.marked_price}</h1>
    <h1>Discount : {props.product.discount}</h1>
    </Modal>
  );
};
