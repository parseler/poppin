import { useEffect } from "react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopReservationModal = ({ isOpen, onClose, children } : ReservationModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="reservation-modal">
      <div className="modal-gradiant"></div>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default PopReservationModal;