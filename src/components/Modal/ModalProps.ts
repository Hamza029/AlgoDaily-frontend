export default interface ModalProps {
  children: React.JSX.Element | React.JSX.Element[] | string;
  handleClose: () => void;
}
