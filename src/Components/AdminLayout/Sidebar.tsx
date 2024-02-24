// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Nav className='col-md-3 col-lg-2 d-md-block bg-light sidebar'>
      <div className='position-sticky'>
        <Nav.Item>
          <Nav.Link as={Link} to='/layout/dashboard'>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/layout/product'>
            Products
          </Nav.Link>
        </Nav.Item>{" "}
        <Nav.Item>
          <Nav.Link as={Link} to='/layout/product'>
            Products
          </Nav.Link>
        </Nav.Item>{" "}
        <Nav.Item>
          <Nav.Link as={Link} to='/layout/product'>
            Products
          </Nav.Link>
        </Nav.Item>{" "}
        <Nav.Item>
          <Nav.Link as={Link} to='/layout/product'>
            Products
          </Nav.Link>
        </Nav.Item>{" "}
        <Nav.Item>
          <Nav.Link as={Link} to='/layout/product'>
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/layout/product'>
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/layout/order'>
            Orders
          </Nav.Link>
        </Nav.Item>
        {/* Add more sidebar items as needed */}
      </div>
    </Nav>
  );
};

export default Sidebar;
