import { Modal } from 'antd';
import StockModifyForm from './Form/StockModifyForm';

export const StockModifyModal = (props) => {

  return (
    <Modal
      title={props.title}
      visible={props.openModifyModal}
      width={1000}
      footer={null}
      onOk={(value) => props.setOpenModifyModal(false)}
      onCancel={(value) => props.setOpenModifyModal(false)}
    >
      <StockModifyForm setOpenModifyModal={props.setOpenModifyModal} row={props.row} updateTable={props.updateTable}/>
    </Modal>
  );
};
