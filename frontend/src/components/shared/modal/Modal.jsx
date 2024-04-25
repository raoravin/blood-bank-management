import React, { useRef, useState } from "react";
import InputType from "../form/InputType";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("");
  const [email, setEmail] = useState("");
  const {user} =useSelector((state) => state.auth)
  // Ref to access the modal
  const modalRef = useRef(null);

  const handleModalSubmit = async() => {
    try {
        const config = {
            withCredentials: true, // Include this option to send credentials with the request
          };
        if(!bloodGroup || !quantity){
            return toast.warning("Please Provide All Fields")
        }
        const inventoryData = {
            inventoryType,
            bloodGroup,
            quantity,
            email,
            organisation:user?._id
        }
        
        const {data} = await axios.post("http://localhost:8080/api/v1/inventory/create-inventory",inventoryData,config)

        if(data?.success){
            toast.success("Inventory created") 
            // Hide the modal using JavaScript
      modalRef.current?.hide(); // Optional chaining for safety

         }
 
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        // aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        ref={modalRef} // Set the ref to access the modal
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage blood records
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex">
                Blood type: &nbsp;
                <div>
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    className="form-check-input"
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label ms-2" htmlFor="in">
                    IN
                  </label>
                </div>
                <div className="ms-4">
                  <input
                    type="radio"
                    name="inRadio"
                    className="form-check-input"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label ms-2" htmlFor="in">
                    OUT
                  </label>
                </div>
              </div>

              <select
                onChange={(e) => setBloodGroup(e.target.value)}
                className="form-select mt-3"
                aria-label="Large select example"
              >
                <option defaultValue={'Select Blood Type'}>Select Blood Type</option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
              </select>
              <InputType
                    labelText={
                        inventoryType === "in" ? "Donar Email" : "Hospital email"
                    } 
                    htmlfor={"donarEmail"}
                    inpuType={"email"}
                    name={"email"}
                    value={email}                    
                    onChange={(e) => setEmail(e.target.value) }
                  />
                  <InputType
                    labelText={"Quantity"} 
                    htmlfor={"dquantity"}
                    inpuType={"number"}
                    name={"quantiry"}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button onClick={handleModalSubmit} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
