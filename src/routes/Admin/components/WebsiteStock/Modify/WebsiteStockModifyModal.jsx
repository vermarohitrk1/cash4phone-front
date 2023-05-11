import { Modal } from 'antd';
import WebsiteStockModifyForm from './WebsiteStockModifyForm';

export const WebsiteStockModifyModal = (props) => {

  return (
    <Modal
      title={props.title}
      visible={props.openModifyModal}
      footer={null}
      onOk={(value) => props.setOpenModifyModal(false)}
      onCancel={(value) => props.setOpenModifyModal(false)}
    >
      <WebsiteStockModifyForm setOpenModifyModal={props.setOpenModifyModal} row={props.row} />
    </Modal>
  );
};
