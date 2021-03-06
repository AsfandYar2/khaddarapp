import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  removeItem,
  setCurrentItem,
  clearCurrentItem,
} from '../../../actions/addnewitem';

const ShowProducts = ({
  data,
  removeItem,
  setCurrentItem,
  clearCurrentItem,
}) => {
  const handleRemove = (id) => {
    removeItem(id);
    clearCurrentItem();
  };
  const handleEdit = (c) => {
    setCurrentItem(c);
  };
  return (
    <div>
      {data.items.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <img
            src={require('../../../assets/loader1.svg')}
            alt=""
            width="10%"
          />
          <h4 className="elementToFadeInAndOut">Fetching all Products...</h4>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Name</th>
              <th scope="col">Code</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>

              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((c) => (
              <tr>
                <td style={{ width: '15%' }}>
                  <img src={c.img} width="100%" />
                </td>
                <td>{c.name}</td>
                <td>{c.code}</td>
                <td>{c.price}</td>
                <td>{c.descrip}</td>
                <td>{c.type}</td>

                <td className="edit_icon">
                  <Link to="/panel/addproducts">
                    <i
                      className="far fa-edit"
                      onClick={() => handleEdit(c)}
                    ></i>
                  </Link>
                </td>
                <td>
                  <i
                    className="far fa-trash-alt"
                    onClick={() => handleRemove(c._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.addnewitem,
});
export default connect(mapStateToProps, {
  removeItem,
  setCurrentItem,
  clearCurrentItem,
})(ShowProducts);
