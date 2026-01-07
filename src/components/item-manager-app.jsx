import "./item-manager-app.css";

import { useState, useRef } from "react";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {
  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  // Additional refs (allowed)
  const itemCategory = useRef(null);
  const itemPrice = useRef(null);

  // Next ID (auto-increment)
  const [nextId, setNextId] = useState(1);

  const categories = ["Stationary", "Kitchenware", "Appliance"];

  const categoryToIcon = (category) => {
    switch (category) {
      case "Stationary":
        return stationaryLogo;
      case "Kitchenware":
        return kitchenwareLogo;
      case "Appliance":
        return applianceLogo;
      default:
        return "";
    }
  };

  const validate = (name, category, price) => {
    if (!name) return "Item name must not be empty";

    const duplicated = items.some(
      (it) => it.name.trim().toLowerCase() === name.toLowerCase()
    );
    if (duplicated) return "Item must not be duplicated";

    if (!categories.includes(category)) return "Please select a category";

    if (Number.isNaN(price) || price < 0) return "Price must not be less than 0";

    return "";
  };

  const clearForm = () => {
    if (itemName.current) itemName.current.value = "";
    if (itemCategory.current) itemCategory.current.value = "";
    if (itemPrice.current) itemPrice.current.value = "0";
    itemName.current?.focus();
  };

  const handleAddItem = () => {
    const name = itemName.current?.value.trim() ?? "";
    const category = itemCategory.current?.value ?? "";
    const priceRaw = itemPrice.current?.value ?? "0";
    const price = Number(priceRaw);

    const err = validate(name, category, price);
    if (err) {
      setErrorMsg(err);
      return;
    }

    setErrorMsg("");
    setItems((prev) => [
      ...prev,
      {
        id: nextId,
        name,
        category,
        price,
      },
    ]);
    setNextId((id) => id + 1);
    clearForm();
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Existing items ABOVE the form row */}
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>
                  <img
                    className="category-icon"
                    src={categoryToIcon(it.category)}
                    alt={it.category}
                    title={it.category}
                  />
                </td>
                <td>{it.price}</td>
                <td>
                  <button
                    className="icon-btn"
                    type="button"
                    onClick={() => handleDelete(it.id)}
                    aria-label={`Delete item ${it.name}`}
                    title="Delete"
                  >
                    <img className="delete-icon" src={deleteLogo} alt="Delete" />
                  </button>
                </td>
              </tr>
            ))}

            {/* Form row MUST be the LAST row */}
            <tr>
              <td></td>
              <td>
                <input ref={itemName} type="text" />
              </td>
              <td>
                <select ref={itemCategory} defaultValue="">
                  <option value=""></option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input ref={itemPrice} type="number" step="0.01" defaultValue="0" />
              </td>
              <td>
                <button type="button" onClick={handleAddItem}>
                  Add Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="error-message">
        {/* You MUST display the errorMsg state here. */}
        {errorMsg}
      </div>
    </>
  );
}

export default ItemManager;
