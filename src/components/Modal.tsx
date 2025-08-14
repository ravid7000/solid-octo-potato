import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Button from "./Button";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  header?: string;
  open?: boolean;
  onClose?: () => void;
};

function Modal({ children, header, open, onClose, ...rest }: ModalProps) {
  useEffect(() => {
    function handleClose(evt: KeyboardEvent) {
      if (evt.key !== "Escape") {
        return;
      }
      if (open && onClose) {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleClose);
    }

    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      {...rest}
      role="dialog"
      className="p-4 fixed inset-0 w-full h-full z-50"
    >
      <div className="flex items-center pb-4">
        <h6>{header}</h6>

        <Button title="Close" onClick={onClose}>
          <MdClose />
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
