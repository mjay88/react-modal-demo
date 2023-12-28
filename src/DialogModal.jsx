import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function DialogModal({ isOpen, onClose, children }) {
	const dialogRef = useRef(null);
	useEffect(() => {
		const dialog = dialogRef.current;
		if (dialog == null) return;
		if (isOpen) {
			//show
			dialog.showModal();
		} else {
			//close
			dialog.close();
		}
	}, [isOpen]);
	useEffect(() => {
		const dialog = dialogRef.current;
		if (dialog == null) return;
		dialog.addEventListener("close", onClose);

		return () => {
			dialog.removeEventListener("close", onClose);
		};
	}, [isOpen]);
	return createPortal(
		<dialog ref={dialogRef}>{children}</dialog>,
		document.querySelector("#modal-container")
	);
}
