
import {closeModal} from '../../Redux/Slices/ModalSlice'
import {Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Hooks/ReduxHook';
import UserInformation from './userInformation';

const CommonModal: React.FC = () => {

const dispatch = useAppDispatch()

const {isOpen} = useAppSelector(state => state.modal);
  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
  <>
      <Modal className='modalStudentInfo' title="" open={isOpen} onCancel={handleCancel}  width={800} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }}>
      
        <UserInformation />

      </Modal>

    </>
  );
};

export default CommonModal;