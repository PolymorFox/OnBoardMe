import { Settings, X, Plus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import UserCreation from "./admin/UserCreation";
import UpdateUser from "./admin/UpdateUser";
import DeleteUser from "./admin/DeleteUser";

export default function AdminModal({ isModalOpen, closeModal }) {
  const [users, setUsers] = useState([]);
  const [userFormState, setUserFormState] = useState(false);
  const [updateFormState, setUpdateFormState] = useState(false);
  const [deleteFormState, setDeleteFormState] = useState(false);

  async function refreshUsers() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      // HTTP request error
      console.error(error)
    }
  }

  useEffect(() => {
    async function fetchInitialUsers() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        // HTTP request error
        console.error(error)
      }
    }

    fetchInitialUsers()
  }, [])

  if (!isModalOpen) return null

  return createPortal(
    (
      <>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center overflow-hidden">
          <div className="bg-white p-5 rounded-md shadow-2xl w-4/5 min-w-3/5 max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {/* Admin Header */}
                <Settings className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-700">Admin</h2>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={closeModal}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div>
                <h1 className="text-2xl mb-2 font-semibold">Users</h1>
                {/* User list grid */}
                <div className="max-h-100 overflow-y-auto border border-gray-200 rounded-md grid grid-cols-3 w-4xl gap-0">
                  <div className="font-semibold border-b border-gray-200 p-2 sticky top-0 bg-white z-10">ID</div>
                  <div className="font-semibold border-b border-gray-200 p-2 sticky top-0 bg-white z-10">Email</div>
                  <div className="font-semibold border-b border-gray-200 p-2 sticky top-0 bg-white z-10">Role</div>
                  {users.map((user) => [
                    <div key={`${user.id}-id`} className="border-b border-gray-100 p-2">{user.id}</div>,
                    <div key={`${user.id}-email`} className="border-b border-gray-100 p-2">{user.email}</div>,
                    <div key={`${user.id}-role`} className="border-b border-gray-100 p-2">{user.role}</div>
                  ])}
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      // We want only one form to be open at a time
                      setUpdateFormState(false)
                      setDeleteFormState(false);
                      userFormState ? setUserFormState(false) : setUserFormState(true)
                    }}
                    className="align-middle hover:bg-blue-700 bg-blue-600 p-2 rounded-md text-white hover:cursor-pointer flex items-center gap-2">
                     <Plus /> New User
                  </button>
                  <UserCreation
                    formState={userFormState}
                    onFinish={refreshUsers}
                    closeForm={() => setUserFormState(false)}
                  />
                  <UpdateUser
                    users={users}
                    onFinish={refreshUsers}
                    formState={updateFormState}
                    closeForm={() => setUpdateFormState(false)}
                  />
                  <button
                    onClick={() => {
                      setUserFormState(false);
                      setDeleteFormState(false);
                      updateFormState ? setUpdateFormState(false) : setUpdateFormState(true);
                    }}
                    className="mt-2 align-middle hover:bg-blue-700 bg-blue-600 p-2 rounded-md text-white hover:cursor-pointer flex items-center gap-2">
                    <RefreshCw /> Update A User Record
                  </button>
                  <DeleteUser
                    users={users}
                    onFinish={refreshUsers}
                    formState={deleteFormState}
                    closeForm={() => setDeleteFormState(false)}
                  />
                  <button
                    onClick={() => {
                      setUserFormState(false);
                      setUpdateFormState(false);
                      deleteFormState ? setDeleteFormState(false) : setDeleteFormState(true);
                    }}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    Delete a user
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    document.body
  );

}
