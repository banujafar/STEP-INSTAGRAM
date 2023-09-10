import React from "react";
import { Outlet } from "react-router-dom";
import { modalsData } from "../constants/modals";
import ModalLayout from "../components/modals/ModalLayout";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const { modals } = useSelector((state) => state.modal);

  return (
    <>
      {modals.length > 0 &&
        modals.map((m, key) => {
          const openedModal = modalsData.find(
            (modal) => modal.name === m.modalName
          );

          return (
            <ModalLayout key={key}>
              <openedModal.element data={m.data} />
            </ModalLayout>
          );
        })}

      <Toaster />
      <Outlet />
    </>
  );
};

export default MainLayout;
